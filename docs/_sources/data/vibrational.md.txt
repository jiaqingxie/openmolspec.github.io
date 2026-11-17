# IR and Raman data

Experimental views store measured peak positions. Computed views provide dense spectra and associated quantum-chemical properties for spectrum prediction, retrieval and molecular structure generation.

## Experimental spectra

| Modality | Spectra | Molecules |
| --- | --- | --- |
| IR | 177,759 | 168,197 |
| Raman | 42 | 39 |

Records contain `wavenumber_cm1`, the molecular structure, source spectrum label and acquisition metadata. `intensities` is included when measured intensities are available. Each spectrum has at least two finite positive peak positions. To construct a dense input, choose a wavenumber grid and broadening width and save those parameters with the array.

![Experimental IR and Raman peak positions](../assets/gallery/data-cleaned-vibrational.png)

```python
from openmolspec.dataset import molspectra

data = molspectra("opendatalab_ir", root="data/experimental")
spectrum = data["train"].head(1)[0]
print(spectrum["wavenumber_cm1"])
```

## OpenMolSpec computed test view

The openSpec test view contains 20,390 records. Each record provides IR and Raman arrays with 1,024 intensities on a 400–4,000 cm⁻¹ axis, a molecular structure and property targets. H/C shifts retain the checkpoint reference identifier. The HOMO–LUMO gap is stored in Hartree in the LMDB; multiply once by 27.211386245988 to obtain eV. `GapModel.predict` returns eV.

```python
from openmolspec.dataset import molspectra

data = molspectra("openspec_test", root="data/openspec_test.lmdb", trusted=True)
record = data["test"].head(1)[0]
print(len(record["ir"]), len(record["raman"]))  # 1024 1024
```

## QMe14S

The aligned view contains 184,252 pairs with finite, nonconstant IR and Raman values in both channels. The original resource covers 14 elements and provides response information for studying structure–spectrum relationships. The numerical arrays are aligned with the molecular filenames.

## References

- OpenDataLab. WanJuan MolSpectra, version 1.0.3. Experimental molecular spectroscopy dataset. [Source](https://opendatalab.com/)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
