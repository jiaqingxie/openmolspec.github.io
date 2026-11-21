# 从 SMILES 预测 19F 溶液化学位移

输入分子结构和可选的核磁溶剂，输出各化学环境的预测位移（ppm）以及输入 SMILES 中从零开始的原子编号。对称等价的原子共享一个预测峰。

单一环境测试集含 14,330 种留出分子和 15,803 条观测。MAE 为 6.10 ppm，中位绝对误差为 0.52 ppm。训练中未出现的非空骨架子集 MAE 为 7.06 ppm。

训练使用只含一个观测峰且只有一类图对称位点的实验记录。多环境分子的评测仅在峰数匹配时比较排序后的峰列表。输出覆盖峰位置，逐峰归属、耦合常数、强度和线形仍需额外证据。

```python
from openmolspec.model import SolutionShiftPredictor

model = SolutionShiftPredictor("/path/to/OpenMolSpec/runs/solution-shifts-v1/19F")
print(model.predict("Fc1ccccc1", solvent="CDCl3")["environments"])
```

```bash
python -m pip install -e ".[solution-nmr]"
python -m openmolspec_bench run --workspace /path/to/OpenMolSpec --tasks nmr.forward.19F --limit 100000 --output results/nmr-forward-19F-test.json
```

原固态权重的历史诊断保存在旧版笔记本中。 [Notebook](../notebooks/nmr-forward-19F.ipynb)
