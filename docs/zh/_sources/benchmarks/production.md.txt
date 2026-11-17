# 生产基准结果

下表读取保存的生产基准汇总。训练规模标签对应 200k 与一百万分子配置。[下载数值报告](../assets/benchmarks/production-results.json)及来源校验和。

## 结构到 H/C 化学位移

| Training size | ¹H MAE (ppm) | ¹H RMSE (ppm) | ¹³C MAE (ppm) | ¹³C RMSE (ppm) |
| --- | --- | --- | --- | --- |
| 200k | 0.0164568 | 0.0399399 | 0.210872 | 0.850474 |
| 1000k | 0.0147613 | 0.0303319 | 0.1931 | 0.617287 |

计分目标原子：¹H 294,607; ¹³C 227,786.

## Hessian 到振动频率

| Model / reference | Frequency MAE (cm⁻¹) |
| --- | --- |
| 200k_5A | 1.55265 |
| 1000k_5A | 1.55412 |
| cutoff_reference_5A | 0.652487 |

## 结构到响应张量

| Training size | Target | Unit | Test MAE | Test RMSE | Test records |
| --- | --- | --- | --- | --- | --- |
| 200k | dedipole | Debye/Angstrom | 0.00720282 | 0.0241124 | 20,390 |
| 200k | depolar | Bohr^3/Angstrom | 0.0978366 | 0.39498 | 20,390 |
| 1000k | dedipole | Debye/Angstrom | 0.00701367 | 0.014994 | 20,390 |
| 1000k | depolar | Bohr^3/Angstrom | 0.0902822 | 0.303331 | 20,390 |

## 光谱到分子性质

| Property | Unit | 200k MAE | 1M MAE |
| --- | --- | --- | --- |
| Dipole magnitude | D | 0.975986 | 0.809483 |
| Isotropic polarizability | Å³ | 0.427225 | 0.348567 |
| HOMO–LUMO gap | eV | 0.156599 | 0.126382 |

## 光谱到分子结构

| Training size / channels | Top-1 | Top-3 | Top-5 | Top-10 |
| --- | --- | --- | --- | --- |
| 200k_full | 65.35% | 76.98% | 79.29% | 80.13% |
| 1000k_ir | 53.89% | 67.77% | 71.43% | 73.11% |
| 1000k_ir_raman | 72.72% | 83.74% | 85.66% | 86.60% |
| 1000k_full | 81.20% | 90.24% | 91.90% | 92.64% |

`full` 使用 IR、Raman 与 H/C NMR；`ir` 和 `ir_raman` 分别标识相应的输入通道实验。[训练配置与源码](training.md)。

## 参考文献

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- OpenMolSpec contributors. openSpec models and benchmark training workflows. Source archive, v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
