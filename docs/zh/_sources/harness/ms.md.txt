# MS Spectra Harness

提供分子结构、加合物、碰撞能和仪器类型，使用 GLACIER 或 ICEBERG 预测 MS/MS 峰。

[Download the complete request / 下载完整请求](../assets/harness/ms-request.json)

```python
import json
from pathlib import Path
from openmolspec.harness import SpectraHarness

request = json.loads(Path('ms-request.json').read_text())
harness = SpectraHarness()
harness.validate(request['task'], request['inputs'], request['model_config'])
report = harness.run(request['task'], request['inputs'],
                     request['model_config'], repeats=request['repeats'])
result = report['result']
```

## 输出

```json
{
  "model": "glacier",
  "smiles": "C/C1=C\\[C@@H](C)C/C=C/[C@H]2[C@@H]3O[C@]3(C)[C@@H](C)[C@H]3[C@H](Cc4c[nH]c5ccccc45)NC(=O)[C@]32C(=O)/C=C/C(=O)[C@@H]1O",
  "adduct": "[M+Na]+",
  "collision_energy": 35.0,
  "instrument": "Orbitrap",
  "predicted_peaks_top8": [
    [
      130.065125676,
      0.9146105051040649
    ],
    [
      119.08552680204919,
      0.3389138877391815
    ],
    [
      93.06987673804919,
      0.24028274416923523
    ],
    [
      81.06987672302459,
      0.16171321272850037
    ],
    [
      101.03617095209839,
      0.1532604694366455
    ],
    [
      121.101176836,
      0.14588962495326996
    ],
    [
      181.07361902,
      0.1430220901966095
    ],
    [
      154.0627199729754,
      0.1327299028635025
    ]
  ]
}
```

[Task guide / 任务指南](../tasks/ms-forward-glacier.md) · [Python API](../api-reference/module-harness.md)

## 参考文献

- DeepSeek-AI. DeepSeek Harness: modular agent tools and execution infrastructure. Software repository. Accessed 18 November 2026. [Source](https://github.com/deepseek-ai/deepseek-harness)
- Xu, F., Guo, W., Wang, F., Yao, L., Wang, H., Tang, F., Gao, Z., Zhang, L., E, W., Tian, Z.-Q., et al. Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts. Nature Computational Science 5, 292–300 (2025). doi:10.1038/s43588-025-00783-z. [Source](https://doi.org/10.1038/s43588-025-00783-z)
- Wang, R.-X., Wang, R. & Coley, C. W. GLACIER: Rethinking Mass Spectrum Prediction as an Object Detection Problem. NeurIPS 2026. arXiv:2606.29161 (2026). [Source](https://arxiv.org/abs/2606.29161)
- Wang, R., Manjrekar, M., Mahjour, B., Avila-Pacheco, J., et al. Neural Spectral Prediction for Structure Elucidation with Tandem Mass Spectrometry. bioRxiv (2025). doi:10.1101/2025.05.28.656653. [Source](https://doi.org/10.1101/2025.05.28.656653)
- OpenMolSpec contributors. openSpec models and benchmark training workflows. Source archive, v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)
