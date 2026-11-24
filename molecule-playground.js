(() => {
  'use strict';

  const canvas = document.querySelector('#molecule-canvas');
  const context = canvas?.getContext('2d');
  if (!context) return;

  const width = 660;
  const height = 390;
  const presets = {
    ethanol: {
      label: 'Ethanol', smiles: 'CCO',
      positions: [[176, 205], [326, 153], [470, 224], [76, 160], [143, 304], [160, 102],
        [285, 56], [342, 260], [547, 147]],
      bonds: [[0, 1], [1, 2], [0, 3], [0, 4], [0, 5], [1, 6], [1, 7], [2, 8]],
    },
    ether: {
      label: 'Dimethyl ether', smiles: 'COC',
      positions: [[185, 223], [477, 217], [325, 152], [88, 174], [149, 320], [176, 117],
        [578, 160], [525, 310], [489, 112]],
      bonds: [[0, 2], [2, 1], [0, 3], [0, 4], [0, 5], [1, 6], [1, 7], [1, 8]],
    },
  };
  const atoms = [
    {label: 'C', radius: 37, highlight: '#ceeec3', mid: '#5bbda0', shade: '#235f54'},
    {label: 'C', radius: 39, highlight: '#deffd3', mid: '#64c6a4', shade: '#235f54'},
    {label: 'O', radius: 34, highlight: '#ffebbf', mid: '#f7955e', shade: '#a84736'},
    ...[17, 20, 16, 17, 19, 17].map(radius => ({label: 'H', radius,
      highlight: '#f5fbfa', mid: '#c9d9dc', shade: '#587a84'})),
  ];
  const buttons = document.querySelectorAll('[data-isomer]');
  const caption = document.querySelector('#molecule-caption');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let mode = 'ethanol';
  let current = presets[mode].positions.map(([x, y]) => ({x, y}));
  let drag = null;
  let frame = 0;
  let previousBonds = [];
  let transition = 1;

  function alternate() {
    return mode === 'ethanol' ? 'ether' : 'ethanol';
  }

  function select(isomer) {
    if (mode === isomer) return;
    previousBonds = presets[mode].bonds;
    mode = isomer;
    transition = reducedMotion.matches ? 1 : 0;
    canvas.dataset.isomer = isomer;
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.isomer === mode));
    caption.textContent = mode === 'ethanol'
      ? 'Ethanol · CCO · Two distinct carbon environments.'
      : 'Dimethyl ether · COC · One carbon environment by symmetry.';
    schedule();
  }

  function drawBonds(bonds, opacity) {
    if (!opacity) return;
    context.globalAlpha = opacity;
    context.lineCap = 'round';
    for (const [from, to] of bonds) {
      const a = current[from];
      const b = current[to];
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      const gradient = context.createLinearGradient(a.x, a.y, b.x, b.y);
      gradient.addColorStop(0, atoms[from].mid);
      gradient.addColorStop(1, atoms[to].mid);
      context.strokeStyle = '#06202b';
      context.lineWidth = from < 3 && to < 3 ? 15 : 10;
      context.stroke();
      context.strokeStyle = gradient;
      context.lineWidth -= 5;
      context.stroke();
    }
    context.globalAlpha = 1;
  }

  function atomDisk(index) {
    const {x, y} = current[index];
    const {radius, label, highlight, mid, shade} = atoms[index];
    const gradient = context.createRadialGradient(x - radius * .28, y - radius * .35, radius * .02, x, y, radius);
    gradient.addColorStop(0, highlight);
    gradient.addColorStop(.56, mid);
    gradient.addColorStop(1, shade);
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = gradient;
    context.shadowColor = '#051521b5';
    context.shadowBlur = 22;
    context.shadowOffsetY = 7;
    context.fill();
    context.shadowBlur = 0;
    context.shadowOffsetY = 0;
    context.strokeStyle = `${highlight}7a`;
    context.lineWidth = 1;
    context.stroke();
    context.fillStyle = '#143335';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = `650 ${index < 3 ? 18 : 11}px system-ui`;
    context.fillText(label, x, y + .5);
  }

  function draw() {
    frame = 0;
    let moving = transition < 1;
    transition = Math.min(1, transition + .085);
    const target = presets[mode].positions;
    const speed = reducedMotion.matches ? 1 : .14;
    for (const [index, position] of current.entries()) {
      if (index === drag?.index) continue;
      const [x, y] = target[index];
      position.x += (x - position.x) * speed;
      position.y += (y - position.y) * speed;
      moving ||= Math.hypot(x - position.x, y - position.y) > .28;
    }
    context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    context.clearRect(0, 0, width, height);
    context.strokeStyle = '#83cdb030';
    context.lineWidth = 1;
    for (const tilt of [-.28, .4]) {
      context.beginPath();
      context.ellipse(330, 192, 290, 133, tilt, 0, Math.PI * 2);
      context.stroke();
    }
    const [x, y] = presets[alternate()].positions[2];
    context.beginPath();
    context.arc(x, y, 48, 0, Math.PI * 2);
    context.setLineDash([5, 6]);
    context.strokeStyle = drag?.index === 2 ? '#ffd29b' : '#ffd29b66';
    context.stroke();
    context.setLineDash([]);
    drawBonds(previousBonds, 1 - transition);
    drawBonds(presets[mode].bonds, transition);
    for (const index of [3, 4, 5, 6, 7, 8, 0, 1, 2]) atomDisk(index);
    if (moving) schedule();
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(draw);
  }

  function pointerPosition(event) {
    const box = canvas.getBoundingClientRect();
    return {x: (event.clientX - box.left) * width / box.width, y: (event.clientY - box.top) * height / box.height};
  }

  function hit(position) {
    for (const index of [2, 1, 0, 8, 7, 6, 5, 4, 3]) {
      const dot = current[index];
      if (Math.hypot(dot.x - position.x, dot.y - position.y) < atoms[index].radius + 12) return index;
    }
    return -1;
  }

  canvas.addEventListener('pointerdown', event => {
    if (drag || event.button !== 0) return;
    const index = hit(pointerPosition(event));
    if (index < 0) return;
    drag = {index, pointerId: event.pointerId};
    canvas.setPointerCapture(event.pointerId);
    canvas.classList.add('dragging');
  });
  canvas.addEventListener('pointermove', event => {
    const position = pointerPosition(event);
    if (drag?.pointerId === event.pointerId) {
      current[drag.index] = {x: Math.min(width - 32, Math.max(32, position.x)),
                            y: Math.min(height - 32, Math.max(32, position.y))};
      schedule();
    } else {
      canvas.style.cursor = hit(position) >= 0 ? 'grab' : 'default';
    }
  });
  function finishDrag(event) {
    if (drag?.pointerId !== event.pointerId) return;
    const [x, y] = presets[alternate()].positions[2];
    const oxygen = current[2];
    if (event.type === 'pointerup' && drag.index === 2 && Math.hypot(x - oxygen.x, y - oxygen.y) < 82) {
      select(alternate());
    }
    drag = null;
    canvas.classList.remove('dragging');
    schedule();
  }
  canvas.addEventListener('pointerup', finishDrag);
  canvas.addEventListener('pointercancel', finishDrag);
  canvas.addEventListener('lostpointercapture', finishDrag);
  for (const button of buttons) button.addEventListener('click', () => select(button.dataset.isomer));
  document.querySelector('#use-hero-structure').addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('openmolspec:structure', {detail: presets[mode].smiles}));
  });
  new ResizeObserver(() => {
    const deviceScale = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * deviceScale));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * deviceScale));
    schedule();
  }).observe(canvas);
  canvas.dataset.isomer = mode;
  draw();
})();
