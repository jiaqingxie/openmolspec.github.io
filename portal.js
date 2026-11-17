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
 const api=configuration.api_base||(local?'http://127.0.0.1:8721':null);
 let connected=false,active='structure',busy=false,lastRun=null;
 const workspace=$('#tool-workspace');
 async function request(path,body){
  if(!api)throw Error('The model service is not configured.');
  const response=await fetch(api+path,{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(20000)});
  const result=await response.json();if(!response.ok)throw Error(result.error||'The service could not complete this request');return result;
 }
 async function status(){try{const s=await request('/api/status');connected=s.connected;$('#service-status').textContent=connected?'Model service connected':'Connecting model service…';$('#service-status').dataset.ready=String(connected);}catch{$('#service-status').textContent='Model service is reconnecting';}}
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
  }else if(value?.predicted_peaks){target.append(el('h3','','GLACIER · predicted MS/MS'),plot(value.predicted_peaks.map(p=>p[0]),value.predicted_peaks.map(p=>p[1]),'MS/MS','m/z'),el('p','tool-note',value.instrument+' · '+value.adduct+' · collision energy '+value.collision_energy));
  }else if(value?.ir&&value?.raman){target.append(plot(value.wavenumber,value.ir,'IR','cm⁻¹'),plot(value.wavenumber,value.raman,'Raman','cm⁻¹'));
  }else if(Array.isArray(value?.candidates)){
   target.append(el('h3','','Molecular candidates'));const table=el('table','prediction-table'),head=el('tr');['Rank','SMILES','Model score'].forEach(v=>head.append(el('th','',v)));table.append(head);
   value.candidates.forEach((v,i)=>{const row=el('tr');row.append(el('td','',String(i+1)),el('td','',v.smiles),el('td','',typeof v.score==='number'?v.score.toFixed(5):'—'));table.append(row);});target.append(table,el('p','tool-note','Scores rank candidates within this request; they are not calibrated probabilities of structural correctness.'));
  }else{target.append(el('pre','numerical-result',JSON.stringify(value,null,2)));}
 }
 async function run(payload,output,trace){
  if(busy)return;busy=true;output.dataset.complete='false';workspace.querySelectorAll('button[data-run]').forEach(b=>b.disabled=true);
  const stage=el('p','run-status','Submitting your request…');output.replaceChildren(stage);
  try{
   const submitted=await request('/api/runs',payload);let job;
   for(let tick=0;tick<900;tick++){
    job=await request('/api/runs/'+submitted.id);lastRun={...job,request:payload};if(trace)renderEvents(job.events,trace);
    const latest=job.events.filter(e=>e.type==='status').at(-1);stage.textContent=job.status==='queued'?'Waiting for the model worker…':latest?.data.label||'The spectroscopy model is running…';
    if(job.status==='completed'){renderResult(job.result,output);const save=button('Download result and trace','button-secondary');save.onclick=()=>download(lastRun,'openmolspec-'+job.id+'.json');output.append(save);output.dataset.complete='true';break;}
    if(job.status==='failed')throw Error(job.error||'Model execution failed');
    await new Promise(resolve=>setTimeout(resolve,1200));
   }
   if(job?.status!=='completed')throw Error('The run is still processing. Keep its run ID to continue later.');
  }catch(e){error(e.message||'The model service could not be reached.',output);}
  finally{busy=false;workspace.querySelectorAll('button[data-run]').forEach(b=>b.disabled=false);}
 }
 function switchTab(name){
  if(busy)return;active=name;document.querySelectorAll('[data-tool-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.toolTab===name)));workspace.replaceChildren();
  const form=el('div','tool-panel');const output=resultsBox();const trace=el('div','tool-progress');trace.id='live-tool-progress';
  if(name==='structure'){
   form.append(el('h3','','Start with a molecular structure'),field('SMILES','tool-smiles','CCO'));
   const select=el('select');select.id='tool-task';[['nmr.forward.13C','Predict ¹³C NMR'],['nmr.forward.1H','Predict ¹H NMR'],['nmr.assignment','Assign measured NMR peaks'],['ms.forward.glacier','Predict MS/MS · GLACIER'],['vibrational.forward','Predict IR and Raman from a conformer']].forEach(([v,t])=>select.add(new Option(t,v)));const label=el('label','tool-field','Task');label.append(select);form.append(label);
   const observed=field('Observed ¹³C peaks / ppm','tool-peaks','18.2, 58.3');observed.hidden=true;form.append(observed);
   const acquisition=el('div','ms-acquisition');acquisition.hidden=true;acquisition.append(field('Adduct','ms-adduct','[M+H]+'),field('Collision energy (checkpoint convention)','ms-energy','40','number'),field('Instrument category','ms-instrument','QTOF'),el('p','tool-note','Specify the acquisition conditions for your spectrum. The defaults are an example, and are not inferred from SMILES.'));form.append(acquisition);
   select.onchange=()=>{observed.hidden=select.value!=='nmr.assignment';acquisition.hidden=select.value!=='ms.forward.glacier';};
   const go=button('Run model');go.dataset.run='true';go.onclick=()=>{const inputs={smiles:$('#tool-smiles').value.trim()};if(select.value==='nmr.assignment'){inputs.nucleus='13C';inputs.peaks_ppm=$('#tool-peaks').value.split(/[,\s]+/).filter(Boolean).map(Number);}if(select.value==='ms.forward.glacier'){inputs.adduct=$('#ms-adduct').value.trim();inputs.collision_energy=Number($('#ms-energy').value);inputs.instrument=$('#ms-instrument').value.trim();}run({kind:'tool',task:select.value,inputs},output,trace);};form.append(go,el('p','tool-note','Chemical shifts are returned in ppm with atom indices. MS/MS returns m/z and relative intensity. IR/Raman use the generated molecular conformer.'));
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
