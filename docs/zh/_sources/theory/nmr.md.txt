# 核磁共振 NMR

## 化学位移与分子环境

电子屏蔽改变原子核感受到的有效磁场。化学位移以参考频率定义：

$$\delta = 10^6(\nu-\nu_\mathrm{ref})/\nu_\mathrm{ref}.$$

单位是 ppm；以 Hz 表示的频差取决于仪器频率，因此 ppm 和 Hz 不能直接互换。溶剂、温度、浓度、交换过程和参考标准均可能改变观测位移。同一结构在不同实验条件下可以具有不同峰表。

## 耦合、积分与峰表

弱耦合近似下，标量耦合导致共振裂分；常见的 $n+1$ 规则只适用于相关的一组等价自旋 ½ 邻核。强耦合、磁不等价、交换和峰重叠都可能使简单规则失效。适当采集与弛豫条件下，积分可反映核数或相对含量。多重峰中心、单条裂分线、逐原子化学位移是不同的数据对象。

OpenMolSpec 保留位移原文，以及可获得的裂分、积分、耦合常数、溶剂和仪器频率。H/C 正向模型输出逐原子位移。将未指认实验峰与预测位移匹配，可以提出候选指认；需要结合对称性与实验相关谱解释。

## 时域信号与傅里叶变换

简单复数自由感应衰减可以表示为：

$$s(t)=\sum_k A_k\exp(-t/T_{2,k}^{*})\exp[i(2\pi\nu_k t+\phi_k)].$$

傅里叶变换把频率成分转为频谱。采集时长决定名义频率分辨率，采样间隔决定带宽，Nyquist 条件限定无混叠频率范围。加窗会改变线宽和噪声；补零增加显示采样点，但不增加原始采集信息。相位和基线处理也影响峰提取与强度解释。

[傅里叶教程](../notebooks/theory-nmr-fourier.ipynb)用三个已知频率生成复数 FID，执行变换，并检查恢复的主频。示例的频率轴使用 Hz 偏移。

## 弛豫与逆问题

$T_1$ 描述纵向恢复，$T_2$ 描述横向衰减，$T_2^*$ 还包含磁场不均匀等影响。多环境体系可能表现为多指数衰减，因此可以通过[正则化反演](../inversion/index.md)估计分布。核函数、脉冲序列和时间单位必须对应。

## 延伸阅读

- [NMRInversions.jl theory](https://aris-mav.github.io/NMRInversions.jl/stable/theory/)：弛豫与扩散反演。
- [MLatom 文档](https://xacs.xmu.edu.cn/docs/mlatom/)：分子模拟和计算谱学流程。

## 参考文献

- NMRInversions.jl contributors. NMRInversions.jl: inversion of NMR relaxation and diffusion measurements. Software and theory documentation. Accessed 18 November 2026. [Source](https://github.com/aris-mav/NMRInversions.jl)
- Xu, F., Guo, W., Wang, F., Yao, L., Wang, H., Tang, F., Gao, Z., Zhang, L., E, W., Tian, Z.-Q., et al. Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts. Nature Computational Science 5, 292–300 (2025). doi:10.1038/s43588-025-00783-z. [Source](https://doi.org/10.1038/s43588-025-00783-z)
