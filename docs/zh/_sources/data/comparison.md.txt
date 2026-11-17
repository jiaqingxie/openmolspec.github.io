# 实验数据集比较

使用完整标准 InChIKey 比较分子覆盖范围。OpenDataLab 一侧采用清洗后的 H/C 集合，NMRexp 一侧采用 v2 版本中的有效标准分子身份。

| 项目 | 分子身份数 |
| --- | --- |
| 清洗后的 OpenDataLab H/C 集合 | 2,678,511 |
| NMRexp v2 | 1,499,173 |
| 两库共有 | 41,898 |
| 未出现在 NMRexp v2 中的 OpenDataLab 身份 | 2,636,613 |
| 未出现在该 H/C 集合中的 NMRexp 身份 | 1,457,275 |
| 合并后的去重身份 | 4,135,786 |

选择外部评测数据时可依据这些身份分组。[划分指南](splits.md)介绍固定划分及自定义骨架导出。[下载比较计数](../assets/cleaned-corpus-comparison.json)。

## 参考文献

- OpenDataLab. WanJuan MolSpectra, version 1.0.3. Experimental molecular spectroscopy dataset. [Source](https://opendatalab.com/)
- Wang, J.-J., Jin, Y., Zhi, C.-Y., et al. NMRexp: A database of 3.3 million experimental NMR spectra. Scientific Data 12, 1954 (2025). doi:10.1038/s41597-025-06245-5. [Source](https://www.nature.com/articles/s41597-025-06245-5)
- Yang, L., Yang, Z., Xie, J., Wang, Y., Gao, B., Fu, T., Wei, X., Sun, J., Wu, J., He, C., Li, Y. & Gu, Q. NMRTrans: Structure Elucidation from Experimental NMR Spectra via Set Transformers. arXiv:2602.10158 (2026). [Source](https://arxiv.org/abs/2602.10158)
- Fang, Z., Yang, C., Yu, H., Luo, H., He, H., Xie, J., Yang, Z. & Xia, J. NMRGym: A Comprehensive Benchmark for Nuclear Magnetic Resonance Based Molecular Structure Elucidation. arXiv:2601.15763 (2026). [Source](https://arxiv.org/abs/2601.15763)
