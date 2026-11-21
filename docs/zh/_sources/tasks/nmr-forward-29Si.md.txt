# 29Si 溶液化学位移预测

输入 SMILES 和可选溶剂，预测各等价原子组的位移（ppm）。训练集含 1,543 种分子连通结构。在 171 种验证分子上按分子等权选型。最终组合（80% 29Si-gnn, 20% 29Si-tree-r2）的验证 MAE 为 2.91 ppm。

独立测试集含 177 种分子和 187 条单环境实测记录。逐观测 MAE 为 **1.96 ppm**，分子等权 MAE 为 **2.03 ppm**，绝对误差的第 90 百分位为 3.90 ppm。输出保留输入 SMILES 中从零起算的原子编号。多环境的逐峰归属需另行评测。

[在线预测](https://jiaqingxie.github.io/openmolspec.github.io/#tool-29si) · [下载模型与 SDK](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/solution-nmr-v2/openmolspec-29Si.zip)

解压 ZIP，在解压目录中安装 SDK 并运行预测。

```bash
python -m pip install "./openmolspec-1.0.0-py3-none-any.whl[phosphorus-gnn,solution-nmr]"
```

```python
from openmolspec.model import SolutionShiftPredictor

model = SolutionShiftPredictor("model")
print(model.predict("C[Si](C)(C)C", "CDCl3"))
```
