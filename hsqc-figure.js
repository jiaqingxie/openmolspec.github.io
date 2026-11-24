(() => {
  'use strict';

  const mount = document.getElementById('molecular-specimen');
  if (!mount) return;
  const dataURL = new URL('assets/specimen/sucrose.json', document.currentScript.src);
  const chinese = () => document.documentElement.lang.toLowerCase().startsWith('zh');
  const t = (en, zh) => chinese() ? zh : en;
  const html = (tag, className) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  };
  const icons = {
    expand: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
    close: '<path d="m5 5 14 14M19 5 5 19"/>',
    reset: '<path d="M4 9a8 8 0 1 1 0 6m0-12v6h6"/>',
    plus: '<path d="M12 4v16M4 12h16"/>',
    minus: '<path d="M4 12h16"/>',
  };

  function iconButton(type) {
    const button = html('button', 'sp-icon');
    button.type = 'button';
    button.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icons[type] + '</svg>';
    return button;
  }

  function describe(button, label) {
    button.title = label;
    button.setAttribute('aria-label', label);
  }

  function buildModel(panel, record) {
    const canvas = html('canvas', 'sp-model-canvas');
    canvas.tabIndex = 0;
    canvas.setAttribute('role', 'img');
    const controls = html('div', 'sp-model-actions');
    const expand = iconButton('expand'), reset = iconButton('reset');
    const minus = iconButton('minus'), plus = iconButton('plus');
    controls.append(minus, plus, reset, expand);
    const title = html('h2', 'sp-name');
    const formula = html('span', 'sp-formula');
    formula.textContent = 'C₁₂H₂₂O₁₁';
    const heading = html('div', 'sp-model-heading');
    heading.append(title, formula);
    const hint = html('p', 'sp-model-hint');
    const instructions = html('span', 'sp-visually-hidden');
    instructions.id = 'sp-model-instructions';
    canvas.setAttribute('aria-describedby', instructions.id);
    const legend = html('div', 'sp-legend');
    legend.setAttribute('aria-hidden', 'true');
    for (const element of ['C', 'O', 'H']) {
      const tag = html('span', 'sp-element sp-atom-' + element);
      tag.textContent = element;
      legend.append(tag);
    }
    const viewport = html('div', 'sp-model-pane');
    viewport.append(canvas, heading, controls, legend, hint, instructions);
    panel.append(viewport);
    const dialog = html('dialog', 'sp-model-dialog');
    document.body.append(dialog);
    const context = canvas.getContext('2d');
    const paint = {
      C: {radius: .29, light: '#dce7ff', face: '#829cbe', shadow: '#32425d', bond: '#718196'},
      H: {radius: .18, light: '#ffffff', face: '#e5eafa', shadow: '#8392ae', bond: '#b1bbd0'},
      O: {radius: .31, light: '#ffe1cf', face: '#f79b83', shadow: '#963f51', bond: '#d99586'},
    };
    const center = [1, 2, 3].map(i => record.atoms.reduce((sum, atom) => sum + atom[i], 0) / record.atoms.length);
    // Orient the deposited conformer along its principal axis so both sugar rings are visible.
    const basis = [[.57310,.39475,-.71814],[-.59140,.80585,-.02900],[.56727,.44133,.69529]];
    const atoms = record.atoms.map(atom => {
      const coords = atom.slice(1).map((v,i) => v-center[i]);
      const [x,y,z] = basis.map(row => row.reduce((sum,v,i) => sum+v*coords[i],0));
      return {element:atom[0],x,y,z};
    });
    const start = {yaw: 0, pitch: 0, zoom: 1, x: 0, y: 0};
    const view = {...start};
    const pointers = new Map();
    let raf = 0;

    function redraw() {
      if (!raf) raf = requestAnimationFrame(draw);
    }

    function draw() {
      raf = 0;
      const {width, height} = canvas.getBoundingClientRect();
      if (!context || !width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const sy = Math.sin(view.yaw), cy = Math.cos(view.yaw);
      const sx = Math.sin(view.pitch), cx = Math.cos(view.pitch);
      const scale = Math.min(width / 12.5, height / 7.4) * view.zoom;
      const centerX = width * .52 + view.x;
      const centerY = height * .52 + view.y;
      const projected = atoms.map(atom => {
        const x = cy * atom.x + sy * atom.z, z = cy * atom.z - sy * atom.x;
        const y = cx * atom.y - sx * z, depth = sx * atom.y + cx * z;
        const k = 24 / (24 - depth);
        return {x: centerX + scale*k*x, y: centerY - scale*k*y, depth, size: scale*k, element: atom.element};
      });
      const primitives = [];
      for (const [i, j] of record.bonds) {
        const a = projected[i], b = projected[j];
        const mid = {x: (a.x+b.x)/2, y: (a.y+b.y)/2, depth: (a.depth+b.depth)/2};
        for (const end of [a,b]) {
          primitives.push({end, mid, depth: (mid.depth + end.depth)/2 - .16});
        }
      }
      for (const point of projected) primitives.push({point, depth: point.depth});
      primitives.sort((a,b) => a.depth-b.depth);
      for (const primitive of primitives) {
        if (primitive.point) {
          const {x,y,size,element} = primitive.point, p = paint[element], r = size*p.radius;
          const glow = context.createRadialGradient(x-r*.36,y-r*.42,r*.04,x,y,r);
          glow.addColorStop(0,p.light);
          glow.addColorStop(.52,p.face);
          glow.addColorStop(1,p.shadow);
          context.fillStyle = glow;
          context.beginPath(); context.arc(x,y,r,0,2*Math.PI); context.fill();
        } else {
          const {end,mid} = primitive, p = paint[end.element];
          const dx = end.x-mid.x, dy = end.y-mid.y, length = Math.hypot(dx,dy) || 1;
          const r = .09*end.size, nx = -dy*r/length, ny = dx*r/length;
          const shading = context.createLinearGradient(mid.x-nx,mid.y-ny,mid.x+nx,mid.y+ny);
          shading.addColorStop(0,p.shadow); shading.addColorStop(.44,p.bond); shading.addColorStop(1,p.shadow);
          context.strokeStyle = shading; context.lineWidth = Math.max(1.4,r*2); context.lineCap = 'round';
          context.beginPath(); context.moveTo(mid.x,mid.y); context.lineTo(end.x,end.y); context.stroke();
        }
      }
    }

    function zoom(factor) {
      view.zoom = Math.max(.4, Math.min(3.5, view.zoom * factor));
      redraw();
    }
    function home() { Object.assign(view,start); redraw(); }
    function setExpanded() {
      if (dialog.open) { dialog.close(); return; }
      pointers.clear();
      dialog.append(viewport);
      dialog.showModal();
      document.body.classList.add('sp-dialog-open');
      canvas.focus({preventScroll: true});
      localize();
      redraw();
    }
    dialog.addEventListener('close', () => {
      panel.prepend(viewport);
      document.body.classList.remove('sp-dialog-open');
      pointers.clear();
      // Keep rotation and zoom when returning to the embedded viewer.
      view.x = 0; view.y = 0;
      expand.focus({preventScroll: true});
      localize(); redraw();
    });
    expand.onclick = setExpanded; reset.onclick = home;
    minus.onclick = () => zoom(1/1.2); plus.onclick = () => zoom(1.2);

    const centerOf = ([a,b]) => ({x:(a.x+b.x)/2, y:(a.y+b.y)/2, distance:Math.hypot(a.x-b.x,a.y-b.y)});
    canvas.addEventListener('pointerdown', e => {
      if (e.button !== 0 && e.button !== 1) return;
      e.preventDefault();
      canvas.focus({preventScroll:true});
      canvas.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, {x:e.clientX,y:e.clientY});
      canvas.classList.add('sp-dragging');
    });
    canvas.addEventListener('pointermove', e => {
      if (!pointers.has(e.pointerId)) return;
      const previous = [...pointers.values()];
      const old = pointers.get(e.pointerId);
      const next = {x:e.clientX,y:e.clientY};
      pointers.set(e.pointerId,next);
      if (pointers.size === 1) {
        if (e.shiftKey || (e.buttons & 4)) {
          view.x += next.x-old.x; view.y += next.y-old.y;
        } else {
          view.yaw += (next.x-old.x)*.012;
          view.pitch += (next.y-old.y)*.012;
        }
      } else if (pointers.size === 2) {
        const a = centerOf(previous), b = centerOf([...pointers.values()]);
        view.x += b.x-a.x; view.y += b.y-a.y;
        if (a.distance > 1) zoom(b.distance/a.distance);
      }
      redraw();
    });
    const release = e => {
      pointers.delete(e.pointerId);
      if (!pointers.size) canvas.classList.remove('sp-dragging');
    };
    for (const type of ['pointerup','pointercancel','lostpointercapture']) canvas.addEventListener(type,release);
    canvas.addEventListener('wheel', e => {
      if (!dialog.open && document.activeElement !== canvas) return;
      e.preventDefault();
      zoom(Math.exp(-Math.max(-100,Math.min(100,e.deltaY))*.004));
    }, {passive:false});
    canvas.addEventListener('keydown', e => {
      const moves = {ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
      if (moves[e.key]) {
        const [dx,dy] = moves[e.key];
        if (e.shiftKey) { view.x += 15*dx; view.y += 15*dy; }
        else { view.yaw += .13*dx; view.pitch += .13*dy; }
      } else if (['+','='].includes(e.key)) zoom(1.2);
      else if (e.key === '-') zoom(1/1.2);
      else if (e.key === '0' || e.key === 'Home') home();
      else if (e.key === 'Enter') setExpanded();
      else return;
      e.preventDefault(); redraw();
    });
    new ResizeObserver(redraw).observe(canvas);

    function localize() {
      title.textContent = t('Sucrose', '蔗糖');
      canvas.setAttribute('aria-label',t('Interactive 3D structure of sucrose','蔗糖的交互式三维分子结构'));
      dialog.setAttribute('aria-label',t('Sucrose molecular viewer','蔗糖分子全屏视图'));
      instructions.textContent = t('Drag or use arrow keys to rotate. Shift-drag or Shift + arrows to pan. Use two fingers to pan and pinch on touchscreens. Use + and − to zoom, 0 to reset, Enter to expand and Escape to close.', '拖动或按方向键旋转。按住 Shift 并拖动或按方向键可平移。触屏可用双指平移或缩放。按 + 或 − 缩放，0 复位，回车全屏，Esc 关闭。');
      hint.textContent = dialog.open ? t('Drag to rotate · Shift-drag to pan · Scroll to zoom', '拖动旋转 · Shift 拖动平移 · 滚动缩放') : t('Drag to rotate', '拖动旋转');
      describe(minus,t('Zoom out','缩小')); describe(plus,t('Zoom in','放大')); describe(reset,t('Reset view','复位'));
      const name = dialog.open ? 'close' : 'expand';
      expand.querySelector('svg').innerHTML = icons[name];
      describe(expand, dialog.open ? t('Close full-screen view','关闭全屏视图') : t('Expand molecule to full screen','全屏查看分子'));
    }
    return localize;
  }

  function buildSpectra(panel, record) {
    const section = html('div', 'sp-spectra');
    const tabs = html('div','sp-tabs');
    tabs.setAttribute('role','tablist');
    const plotBox = html('div','sp-plot-box');
    plotBox.id = 'sp-spectrum-panel'; plotBox.tabIndex = 0; plotBox.setAttribute('role','tabpanel');
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('role','img');
    const chartTitle = html('span','sp-plot-heading');
    const readout = html('span','sp-readout');
    readout.setAttribute('aria-live','polite');
    const subhead = html('div','sp-plot-meta');
    subhead.append(chartTitle, readout);
    plotBox.append(subhead,svg);
    const footer = html('div','sp-source-line');
    const source = html('a','sp-source');
    source.href = record.source;
    source.target = '_blank'; source.rel = 'noopener';
    source.textContent = 'BMRB bmse000119 ↗';
    const conditions = html('span','sp-conditions');
    conditions.textContent = '100 mM · D₂O · 298 K';
    footer.append(conditions,source);
    section.append(tabs, plotBox, footer);
    panel.append(section);

    let mode = 'hsqc', selectedPeak = null, frame = 0;
    const names = {hsqc:'¹H–¹³C HSQC', proton:'¹H NMR', carbon:'¹³C NMR'};
    const buttons = Object.entries(names).map(([key,title]) => {
      const btn = html('button','sp-tab');
      btn.textContent = title; btn.type = 'button'; btn.dataset.spectrum = key;
      btn.setAttribute('role','tab'); btn.id = 'sp-tab-' + key;
      btn.setAttribute('aria-controls',plotBox.id);
      tabs.append(btn);
      return btn;
    });
    function setMode(value) {
      mode = value;
      for (const b of buttons) {
        const active = b.dataset.spectrum === mode;
        b.tabIndex = active ? 0 : -1;
        b.setAttribute('aria-selected',String(active));
      }
      plotBox.setAttribute('aria-labelledby','sp-tab-'+mode);
      schedule();
    }
    for (const [i,b] of buttons.entries()) {
      b.onclick = () => setMode(b.dataset.spectrum);
      b.onkeydown = e => {
        const indices = {ArrowLeft:(i+2)%3, ArrowRight:(i+1)%3,Home:0,End:2};
        if (!(e.key in indices)) return;
        e.preventDefault();
        const next = buttons[indices[e.key]]; next.focus(); next.click();
      };
    }

    function add(tag, attrs, content) {
      const element = document.createElementNS(svg.namespaceURI,tag);
      for (const [key,value] of Object.entries(attrs)) element.setAttribute(key,value);
      if (content != null) element.textContent = content;
      svg.append(element);
      return element;
    }
    const line = (x1,y1,x2,y2,cls) => add('line',{x1,y1,x2,y2,class:cls});
    const text = (x,y,content,anchor='middle',cls='sp-axis-text') => add('text',{x,y,class:cls,'text-anchor':anchor},content);
    const path = (coords, cls) => {
      if (coords.length < 2) return;
      const d = coords.map(([x,y],i) => (i ? 'L' : 'M') + x.toFixed(2) + ' ' + y.toFixed(2)).join('');
      return add('path',{d,class:cls,fill:'none'});
    };
    const hTicks = [5.5,5,4.5,4,3.5], cTicks = [60,70,80,90,100,110];
    const scale = ([a,b], from, to) => x => from + (to-from)*(x-a)/(b-a);
    const chartInfo = () => {
      if (mode === 'hsqc' && selectedPeak !== null) {
        const [c,h] = record.hsqcPairs[selectedPeak];
        return 'δH ' + h.toFixed(3) + ' · δC ' + c.toFixed(3) + ' ppm';
      }
      if (mode === 'hsqc') return t('11 cross-peaks','11 个交叉峰');
      return mode === 'carbon' ? t('12 peak positions','12 个峰位') : t('9 peak groups','9 组峰');
    };
    let pixelPeaks = [];
    const updateReadout = () => { readout.textContent = chartInfo(); };
    function draw() {
      frame = 0;
      const w = Math.round(svg.getBoundingClientRect().width);
      if (w < 1) return;
      const h = mode === 'hsqc' ? 196 : 184;
      const small = w < 410;
      svg.setAttribute('viewBox','0 0 '+w+' '+h);
      svg.style.height = h + 'px';
      svg.replaceChildren();
      const desc = mode === 'hsqc' ? t('HSQC intensity contours with separately measured proton and carbon traces along the margins.','HSQC 实测等高线，边缘显示独立测量的氢谱与碳谱。') : t('Experimental one-dimensional spectrum, cropped to the sucrose region. Height is relative intensity.', '一维实测谱线，截取蔗糖信号区域，峰高为相对强度。');
      svg.setAttribute('aria-label',names[mode] + ' · ' + desc);
      chartTitle.textContent = mode === 'hsqc' ? t('HSQC with 1D traces','HSQC 与一维实测谱') : t('Experimental trace','实测谱线');
      if (mode === 'hsqc') {
        plotBox.title = t('Select a cross-peak, or focus the chart and use the left and right arrows for its ppm values.', '点选交叉峰，或将焦点移入图中，按左右方向键查看峰位。');
      } else plotBox.removeAttribute('title');
      updateReadout();
      const left = mode === 'hsqc' ? 43 : 20, right = w - (mode === 'hsqc' ? 43 : 20);
      const top = mode === 'hsqc' ? 33 : 17, bottom = h-29;
      const isCarbon = mode === 'carbon';
      const x = scale(isCarbon ? record.cWindow : record.hWindow,left,right);
      const ticksX = isCarbon ? [105,95,85,75,65] : hTicks;
      for (const tick of ticksX) {
        line(x(tick),top,x(tick),bottom,'sp-grid');
        text(x(tick),bottom+19,isCarbon ? tick : tick.toFixed(1));
      }
      line(left,bottom,right,bottom,'sp-axis-rule');
      const axisName = isCarbon ? 'δ¹³C' : 'δ¹H';
      text(mode === 'hsqc' ? w-1 : w-3,bottom+19,axisName+' / ppm','end','sp-unit-bottom');
      if (mode === 'hsqc') {
        // Align both independent 1D experiments with the HSQC in ppm.
        const y = scale(record.cWindow,bottom,top);
        for (const tick of cTicks) {
          line(left,y(tick),right,y(tick),'sp-grid');
          text(left-8,y(tick)+4,tick,'end');
        }
        line(left,top,left,bottom,'sp-axis-rule');
        text(2,top-13,'δ¹³C / ppm','start','sp-unit');
        if (!small) text(right+9,top-11,'¹³C','start','sp-c-label');
        path(record.protonTrace.map(([ppm,v]) => [x(ppm),top-4-v*25]),'sp-h-trace sp-margin-trace');
        path(record.carbonTrace.map(([ppm,v]) => [right+4+v*25,y(ppm)]),'sp-c-trace sp-margin-trace');
        for (const [i,level] of record.contours.entries()) {
          for (const points of level.lines) path(points.map(([hp,cp]) => [x(hp),y(cp)]),'sp-contour sp-level-'+i);
        }
        pixelPeaks = record.hsqcPairs.map(([cp,hp])=>[x(hp),y(cp)]);
        if (selectedPeak !== null) {
          const [px,py] = pixelPeaks[selectedPeak];
          add('circle',{cx:px,cy:py,r:7,class:'sp-peak-marker',fill:'none'});
        }
      } else {
        pixelPeaks = [];
        for (const fraction of [.5,1]) line(left, bottom-fraction*(bottom-top),right,bottom-fraction*(bottom-top),'sp-grid');
        const trace = isCarbon ? record.carbonTrace : record.protonTrace;
        path(trace.map(([ppm,v]) => [x(ppm),bottom-(bottom-top)*v]),isCarbon ? 'sp-c-trace' : 'sp-h-trace');
        text(left+2,top+11,t('relative intensity','相对强度'),'start','sp-unit');
      }
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
    svg.addEventListener('pointerdown',event => {
      if (mode !== 'hsqc') return;
      const rect = svg.getBoundingClientRect();
      const distances = pixelPeaks.map(([x,y])=>Math.hypot(x-event.clientX+rect.left,y-event.clientY+rect.top));
      const closest = Math.min(...distances);
      selectedPeak = closest < 24 ? distances.indexOf(closest) : null;
      schedule();
    });
    plotBox.addEventListener('keydown', e => {
      if (mode !== 'hsqc' || !['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
      e.preventDefault();
      const count = record.hsqcPairs.length;
      if (e.key === 'Home') selectedPeak = 0;
      else if (e.key === 'End') selectedPeak = count-1;
      else if (selectedPeak === null) selectedPeak = e.key === 'ArrowRight' ? 0 : count-1;
      else selectedPeak = (selectedPeak + (e.key === 'ArrowRight' ? 1 : -1) + count) % count;
      schedule();
    });
    new ResizeObserver(schedule).observe(plotBox);
    setMode(mode);
    return () => {
      tabs.setAttribute('aria-label',t('Experimental spectra for sucrose','蔗糖实测谱图'));
      source.setAttribute('aria-label',t('Sucrose spectra and source files at BMRB','在 BMRB 查看蔗糖谱图和原始文件'));
      schedule();
    };
  }

  async function init() {
    const response = await fetch(dataURL);
    if (!response.ok) throw new Error('BMRB specimen data: HTTP ' + response.status);
    const record = await response.json();
    mount.replaceChildren();
    const panel = html('div','sp-card');
    mount.append(panel);
    const localizeModel = buildModel(panel,record), localizeSpectra = buildSpectra(panel,record);
    const refresh = () => { localizeModel(); localizeSpectra(); };
    refresh();
    new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  init().catch(() => {
    const link = html('a','sp-load-source');
    link.href = 'https://bmrb.io/metabolomics/mol_summary/show_data.php?id=bmse000119';
    link.textContent = t('View sucrose spectra at BMRB ↗','在 BMRB 查看蔗糖谱图 ↗');
    mount.replaceChildren(link);
  });
})();
