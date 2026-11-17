document.querySelector('.menu-toggle').addEventListener('click',function(){var nav=document.querySelector('#nav');var open=nav.classList.toggle('open');this.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('#nav a').forEach(function(link){link.addEventListener('click',function(){document.querySelector('#nav').classList.remove('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');});});
document.querySelectorAll('.filters').forEach(function(group){group.querySelectorAll('button').forEach(function(button){button.addEventListener('click',function(){group.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',String(b===button));});var selector=group.dataset.filterTarget==='tasks'?'#task-rows tr':'.gallery-card';document.querySelectorAll(selector).forEach(function(item){item.hidden=button.dataset.filter!=='all'&&item.dataset.family!==button.dataset.filter;});});});});
var dialog=document.querySelector('#figure-dialog');document.querySelectorAll('[data-figure]').forEach(function(link){link.addEventListener('click',function(event){if(!dialog.showModal)return;event.preventDefault();var img=dialog.querySelector('img');img.src=link.href;img.alt=link.querySelector('img').alt;dialog.querySelector('.figure-guide').href=link.dataset.guide;dialog.showModal();});});
dialog.querySelector('.close-dialog').addEventListener('click',function(){dialog.close();});dialog.addEventListener('click',function(event){if(event.target===dialog)dialog.close();});

// Load the local 3D viewer only when its section approaches the viewport.
(function(){
  var container=document.querySelector('#conformer-viewer');
  if(!container)return;
  var start=function(){
    var script=document.createElement('script');script.src='assets/viewer/3Dmol-min.js';
    script.onload=async function(){
      try{
        var response=await fetch('assets/viewer/gap-conformers.json');
        if(!response.ok)throw new Error('Coordinate download failed');
        var data=await response.json();var select=document.querySelector('#conformer-select');
        data.examples.forEach(function(row,index){var option=document.createElement('option');option.value=index;option.textContent=row.sample_id;select.appendChild(option);});
        var viewer=$3Dmol.createViewer(container,{backgroundColor:'white'});
        var show=function(){
          var row=data.examples[Number(select.value)];viewer.removeAllModels();
          viewer.addModel(row.molblock,'mol');
          viewer.setStyle({},{stick:{radius:.16},sphere:{scale:.25}});viewer.zoomTo();viewer.render();
          document.querySelector('#conformer-result').textContent='Predicted gap: '+row.predicted_gap_ev.toFixed(3)+' eV · Reference gap: '+row.reference_gap_ev.toFixed(3)+' eV · Reference HOMO: '+row.reference_homo_ev.toFixed(3)+' eV · Reference LUMO: '+row.reference_lumo_ev.toFixed(3)+' eV. 3D conformer: '+row.coordinate_method+'.';
          container.dataset.ready='true';container.dataset.sampleId=row.sample_id;
        };
        select.addEventListener('change',show);show();
        window.addEventListener('resize',function(){viewer.resize();});
      }catch(error){document.querySelector('#conformer-result').textContent='3D display unavailable: '+error.message;}
    };
    script.onerror=function(){document.querySelector('#conformer-result').textContent='The molecular viewer could not be loaded.';};
    document.head.appendChild(script);
  };
  if('IntersectionObserver' in window){var observer=new IntersectionObserver(function(entries){if(entries.some(function(e){return e.isIntersecting;})){observer.disconnect();start();}},{rootMargin:'300px'});observer.observe(container);}else{start();}
})();
