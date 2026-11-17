/* Self-hosted molecular examples shared by both manual languages. */
(function () {
  var demos = document.querySelectorAll('[data-oms-viewer]');
  if (!demos.length) return;
  var library;
  function loadLibrary(base) {
    if (window.$3Dmol) return Promise.resolve();
    if (!library) library = new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = new URL('3Dmol-min.js', base).href;
      script.onload = resolve;
      script.onerror = function () { reject(new Error('Could not load molecular viewer')); };
      document.head.appendChild(script);
    });
    return library;
  }
  demos.forEach(function (demo) {
    var start = async function () {
      var result = demo.querySelector('.oms-conformer-result');
      var zh = demo.dataset.omsLanguage === 'zh';
      try {
        var base = new URL(demo.dataset.omsAssets, document.baseURI);
        await loadLibrary(base);
        var response = await fetch(new URL('gap-conformers.json', base));
        if (!response.ok) throw new Error('Could not load molecular examples');
        var examples = (await response.json()).examples;
        var select = demo.querySelector('.oms-conformer-select');
        examples.forEach(function (row, index) {
          var option = document.createElement('option');
          option.value = index; option.textContent = row.sample_id; select.appendChild(option);
        });
        var canvas = demo.querySelector('.oms-conformer-canvas');
        var viewer = $3Dmol.createViewer(canvas, {backgroundColor:'white'});
        function show() {
          var row = examples[Number(select.value)];
          viewer.removeAllModels(); viewer.addModel(row.molblock, 'mol');
          viewer.setStyle({}, {stick:{radius:.16}, sphere:{scale:.25}});
          viewer.zoomTo(); viewer.render();
          result.textContent = (zh ? '预测能隙：' : 'Predicted gap: ') + row.predicted_gap_ev.toFixed(3) +
            ' eV · ' + (zh ? '参考能隙：' : 'Reference gap: ') + row.reference_gap_ev.toFixed(3) +
            ' eV · ' + (zh ? '参考 HOMO：' : 'Reference HOMO: ') + row.reference_homo_ev.toFixed(3) +
            ' eV · ' + (zh ? '参考 LUMO：' : 'Reference LUMO: ') + row.reference_lumo_ev.toFixed(3) +
            ' eV. ' + (zh ? '构象生成：' : 'Conformer: ') + row.coordinate_method + '.';
          demo.dataset.ready = 'true'; demo.dataset.sampleId = row.sample_id;
          demo.dataset.atomCount = viewer.getModel().selectedAtoms({}).length;
        }
        select.addEventListener('change', show); show();
        window.addEventListener('resize', function () { viewer.resize(); });
      } catch (error) {
        result.textContent = (zh ? '3D 视图加载失败：' : '3D display unavailable: ') + error.message;
      }
    };
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) {
          observer.disconnect(); start();
        }
      }, {rootMargin:'250px'});
      observer.observe(demo);
    } else start();
  });
})();
