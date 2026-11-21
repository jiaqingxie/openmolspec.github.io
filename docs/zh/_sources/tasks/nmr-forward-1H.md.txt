# 1H 实验峰列表预测

输入 SMILES，输出各个峰的化学位移（ppm），并列出输入结构中从零起算的重原子编号。¹H 返回氢所连接的重原子。同一重原子上的多个氢取代表值；预测位移相差不超过 0.03 ppm 的位点可合并报峰。

两列误差均按分子连通性等权计算，每个多报或漏报的峰计 1 ppm 罚分。模型与合峰参数选自在先的 patent_test_10k 开发集。下表使用独立的分子，每种连通结构仅计入一个谱库。

| 独立谱库 | 配对分子数 | NMRNet++ | 入选模型 | 匹配峰比例 |
| --- | ---: | ---: | ---: | ---: |
| nmrspec_test | 1,000 | 0.545 ppm | 0.350 ppm | 86.7% |
| nmrexp_exp_10k | 991 | 0.560 ppm | 0.339 ppm | 86.0% |
| nmrgym_test | 980 | 0.524 ppm | 0.417 ppm | 78.6% |

[在线预测](https://jiaqingxie.github.io/openmolspec.github.io/#tool-1h) · [下载模型与 SDK](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/peak-nmr-v2/openmolspec-1H.zip)

解压 ZIP，在解压目录中安装 SDK 并运行示例。

```bash
python -m pip install "./openmolspec-1.0.0-py3-none-any.whl[solution-nmr]"
```

```python
from openmolspec.model import PeakSpectrumPredictor

model = PeakSpectrumPredictor('model')
print(model.predict('CCO')['peaks'])
```
