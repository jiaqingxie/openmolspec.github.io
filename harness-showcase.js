(() => {
  'use strict';

  const root = document.getElementById('harness-showcase');
  if (!root) return;

  const folder = 'assets/harness/';
  const cases = [
    { id: 'retrieval', title: ['Identify a structure from two NMR spectra', '用氢谱和碳谱检索结构'], tag: ['¹H + ¹³C NMR · DeepSeek + MCP', '¹H + ¹³C NMR · DeepSeek + MCP'],
      summary: ['DeepSeek corrected an input error and retrieved the reference structure from 32 candidates without a molecular formula.', 'DeepSeek 根据校验反馈修正了输入，仅用氢谱和碳谱检索 32 个候选，参考结构排在第一。'],
      alt: ['Top-ranked structure with cosine scores for the first three candidates', '排名第一的分子结构及前三名候选的余弦相似度'],
      raw: folder + 'nmr-retrieval-agent.json' },
    { id: 'ethanol', title: ['Ethanol carbon shifts', '乙醇的碳化学位移'], tag: ['¹³C NMR · Agent + MCP', '¹³C NMR · 智能体 + MCP'],
      summary: ['The agent validated CCO and called NMRNet to predict the two carbon shifts.', '智能体校验 CCO 后调用 NMRNet，得到两个碳原子的预测位移。'],
      alt: ['Recorded ethanol prediction with two carbon positions at 57.77 and 17.77 ppm', '乙醇执行记录截图，两处碳位移为 57.77 和 17.77 ppm'],
      raw: 'assets/agent-demo/run.json' },
    { id: 'fragments', title: ['Annotating MS/MS fragments', '串联质谱碎片指认'], tag: ['MS/MS · MCP', 'MS/MS · MCP'],
      summary: ['MechFrag-MS returned fragment atom indices for 11 of 14 observed peaks in one MassSpecGym spectrum.', '在一张 MassSpecGym 谱图中，MechFrag-MS 为 14 个实测峰中的 11 个给出了碎片原子编号。'],
      alt: ['Recorded MechFrag-MS result showing observed mass-to-charge ratios and fragment mass errors', 'MechFrag-MS 执行记录截图，展示实测质荷比与匹配碎片的质量误差'],
      raw: folder + 'harness_mcp_mechfrag.json' },
    { id: 'solvent', title: ['Transferring a solvent shift', '跨溶剂化学位移'], tag: ['Solvent transfer · MCP', '跨溶剂位移 · MCP'],
      summary: ['A fitted solvent correction converts a 50.00 ppm carbon shift in CDCl₃ to 49.87 ppm in DMSO-d₆.', '将 CDCl₃ 中 50.00 ppm 的碳位移输入溶剂校正模型，得到 DMSO-d₆ 中的预测值 49.87 ppm。'],
      alt: ['Recorded solvent-transfer output with the source shift, target prediction and fitted change', '跨溶剂位移执行记录截图，展示源位移、目标预测与拟合改变量'],
      raw: folder + 'harness_mcp_solvent_fit.json' },
  ];

  const zh = () => document.documentElement.lang.toLowerCase().startsWith('zh');
  const t = (en, cn) => zh() ? cn : en;
  const localized = pair => pair[zh() ? 1 : 0];
  const elem = (tag, cls, content) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (content !== undefined) node.textContent = content;
    return node;
  };
  function link(label, href, cls) {
    const a = elem('a', cls, label);
    a.href = href;
    return a;
  }
  function button(label, cls, listener) {
    const b = elem('button', cls, label);
    b.type = 'button';
    b.addEventListener('click', listener);
    return b;
  }
  const cache = new Map();
  async function readJson(url) {
    if (!cache.has(url)) {
      const pending = fetch(url).then(response => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      }).catch(error => { cache.delete(url); throw error; });
      cache.set(url, pending);
    }
    return cache.get(url);
  }

  function resultHeader(type, model) {
    const row = elem('div', 'hs-result-header');
    row.append(elem('span', '', type), elem('span', 'hs-model', model));
    return row;
  }
  function stats(values) {
    const dl = elem('dl', 'hs-values');
    values.forEach(([label, value]) => {
      const group = elem('div');
      group.append(elem('dt', '', label), elem('dd', '', value));
      dl.append(group);
    });
    return dl;
  }

  function chart(label) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 460 108');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', label);
    const draw = (tag, attrs, value) => {
      const child = document.createElementNS(ns, tag);
      for (const [key, v] of Object.entries(attrs)) child.setAttribute(key, String(v));
      if (value !== undefined) child.textContent = value;
      svg.append(child);
      return child;
    };
    return {svg, draw};
  }
  function plotCarbon(shifts) {
    const {svg, draw} = chart(t('Predicted carbon positions in ppm', '预测碳化学位移，单位 ppm'));
    const x = ppm => 24 + (70 - ppm) * 412 / 70;
    const axis = 77;
    for (let n = 0; n <= 70; n += 10) {
      draw('line', {x1:x(n), x2:x(n), y1:11, y2:axis+3, class:'hs-grid'});
      draw('text', {x:x(n), y:96, 'text-anchor':'middle', class:'hs-tick'}, n);
    }
    draw('line', {x1:24, x2:436, y1:axis, y2:axis, class:'hs-grid'});
    shifts.forEach(ppm => {
      draw('line', {x1:x(ppm), x2:x(ppm), y1:31, y2:axis, class:'hs-stick'});
      draw('text', {x:x(ppm), y:22, 'text-anchor':'middle', class:'hs-point-label'}, ppm.toFixed(2));
    });
    return svg;
  }
  function plotFragments(peaks) {
    const {svg, draw} = chart(t('Fragment mass error in ppm versus observed m/z', '碎片质量误差（ppm）与实测 m/z'));
    const x = mz => 42 + (mz - 120) * 386 / 240;
    const matched = peaks.filter(p => p.match);
    const extent = Math.max(10, ...matched.map(p => Math.abs(p.match.ppm_error)));
    const y = ppm => 48 - ppm / extent * 32;
    for (const v of [-extent, 0, extent]) {
      draw('line', {x1:42,x2:428,y1:y(v),y2:y(v),class:'hs-grid'});
      draw('text', {x:30,y:y(v)+4,'text-anchor':'end',class:'hs-tick'}, v.toFixed(0));
    }
    for (const mz of [140, 200, 260, 320]) {
      draw('text', {x:x(mz),y:98,'text-anchor':'middle',class:'hs-tick'}, mz);
    }
    matched.forEach(p => draw('circle', {cx:x(p.observed_mz),cy:y(p.match.ppm_error),r:4,class:'hs-dot'}));
    return svg;
  }
  function solventPanel(result, inputs) {
    const group = elem('div', 'hs-solvents');
    const items = [
      [inputs.source_solvent, inputs.source_ppm, t('Observed', '实测')],
      [inputs.target_solvent, result.predicted_target_ppm, t('Predicted', '预测')],
    ];
    items.forEach(([name, value, kind]) => {
      const tile = elem('div');
      const line = elem('span', 'hs-solvent-value', value.toFixed(2));
      line.append(elem('small', '', ' ppm'));
      tile.append(elem('span', 'hs-solvent-name', name), line, elem('span', 'hs-solvent-kind', kind));
      group.append(tile);
    });
    return group;
  }

  // These views are drawn from the same stored tool responses linked in the dialog.
  function resultView(id, record, request) {
    const view = elem('article', 'hs-result');
    if (id === 'retrieval') {
      const event = record.events.find(e => e.type === 'tool_end' && e.data.name === 'spectra_predict');
      const result = event.data.result.result;
      const diagram = elem('img', 'hs-retrieved-structure');
      diagram.src = folder + 'nmr-retrieval-first.svg';
      diagram.alt = t('Highest-scoring candidate', '得分最高的候选结构') + ' · ' + result.candidates[0].smiles;
      const ranking = elem('ol', 'hs-ranking');
      result.candidates.slice(0, 3).forEach((candidate, i) => {
        const row = elem('li');
        row.append(elem('span', '', t('Rank ', '第 ') + (i + 1) + t('', ' 名')), elem('strong', '', candidate.score.toFixed(4)));
        ranking.append(row);
      });
      const panel = elem('div', 'hs-retrieval-panel');
      panel.append(diagram, ranking);
      view.append(resultHeader('¹H + ¹³C NMR', record.result.model), elem('h4', '', t('The reference ranked first', '参考结构排名第一')),
        elem('p', 'hs-units', t('Top structure and candidate cosine similarities', '首选结构与候选的余弦相似度')), panel,
        stats([[t('Candidate library', '候选库'), String(result.candidate_pool)], [t('Formula supplied', '给定分子式'), t('No', '无')]]));
    } else if (id === 'ethanol') {
      const end = record.events.find(e => e.type === 'tool_end' && e.data.name === 'spectra_predict');
      const value = end.data.result.result.records[0];
      view.append(resultHeader('¹³C NMR', 'NMRNet'), elem('h4', '', t('Carbon chemical shifts', '碳化学位移')),
        elem('p', 'hs-units', t('Predicted peak positions / ppm', '预测峰位 / ppm')),
        plotCarbon(value.prediction_ppm),
        stats(value.atom_indices.map((atom, i) => [t('Carbon ', '碳原子 ') + atom, value.prediction_ppm[i].toFixed(2) + ' ppm'])));
    } else if (id === 'fragments') {
      const value = record.inference.result;
      view.append(resultHeader('MS/MS', record.inference.harness), elem('h4', '', t('Fragment mass errors', '碎片质量误差')),
        elem('p', 'hs-units', t('Mass error / ppm by observed m/z', '质量误差 / ppm，横轴为实测 m/z')),
        plotFragments(value.peaks),
        stats([[t('Matched peaks', '匹配峰'), value.matched + ' / ' + value.peaks.length], [t('Spectrum', '谱图'), 'MassSpecGymID0013877']]));
    } else {
      const value = record.inference.result;
      view.append(resultHeader('¹³C NMR', t('Solvent shift fit', '溶剂位移拟合')),
        elem('h4', '', t('Solvent correction', '溶剂校正')), solventPanel(value, request.inputs),
        stats([[t('Fitted change', '拟合改变量'), value.predicted_delta_ppm.toFixed(3) + ' ppm'], [t('Model calls', '模型调用次数'), String(record.inference.calls.length)]]));
    }
    return view;
  }

  function table(headings, rows) {
    const out = elem('table', 'hs-table'), head = out.createTHead().insertRow();
    headings.forEach(heading => {
      const th = elem('th', '', heading); th.scope = 'col'; head.append(th);
    });
    const body = out.createTBody();
    rows.forEach(values => { const row = body.insertRow(); values.forEach(value => { row.insertCell().textContent = value; }); });
    return out;
  }
  function detailsSection(title, content) {
    const details = elem('details', 'hs-details');
    details.append(elem('summary', '', title), content);
    return details;
  }
  function evidence(id, record) {
    const wrap = elem('div', 'hs-evidence');
    if (id === 'ethanol' || id === 'retrieval') {
      const tools = record.events.filter(e => e.type === 'tool_end');
      if (id === 'retrieval') {
        const result = tools.find(e => e.data.name === 'spectra_predict').data.result.result;
        const query = record.events.find(e => e.type === 'tool_start' && e.data.name === 'spectra_predict').data.args.inputs.query;
        wrap.append(elem('p', '', t('The first paired spectrum in the NMRSpec test split was queried against 32 distinct structures, presented in hash order. The reference was checked after retrieval.',
          '取 NMRSpec 测试集第一条配对谱，在按哈希排序的 32 个不同结构中检索。检索结束后再核对参考结构。')),
          detailsSection(t('View input spectra (ppm)', '查看输入谱图（ppm）'), table([t('Nucleus', '核种'), t('Chemical shifts', '化学位移')], [
            ['¹H', query.h_nmr[0].chemical_shift], ['¹³C', query.c_nmr[0].chemical_shift]])),
          table([t('Rank', '名次'), 'SMILES', t('Cosine', '余弦相似度')], result.candidates.slice(0, 3).map((r, i) => [String(i + 1), r.smiles, r.score.toFixed(4)])),
          elem('p', '', t('DeepSeek made four API calls. After validation flagged the input format, it placed both spectra under query and resubmitted the same candidate list.',
            'DeepSeek 共调用四轮 API。第一次校验发现输入格式有误，它把两张谱放进 query 字段，保留原候选列表后重新提交。')));
      } else {
        wrap.append(elem('p', '', t('The original prompt and answer were recorded in Chinese.', '原始提问和回答均以中文记录。')), elem('blockquote', '', record.request.prompt));
      }
      wrap.append(table([t('Tool', '工具'), t('Result', '结果'), t('Elapsed', '耗时')], tools.map(({data}) => [
        data.name, data.result?.valid === false ? t('Invalid input', '输入有误') : t('Completed', '完成'), data.elapsed_seconds.toFixed(3) + ' s'])));
      const steps = elem('div', 'hs-call-steps');
      const starts = new Map(record.events.filter(e => e.type === 'tool_start').map(e => [e.data.id, e.data.args]));
      tools.forEach(({data}) => {
        const body = elem('div');
        body.append(elem('p', '', t('Input', '输入')), elem('pre', 'hs-json', JSON.stringify(starts.get(data.id), null, 2)),
          elem('p', '', t('Output', '输出')), elem('pre', 'hs-json', JSON.stringify(data.result, null, 2)));
        steps.append(detailsSection(data.name + ' · ' + data.elapsed_seconds.toFixed(3) + ' s', body));
      });
      wrap.append(detailsSection(t('Inspect tool inputs and outputs', '查看逐次工具输入与输出'), steps),
        detailsSection(t('Read the recorded answer', '查看原始回答'), elem('pre', 'hs-answer', record.result.answer)));
      if (id === 'retrieval') {
        wrap.append(elem('p', '', t('The recorded answer misplaces the aryl groups in its informal name. The structure drawing follows the verified first-ranked SMILES.',
          '原始回答中的文字命名写错了芳基的位置。上方结构图按核对过的第一名 SMILES 绘制。')));
        return wrap;
      }
      const images = elem('div', 'hs-originals');
      [[t('Request screenshot', '提问截图'), '01-plan'], [t('Tool screenshot', '调用截图'), '02-tools'],
        [t('Result screenshot', '结果截图'), '03-result']].forEach(([label, name]) => images.append(link(label, 'assets/agent-demo/'+name+'.png')));
      wrap.append(images);
    } else {
      const inference = record.inference;
      wrap.append(elem('p', '', t('The MCP client discovered tools, validated the request and ran ', 'MCP 客户端发现工具、校验请求并执行了 ') + inference.task + t(' through stdio.', '（stdio 传输）。')),
        table([t('Model call', '模型调用'), t('Elapsed', '耗时'), t('Status', '状态')],
          inference.calls.map(call => [String(call.index + 1), call.elapsed_seconds.toFixed(3) + ' s', call.status])));
      if (id === 'fragments') {
        const rows = inference.result.peaks.map(p => [p.observed_mz.toFixed(4), p.match ? p.match.ppm_error.toFixed(2) : '—', p.match ? p.match.atom_indices.join(', ') : '—']);
        wrap.append(detailsSection(t('Inspect all 14 observed peaks', '查看 14 个实测峰'),
          table(['m/z', t('Error / ppm', '误差 / ppm'), t('Atom indices (zero-based)', '原子编号（从 0 起）')], rows)));
      } else if (inference.repeat_predictions_equal) {
        wrap.append(elem('p', '', t('Both runs returned the same predicted shift.', '两次执行返回了相同的预测位移。')));
      }
    }
    return wrap;
  }

  let currentDialog;
  function openCase(item, trigger) {
    const dialog = elem('dialog', 'hs-dialog');
    currentDialog = dialog;
    const header = elem('div', 'hs-dialog-head');
    const h = elem('h3', '', localized(item.title)); h.id = 'hs-dialog-title';
    dialog.setAttribute('aria-labelledby', h.id);
    header.append(h, button(t('Close', '关闭'), 'hs-close', () => dialog.close()));
    const content = elem('div', 'hs-dialog-content', t('Loading the record…', '正在加载记录…'));
    const source = link(t('Open the source JSON', '打开原始 JSON'), item.raw, 'hs-link');
    source.target = '_blank'; source.rel = 'noopener';
    dialog.append(header, content, source);
    dialog.addEventListener('close', () => {
      dialog.remove();
      if (currentDialog === dialog) currentDialog = null;
      if (trigger.isConnected) trigger.focus({preventScroll:true});
    }, {once:true});
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    document.body.append(dialog);
    dialog.showModal();
    Promise.all([readJson(item.raw), item.id === 'solvent' ? readJson(folder+'solvent-fitted-request.json') : null]).then(([record, request]) => {
      if (!dialog.open) return;
      content.replaceChildren(resultView(item.id, record, request), evidence(item.id, record));
    }).catch(() => { content.textContent = t('The recording could not be loaded. Open the source JSON below.', '暂时无法加载记录，可通过下方链接查看原始 JSON。'); });
  }

  function init() {
    if (currentDialog?.open) currentDialog.close();
    const intro = elem('div', 'hs-intro');
    const title = elem('h2', '', t('Agent Harness', '智能体工具台')); title.id = 'agent-demo-title';
    intro.append(title, elem('p', '', t('Explore the input spectra, tool calls and model results from recorded runs.', '从执行记录中查看输入谱图、工具调用和模型结果。')));
    const workflow = elem('figure', 'hs-workflow');
    const fighead = elem('figcaption');
    const figTitle = elem('h3', '', t('How tool calls work', '工具如何调用'));
    const figureFile = folder + (zh() ? 'mcp-workflow.zh.svg' : 'mcp-workflow.svg');
    const figureLink = link(t('Open full diagram', '打开完整流程图'), figureFile, 'hs-link');
    figureLink.target = '_blank'; figureLink.rel = 'noopener';
    fighead.append(figTitle, figureLink);
    const diagramImage = elem('img');
    diagramImage.src = figureFile;
    diagramImage.alt = t('An MCP client discovers tasks, validates inputs, requests missing fields if needed, dispatches a model and returns its prediction, timing and hashes.',
      'MCP 客户端发现任务、校验输入，按需补充字段，调用模型，再将预测、耗时与哈希值返回智能体。');
    diagramImage.loading = 'lazy';
    const compactFlow = elem('ol', 'hs-compact-flow');
    const steps = [
      [t('Choose a task', '发现任务'), 'spectra_tasks'],
      [t('Check the inputs', '校验输入'), 'spectra_validate'],
      [t('Run the model', '调用模型'), 'spectra_predict'],
      [t('Inspect the output', '读取结果'), t('Prediction, timing and hashes', '预测、耗时与哈希值')],
    ];
    steps.forEach(([label, value]) => {
      const entry = elem('li');
      entry.append(elem('strong', '', label), elem('span', '', value));
      compactFlow.append(entry);
    });
    workflow.append(fighead, diagramImage, compactFlow);
    const gallery = elem('div', 'hs-cases');
    const casesHeading = elem('h3', 'hs-subtitle', t('Recorded cases', '案例回放'));
    cases.forEach(item => {
      const card = elem('article', 'hs-case');
      const preview = button('', 'hs-preview', () => openCase(item, preview));
      const img = elem('img');
      img.src = folder + item.id + (zh() ? '-zh' : '-en') + '.webp';
      img.alt = localized(item.alt);
      img.width = 520; img.height = 300; img.loading = 'lazy';
      preview.setAttribute('aria-label', t('Open record: ', '打开记录：') + localized(item.title));
      preview.append(img);
      const copy = elem('div', 'hs-case-copy');
      const more = button(t('Inspect record', '查看执行记录'), 'hs-link', () => openCase(item, more));
      copy.append(elem('span', 'hs-case-tag', localized(item.tag)), elem('h4', '', localized(item.title)), elem('p', '', localized(item.summary)), more);
      card.append(preview, copy); gallery.append(card);
    });
    const footer = elem('div', 'hs-footer');
    footer.append(elem('p', '', t('Replays load saved responses. A new question uses the server’s model API and MCP tools.', '回放读取已保存的响应。提交新问题时，服务端才会调用语言模型 API 和 MCP 工具。')));
    const controls = elem('div', 'hs-actions');
    const live = link(t('Open live agent', '打开在线智能体'), '#tool', 'hs-primary');
    live.addEventListener('click', () => { document.querySelector('[data-tool-tab="agent"]')?.click(); });
    controls.append(live, link(t('MCP guide', 'MCP 使用文档'), zh() ? 'docs/zh/harness/mcp.html' : 'docs/harness/mcp.html', 'hs-link'));
    footer.append(controls);
    root.replaceChildren(intro, workflow, casesHeading, gallery, footer);
  }
  let language = '';
  function update() {
    if (document.documentElement.lang === language && root.firstChild) return;
    language = document.documentElement.lang;
    init();
  }
  update();
  document.addEventListener('oms:language', update);
  window.addEventListener('oms:language', update);
})();
