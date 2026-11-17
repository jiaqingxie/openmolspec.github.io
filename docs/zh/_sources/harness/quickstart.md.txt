# 快速开始

这个例子预测乙醇的碳谱。安装包后，将 `root` 指向 NMRNet 模型目录，并填写 NMR 环境的 Python 路径。

```python
from openmolspec.harness import SpectraHarness

harness = SpectraHarness()
inputs = {'smiles': 'CCO'}
settings = {'root': '/path/to/models',
            'python': '/path/to/nmr-env/bin/python'}

harness.validate('nmr.forward.13C', inputs, settings)
report = harness.run('nmr.forward.13C', inputs, settings, repeats=2)
print(report['result']['records'])
print(report['repeat_predictions_equal'])
```

返回的原子编号对应输入结构中的碳原子，`prediction_ppm` 是对应的化学位移。

```json
[
  {
    "smiles": "CCO",
    "nucleus": "13C",
    "atom_indices": [
      0,
      1
    ],
    "prediction_ppm": [
      17.774131774902344,
      57.77375793457031
    ]
  }
]
```

设置 `repeats=2` 会重复运行同一请求。此例的 `repeat_predictions_equal` 为 `True`。接着可以查看 [Python 指南](python.md)或 [MCP 工具](mcp.md)。

## 参考文献

- DeepSeek-AI. DeepSeek Harness: modular agent tools and execution infrastructure. Software repository. Accessed 18 November 2026. [Source](https://github.com/deepseek-ai/deepseek-harness)
- Xu, F., Guo, W., Wang, F., Yao, L., Wang, H., Tang, F., Gao, Z., Zhang, L., E, W., Tian, Z.-Q., et al. Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts. Nature Computational Science 5, 292–300 (2025). doi:10.1038/s43588-025-00783-z. [Source](https://doi.org/10.1038/s43588-025-00783-z)
- Wang, R.-X., Wang, R. & Coley, C. W. GLACIER: Rethinking Mass Spectrum Prediction as an Object Detection Problem. NeurIPS 2026. arXiv:2606.29161 (2026). [Source](https://arxiv.org/abs/2606.29161)
- Wang, R., Manjrekar, M., Mahjour, B., Avila-Pacheco, J., et al. Neural Spectral Prediction for Structure Elucidation with Tandem Mass Spectrometry. bioRxiv (2025). doi:10.1101/2025.05.28.656653. [Source](https://doi.org/10.1101/2025.05.28.656653)
- OpenMolSpec contributors. openSpec models and benchmark training workflows. Source archive, v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)
