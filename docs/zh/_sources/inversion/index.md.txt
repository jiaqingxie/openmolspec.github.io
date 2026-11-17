# Inversion：NMR 数值反演

NMR 反演从时域测量恢复弛豫时间或扩散系数分布。本栏把 [NMRInversions.jl 的理论](https://aris-mav.github.io/NMRInversions.jl/stable/theory/)纳入 OpenMolSpec 流程。上游 Julia 包还提供其他求解算法与二维功能；下方 Python 接口实现一维数据的非负二次正则化反演。

## 选择核函数

| 实验 | 核函数 | 单位要求 |
| --- | --- | --- |
| CPMG／T₂ 衰减 | $\exp(-t/T_2)$ | 时间与 T₂ 单位一致 |
| 饱和恢复 | $1-\exp(-t/T_1)$ | 时间与 T₁ 单位一致 |
| 反转恢复 | $1-2\exp(-t/T_1)$ | 时间与 T₁ 单位一致，保留信号正负号 |
| 扩散 | $\exp(-bD)$ | bD 为无量纲量 |

离散化后，观测满足 $g\approx Kf+\epsilon$。这里的 $f$ 表示离散格点幅度；若解释为每单位 T 或每单位 log T 的概率密度，还需要明确积分权重和归一化约定。

## 为什么需要正则化

相近指数成分产生的时域信号很相似，核矩阵因此病态：微小噪声可能显著改变恢复分布。使用正则化与相关实验信息约束可行分布，并根据噪声水平和核矩阵的分辨能力解释组分。

当前求解目标为：

$$\min_{f\ge0}\|W(Kf-g)\|_2^2+\alpha\|Lf\|_2^2.$$

$W$ 可用噪声标准差的倒数加权；$L$ 可以是单位矩阵，或等间距对数格点上的二阶差分。增大 $\alpha$ 会增强正则化，过大则可能合并真实组分。参数含义依赖核、数据缩放、格点和权重，不能跨约定直接比较数值。

## Python 接口

```python
import numpy as np
from openmolspec.inversion import invert

time = np.linspace(0, 1.5, 100)  # 秒
signal = .35*np.exp(-time/.05) + .65*np.exp(-time/.35)
grid = np.geomspace(.005, 2, 100)  # 秒
result = invert(time, signal, grid, experiment='T2',
                alpha=.01, penalty='curvature')
print(result.diagnostics)
weights = result.weights
reconstruction = result.fitted_signal
```

输入向量须为有限数值，采样坐标与格点严格递增，格点大于零。相位／基线处理、物理单位与实验核由调用者明确。输出包括非负幅度、重建信号、残差、alpha 与收敛信息。

## 参数选择与其他方法

应同时检查重建、残差结构、分布稳定性，以及 alpha／格点的敏感性。GCV、L 曲线和偏差准则可用于参数选择；当前 Python 接口显式接收 alpha。L1 稀疏正则化和多指数非线性拟合使用不同假设，可参考上游包的求解器与自动参数选择。

[反演模拟教程](../notebooks/theory-nmr-inversion.ipynb)展示已知组分、带噪观测与恢复分布。需要上游完整功能时，可按其 [Python／Julia 集成说明](https://aris-mav.github.io/NMRInversions.jl/stable/python/)安装和调用。

## 参考文献

- NMRInversions.jl contributors. NMRInversions.jl: inversion of NMR relaxation and diffusion measurements. Software and theory documentation. Accessed 18 November 2026. [Source](https://github.com/aris-mav/NMRInversions.jl)
- Xu, F., Guo, W., Wang, F., Yao, L., Wang, H., Tang, F., Gao, Z., Zhang, L., E, W., Tian, Z.-Q., et al. Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts. Nature Computational Science 5, 292–300 (2025). doi:10.1038/s43588-025-00783-z. [Source](https://doi.org/10.1038/s43588-025-00783-z)
