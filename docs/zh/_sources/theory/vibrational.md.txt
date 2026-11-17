# 红外 IR 与拉曼 Raman

## Hessian 与简正模式

在平衡构象附近，谐振近似把势能按核位移展开到二阶。Hessian 是能量二阶导数矩阵；对质量加权 Hessian 对角化，可得到简正模式及对应的角频率平方。构建振动模式时需要处理平移与转动自由度。虚频对应负曲率，不能直接把含显著虚频的构象当作稳定极小值。

非线性分子有 $3N-6$ 个振动模式，孤立线性分子有 $3N-5$ 个。振动频率与构象、电子结构方法、同位素质量及谐性／非谐性处理有关；不同构象可以具有不同谱图。

## 互补的选择定则

IR 活性与偶极矩沿简正坐标的变化有关；Raman 活性与极化率张量导数有关。因此两个通道提供互补信息，一个 IR 强峰可能对应弱 Raman 信号。实验 Raman 强度还取决于激发频率、温度、偏振与采集几何，数据文件中的 Raman activity 不能自动等同于实测强度。

## 离散模式到连续谱形

计算谱常通过展宽离散模式得到：

$$I(\tilde\nu)=\sum_k A_k L(\tilde\nu-\tilde\nu_k).$$

$L$ 可选 Gaussian 或 Lorentzian。Gaussian 的标准差与半峰全宽满足 $\mathrm{FWHM}=2\sqrt{2\ln2}\,\sigma$。谱轴、线宽、频率缩放与强度归一化均应明确；展宽本身不会补回缺失的环境或非谐性效应。

[展宽教程](../notebooks/theory-vibrational-broadening.ipynb)使用五个明确给出的模式，并验证归一化 Gaussian 谱的积分等于输入总活性。IR 与 Raman 使用相同模式频率、不同活性向量。

## 实验谱与计算谱

吸光度与透射率按相应测量约定呈对数关系。稀疏 IR 峰位列表不包含完整强度曲线。气相、液相和固相环境会改变峰位置及线宽。重采样必须明确单位与谱轴，也不能把峰表插值后描述成原始实测谱。

构象到谱图的评测应使用参考谱对应的坐标。多谱联合学习需要明确：不同模态是对应同一构象、同一分子身份，还是相同实验条件，并保留参考信息。

## 来源

- [MLatom](https://xacs.xmu.edu.cn/docs/mlatom/)：计算谱学流程。
- [QM9S](https://www.nature.com/articles/s43588-023-00550-y)：计算谱和分子响应性质。
- [QMe14S](https://arxiv.org/abs/2501.18876)：更广元素覆盖的计算谱数据。

## 参考文献

- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- OpenMolSpec contributors. openSpec models and benchmark training workflows. Source archive, v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)
