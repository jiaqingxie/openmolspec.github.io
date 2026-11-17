# Production benchmark results

These tables reproduce the saved production benchmark overview. The training-size labels identify the 200k and one-million-molecule configurations. [Download the numerical report](../assets/benchmarks/production-results.json) with its source checksum.

## Structure to H/C chemical shifts

| Training size | ¹H MAE (ppm) | ¹H RMSE (ppm) | ¹³C MAE (ppm) | ¹³C RMSE (ppm) |
| --- | --- | --- | --- | --- |
| 200k | 0.0164568 | 0.0399399 | 0.210872 | 0.850474 |
| 1000k | 0.0147613 | 0.0303319 | 0.1931 | 0.617287 |

Scored target atoms: ¹H 294,607; ¹³C 227,786.

## Hessian to vibrational frequencies

| Model / reference | Frequency MAE (cm⁻¹) |
| --- | --- |
| 200k_5A | 1.55265 |
| 1000k_5A | 1.55412 |
| cutoff_reference_5A | 0.652487 |

## Structure to response tensors

| Training size | Target | Unit | Test MAE | Test RMSE | Test records |
| --- | --- | --- | --- | --- | --- |
| 200k | dedipole | Debye/Angstrom | 0.00720282 | 0.0241124 | 20,390 |
| 200k | depolar | Bohr^3/Angstrom | 0.0978366 | 0.39498 | 20,390 |
| 1000k | dedipole | Debye/Angstrom | 0.00701367 | 0.014994 | 20,390 |
| 1000k | depolar | Bohr^3/Angstrom | 0.0902822 | 0.303331 | 20,390 |

## Spectra to molecular properties

| Property | Unit | 200k MAE | 1M MAE |
| --- | --- | --- | --- |
| Dipole magnitude | D | 0.975986 | 0.809483 |
| Isotropic polarizability | Å³ | 0.427225 | 0.348567 |
| HOMO–LUMO gap | eV | 0.156599 | 0.126382 |

## Spectra to molecular structures

| Training size / channels | Top-1 | Top-3 | Top-5 | Top-10 |
| --- | --- | --- | --- | --- |
| 200k_full | 65.35% | 76.98% | 79.29% | 80.13% |
| 1000k_ir | 53.89% | 67.77% | 71.43% | 73.11% |
| 1000k_ir_raman | 72.72% | 83.74% | 85.66% | 86.60% |
| 1000k_full | 81.20% | 90.24% | 91.90% | 92.64% |

`full` uses IR, Raman and H/C NMR. `ir` and `ir_raman` identify the corresponding input-channel experiments. [Training configurations and source](training.md).

## References

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- OpenMolSpec contributors. openSpec models and benchmark training workflows. Source archive, v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
