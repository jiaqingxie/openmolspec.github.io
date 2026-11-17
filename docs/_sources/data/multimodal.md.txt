# Multimodal data

A multimodal record groups the spectral channels used together by a model. Select the required channels before preparing a training batch. The H/C experimental view contains 238,226 molecules with both proton and carbon NMR; the computed openSpec view combines IR, Raman and H/C shifts.

```python
paired = data["train"].select(modalities=["1H", "13C"], limit=100)
for record in paired:
    print(record["smiles"], record["modality_mask"])
```

For experimental cross-modal joins, use the standard molecular identity and retain the source document and acquisition conditions. For geometry-to-spectrum learning, use the coordinates associated with the reference calculation. For NMR models, keep the nucleus and chemical-shift reference in the input metadata.

## References

- OpenDataLab. WanJuan MolSpectra, version 1.0.3. Experimental molecular spectroscopy dataset. [Source](https://opendatalab.com/)
- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
