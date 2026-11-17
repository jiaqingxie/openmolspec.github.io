# 质谱 MS

## 分子质量、离子与加合物

质谱仪测量离子，横坐标是质荷比 $m/z$。质子化、去质子化、钠加合、不同电荷态和电子质量约定，都会影响分子式到离子质量的换算。精确单同位素质量、名义质量和平均分子量具有不同含义。

专利中单独报告的一个 m/z 可以帮助确认产物，但没有完整碎片强度信息。[Data](../data/index.md)会区分单点质量记录、碎片峰位与完整数值强度谱。

## 同位素包络与分辨率

天然同位素丰度形成不同离子质量的概率分布。仅考虑碳的教学模型中，¹³C 数目服从二项分布；真实同位素包络还受其他元素及离子组成影响。分辨率常记为 $R=m/\Delta m$，需要说明峰宽定义，例如半峰全宽 FWHM。

[同位素教程](../notebooks/theory-ms-isotopes.ipynb)计算归一化的碳同位素概率并比较两种分辨率。它展示同位素丰度和仪器分辨率如何影响包络。

## 串联质谱

MS/MS 先选择前体离子，再记录活化后的产物离子。碎裂受分子图、荷电位置、加合物、碰撞能量、仪器和采集模式影响。相同结构在不同条件下的相对强度可以明显变化；不同仪器给出的能量数值不能直接视为同一物理条件。

OpenMolSpec 中的 GLACIER、ICEBERG 需要明确采集条件。MAGMa 在指定分子图上提出质量相容的候选碎片；质量匹配可以支持候选解释，但不唯一确定实际碎裂路径。

## 谱图比较

向量 $x,y$ 的余弦相似度为 $(x\cdot y)/(\|x\|\|y\|)$。峰匹配容差或分箱宽度、归一化、前体峰移除、过滤及未指认峰处理都会影响分数。每次比较应同时记录这些选择和谱图身份，并控制分子、采集条件和来源划分。

## 来源

- [MassSpecGym](https://huggingface.co/datasets/roman-bushuiev/MassSpecGym)：实验 MS/MS 与版本化基准。
- [ms-pred](https://github.com/coleygroup/ms-pred)：GLACIER／ICEBERG 实现与训练流程。

## 参考文献

- Bushuiev, R., Bushuiev, A., de Jonge, N. F., Young, A., et al. MassSpecGym: A benchmark for the discovery and identification of molecules. Advances in Neural Information Processing Systems 37, Datasets and Benchmarks Track (2024). arXiv:2410.23326. [Source](https://arxiv.org/abs/2410.23326)
- Wang, R.-X., Wang, R. & Coley, C. W. GLACIER: Rethinking Mass Spectrum Prediction as an Object Detection Problem. NeurIPS 2026. arXiv:2606.29161 (2026). [Source](https://arxiv.org/abs/2606.29161)
- Wang, R., Manjrekar, M., Mahjour, B., Avila-Pacheco, J., et al. Neural Spectral Prediction for Structure Elucidation with Tandem Mass Spectrometry. bioRxiv (2025). doi:10.1101/2025.05.28.656653. [Source](https://doi.org/10.1101/2025.05.28.656653)
