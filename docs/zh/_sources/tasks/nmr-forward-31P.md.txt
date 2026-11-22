# 31P 溶液化学位移预测

输入 SMILES 和可选溶剂，预测各等价原子组的位移（ppm）。训练集含 35,696 种分子连通结构。在 4,372 种验证分子上按分子等权选型。最终组合（30% 31P-gnn-r1, 30% 31P-gnn-r2, 40% 31P-gnn-width96）的验证 MAE 为 5.00 ppm。

基准默认排除原发布模型绝对误差最大的 67 条测量。固定子集含 6,626 条实测记录，按分子等权计算，MAE 为 **3.62 ppm**，R² 为 **0.9711**。

完整测试集含 4,248 种分子和 6,693 条单环境实测记录。逐观测 MAE 为 **4.27 ppm**，分子等权 MAE 为 **5.54 ppm**，绝对误差的第 90 百分位为 7.57 ppm。输出保留输入 SMILES 中从零起算的原子编号。多环境的逐峰归属需另行评测。

[在线预测](https://jiaqingxie.github.io/openmolspec.github.io/#tool-31p) · [下载模型与 SDK](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/solution-31p-6f08e5689aa7/openmolspec-31P.zip)

在同一批测试分子上，上一版的逐观测 MAE 为 4.32 ppm，分子等权 MAE 为 5.60 ppm。按分子配对重采样，新版相对上一版的分子等权 MAE 差值的 95% 区间为 [-0.125, -0.005] ppm。[上一版模型](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/solution-nmr-v2)

SMILES 先转成以原子为节点、化学键为边的二维图。模型沿化学键传递四轮信息，再结合分子描述符和溶剂特征预测磷位移。相同的局部原子环境共享计算。最宽的网络有 189,025 个参数，在第 69 轮取得最低验证误差，第 87 轮早停。从图数据准备完毕算起，训练和验证共 10 分 18 秒。[三套模型的训练记录](https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/results/phosphorus_gnn_training_runs.json)

解压 ZIP，在解压目录中安装 SDK 并运行预测。

```bash
python -m pip install "./openmolspec-1.0.0-py3-none-any.whl[phosphorus-gnn,solution-nmr]"
```

```python
from openmolspec.model import SolutionShiftPredictor

model = SolutionShiftPredictor("model")
print(model.predict("CCOP(=O)(OCC)OCC", "CDCl3"))
```
