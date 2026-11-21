# 31P 溶液化学位移预测

输入 SMILES 和可选溶剂，预测各等价原子组的位移（ppm）。训练集含 35,696 种分子连通结构。在 4,372 种验证分子上按分子等权选型。最终组合（50% 31P-gnn-r1, 50% 31P-gnn-r2）的验证 MAE 为 5.10 ppm。

独立测试集含 4,248 种分子和 6,693 条单环境实测记录。逐观测 MAE 为 **4.32 ppm**，分子等权 MAE 为 **5.60 ppm**，绝对误差的第 90 百分位为 7.84 ppm。输出保留输入 SMILES 中从零起算的原子编号。多环境的逐峰归属需另行评测。

[在线预测](https://jiaqingxie.github.io/openmolspec.github.io/#tool-31p) · [下载模型与 SDK](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/solution-nmr-v2/openmolspec-31P.zip)

在同一批 35,696 种训练分子上，对四层图网络独立初始化并再次训练。上一版 GNN 在同一测试集上按分子等权的 MAE 为 5.95 ppm。新旧模型误差差值的配对 95% 区间为 [-0.45, -0.25] ppm。[首次发布的模型与对照](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/phosphorus31-v2)

解压 ZIP，在解压目录中安装 SDK 并运行预测。

```bash
python -m pip install "./openmolspec-1.0.0-py3-none-any.whl[phosphorus-gnn,solution-nmr]"
```

```python
from openmolspec.model import SolutionShiftPredictor

model = SolutionShiftPredictor("model")
print(model.predict("CCOP(=O)(OCC)OCC", "CDCl3"))
```
