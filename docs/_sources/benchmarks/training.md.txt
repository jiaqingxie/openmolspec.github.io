# Training benchmark configurations

Download the [benchmark source archive](../assets/benchmarks/openmolspec-benchmark-source.zip), unpack it and work from the extracted directory. The archive includes the launcher, model adapters, data-preparation modules and all 53 configurations. [SHA-256 manifest](../assets/benchmarks/benchmark-source-manifest.json).

```bash
unzip openmolspec-benchmark-source.zip
cd openmolspec-benchmarks
python -m benchmarks --help
python -m benchmarks run \
  --config benchmarks/configs/structure2property/equiformer_v3.yaml --dry-run
```

Download a YAML file to inspect the exact targets, architecture and training budget. Configurations are grouped by task family. The production training workflow reads them with `python -m benchmarks run --config <file>`.

## spectrum2property

| Configuration | Input | Targets | Data release | Budget |
| --- | --- | --- | --- | --- |
| [dipole_total_ir_ks1000k.yaml](../assets/benchmarks/configs/spectrum2property/dipole_total_ir_ks1000k.yaml) | ir | dipole_total | openmolspec-v1-ks1000k | 312,500 steps |
| [dipole_total_ir_raman_ks1000k.yaml](../assets/benchmarks/configs/spectrum2property/dipole_total_ir_raman_ks1000k.yaml) | ir-raman | dipole_total | openmolspec-v1-ks1000k | 312,500 steps |
| [dipole_total_ks1000k.yaml](../assets/benchmarks/configs/spectrum2property/dipole_total_ks1000k.yaml) | ir-raman-nmr | dipole_total | openmolspec-v1-ks1000k | 312,500 steps |
| [dipole_total_ks200k.yaml](../assets/benchmarks/configs/spectrum2property/dipole_total_ks200k.yaml) | ir-raman-nmr | dipole_total | openmolspec-v1-ks200k | 312,500 steps |
| [gap_ir_ks1000k.yaml](../assets/benchmarks/configs/spectrum2property/gap_ir_ks1000k.yaml) | ir | gap | openmolspec-v1-ks1000k | 312,500 steps |
| [gap_ir_raman_ks1000k.yaml](../assets/benchmarks/configs/spectrum2property/gap_ir_raman_ks1000k.yaml) | ir-raman | gap | openmolspec-v1-ks1000k | 312,500 steps |
| [gap_ks1000k.yaml](../assets/benchmarks/configs/spectrum2property/gap_ks1000k.yaml) | ir-raman-nmr | gap | openmolspec-v1-ks1000k | 312,500 steps |
| [gap_ks200k.yaml](../assets/benchmarks/configs/spectrum2property/gap_ks200k.yaml) | ir-raman-nmr | gap | openmolspec-v1-ks200k | 312,500 steps |
| [polar_iso_ir_ks1000k.yaml](../assets/benchmarks/configs/spectrum2property/polar_iso_ir_ks1000k.yaml) | ir | polar_iso | openmolspec-v1-ks1000k | 312,500 steps |
| [polar_iso_ir_raman_ks1000k.yaml](../assets/benchmarks/configs/spectrum2property/polar_iso_ir_raman_ks1000k.yaml) | ir-raman | polar_iso | openmolspec-v1-ks1000k | 312,500 steps |
| [polar_iso_ks1000k.yaml](../assets/benchmarks/configs/spectrum2property/polar_iso_ks1000k.yaml) | ir-raman-nmr | polar_iso | openmolspec-v1-ks1000k | 312,500 steps |
| [polar_iso_ks200k.yaml](../assets/benchmarks/configs/spectrum2property/polar_iso_ks200k.yaml) | ir-raman-nmr | polar_iso | openmolspec-v1-ks200k | 312,500 steps |

## spectrum2structure

| Configuration | Input | Targets | Data release | Budget |
| --- | --- | --- | --- | --- |
| [vib2mol.yaml](../assets/benchmarks/configs/spectrum2structure/vib2mol.yaml) | ir-raman-nmr | kekule_smiles | release-v1 | 312,500 steps |
| [vib2mol_batch_probe_ddp2.yaml](../assets/benchmarks/configs/spectrum2structure/vib2mol_batch_probe_ddp2.yaml) | ir-raman-nmr | kekule_smiles | release-v1 | 312,500 steps |
| [vib2mol_ir_ks1000k.yaml](../assets/benchmarks/configs/spectrum2structure/vib2mol_ir_ks1000k.yaml) | ir | kekule_smiles | openmolspec-v1-ks1000k | 312,500 steps |
| [vib2mol_ir_raman_hnmr_ks1000k.yaml](../assets/benchmarks/configs/spectrum2structure/vib2mol_ir_raman_hnmr_ks1000k.yaml) | ir-raman-hnmr | kekule_smiles | openmolspec-v1-ks1000k | 312,500 steps |
| [vib2mol_ir_raman_ks1000k.yaml](../assets/benchmarks/configs/spectrum2structure/vib2mol_ir_raman_ks1000k.yaml) | ir-raman | kekule_smiles | openmolspec-v1-ks1000k | 312,500 steps |
| [vib2mol_ks1000k.yaml](../assets/benchmarks/configs/spectrum2structure/vib2mol_ks1000k.yaml) | ir-raman-nmr | kekule_smiles | openmolspec-v1-ks1000k | 312,500 steps |
| [vib2mol_ks200k.yaml](../assets/benchmarks/configs/spectrum2structure/vib2mol_ks200k.yaml) | ir-raman-nmr | kekule_smiles | openmolspec-v1-ks200k | 312,500 steps |
| [vib2mol_smoke.yaml](../assets/benchmarks/configs/spectrum2structure/vib2mol_smoke.yaml) | ir-raman-nmr | kekule_smiles | release-v1 | 312,500 steps |
| [vib2mol_smoke_ddp2.yaml](../assets/benchmarks/configs/spectrum2structure/vib2mol_smoke_ddp2.yaml) | ir-raman-nmr | kekule_smiles | release-v1 | 312,500 steps |

## structure2hessian

| Configuration | Input | Targets | Data release | Budget |
| --- | --- | --- | --- | --- |
| [Hi_ks1000k_r5.yaml](../assets/benchmarks/configs/structure2hessian/Hi_ks1000k_r5.yaml) | 3d | Hi | openmolspec-v1-ks1000k | 312,500 steps |
| [Hi_ks200k.yaml](../assets/benchmarks/configs/structure2hessian/Hi_ks200k.yaml) | 3d | Hi | openmolspec-v1-ks200k | 312,500 steps |
| [Hi_ks200k_r5.yaml](../assets/benchmarks/configs/structure2hessian/Hi_ks200k_r5.yaml) | 3d | Hi | openmolspec-v1-ks200k | 312,500 steps |
| [Hi_ks200k_r5_ddp2.yaml](../assets/benchmarks/configs/structure2hessian/Hi_ks200k_r5_ddp2.yaml) | 3d | Hi | openmolspec-v1-ks200k | 312,500 steps |
| [Hi_ks200k_r8.yaml](../assets/benchmarks/configs/structure2hessian/Hi_ks200k_r8.yaml) | 3d | Hi | openmolspec-v1-ks200k | 312,500 steps |
| [Hi_ks400k_r5.yaml](../assets/benchmarks/configs/structure2hessian/Hi_ks400k_r5.yaml) | 3d | Hi | openmolspec-v1-ks400k | 312,500 steps |
| [Hi_ks600k_r5.yaml](../assets/benchmarks/configs/structure2hessian/Hi_ks600k_r5.yaml) | 3d | Hi | openmolspec-v1-ks600k | 312,500 steps |
| [Hi_ks800k_r5.yaml](../assets/benchmarks/configs/structure2hessian/Hi_ks800k_r5.yaml) | 3d | Hi | openmolspec-v1-ks800k | 312,500 steps |
| [Hij_ks1000k_r5.yaml](../assets/benchmarks/configs/structure2hessian/Hij_ks1000k_r5.yaml) | 3d | Hij | openmolspec-v1-ks1000k | 312,500 steps |
| [Hij_ks200k.yaml](../assets/benchmarks/configs/structure2hessian/Hij_ks200k.yaml) | 3d | Hij | openmolspec-v1-ks200k | 312,500 steps |
| [Hij_ks200k_r5.yaml](../assets/benchmarks/configs/structure2hessian/Hij_ks200k_r5.yaml) | 3d | Hij | openmolspec-v1-ks200k | 312,500 steps |
| [Hij_ks200k_r8.yaml](../assets/benchmarks/configs/structure2hessian/Hij_ks200k_r8.yaml) | 3d | Hij | openmolspec-v1-ks200k | 312,500 steps |
| [Hij_ks400k_r5.yaml](../assets/benchmarks/configs/structure2hessian/Hij_ks400k_r5.yaml) | 3d | Hij | openmolspec-v1-ks400k | 312,500 steps |
| [Hij_ks600k_r5.yaml](../assets/benchmarks/configs/structure2hessian/Hij_ks600k_r5.yaml) | 3d | Hij | openmolspec-v1-ks600k | 312,500 steps |
| [Hij_ks800k_r5.yaml](../assets/benchmarks/configs/structure2hessian/Hij_ks800k_r5.yaml) | 3d | Hij | openmolspec-v1-ks800k | 312,500 steps |

## structure2nmr

| Configuration | Input | Targets | Data release | Budget |
| --- | --- | --- | --- | --- |
| [hc_ks1000k_r5.yaml](../assets/benchmarks/configs/structure2nmr/hc_ks1000k_r5.yaml) | 3d | H, C | openmolspec-v1-ks1000k | 312,500 steps |
| [hc_ks200k_r5.yaml](../assets/benchmarks/configs/structure2nmr/hc_ks200k_r5.yaml) | 3d | H, C | openmolspec-v1-ks200k | 312,500 steps |

## structure2observables

| Configuration | Input | Targets | Data release | Budget |
| --- | --- | --- | --- | --- |
| [equiformer_v3.yaml](../assets/benchmarks/configs/structure2observables/equiformer_v3.yaml) | 3d | energy, homo, lumo, gap, dipole_total, zpve, ir_spectrum, raman_spectrum | demo-10k | 2 epochs |

## structure2property

| Configuration | Input | Targets | Data release | Budget |
| --- | --- | --- | --- | --- |
| [dipole.yaml](../assets/benchmarks/configs/structure2property/dipole.yaml) | 3d | dipole_total | demo-10k | 20 epochs |
| [dipole_ks200k.yaml](../assets/benchmarks/configs/structure2property/dipole_ks200k.yaml) | 3d | dipole_total | openmolspec-v1-ks200k | 20 epochs |
| [equiformer_v3.yaml](../assets/benchmarks/configs/structure2property/equiformer_v3.yaml) | 3d | energy, homo, lumo, gap, dipole_total, zpve | demo-10k | 2 epochs |

## structure2response

| Configuration | Input | Targets | Data release | Budget |
| --- | --- | --- | --- | --- |
| [dedipole_ks1000k_r5.yaml](../assets/benchmarks/configs/structure2response/dedipole_ks1000k_r5.yaml) | 3d | dedipole | openmolspec-v1-ks1000k | 312,500 steps |
| [dedipole_ks200k_r5.yaml](../assets/benchmarks/configs/structure2response/dedipole_ks200k_r5.yaml) | 3d | dedipole | openmolspec-v1-ks200k | 312,500 steps |
| [dedipole_ks400k_r5.yaml](../assets/benchmarks/configs/structure2response/dedipole_ks400k_r5.yaml) | 3d | dedipole | openmolspec-v1-ks400k | 312,500 steps |
| [dedipole_ks600k_r5.yaml](../assets/benchmarks/configs/structure2response/dedipole_ks600k_r5.yaml) | 3d | dedipole | openmolspec-v1-ks600k | 312,500 steps |
| [dedipole_ks800k_r5.yaml](../assets/benchmarks/configs/structure2response/dedipole_ks800k_r5.yaml) | 3d | dedipole | openmolspec-v1-ks800k | 312,500 steps |
| [depolar_ks1000k_r5.yaml](../assets/benchmarks/configs/structure2response/depolar_ks1000k_r5.yaml) | 3d | depolar | openmolspec-v1-ks1000k | 312,500 steps |
| [depolar_ks200k_r5.yaml](../assets/benchmarks/configs/structure2response/depolar_ks200k_r5.yaml) | 3d | depolar | openmolspec-v1-ks200k | 312,500 steps |
| [depolar_ks400k_r5.yaml](../assets/benchmarks/configs/structure2response/depolar_ks400k_r5.yaml) | 3d | depolar | openmolspec-v1-ks400k | 312,500 steps |
| [depolar_ks600k_r5.yaml](../assets/benchmarks/configs/structure2response/depolar_ks600k_r5.yaml) | 3d | depolar | openmolspec-v1-ks600k | 312,500 steps |
| [depolar_ks800k_r5.yaml](../assets/benchmarks/configs/structure2response/depolar_ks800k_r5.yaml) | 3d | depolar | openmolspec-v1-ks800k | 312,500 steps |

## structure2spectrum

| Configuration | Input | Targets | Data release | Budget |
| --- | --- | --- | --- | --- |
| [equiformer_v3.yaml](../assets/benchmarks/configs/structure2spectrum/equiformer_v3.yaml) | 3d | ir_spectrum, raman_spectrum | demo-10k | 2 epochs |


## References

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
