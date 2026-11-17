# Experimental corpus comparison

Compare molecular coverage using a full standard InChIKey for every structure. The OpenDataLab side uses the cleaned H/C collection; NMRexp uses the valid standard molecular identities in its v2 release.

| Quantity | Molecular identities |
| --- | --- |
| Cleaned OpenDataLab H/C collection | 2,678,511 |
| NMRexp v2 | 1,499,173 |
| Shared identities | 41,898 |
| OpenDataLab identities absent from NMRexp v2 | 2,636,613 |
| NMRexp identities absent from this H/C collection | 1,457,275 |
| Combined unique identities | 4,135,786 |

Use these identity groups when selecting external evaluation data. The [split guide](splits.md) describes the fixed partitions and custom scaffold exports. [Download comparison counts](../assets/cleaned-corpus-comparison.json).

## References

- OpenDataLab. WanJuan MolSpectra, version 1.0.3. Experimental molecular spectroscopy dataset. [Source](https://opendatalab.com/)
- Wang, J.-J., Jin, Y., Zhi, C.-Y., et al. NMRexp: A database of 3.3 million experimental NMR spectra. Scientific Data 12, 1954 (2025). doi:10.1038/s41597-025-06245-5. [Source](https://www.nature.com/articles/s41597-025-06245-5)
- Yang, L., Yang, Z., Xie, J., Wang, Y., Gao, B., Fu, T., Wei, X., Sun, J., Wu, J., He, C., Li, Y. & Gu, Q. NMRTrans: Structure Elucidation from Experimental NMR Spectra via Set Transformers. arXiv:2602.10158 (2026). [Source](https://arxiv.org/abs/2602.10158)
- Fang, Z., Yang, C., Yu, H., Luo, H., He, H., Xie, J., Yang, Z. & Xia, J. NMRGym: A Comprehensive Benchmark for Nuclear Magnetic Resonance Based Molecular Structure Elucidation. arXiv:2601.15763 (2026). [Source](https://arxiv.org/abs/2601.15763)
