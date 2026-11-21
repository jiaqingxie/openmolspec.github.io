/* OpenMolSpec tool workspace and dataset preview.
 * Expandable tool steps adapt the interaction in Luffy202's workspace.tsx,
 * codex/next-fastapi-migration, commit 11577df2236241ee28f7c8940faf6ebab5f78476.
 */
(async function(){
 'use strict';
 const $=(s,parent=document)=>parent.querySelector(s);
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 const configuration=await fetch('assets/service-config.json').then(r=>r.json()).catch(()=>({}));
 const local=['127.0.0.1','localhost'].includes(location.hostname);
 const api=local?'http://127.0.0.1:8721':configuration.api_base;
 let connected=false,agentAvailable=true,active='structure',busy=false,lastRun=null, availableTools=null;
 const solutionNuclei={
  '31P':{label:'³¹P',symbol:'P',element:'phosphorus',smiles:'CCOP(=O)(OCC)OCC',example:'triethyl phosphate'},
  '11B':{label:'¹¹B',symbol:'B',element:'boron',smiles:'OB(O)c1ccccc1',example:'phenylboronic acid'},
  '29Si':{label:'²⁹Si',symbol:'Si',element:'silicon',smiles:'C[Si](C)(C)C',example:'tetramethylsilane'},
  '19F':{label:'¹⁹F',symbol:'F',element:'fluorine',smiles:'Fc1ccccc1',example:'fluorobenzene'}
 };
 const workspace=$('#tool-workspace');
 async function request(path,body){
  if(!api)throw Error('The model service is not configured.');
  const response=await fetch(api+path,{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(20000)});
  const result=await response.json();if(!response.ok)throw Error(result.error||'The service could not complete this request');return result;
 }
 async function status(){try{const s=await request('/api/status');connected=s.connected;availableTools=new Set(s.tools);agentAvailable=s.agent_available!==false;$('#service-status').textContent=connected?'Model service connected':'Connecting model service…';$('#service-status').dataset.ready=String(connected);}catch{$('#service-status').textContent='Model service is reconnecting';$('#service-status').dataset.ready='false';availableTools=null;}}
 status();setInterval(status,30000);
 const preview=await fetch('assets/dataset-preview.json').then(r=>r.json());
 const dataFilter=$('#dataset-filter'),search=$('#dataset-search'),recordList=$('#dataset-records'),detail=$('#dataset-detail');
 dataFilter.replaceChildren(new Option('All spectroscopy datasets','all'));
 preview.datasets.forEach(d=>dataFilter.add(new Option(d.name,d.id)));
 let selected=preview.samples[0];
 function download(value,name){const link=el('a');link.href=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);}
 function plot(positions,values,label,unit,reverse=false){
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 640 230');svg.setAttribute('class','spectrum-plot');svg.setAttribute('role','img');svg.setAttribute('aria-label',label);
  const draw=(type,attrs,text)=>{const n=document.createElementNS(ns,type);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,String(v)));if(text!==undefined)n.textContent=text;svg.append(n);return n;};
  const finite=positions.map(Number).filter(Number.isFinite);if(!finite.length)return svg;
  let lo=Math.min(...finite),hi=Math.max(...finite);const margin=Math.max((hi-lo)*.06,1);lo-=margin;hi+=margin;
  if(unit==='ppm'){lo=Math.min(lo,0);hi=Math.max(hi,label.includes('13C')?210:10);}
  const x=v=>48+(reverse?(hi-v):(v-lo))/(hi-lo)*575;
  const max=values?Math.max(...values.map(Number).filter(Number.isFinite),.000001):1;
  draw('line',{x1:48,y1:183,x2:623,y2:183,stroke:'#91a6a1','stroke-width':1});
  const pairs=positions.map((p,i)=>[Number(p),values?Number(values[i])/max:.68]).filter(p=>p.every(Number.isFinite));
  if(pairs.length>300&&values&&unit!=='m/z'){
   draw('path',{d:pairs.map(([p,v],i)=>(i?'L':'M')+x(p).toFixed(2)+','+(180-v*140).toFixed(2)).join(' '),fill:'none',stroke:'#168c7c','stroke-width':1.5});
  }else pairs.forEach(([p,v])=>draw('line',{x1:x(p),x2:x(p),y1:180,y2:180-v*140,stroke:'#168c7c','stroke-width':values?2:1.5}));
  for(let i=0;i<=5;i++){const v=lo+(hi-lo)*i/5;draw('line',{x1:x(v),x2:x(v),y1:183,y2:189,stroke:'#91a6a1'});draw('text',{x:x(v),y:205,'text-anchor':'middle',fill:'#516861','font-size':11,'font-family':'Arial'},Math.abs(v)>100?v.toFixed(0):v.toFixed(1));}
  draw('text',{x:50,y:20,fill:'#193c34','font-size':12,'font-family':'Arial'},label+(values?' · normalized intensity':' · peak positions'));
  draw('text',{x:623,y:224,'text-anchor':'end',fill:'#516861','font-size':11,'font-family':'Arial'},unit);
  return svg;
 }
 function showSample(sample){
  selected=sample;detail.replaceChildren();
  detail.append(el('p','eyebrow',sample.modality+' · experimental'),el('h3','',sample.formula));
  const image=el('img','sample-molecule');image.src=sample.structure_svg;image.alt='Molecular structure for '+sample.formula;detail.append(image);
  const smiles=el('code','sample-smiles',sample.smiles);detail.append(smiles);
  sample.spectra.forEach(s=>{
   const paired=Array.isArray(s.peaks[0]),positions=paired?s.peaks.map(p=>p[0]):s.peaks;
   const intensities=paired?s.peaks.map(p=>p[1]):s.intensities;
   detail.append(plot(positions,intensities,s.modality,s.units,s.units==='ppm'));
   const text=[s.solvent?'Solvent: '+s.solvent:null,s.frequency?'Frequency: '+s.frequency:null,s.source_id?'Source: '+s.source_id:null].filter(Boolean).join(' · ');
   if(text)detail.append(el('p','sample-meta',text));
  });
  const actions=el('div','sample-actions');const save=el('button','button-secondary','Download record');save.type='button';save.onclick=()=>download(sample,sample.id+'.json');
  const use=el('button','button-primary','Use this structure');use.type='button';use.onclick=()=>{switchTab('structure');$('#tool-smiles').value=sample.smiles;location.hash='tool';};actions.append(use,save);detail.append(actions);
  const fields=el('details','sample-fields');fields.append(el('summary','','Inspect record fields'));fields.append(el('pre','',JSON.stringify(sample,null,2)));detail.append(fields);
  recordList.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.id===sample.id)));
 }
 function filterSamples(){
  const query=search.value.trim().toLowerCase(),dataset=dataFilter.value;
  const samples=preview.samples.filter(s=>(dataset==='all'||s.dataset===dataset)&&[s.smiles,s.formula,s.modality,s.source_id||''].join(' ').toLowerCase().includes(query));
  recordList.replaceChildren();
  samples.forEach(sample=>{const button=el('button','dataset-record');button.type='button';button.dataset.id=sample.id;button.setAttribute('aria-pressed',String(selected?.id===sample.id));const molecule=el('img');molecule.src=sample.structure_svg;molecule.alt='';molecule.loading='lazy';const text=el('span');text.append(el('strong','',sample.formula),el('small','',sample.modality+' · '+sample.spectra.reduce((n,s)=>n+s.peaks.length,0)+' peaks'));button.append(molecule,text);button.onclick=()=>showSample(sample);recordList.append(button);});
  const view=preview.datasets.find(d=>d.id===dataset);
  $('#preview-count').textContent=samples.length+' real preview records'+(view?' · '+view.spectra.toLocaleString()+' spectra / '+view.molecules.toLocaleString()+' molecules':' across '+preview.datasets.length+' experimental views');
  if(samples.length&&!samples.some(s=>s.id===selected?.id))showSample(samples[0]);
  if(!samples.length)recordList.append(el('p','empty-state','No records match this filter.'));
 }
 dataFilter.addEventListener('change',filterSamples);search.addEventListener('input',filterSamples);showSample(selected);filterSamples();

 function field(label,id,value,type='text'){const holder=el('label','tool-field',label);const input=el(type==='textarea'?'textarea':'input');input.id=id;if(type!=='textarea')input.type=type;input.value=value;holder.append(input);return holder;}
 function button(text,cls='button-primary'){const b=el('button',cls,text);b.type='button';return b;}
 function selectField(label,id,choices){
  const holder=el('label','tool-field',label), select=el('select');
  select.id=id;
  choices.forEach(([value,text])=>select.add(new Option(text,value)));
  holder.append(select);
  return holder;
 }
 function error(text,parent=workspace){let box=$('.tool-error',parent);if(!box){box=el('p','tool-error');box.setAttribute('role','alert');parent.prepend(box);}box.textContent=text;}
 function resultsBox(){const box=el('section','tool-results');box.id='tool-results';box.setAttribute('aria-live','polite');box.append(el('p','empty-state','Your model output will appear here.'));return box;}
 // Render the small Markdown subset used by model answers using DOM text nodes.
 // Provider output never becomes executable HTML.
 function answerView(text){
  const host=el('div','agent-answer');
  const inline=(target,value)=>{value.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).forEach(part=>{if(part.startsWith('**')&&part.endsWith('**'))target.append(el('strong','',part.slice(2,-2)));else if(part.startsWith('`')&&part.endsWith('`'))target.append(el('code','',part.slice(1,-1)));else target.append(document.createTextNode(part));});};
  const lines=String(text).split('\n');let list=null;
  for(let i=0;i<lines.length;i++){
   const line=lines[i].trim();if(!line){list=null;continue;}
   if(line.startsWith('|')&&lines[i+1]?.trim().match(/^\|?[\s:|-]+\|$/)){
    const wrap=el('div','answer-table'),table=el('table','prediction-table');
    const row=(value,tag)=>{const tr=el('tr');value.replace(/^\||\|$/g,'').split('|').forEach(v=>{const td=el(tag);inline(td,v.trim());tr.append(td);});table.append(tr);};
    row(line,'th');i++;while(lines[i+1]?.trim().startsWith('|'))row(lines[++i].trim(),'td');wrap.append(table);host.append(wrap);list=null;
   }else if(/^#{1,6}\s/.test(line)){const h=el('h4');inline(h,line.replace(/^#+\s/,''));host.append(h);list=null;
   }else if(/^[-*]\s/.test(line)){if(!list){list=el('ul');host.append(list);}const item=el('li');inline(item,line.slice(2));list.append(item);
   }else{const p=el('p');inline(p,line);host.append(p);list=null;}
  }return host;
 }
 function renderEvents(events,target){
  target.replaceChildren();
  const calls=new Map();
  events.forEach(event=>{const v=event.data;if(event.type==='tool_start')calls.set(v.id,{...v,status:'running'});if(event.type==='tool_end')calls.set(v.id,{...(calls.get(v.id)||{}),...v,status:'completed'});});
  calls.forEach(call=>{const d=el('details','tool-step');d.dataset.state=call.status;d.dataset.tool=call.name;const summary=el('summary');summary.append(el('span','tool-dot'),el('strong','',call.name),el('small','',call.status==='running'?'Running…':Number(call.elapsed_seconds||0).toFixed(2)+' s'));d.append(summary);const content=el('div','tool-data');content.append(el('strong','','Input'),el('pre','',JSON.stringify(call.args||{},null,2)));if(call.result!==undefined)content.append(el('strong','','Tool output'),el('pre','',JSON.stringify(call.result,null,2)));d.append(content);target.append(d);});
  if(!calls.size){const discovery=events.find(e=>e.type==='discovery');target.append(el('p','run-status',discovery?'Connected tools: '+discovery.data.tools.join(', '):'Connecting the model and spectroscopy tools…'));}
 }
 function renderResult(result,target){
  target.replaceChildren();const value=result?.result||result;
  if(result?.answer){target.append(answerView(result.answer));return;}
  if(solutionNuclei[value?.records?.[0]?.nucleus]&&value.records[0].environments){
   const record=value.records[0],environments=record.environments,nucleus=solutionNuclei[record.nucleus];
   target.append(el('h3','',nucleus.label+' solution chemical shifts'),
    el('p','result-label',({phosphorus_gnn:'Graph neural network',solution_gnn:'Graph neural network',solution_ensemble:'Model ensemble'}[value.model]||'LightGBM')+' · '+(record.solvent||'Unspecified solvent')),
    resultTable([nucleus.symbol+' atom indices','Predicted shift / ppm'],environments.map(e=>[e.atom_indices.join(', '),e.prediction_ppm.toFixed(3)])),
    plot(environments.map(e=>e.prediction_ppm),null,nucleus.label,'ppm',true),
    el('p','tool-note','Atom indices start at zero in the input SMILES. Each row groups equivalent atoms of the selected nucleus.'));
   return;
  }
  if(['peak_spectrum','NMRNet++'].includes(value?.model)&&value.records?.[0]?.peaks){
   const r=value.records[0],label=r.nucleus==='1H'?'¹H':'¹³C';
   target.append(el('h3','',label+' chemical shifts'),resultTable([r.nucleus==='1H'?'Attached heavy-atom indices':'Carbon atom indices','Predicted peak / ppm'],r.peaks.map(p=>[p.atom_indices.join(', '),p.shift_ppm.toFixed(3)])),plot(r.prediction_ppm,null,r.nucleus,'ppm',true),el('p','tool-note',value.model==='NMRNet++'?'NMRNet++ · five folds. Each row groups symmetry-equivalent carbons. Indices start at zero in the input SMILES.':'Indices start at zero in the input SMILES. Sites predicted to give an unresolved peak share one row.'));
   return;
  }
  if(value?.hsqc_measured){renderHsqc(value,target);return;}
  if(typeof value?.predicted_target_ppm==='number'){
   target.append(el('h3','','Cross-solvent reference estimate'),el('p','gap-number',value.predicted_target_ppm.toFixed(3)+' ppm'),
    el('p','result-label',value.source_solvent+' → '+value.target_solvent+' · '+value.nucleus),
    el('p','tool-note','Shift change '+value.predicted_delta_ppm.toFixed(3)+' ppm. Nearest paired experimental reference with a different molecular connectivity.'),
    el('p','tool-note','Reference: '+value.reference.identity+' · similarity '+value.tanimoto_similarity.toFixed(3)));
   return;
  }
  const candidates=value?.candidates||value?.records?.[0]?.candidates;
  if(Array.isArray(candidates)){
   target.append(el('h3','','Molecular candidates'));
   const rows=candidates.map((v,i)=>[i+1,v.smiles||'(empty)',typeof v.score==='number'?v.score.toFixed(5):'—']);
   target.append(resultTable(['Rank','SMILES','Model score'],rows),el('p','tool-note',result.task==='nmr.retrieval.hc.s2m'
    ?'Ranking uses only the submitted candidates. If none is a convincing match, add more candidates or check the input spectra.'
    :'Scores rank candidates within this request. Verify candidates against the experimental spectra.'));
   return;
  }
  if(value?.assignment){
   const a=value.assignment;target.append(el('h3','','Candidate peak-to-atom assignments'));
   const wrap=el('div','answer-table'),table=el('table','prediction-table'),head=el('tr');
   ['Observed / ppm','Atom indices','Predicted / ppm','Difference / ppm'].forEach(v=>head.append(el('th','',v)));table.append(head);
   a.assignments.forEach(v=>{const row=el('tr');[v.observed_ppm,v.atom_indices.join(', '),v.predicted_ppm.toFixed(4),v.absolute_error_ppm.toFixed(4)].forEach(v=>row.append(el('td','',String(v))));table.append(row);});
   wrap.append(table);target.append(wrap,el('p','tool-note','Predicted mapping. '+a.unmatched_peak_indices.length+' unmatched peaks; atom indices are zero based. Experimental atom labels were not supplied.'));
  }
  if(value?.records){
   value.records.forEach(record=>{target.append(el('h3','',record.nucleus+' chemical shifts'));const table=el('table','prediction-table');const header=el('tr');['Atom index','Predicted shift / ppm'].forEach(t=>header.append(el('th','',t)));table.append(header);record.prediction_ppm.forEach((v,i)=>{const row=el('tr');row.append(el('td','',String(record.atom_indices[i])),el('td','',Number(v).toFixed(4)));table.append(row);});target.append(table,plot(record.prediction_ppm,null,record.nucleus,'ppm',true));});
  }else if(typeof value?.gap_ev==='number'){target.append(el('p','result-label','Predicted HOMO–LUMO gap'),el('p','gap-number',value.gap_ev.toFixed(4)+' eV'));
  }else if(value?.predicted_peaks){target.append(el('h3','',(value.model||'Model').toUpperCase()+' · predicted MS/MS'),plot(value.predicted_peaks.map(p=>p[0]),value.predicted_peaks.map(p=>p[1]),'MS/MS','m/z'),el('p','tool-note',value.instrument+' · '+value.adduct+' · collision energy '+value.collision_energy));
  }else if(value?.ir&&value?.raman){target.append(plot(value.wavenumber,value.ir,'IR','cm⁻¹'),plot(value.wavenumber,value.raman,'Raman','cm⁻¹'));
  }else{target.append(el('pre','numerical-result',JSON.stringify(value,null,2)));}
 }
 function resultTable(columns,rows){
  const wrap=el('div','answer-table'),table=el('table','prediction-table'),header=el('tr');
  columns.forEach(column=>header.append(el('th','',column)));
  table.append(header);
  rows.forEach(values=>{const row=el('tr');values.forEach(v=>row.append(el('td','',String(v))));table.append(row);});
  wrap.append(table);
  return wrap;
 }
 function renderHsqc(value,target){
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 620 285');svg.setAttribute('class','hsqc-plot');
  svg.setAttribute('role','img');svg.setAttribute('aria-label','HSQC cross-peaks, observed and predicted');
  function draw(tag,attributes,text){
   const node=document.createElementNS(svg.namespaceURI,tag);
   Object.entries(attributes).forEach(([k,v])=>node.setAttribute(k,v));
   if(text!==undefined)node.textContent=text;
   svg.append(node);
  }
  const points=[...value.hsqc_measured,...value.hsqc_predicted.map(p=>p.ppm)];
  const carbon=points.map(p=>p[0]), hydrogen=points.map(p=>p[1]);
  const cMax=Math.ceil(Math.max(...carbon)+2),cMin=Math.floor(Math.min(...carbon)-2);
  const hMax=Math.ceil((Math.max(...hydrogen)+.1)*10)/10,hMin=Math.floor((Math.min(...hydrogen)-.1)*10)/10;
  const x=h=>65+500*(hMax-h)/(hMax-hMin),y=c=>26+205*(c-cMin)/(cMax-cMin);
  const color='#517464';
  for(let i=0;i<=4;i++){
   const h=hMax-(hMax-hMin)*i/4,c=cMax-(cMax-cMin)*i/4;
   draw('line',{x1:x(h),x2:x(h),y1:26,y2:231,stroke:'#deebe3'});
   draw('line',{x1:65,x2:565,y1:y(c),y2:y(c),stroke:'#deebe3'});
   draw('text',{x:x(h),y:248,'text-anchor':'middle',fill:color,'font-size':11},h.toFixed(2));
   draw('text',{x:55,y:y(c)+4,'text-anchor':'end',fill:color,'font-size':11},c.toFixed(1));
  }
  draw('text',{x:315,y:272,'text-anchor':'middle',fill:color,'font-size':12},'¹H chemical shift / ppm');
  draw('text',{x:17,y:125,transform:'rotate(-90 17 125)','text-anchor':'middle',fill:color,'font-size':12},'¹³C chemical shift / ppm');
  value.hsqc_measured.forEach(([c,h])=>draw('circle',{cx:x(h),cy:y(c),r:4,fill:'#168c7c'}));
  value.hsqc_predicted.forEach(({ppm:[c,h]})=>draw('circle',{cx:x(h),cy:y(c),r:6,fill:'none',stroke:'#bc5b27','stroke-width':2}));
  if(!value.hsqc_measured.length){
   const peaks=value.hsqc_predicted.map(p=>[p.carbon_atom_index,...p.ppm.map(x=>x.toFixed(3))]);
   target.append(el('h3','','Predicted HSQC cross-peaks'),svg,
    resultTable(['C atom index (zero based)','¹³C (ppm)','¹H (ppm)'],peaks),el('code','sample-smiles',value.mapped_smiles));
   return;
  }
  const rows=value.hsqc_assignments.map(row=>[row.peak_index+1,row.carbon_atom_index,...row.measured_ppm.map(x=>x.toFixed(3)),...row.predicted_ppm.map(x=>x.toFixed(3))]);
  target.append(el('h3','','TransPeakNet HSQC peak assignment'),svg,el('p','tool-note','Filled dots: measured. Outlined dots: predicted.'),
   resultTable(['Peak','C atom index','Observed C','Observed H','Predicted C','Predicted H'],rows),
   el('p','tool-note',value.unmatched_peak_indices.length+' unmatched peaks. Carbon indices are zero based; SMILES map labels are index + 1.'),
   el('p','tool-note',value.matcher),
   el('code','sample-smiles',value.mapped_smiles));
 }
 async function run(payload,output,trace){
  if(busy)return;busy=true;output.dataset.complete='false';workspace.querySelectorAll('button[data-run]').forEach(b=>b.disabled=true);
  const started=performance.now();
  const stage=el('p','run-status','Submitting your request…');output.replaceChildren(stage);
  try{
   if(payload.kind==='agent'&&!agentAvailable)throw Error('The agent is offline. The spectroscopy tools are available.');
   if(payload.task&&availableTools&&!availableTools.has(payload.task))throw Error('This workflow is temporarily unavailable on the model service.');
   const submitted=await request('/api/runs',payload);let job;
   for(let tick=0;tick<900;tick++){
    job=await request('/api/runs/'+submitted.id);lastRun={...job,request:payload};if(trace)renderEvents(job.events,trace);
    const latest=job.events.filter(e=>['tool_start','tool_end','status'].includes(e.type)).at(-1);
    const elapsed=Math.round((performance.now()-started)/1000)+' s elapsed';
    const toolStages={spectra_tasks:'Reading available tools',spectra_validate:'Validating inputs',spectra_predict:'Running the spectroscopy model','vibrational.forward':'Predicting vibrational spectra','nmr.solvent_transfer':'Finding an experimental reference','nmr.hsqc.transpeaknet':'Predicting and assigning HSQC cross-peaks','nmr.forward.31P':'Predicting phosphorus chemical shifts'};
    const label=job.status==='queued'?'Waiting for the model worker':latest?.type==='tool_start'?(toolStages[latest.data.name]||'Running a spectroscopy tool'):latest?.data.label||'Processing your request';
    stage.textContent=label+' · '+elapsed;
    if(job.status==='completed'){renderResult(job.result,output);const save=button('Download result and trace','button-secondary');save.onclick=()=>download(lastRun,'openmolspec-'+job.id+'.json');output.append(save);output.dataset.complete='true';break;}
    if(job.status==='failed')throw Error(job.error||'Model execution failed');
    await new Promise(resolve=>setTimeout(resolve,1200));
   }
   if(job?.status!=='completed')throw Error('The run is still processing. Keep its run ID to continue later.');
  }catch(e){error(e.message||'The model service could not be reached.',output);}
  finally{busy=false;workspace.querySelectorAll('button[data-run]').forEach(b=>b.disabled=false);}
 }
 function runButton(form,label,payload,output,trace){
  const go=button(label);
  go.dataset.run='true';
  go.onclick=()=>{try{run(payload(),output,trace);}catch(e){error(e.message,form);}};
  form.append(go);
 }
 function nmrStructureForm(form,output,trace){
  form.append(el('h3','','Search or generate a structure from NMR'));
  form.append(selectField('Workflow','nmr-mode',[['retrieve','Rank candidate structures'],['generate','Generate from a known formula']]));
  const h=field('¹H chemical shifts / ppm','nmr-h','','textarea');
  const c=field('¹³C chemical shifts / ppm','nmr-c','','textarea');
  const formula=field('Molecular formula','nmr-formula','');
  const pool=field('Candidate SMILES, one per line (2–32)','nmr-candidates','','textarea');
  const read=id=>$('#'+id,form).value.trim();
  const mode=$('#nmr-mode',form);
  const load=button('Load a measured example','button-secondary');
  let example=null;
  load.onclick=async()=>{
   try{
    const samples=await fetch('assets/nmr-workspace-examples.json').then(r=>r.json());
    example=samples[mode.value].query;
    for(const nucleus of ['h','c'])$('#nmr-'+nucleus,form).value=example[nucleus+'_nmr'][0].chemical_shift;
    $('#nmr-formula',form).value=example.formula||'';
    $('#nmr-candidates',form).value=(samples[mode.value].candidates||[]).join('\n');
   }catch(e){error(e.message,form);}
  };
  form.append(load,h,c,formula,pool);
  mode.onchange=()=>{formula.hidden=mode.value!=='generate';pool.hidden=mode.value==='generate';};
  mode.onchange();
  runButton(form,'Run NMR model',()=>{
   const input={query:{}};
   for(const nucleus of ['h','c']){
    const text=read('nmr-'+nucleus), key=nucleus+'_nmr';
    if(!text)throw Error('Enter measured shifts for both nuclei.');
    const original=example?.[key]?.[0];
    input.query[key]=[original?.chemical_shift===text?original:{type:nucleus==='h'?'1H NMR':'13C NMR',chemical_shift:text}];
   }
   if(mode.value==='generate'){
    input.query.formula=read('nmr-formula');
    if(!input.query.formula)throw Error('Structure generation requires a molecular formula.');
   }else{
    input.candidates=read('nmr-candidates').split('\n').map(v=>v.trim()).filter(Boolean);
    if(input.candidates.length<2||input.candidates.length>32)throw Error('Enter 2–32 candidate SMILES.');
   }
   return {kind:'tool',task:mode.value==='generate'?'nmr.generation.hc':'nmr.retrieval.hc.s2m',inputs:input};
  },output,trace);
 }
 function parseHsqc(text){
  if(!text.trim())throw Error('Enter measured carbon–proton shift pairs.');
  if(text.trim().startsWith('['))return JSON.parse(text);
  const rows=text.trim().split(/\r?\n/).filter(line=>line.trim());
  const header=rows[0].split(',').map(value=>value.replace(/[\s"]/g,''));
  const c=header.indexOf('C'), h1=header.indexOf('H1'), h2=header.indexOf('H2');
  if(c>=0&&h1>=0){
   return rows.slice(1).flatMap(line=>{
    const values=line.split(',').map(value=>value.trim().replace(/^"|"$/g,''));
    const first=values[h1] ? Number(values[h1]) : NaN;
    const carbon=values[c] ? Number(values[c]) : NaN;
    const peak=[[carbon,first]];
    if(h2>=0&&values[h2]&&Number(values[h2])!==first)peak.push([carbon,Number(values[h2])]);
    return peak;
   });
  }
  return rows.map(line=>line.trim().split(/[,\s]+/).filter(Boolean).map(Number));
 }
 function hsqcForm(form,output,trace){
  form.append(el('h3','','Predict HSQC cross-peaks'),field('Known molecular SMILES','hsqc-smiles',''),
   selectField('Solvent class','hsqc-solvent',['CDCl3','DMSO-d6','acetone-d6','acid','C6D6','CD3OD','pyridine-d5','D2O','unknown'].map(x=>[x,x])),
   field('Measured peaks for assignment (optional), ¹³C ppm then ¹H ppm','hsqc-peaks','','textarea'));
  $('#hsqc-peaks',form).placeholder='Enter one C,H pair per line, or load an annotation CSV';
  const file=el('input');file.type='file';file.accept='.csv,.json,.txt';file.setAttribute('aria-label','Import HSQC peak list');
  file.onchange=async()=>{if(file.files[0])$('#hsqc-peaks',form).value=await file.files[0].text();};
  const source=el('a','','Author test data ↗');source.href='#dataset-hsqc';
  const example=el('button','','Load butanenitrile example');example.type='button';example.id='hsqc-example';
  example.onclick=()=>{
   $('#hsqc-smiles',form).value='CCCC#N';$('#hsqc-solvent',form).value='CDCl3';
   $('#hsqc-peaks',form).value='13.3, 1.081\n19.04, 1.699\n19.26, 2.339';file.value='';
  };
  const note=el('p','tool-note','Butanenitrile in CDCl3, spectrum 32869. ');note.append(source);
  const guide=el('a','','HSQC task guide');guide.href='docs/tasks/nmr-hsqc-transpeaknet.html';
  const zhGuide=el('a','','中文指南');zhGuide.href='docs/zh/tasks/nmr-hsqc-transpeaknet.html';zhGuide.lang='zh';
  const simple=el('a','','simpleNMR worked assignment');simple.href='https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/README.md#simplenmr-归属样例';
  note.append(' · ',guide,' · ',zhGuide,' · ',simple);
  form.append(file,example,note);
  runButton(form,'Run TransPeakNet',()=>{
   const smiles=$('#hsqc-smiles',form).value.trim();
   if(!smiles)throw Error('Enter the known molecular SMILES.');
   const inputs={smiles,solvent:$('#hsqc-solvent',form).value};
   if($('#hsqc-peaks',form).value.trim()){
    inputs.hsqc_peaks=parseHsqc($('#hsqc-peaks',form).value);
    if(!Array.isArray(inputs.hsqc_peaks)||!inputs.hsqc_peaks.length||inputs.hsqc_peaks.some(p=>!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite)))throw Error('Enter measured ¹³C and ¹H ppm pairs.');
   }
   return {kind:'tool',task:'nmr.hsqc.transpeaknet',inputs};
  },output,trace);
 }
 function solventForm(form,output,trace){
  form.append(el('h3','','Estimate shifts across solvents'),field('SMILES','transfer-smiles','C1CCCCC1'),
   selectField('Nucleus','transfer-nucleus',[['1H','¹H'],['13C','¹³C']]),
   field('Source solvent','source-solvent','CD3OD'),field('Target solvent','target-solvent','acetone-d6'),
   field('Observed shift in the source solvent / ppm','source-ppm','1.45','number'),
   el('p','tool-note','This reference baseline uses an independently measured shift change for the selected solvent pair.'));
  runButton(form,'Estimate target shift',()=>{
   const read=id=>$('#'+id,form).value.trim();
   if(!read('source-ppm'))throw Error('Enter an observed shift.');
   return {kind:'tool',task:'nmr.solvent_transfer',inputs:{smiles:read('transfer-smiles'),nucleus:read('transfer-nucleus'),
    source_solvent:read('source-solvent'),target_solvent:read('target-solvent'),source_ppm:Number(read('source-ppm'))}};
  },output,trace);
 }
 function switchTab(name){
  if(busy)return;active=name;document.querySelectorAll('[data-tool-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.toolTab===name)));workspace.replaceChildren();
  const form=el('div','tool-panel');const output=resultsBox();const trace=el('div','tool-progress');trace.id='live-tool-progress';
  if(name==='structure'){
   if(workspace.dataset.exampleShifts?.startsWith('[')){
    const shifts=JSON.parse(workspace.dataset.exampleShifts);
    output.replaceChildren(el('p','preview-spectrum-label','Recorded example · NMRNet++ (five folds)'),
    el('h3','','Ethanol ¹³C shifts'),plot(shifts,null,'¹³C','ppm',true),
    el('p','preview-spectrum-values',shifts.map(shift=>shift.toFixed(2)).join('  /  ')+' ppm'));
   }
   form.append(el('h3','','Start with a molecular structure'),field('SMILES','tool-smiles','CCO'));
   const select=el('select');select.id='tool-task';[['nmr.forward.13C','Predict ¹³C NMR'],['nmr.forward.1H','Predict ¹H NMR'],...Object.entries(solutionNuclei).map(([key,v])=>['nmr.forward.'+key,'Predict '+v.label+' solution NMR']),['nmr.assignment','Assign measured ¹³C peaks'],['ms.forward.glacier','Predict MS/MS · GLACIER'],['ms.forward.iceberg','Predict MS/MS · ICEBERG'],['vibrational.forward','Predict IR and Raman from a conformer']].forEach(([v,t])=>select.add(new Option(t,v)));const label=el('label','tool-field','Task');label.append(select);form.append(label);
   const observed=field('Observed ¹³C peaks / ppm','tool-peaks','18.2, 58.3');observed.hidden=true;form.append(observed);
   const phosphorus=el('div','phosphorus-inputs');phosphorus.hidden=true;
   const solvent=field('NMR solvent (optional)','phosphorus-solvent','');
   const example=button('Use example','button-secondary');
   const guide=el('a'),note=el('p','tool-note');
   const selectedNucleus=()=>solutionNuclei[select.value.split('.').pop()];
   example.onclick=()=>{$('#tool-smiles').value=selectedNucleus().smiles;$('#phosphorus-solvent').value='CDCl3';};
   phosphorus.append(solvent,example,note,guide);form.append(phosphorus);
   const acquisition=el('div','ms-acquisition');acquisition.hidden=true;acquisition.append(field('Adduct','ms-adduct','[M+H]+'),field('Collision energy (checkpoint convention)','ms-energy','40','number'),field('Instrument category','ms-instrument','QTOF'),el('p','tool-note','Specify the acquisition conditions for your spectrum. The defaults are an example, and are not inferred from SMILES.'));form.append(acquisition);
   select.onchange=()=>{if(output.querySelector('.preview-spectrum-label'))output.replaceChildren(el('p','empty-state','Your model output will appear here.'));const nucleus=selectedNucleus();phosphorus.hidden=!nucleus;
    if(nucleus){
     guide.textContent=nucleus.label+' model and accuracy';guide.href='docs/tasks/nmr-forward-'+select.value.split('.').pop()+'.html';
     example.textContent='Use '+nucleus.example+' example';note.textContent='Enter a SMILES containing '+nucleus.element+'. Equivalent sites share a predicted shift.';
    }
    const smiles=$('#tool-smiles');if(nucleus&&(smiles.value==='CCO'||Object.values(solutionNuclei).some(n=>n.smiles===smiles.value)))smiles.value=nucleus.smiles;observed.hidden=select.value!=='nmr.assignment';acquisition.hidden=!select.value.startsWith('ms.forward.');};
   const go=button('Run model');go.dataset.run='true';go.onclick=()=>{const inputs={smiles:$('#tool-smiles').value.trim()};if(selectedNucleus()&&$('#phosphorus-solvent').value.trim())inputs.solvent=$('#phosphorus-solvent').value.trim();if(select.value==='nmr.assignment'){inputs.nucleus='13C';inputs.peaks_ppm=$('#tool-peaks').value.split(/[,\s]+/).filter(Boolean).map(Number);}if(select.value.startsWith('ms.forward.')){inputs.adduct=$('#ms-adduct').value.trim();inputs.collision_energy=Number($('#ms-energy').value);inputs.instrument=$('#ms-instrument').value.trim();}run({kind:'tool',task:select.value,inputs},output,trace);};form.append(go,el('p','tool-note','Chemical shifts are returned in ppm with atom indices. MS/MS returns m/z and relative intensity. IR/Raman use the generated molecular conformer.'));
  }else if(name==='nmr'){
   nmrStructureForm(form,output,trace);
  }else if(name==='hsqc'){
   hsqcForm(form,output,trace);
  }else if(name==='solvent'){
   solventForm(form,output,trace);
  }else if(name==='gap'||name==='generate'){
   form.append(el('h3','',name==='gap'?'Predict a molecular energy gap':'Generate or rank molecular structures'),el('p','','Use IR, Raman and H/C NMR together. Load the recorded four-channel example or import your own JSON.'));
   const input=el('textarea','spectral-json');input.id='tool-spectral-input';input.rows=8;input.setAttribute('aria-label','Four-channel spectral input JSON');
   const inspect=el('details','spectral-editor');inspect.append(el('summary','','Inspect or edit numerical inputs'),input);
   const load=button('Load a real spectral example','button-secondary');load.onclick=async()=>{try{const s=await fetch('assets/tool-sample.json').then(r=>r.json());input.value=JSON.stringify(s.inputs||s,null,2);$('#channel-status').textContent='IR: 1,024 points · Raman: 1,024 points · H/C shifts loaded';}catch(e){error(e.message,form);}};
   const file=el('input');file.type='file';file.accept='.json,application/json';file.setAttribute('aria-label','Import spectral JSON');file.onchange=async()=>{try{const v=JSON.parse(await file.files[0].text());input.value=JSON.stringify(v.inputs||v,null,2);$('#channel-status').textContent='Your spectral file is loaded';}catch{error('Choose a JSON file with ir, raman, nmr_h and nmr_c arrays.',form);}};
   form.append(load,file,el('p','tool-note','The example is a recorded computed IR/Raman/H/C benchmark input. It is separate from the experimental dataset previews below.'),el('p','channel-status','Load an example or import a JSON file.'));form.lastChild.id='channel-status';form.append(inspect);
   const mode=el('select');mode.id='generation-mode';mode.add(new Option('Generate molecular candidates','generate'));mode.add(new Option('Rank a candidate list','retrieve'));
   const candidates=field('Candidate SMILES, one per line','candidate-smiles','CCO\nCCCO\nCC(=O)O','textarea');candidates.hidden=true;
   if(name==='generate'){form.append(mode,candidates);mode.onchange=()=>candidates.hidden=mode.value!=='retrieve';}
   const go=button(name==='gap'?'Predict gap':'Run structure model');go.dataset.run='true';go.onclick=()=>{try{const inputs=JSON.parse(input.value);if(name==='generate'&&mode.value==='retrieve')inputs.candidates=$('#candidate-smiles').value.split('\n').map(v=>v.trim()).filter(Boolean);run({kind:'tool',task:name==='gap'?'vibrational.gap.ir_raman_hc':mode.value==='retrieve'?'vibrational.retrieval.hc':'vibrational.generation.hc',inputs},output,trace);}catch{error('Load the example or enter valid spectral JSON.',form);}};form.append(go);
  }else{
   form.classList.add('agent-composer');form.append(el('h3','','Ask the spectroscopy agent'),el('p','','Watch the agent discover tools, validate your inputs, call a model and explain its output.'));
   form.append(field('Your question','agent-prompt','请先查看可用工具，验证乙醇 CCO 的输入，再预测它的 13C NMR 化学位移。用中文给出原子编号和 ppm 数值。','textarea'));
   const examples=el('div','prompt-examples');['Predict the ¹³C NMR shifts of ethanol (CCO).','Validate CCO and assign measured carbon peaks at 18.2 and 58.3 ppm.'].forEach(text=>{const b=button(text,'prompt-example');b.onclick=()=>$('#agent-prompt').value=text;examples.append(b);});form.append(examples);
   const go=button('Run Agent Harness');go.id='run-agent';go.dataset.run='true';go.onclick=()=>run({kind:'agent',prompt:$('#agent-prompt').value},output,trace);form.append(go,el('p','tool-note','Model API → MCP tool discovery → input validation → model execution. Expand each tool call to inspect its input and output.'));
  }
  const response=el('div','tool-response');response.append(trace,output);workspace.append(form,response);
 }
 document.querySelectorAll('[data-tool-tab]').forEach(b=>b.onclick=()=>switchTab(b.dataset.toolTab));switchTab('structure');
 function loadLinkedExample(){
  if(busy)return;
  const nucleus=Object.keys(solutionNuclei).find(key=>location.hash==='#tool-'+key.toLowerCase());
  if(nucleus){
   switchTab('structure');const task=$('#tool-task');task.value='nmr.forward.'+nucleus;task.onchange();
   $('.phosphorus-inputs button').click();$('#tool-workspace').scrollIntoView();return;
  }
  if(location.hash==='#tool-1h'||location.hash==='#tool-13c'){
   switchTab('structure');const task=$('#tool-task');task.value=location.hash==='#tool-1h'?'nmr.forward.1H':'nmr.forward.13C';task.onchange();$('#tool-smiles').value='CCO';$('#tool-workspace').scrollIntoView();return;
  }
  if(location.hash!=='#tool-hsqc')return;
  switchTab('hsqc');
  $('#hsqc-example').click();
 }
 window.addEventListener('hashchange',loadLinkedExample);
 document.querySelector('.hero-text-link[href="#tool-hsqc"]').addEventListener('click',()=>{
  if(location.hash==='#tool-hsqc')loadLinkedExample();
 });
 loadLinkedExample();
 document.querySelectorAll('[data-open-workflow]').forEach(control=>control.onclick=()=>{
  if(busy)return;
  switchTab(control.dataset.openWorkflow);
  location.hash='tool';
 });
 document.addEventListener('openmolspec:structure',event=>{
  if(busy)return;
  switchTab('structure');
  $('#tool-smiles').value=event.detail;
  location.hash='tool';
  $('#tool-smiles').focus({preventScroll:true});
 });
 async function replay(){
  const host=$('#agent-demo-player');if(!host)return;
  try{
   const run=await fetch('assets/agent-demo/run.json').then(r=>{if(!r.ok)throw Error('No recorded run');return r.json();});
   const controls=el('div','replay-controls'),stage=el('div','recorded-trace'),text=el('div','recorded-answer');
   host.replaceChildren(el('p','recording-label','Recorded API run · '+new Date(run.created_at*1000).toLocaleString()),controls,stage,text);
   const ends=run.events.filter(e=>e.type==='tool_end');const frames=[run.events.findIndex(e=>e.type==='discovery')+1,run.events.findIndex(e=>e.type==='tool_start'&&e.data.name==='spectra_predict')+1,run.events.length];
   ['01 · Discover','02 · Execute','03 · Explain'].forEach((label,index)=>{const b=button(label,'replay-step');b.dataset.replayStep=String(index);b.onclick=()=>{
    controls.querySelectorAll('button').forEach((v,i)=>v.setAttribute('aria-pressed',String(i===index)));
    renderEvents(run.events.slice(0,frames[index]||run.events.length),stage);text.replaceChildren();
    if(index===2){
     const prediction=run.events.findLast(e=>e.type==='tool_end'&&e.data.name==='spectra_predict');
     if(prediction){const values=el('div','recorded-prediction');renderResult(prediction.data.result,values);text.append(values);}
     const explanation=el('details','recorded-explanation');explanation.append(el('summary','','Read the full agent explanation'),answerView(run.result.answer));text.append(explanation);
    }else text.append(answerView(run.request.prompt));
    stage.querySelectorAll('details').forEach(d=>d.open=index===1&&d.dataset.tool==='spectra_predict');
   };controls.append(b);});controls.firstChild.click();
   const save=button('Download the recorded run','button-secondary');save.onclick=()=>download(run,'openmolspec-agent-recording.json');host.append(save);
  }catch{host.append(el('p','tool-note','The Agent tab shows the intermediate steps of a live model request.'));}
 }
 replay();
})();
