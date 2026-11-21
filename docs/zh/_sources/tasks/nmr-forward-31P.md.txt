# 31P 化学位移预测

输入含磷分子的 SMILES 和可选溶剂，在线工具使用通过验证集选出的 GNN 权重预测溶液化学位移。等价磷位点共享一个峰位，原子编号按输入 SMILES 从零开始。

[在线预测 ³¹P](https://jiaqingxie.github.io/openmolspec.github.io/#tool-31p) · [下载模型和 Python 安装包](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/phosphorus31-v2/openmolspec-31P.zip)

## 模型选择

四层图神经网络沿化学键在相邻原子间传递信息，并预测目标磷位点的化学位移。共用 35,696 种分子连通结构训练。验证集选出的 GNN 轮次为 90，局部环境中位数权重为 0.75。对照模型使用 5,960 轮 LightGBM。两个模型均可利用相同的训练集局部环境中位数。选型依据是验证集按分子等权计算的 MAE。模型选定后再对留出测试集评分。

| 划分及模型 | 分子数 | 观测数 | 观测 MAE / ppm | 分子等权 MAE / ppm |
| --- | ---: | ---: | ---: | ---: |
| 验证 · LightGBM | 4,372 | 6,813 | 5.42 | 7.17 |
| 验证 · 纯 GNN | 4,372 | 6,813 | 4.21 | 5.40 |
| 验证 · GNN + 局部中位数 | 4,372 | 6,813 | 4.07 | 5.28 |
| 测试 · LightGBM | 4,248 | 6,693 | 5.94 | 7.77 |
| 测试 · 纯 GNN | 4,248 | 6,693 | 4.74 | 6.12 |
| 测试 · GNN + 局部中位数 | 4,248 | 6,693 | 4.56 | 5.95 |

## 测试子集

| 子集 | 分子数 | LightGBM 分子等权 MAE / ppm | GNN + 局部中位数分子等权 MAE / ppm |
| --- | ---: | ---: | ---: |
| 训练未见的非空 Murcko 骨架 | 1,225 | 10.80 | 9.18 |
| P=O | 2,735 | 3.99 | 3.62 |
| P=S | 243 | 6.70 | 6.17 |
| 中性三配位 P，邻位含杂原子 | 311 | 16.98 | 11.66 |
| 其他磷环境 | 495 | 21.81 | 13.74 |

子集 MAE 对每种分子连通性等权。正式比较使用具有一个实测峰和一个图对称环境的谱。此次 GNN 对照使用一个训练随机种子。多环境分子的峰归属、强度、耦合和线形仍需单独评测。

## 本地调用

解压下载包，在解压后的目录中运行以下命令。

```bash
python -m pip install "./openmolspec-1.0.0-py3-none-any.whl[phosphorus-gnn]"
openmolspec-solution-shift --model-dir model --smiles "CCOP(=O)(OCC)OCC" --solvent CDCl3
```

```python
from openmolspec.model import SolutionShiftPredictor

predictor = SolutionShiftPredictor("model")
print(predictor.predict("CCOP(=O)(OCC)OCC", "CDCl3")["environments"])
```
