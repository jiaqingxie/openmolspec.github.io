(() => {
  'use strict';

  const canvas = document.querySelector('#hero-hsqc');
  const ctx = canvas?.getContext('2d');
  if (!ctx || !canvas.dataset.peaks.startsWith('[')) return;
  const measured = JSON.parse(canvas.dataset.peaks);
  const peaks = measured.map(([carbon, proton]) => ({
    u: (2.8 - proton) / 2.2, v: (carbon - 9) / 14, carbon, proton,
  }));
  const buttons = [...document.querySelectorAll('[data-spectrum-mode]')];
  const caption = document.querySelector('#spectrum-scale');
  const width = 760, height = 418;
  let mode = 'surface';
  let active = null;
  let frame = 0;

  function project(u, v, z = 0) {
    return [183 + 516 * u - 151 * v, 187 + 62 * u + 100 * v - 168 * z];
  }

  function plane(u, v) {
    return [90 + 570 * u, 35 + 289 * v];
  }

  // Only peak coordinates are measured. Every peak has the same display line shape.
  function relief(u, v) {
    let value = 0;
    for (const peak of peaks) {
      const d = ((u - peak.u) / .078) ** 2 + ((v - peak.v) / .105) ** 2;
      value += .65 * Math.exp(-d) + .35 / (1 + 1.8 * d);
    }
    return value;
  }

  function line(a, b, color, thickness = 1) {
    ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b);
    ctx.strokeStyle = color; ctx.lineWidth = thickness; ctx.stroke();
  }

  function label(text, x, y, color = '#b9bddb', align = 'center', size = 14) {
    ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle';
    const fontSize = canvas.clientWidth < 460 ? size + 5 : size;
    ctx.font = fontSize + 'px ui-monospace, monospace'; ctx.fillText(text, x, y);
  }

  function axes(map, flat) {
    const text = '#c0c4e2', rule = '#707da6';
    line(map(0, 0), map(0, 1), rule);
    line(map(0, 1), map(1, 1), rule);
    for (const ppm of [2.5, 2, 1.5, 1]) {
      const [x,y] = map((2.8 - ppm) / 2.2, 1);
      line([x,y], [x,y + 5],rule); label(ppm.toFixed(1), x, y + 18,text);
    }
    for (const ppm of [10, 15, 20]) {
      const [x,y] = map(0,(ppm - 9) / 14);
      line([x-4,y],[x,y],rule);
      if (!flat) line([49,y],[x-5,y],'#77769760');
      label(String(ppm),flat ? x-9 : 44,y,text,'right');
    }
    const [x,y] = map(.83,1);
    label('¹H (ppm)',x,y+42,text);
    if (flat) label('¹³C (ppm)',90,14,text,'left');
    else label('¹³C (ppm)',11,165,text,'left');
  }

  function surface() {
    const ink = ctx.createLinearGradient(0, 95, 0, 355);
    ink.addColorStop(0, '#e0c1ff'); ink.addColorStop(.57, '#a895ff'); ink.addColorStop(1, '#6169ab');
    // Draw the slices back to front. Each filled slice obscures the surface behind it.
    const slices = canvas.clientWidth < 460 ? 48 : 66;
    for (let row = 0; row <= slices; row++) {
      const v = row / slices;
      const ridge = new Path2D(), crest = new Path2D(), summit = new Path2D();
      let previousZ = 0;
      for (let col = 0; col <= 180; col++) {
        const u = col / 180, z = relief(u,v), point = project(u, v, z);
        if (!col) ridge.moveTo(...point); else ridge.lineTo(...point);
        if (z > .56 && previousZ > .56) crest.lineTo(...point); else crest.moveTo(...point);
        if (z > .83 && previousZ > .83) summit.lineTo(...point); else summit.moveTo(...point);
        previousZ = z;
      }
      const face = new Path2D(ridge);
      face.lineTo(...project(1,v)); face.lineTo(...project(0,v)); face.closePath();
      ctx.fillStyle = '#292544'; ctx.fill(face);
      ctx.strokeStyle = ink; ctx.lineWidth = row % 4 === 0 ? 1.18 : .84; ctx.stroke(ridge);
      ctx.strokeStyle = '#dcb9ff'; ctx.lineWidth = 1.35; ctx.stroke(crest);
      ctx.strokeStyle = '#ffdb9b'; ctx.lineWidth = 1.6; ctx.stroke(summit);
    }
    axes(project,false);
  }

  function contours() {
    const map = plane;
    for (let i=0; i<=10; i++) {
      line(map(i/10,0),map(i/10,1),'#353852');
      line(map(0,i/10),map(1,i/10),'#353852');
    }
    peaks.forEach((peak,index) => {
      const [x,y] = map(peak.u,peak.v);
      for (let level=8; level>=1; level--) {
        ctx.beginPath(); ctx.ellipse(x,y,level*5.2,level*3.65,0,0,Math.PI*2);
        ctx.fillStyle = 'rgba(144,115,236,.085)'; ctx.fill();
        ctx.strokeStyle = index===active?'#f5d49a':(level<4?'#dbccff':'#9892ee');
        ctx.lineWidth = 1; ctx.stroke();
      }
    });
    axes(map,true);
  }

  function peakPoint(peak) {
    return mode === 'surface' ? project(peak.u,peak.v,relief(peak.u,peak.v)) : plane(peak.u,peak.v);
  }

  function render() {
    frame=0;
    const dpr=Math.min(window.devicePixelRatio||1,2);
    const w=Math.round(canvas.clientWidth*dpr), h=Math.round(canvas.clientHeight*dpr);
    if(!w||!h)return;
    if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
    ctx.setTransform(w/width,0,0,h/height,0,0); ctx.clearRect(0,0,width,height);
    if(mode==='surface')surface(); else contours();
    if(active!==null){
      const peak=peaks[active], [x,y]=peakPoint(peak);
      ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2);ctx.fillStyle='#ffe2a0';ctx.fill();
      label(peak.proton.toFixed(3)+' / '+peak.carbon.toFixed(2)+' ppm',x,Math.max(13,y-19),'#ffdfa2');
    }
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(render);}
  buttons.forEach(button=>button.addEventListener('click',()=>{
    mode=button.dataset.spectrumMode; active=null;
    buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    caption.textContent=mode==='surface'?'Illustrative height':'Illustrative line shapes';
    schedule();
  }));
  canvas.addEventListener('pointermove',event=>{
    const box=canvas.getBoundingClientRect();
    const px=(event.clientX-box.left)*width/box.width, py=(event.clientY-box.top)*height/box.height;
    const next=peaks.findIndex(peak=>{
      const [x,y]=peakPoint(peak);return Math.hypot(px-x,py-y)<40;
    });
    const selected=next<0?null:next;
    if(selected!==active){active=selected;schedule();}
  });
  canvas.addEventListener('pointerleave',()=>{if(active!==null){active=null;schedule();}});
  new ResizeObserver(schedule).observe(canvas);
  canvas.setAttribute('aria-label', 'Butanenitrile HSQC. Measured proton and carbon coordinates in ppm: ' +
    peaks.map(p => p.proton + ' and ' + p.carbon).join(', ') + '. Display heights and widths are illustrative.');
  schedule();
})();
