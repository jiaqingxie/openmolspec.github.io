/* The comparison data includes source identifiers, raw measurement positions and model values. */
(() => {
  'use strict';
  const host = document.getElementById('explore-lab');
  if (!host) return;
  const t = (en, zh) => document.documentElement.lang.toLowerCase().startsWith('zh') ? zh : en;
  const text = (tag, cls, content) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (content !== undefined) node.textContent = content;
    return node;
  };
  const nuclei = {'1H':'¹H', '13C':'¹³C', '11B':'¹¹B', '19F':'¹⁹F', '29Si':'²⁹Si', '31P':'³¹P'};
  const label = s => nuclei[s] || s;
  const fmt = (v,n=2) => v == null ? '—' : Number(v).toFixed(n);
  const file = path => fetch(path).then(r => {
    if (!r.ok) throw Error(r.status);
    return r.json();
  });
  let pairs = [], preview = [], config = {}, pairId, mode = 'IR', query = 'C#CC1CC1';
  let output, pending = false, state = null;
  const button = (s,fn) => {
    const b = text('button','explore-button',s);
    b.type='button'; b.onclick=fn; return b;
  };
  function save(record, filename) {
    const url = URL.createObjectURL(new Blob([JSON.stringify(record,null,2)+'\n'],{type:'application/json'}));
    const link = text('a'); link.href=url; link.download=filename; link.click();
    setTimeout(() => URL.revokeObjectURL(url),1000);
  }
  function chart(observed, predicted, {unit='ppm', grid, curves, yObserved, yPredicted} = {}) {
    const figure = text('figure','explore-figure');
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 690 161');
    svg.setAttribute('role','img');
    svg.setAttribute('aria-label',t('Peak positions by spectral coordinate','按谱轴显示峰位置'));
    const add = (tag, attrs, content) => {
      const node = document.createElementNS(svg.namespaceURI,tag);
      Object.entries(attrs).forEach(([k,v])=>node.setAttribute(k,v));
      if (content !== undefined) node.textContent=content;
      svg.append(node);
    };
    const extents = [...observed,...predicted];
    if (grid?.length) extents.push(grid[0],grid.at(-1));
    let lo = Infinity, hi = -Infinity;
    extents.forEach(v=>{lo=Math.min(lo,v);hi=Math.max(hi,v);});
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) return figure;
    const pad = Math.max((hi-lo)*0.03,unit==='ppm'?.12:1);
    lo-=pad; hi+=pad;
    const rev = unit!=='m/z', x = p => 30+630*(rev?(hi-p):(p-lo))/(hi-lo);
    for(let i=0;i<=5;i++){
      const p=lo+(hi-lo)*i/5;
      add('line',{x1:x(p),x2:x(p),y1:12,y2:132,stroke:'var(--xl-grid)'});
      add('text',{x:x(p),y:149,'text-anchor':'middle',class:'explore-axis'},Math.abs(p)>=100 ? p.toFixed(0) : p.toFixed(1));
    }
    add('line',{x1:30,x2:660,y1:73,y2:73,stroke:'var(--xl-rule)'});
    function sticks(values, intensities, direction, color) {
      const top = intensities?.reduce((a,b)=>Math.max(a,b),0) || 1;
      values.forEach((v,i)=>add('line',{x1:x(v),x2:x(v),y1:73,y2:73+direction*49*(intensities?intensities[i]/top:0.83),stroke:color,'stroke-width':1.8}));
    }
    sticks(observed,yObserved,-1,'var(--xl-obs)'); sticks(predicted,yPredicted,1,'var(--xl-model)');
    if (curves?.length && grid?.length===curves.length){
      const top=curves.reduce((a,b)=>Math.max(a,b),0)||1;
      add('path',{d:grid.map((p,i)=>(i?'L':'M')+x(p).toFixed(2)+' '+(73+51*curves[i]/top).toFixed(2)).join(' '),stroke:'var(--xl-model)','stroke-width':1.9,fill:'none'});
    }
    add('text',{x:684,y:158,'text-anchor':'end',class:'explore-axis'},unit);
    figure.append(svg); return figure;
  }
  function metric(title, value) {
    const div=text('div','explore-metric');
    div.append(text('strong','',value),text('span','',title));return div;
  }
  function comparison(container, item) {
    const nmr=item.kind==='nmr';
    const pick = text('select'); pick.setAttribute('aria-label',t('Select a comparison','选择对照样本'));
    for(const kind of ['nmr','ir']){
      const group=text('optgroup');group.label=kind==='ir'?t('Calculated IR · QM9S','计算红外 · QM9S'):t('Predicted NMR · experimental atom labels','预测核磁 · 实验原子标注');
      pairs.filter(p=>p.kind===kind).forEach(p=>group.append(new Option(label(p.modality)+' · '+p.formula+' · '+(p.solvent||p.model_id),p.id)));
      pick.append(group);
    }
    pick.value=item.id;pick.onchange=()=>{pairId=pick.value;comparison(container,pairs.find(p=>p.id===pairId));};
    const header=text('div','explore-card-heading');
    header.append(text('h3','',t('Compare spectra','谱图对照')),pick);
    const legend = text('div','explore-legend');
    legend.append(text('span','observed',t('Measured peaks','实验峰位')),text('span','model',nmr?t('Predicted sites','模型预测位点'):t('Calculated IR','量化计算 IR')));
    const grid = nmr?null:item.calculated.map((_,i)=>item.grid[0]+i*item.grid[2]);
    const source=text('p','explore-meta',item.source+' · '+item.source_id+'  /  '+item.model+(item.model_id?' '+item.model_id:''));
    container.replaceChildren(header,text('code','explore-smiles',item.smiles),legend,
      chart(item.observed,item.predicted||[],{unit:nmr?'ppm':'cm⁻¹',grid,curves:item.calculated}),source);
    if(nmr){
      const metrics=text('div','explore-metrics');
      metrics.append(metric(t('Atom-labelled R²','原子标注 R²'),fmt(item.reference.r2,3)),
        metric(t('Site MAE · ppm','位点 MAE · ppm'),fmt(item.reference.mae)),
        metric(t('Scored / predicted sites','计分 / 预测位点'),item.reference.sites+' / '+item.reference.predicted_sites),
        metric(t('Matched / observed peaks','匹配 / 实验峰数'),item.matched.length+' / '+item.observed.length));
      const method=text('details','explore-method');method.append(text('summary','',t('Matching method and paired values','峰匹配方法与逐对数据')),
        text('p','',t('R² = 1 − Σ(observed − predicted)² / Σ(observed − mean observed)². It uses independently labelled sites with one observed shift per symmetry group. Scoring requires at least three sites and nonzero variance. All eligible errors enter the score.',
        'R² = 1 − Σ(实测 − 预测)² / Σ(实测 − 实测均值)²。以实验原子标注独立配对，每个对称位点须有唯一实测位移。至少三个位点且方差非零时计分，纳入全部符合条件位点的误差。')),
        text('p','',t('Hungarian matching separately pairs observed peaks to predicted sites by absolute ppm difference. The cutoff is ','匈牙利算法另按绝对位移差匹配实测峰与预测位点，容差为 ')+item.tolerance+t(' ppm. Unmatched peaks and sites remain visible in the coverage counts.',' ppm。覆盖率保留未匹配的实测峰与预测位点。')),
        text('p','',t('Matched / predicted sites','匹配 / 预测位点')+' · '+item.matched.length+' / '+item.predicted.length));
      const table=text('table','explore-table');
      const tr=text('tr');[t('Labelled atoms (0-based)','标注原子（从 0 起）'),t('Measured / ppm','实测 / ppm'),t('Predict. / ppm','预测 / ppm')].forEach(v=>tr.append(text('th','',v)));table.append(tr);
      item.reference.pairs.forEach(p=>{const tr=text('tr');[p.atoms.join(', '),fmt(p.observed),fmt(p.predicted)].forEach(v=>tr.append(text('td','',v)));table.append(tr);});
      method.append(table);container.append(metrics,method);
    } else {
      container.append(text('p','explore-note',t('The patent reports band positions. The QM9S curve uses its native Hessian and dipole derivatives, a 0.965 frequency scale and 10 cm⁻¹ Lorentzian half-width. Only the calculated intensity is normalized. Experimental intensities are unavailable.',
        '专利给出实验峰位。QM9S 曲线由该分子的 Hessian 与偶极矩导数计算得到，频率乘 0.965，洛伦兹半宽为 10 cm⁻¹。计算强度经过归一化，实验记录未提供强度。')));
    }
    const actions=text('div','explore-actions');actions.append(button(t('Download pair','下载对照数据'),()=>save(item,item.id+'.json')));
    const link=text('a','explore-text-link',nmr?'nmrshiftdb2 ↗':'QM9S ↗');
    link.href=item.source_url||item.model_url;link.target='_blank';link.rel='noopener noreferrer';actions.append(link);
    container.append(actions);
  }

  function renderOutput() {
    if (!output) return;
    output.replaceChildren();
    if (!state) return;
    if(state.message){output.append(text('p','explore-note',t(...state.message)));return;}
    if(state.error){output.append(text('p','explore-note',t('Lookup failed. ','查询失败。')+state.error));return;}
    const r=state.response;
    if(r.origin==='missing'){
      output.append(text('p','explore-note',r.modality==='MS' ? t('No experimental MS match. Supply an adduct, collision energy and instrument for an MS/MS prediction.','未匹配到实验质谱。预测串联质谱需要指定加合物、碰撞能和仪器。'):t('No experimental match. The predictor for this modality is unavailable.','未匹配到实验记录，此模态的预测服务暂不可用。')));
      if(r.modality==='MS' && document.getElementById('tool-tab-structure')){
        output.append(button(t('Set MS/MS conditions','设置串联质谱采集条件'),()=>{
          document.getElementById('tool-tab-structure').click();
          const task=document.getElementById('tool-task'), input=document.getElementById('tool-smiles');
          if(!task||!input)return;
          task.value='ms.forward.glacier';task.dispatchEvent(new Event('change'));
          input.value=r.canonical_smiles;
          location.hash='tool';
          document.getElementById('ms-adduct')?.focus();
        }));
      }
      return;
    }
    if(r.origin==='experimental'){
      const idx=state.recordIndex||0, rec=r.records[idx], pairs=Array.isArray(rec.peaks[0]), pos=pairs?rec.peaks.map(p=>p[0]):rec.peaks;
      output.append(text('strong','explore-result-title',state.static ? t('Saved experimental example · live library unavailable','已保存的实验样本 · 在线库暂不可用') : t('Experimental library match','命中实验谱库')));
      output.append(text('code','explore-smiles',label(r.modality)+' · '+(r.canonical_smiles||r.smiles)));
      if(r.records.length>1){
        const sel=text('select');sel.setAttribute('aria-label',t('Measurement','实验记录'));
        r.records.forEach((s,i)=>sel.append(new Option((i+1)+' / '+r.match_count+' · '+(s.source_id||s.source),String(i))));
        sel.value=String(idx);sel.onchange=()=>{state.recordIndex=Number(sel.value);renderOutput();};output.append(sel);
      }
      output.append(text('p','explore-meta',[rec.source,rec.source_id,rec.split,rec.solvent,rec.frequency].filter(Boolean).join(' · ')),
        chart(pos,[],{unit:rec.units==='cm-1'?'cm⁻¹':rec.units,yObserved:pairs?rec.peaks.map(p=>p[1]):rec.intensities}));
      if(rec.conditions?.length){
        const fields=rec.conditions.map(c=>[c.solvent,c.frequency].filter(Boolean).join(' · ')).filter(Boolean);
        const caption=rec.conditions.length>1
          ? t('Combined source peak list from ','源记录合并的峰表，共 ')+rec.conditions.length+t(' acquisitions. ',' 次采集。')
          : '';
        if(caption||fields.length)output.append(text('p','explore-meta',caption+fields.join(' / ')));
      }
      if(r.records.length<r.match_count)output.append(text('p','explore-meta',t('Showing the first ','显示前 ')+r.records.length+' / '+r.match_count));
    }else{
      const result=state.job?.result?.result||state.job?.result;
      output.append(text('strong','explore-result-title',t('Forward-model prediction','正向模型预测')));
      output.append(text('code','explore-smiles',label(r.modality)+' · '+r.canonical_smiles));
      if(!result){output.append(text('p','explore-note',t('Queued model run','预测任务已提交')+' · '+r.run.id));return;}
      const rec=result.records?.[0];
      const ppm=rec?.prediction_ppm||rec?.environments?.map(e=>e.prediction_ppm)||rec?.peaks?.map(p=>p.shift_ppm);
      if(ppm)output.append(chart([],ppm));
      if(['IR','Raman'].includes(r.modality)&&result.wavenumber&&result[r.modality.toLowerCase()])
        output.append(chart([],[],{unit:'cm⁻¹',grid:result.wavenumber,curves:result[r.modality.toLowerCase()]}));
      output.append(text('p','explore-meta',[result.model,r.task,r.run.id].filter(Boolean).join(' · ')));
    }
    output.append(button(t('Download result','下载结果'),()=>save(state.job?{lookup:r,run:state.job}:r,'openmolspec-'+r.modality+'.json')));
  }
  async function lookup(){
    if(pending || !query.trim())return;
    const smiles=query.trim(),modality=mode;
    const base=['127.0.0.1','localhost'].includes(location.hostname)?'http://127.0.0.1:8721':config.api_base;
    async function request(path, payload){
      if(!base)throw new TypeError('No API configured');
      const res=await fetch(base+path,{method:payload?'POST':'GET',headers:payload?{'Content-Type':'application/json'}:undefined,
        body:payload?JSON.stringify(payload):undefined,signal:AbortSignal.timeout(20000)});
      if(!res.ok){
        if(res.status===404||res.status>=500)throw new TypeError('API unavailable');
        const data=await res.json().catch(()=>({}));throw Error(data.error||String(res.status));
      }
      return res.json();
    }
    pending=true;state={message:['Searching the experimental library…','正在查询实验谱库…']};renderLookup();
    let response;
    try{
      response=await request('/api/spectra/resolve',{smiles,modality});
      state={response};renderOutput();
      if(response.origin==='prediction'){
        let job;
        for(let i=0;i<300;i++){
          await new Promise(resolve=>setTimeout(resolve,1500));
          job=await request('/api/runs/'+response.run.id);
          if(job.status==='failed')throw Error(job.error||t('Prediction failed','预测失败'));
          if(job.status==='completed'){state={response,job};break;}
        }
      }
    }catch(e){
      if(response?.origin==='prediction'){
        const target=location.href.split('#')[0]+'#run-'+response.run.id;
        state={error:t('Model run ','模型任务 ')+response.run.id+' · '+(e.message||target)};
      }else if(e instanceof TypeError||['AbortError','TimeoutError'].includes(e.name)){
        const hits=[];
        preview.filter(p=>p.smiles===smiles).forEach(p=>p.spectra.filter(s=>s.modality===modality).forEach(s=>hits.push({...s,source:p.source,source_id:s.source_id||p.source_id,split:p.split})));
        if(!hits.length){pairs.filter(p=>p.smiles===smiles&&p.modality===modality).forEach(p=>hits.push({source:p.source,source_id:p.source_id,split:p.split,modality,peaks:p.observed,units:modality==='IR'?'cm⁻¹':'ppm'}));}
        state=hits.length?{static:true,response:{origin:'experimental',modality,records:hits,match_count:hits.length,smiles}}:
          {message:['The live library and model service could not be reached. This SMILES has no exact-text match in the downloaded examples.','暂时无法连接在线实验库及模型服务。已下载样本中没有相同文本的 SMILES。']};
      }else state={error:e.message};
    }finally{pending=false;renderLookup();}
  }
  let lookupContainer;
  function renderLookup(){
    if(!lookupContainer)return;
    const form=text('form','explore-query');
    const smLabel=text('label','',t('Molecular SMILES','分子 SMILES'));
    const sm=text('input');sm.type='text';sm.name='smiles';sm.maxLength=256;sm.required=true;sm.spellcheck=false;sm.autocomplete='off';sm.value=query;sm.oninput=()=>{query=sm.value;};sm.disabled=pending;smLabel.append(sm);
    const modLabel=text('label','',t('Modality','谱种')),select=text('select');select.name='modality';select.disabled=pending;
    ['1H','13C','11B','19F','29Si','31P','IR','Raman','MS'].forEach(s=>select.append(new Option(label(s),s)));
    select.value=mode;select.onchange=()=>{mode=select.value;};modLabel.append(select);
    const submit=text('button','explore-submit',pending?t('Working…','处理中…'):t('Find spectrum','查找谱图'));submit.disabled=pending;submit.type='submit';
    form.append(smLabel,modLabel,submit);form.onsubmit=event=>{event.preventDefault();lookup();};
    output=text('div','explore-output');output.setAttribute('aria-live','polite');
    const details=text('details','explore-method');details.append(text('summary','',t('API and coverage','API 与查询范围')),
      text('code','explore-api','POST /api/spectra/resolve\n'+JSON.stringify({smiles:'C#CC1CC1',modality:'IR'})),
      text('p','',t('Exact stereochemical structure and modality across cleaned OpenDataLab training, validation and test splits. A miss queues an available forward model. MS/MS requires acquisition settings in Predict.',
        '按立体结构与谱种查询清洗后的 OpenDataLab 训练、验证及测试集。未命中时提交对应的正向模型。串联质谱还需在 Predict 中指定采集条件。')));
    lookupContainer.replaceChildren(text('h3','',t('Find a spectrum by structure','按结构查谱')),text('p','explore-lede',t('Retrieve experimental records first. If the library has no match, predict the selected spectrum.','优先返回实验记录，库中未命中时预测所选谱种。')),form,output,details);
    renderOutput();
  }
  function draw(){
    const comp=text('section','explore-card');
    if(pairs.length){comparison(comp,pairs.find(p=>p.id===pairId)||pairs[0]);}
    else comp.append(text('p','explore-note',t('The recorded comparison data could not be loaded.','暂时无法加载对照数据。')));
    lookupContainer=text('section','explore-card explore-lookup');
    host.replaceChildren(comp,lookupContainer);renderLookup();
  }
  Promise.allSettled([file('assets/explore-comparisons.json'),file('assets/dataset-preview.json'),file('assets/service-config.json')]).then(([a,b,c])=>{
    pairs=a.value?.comparisons||[];preview=b.value?.samples||[];config=c.value||{};draw();
  });
  document.addEventListener('oms:language',draw);
})();
