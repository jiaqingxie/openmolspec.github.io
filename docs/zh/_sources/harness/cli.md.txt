# Command line

将请求保存为 JSON，可以在脚本和批量流程中重复使用。先下载示例，修改 `model_config` 中的环境路径，再验证并执行。

[NMR request](../assets/harness/nmr-request.json) · [MS request](../assets/harness/ms-request.json) · [Vibrational request](../assets/harness/vibrational-request.json)

```bash
spectra-harness catalog
spectra-harness validate --request nmr-request.json
spectra-harness run --request nmr-request.json --output nmr-result.json
```

JSON 请求包含 `task`、`inputs`、`model_config` 和 `repeats`。输出文件与 Python API 返回的报告结构相同。

```json
{
  "task": "nmr.forward.13C",
  "inputs": {
    "smiles": "CCO"
  },
  "model_config": {
    "root": "/path/to/models",
    "python": "/path/to/nmr-env/bin/python"
  },
  "repeats": 2
}
```


## 参考文献

- DeepSeek-AI. DeepSeek Harness: modular agent tools and execution infrastructure. Software repository. Accessed 18 November 2026. [Source](https://github.com/deepseek-ai/deepseek-harness)
- Xu, F., Guo, W., Wang, F., Yao, L., Wang, H., Tang, F., Gao, Z., Zhang, L., E, W., Tian, Z.-Q., et al. Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts. Nature Computational Science 5, 292–300 (2025). doi:10.1038/s43588-025-00783-z. [Source](https://doi.org/10.1038/s43588-025-00783-z)
- Wang, R.-X., Wang, R. & Coley, C. W. GLACIER: Rethinking Mass Spectrum Prediction as an Object Detection Problem. NeurIPS 2026. arXiv:2606.29161 (2026). [Source](https://arxiv.org/abs/2606.29161)
- Wang, R., Manjrekar, M., Mahjour, B., Avila-Pacheco, J., et al. Neural Spectral Prediction for Structure Elucidation with Tandem Mass Spectrometry. bioRxiv (2025). doi:10.1101/2025.05.28.656653. [Source](https://doi.org/10.1101/2025.05.28.656653)
- OpenMolSpec contributors. openSpec models and benchmark training workflows. Source archive, v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)
