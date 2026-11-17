# 从分子构象预测 IR 与 Raman

使用 openSpec 模型，从原子坐标预测红外与拉曼光谱。

## 输入是什么

| Field | Meaning |
| --- | --- |
| `geometry` | 元素列表及 N×3 笛卡尔坐标（Å），与参考谱取自同一份 Gaussian 日志。 |
| `checkpoints` | openSpec 的 Equiformer-v3 Hessian Hi/Hij 及偶极矩/极化率导数权重。 |

## 输出是什么

| Field | Meaning |
| --- | --- |
| `IR / Raman` | 400–4000 cm⁻¹、1024 点共同网格上的两条归一化强度数组。 |
| `spectral error` | 与成对计算参考谱比较的分通道余弦相似度及强度 MAE。 |

## 真实运行案例

下面展示示例的输入、预测与参考。下载 JSON 可获取完整数值数组及更多示例。

![vibrational.forward actual results](../assets/gallery/vibrational-forward.png)

[SVG](../assets/gallery/vibrational-forward.svg) · [PNG](../assets/gallery/vibrational-forward.png) · [Full input/output JSON](../assets/examples/vibrational-forward.json)

<details><summary>展开查看实际输入与输出字段</summary>

```json
{
  "sample_id": "NISTIR-11730",
  "input": {
    "gaussian_log": "NISTIR-11730.log",
    "sha256": "894857d2c85d7106e5613540c593ff5a2ca3e2c90bed289575d38227086c2df1",
    "atoms": 13
  },
  "output": {
    "wavenumber_cm1": {
      "length": 1024,
      "first_values": [
        400.0,
        403.5190734863281,
        407.0381164550781,
        410.55718994140625
      ]
    },
    "predicted_ir": {
      "length": 1024,
      "first_values": [
        0.01742994412779808,
        0.013713346794247627,
        0.011153731495141983,
        0.009342214092612267
      ]
    },
    "predicted_raman": {
      "length": 1024,
      "first_values": [
        0.009821882471442223,
        0.007297216448932886,
        0.005653610453009605,
        0.004528572782874107
      ]
    }
  },
  "reference": {
    "reference_ir": {
      "length": 1024,
      "first_values": [
        0.01633988507091999,
        0.013211564160883427,
        0.011014701798558235,
        0.009432419203221798
      ]
    },
    "reference_raman": {
      "length": 1024,
      "first_values": [
        0.007780710235238075,
        0.005948643200099468,
        0.004715456161648035,
        0.0038486106786876917
      ]
    }
  },
  "metrics": {
    "ir_cosine_similarity": 0.9578531980514526,
    "ir_mae": 0.009397805668413639,
    "raman_cosine_similarity": 0.9989054203033447,
    "raman_mae": 0.0008200838346965611
  }
}
```

</details>

## 实际评测结果

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | ir_cosine_similarity | 0.977503 |
| recorded sample | recorded model | ir_mae | 0.00519438 |
| recorded sample | recorded model | raman_cosine_similarity | 0.990194 |
| recorded sample | recorded model | raman_mae | 0.00164467 |

## 模型与方法

构象模型预测 Hessian、偶极矩与极化率响应张量；通过简正模式分析得到频率与活性，再展宽为连续光谱。

分别使用余弦相似度和强度 MAE 比较 IR 与 Raman。

## 复现方式

[Notebook with executed figures](../notebooks/vibrational-forward.ipynb) · [Quick Start](../quickstart.md)

```bash
python -m openmolspec_bench run --workspace /path/to/OpenMolSpec \
  --tasks vibrational.forward --limit 8 --output results/vibrational-forward-new.json
```

## 调用模型与微调

```python
from openmolspec.benchmark import Benchmark
benchmark = Benchmark(workspace='/path/to/workspace',
    python='/path/to/vibrational-env/bin/python',
    portable_root='/path/to/portable-models')
result = benchmark.run('vibrational.forward',
    output='geometry-to-spectrum-results.json', limit=2)
```

按 [openSpec 训练实现](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)准备参考构象、Hessian 与响应张量，保持原子顺序、单位和模式约定。正向模型训练使用张量／性质目标；下游谱相似度不自动等于其训练 loss。 各 direct 模型训练其选定的张量头；Hessian／响应引擎按全局张量分量数平均 Cartesian SmoothL1。重建简正模式时保留各目标的独立 checkpoint 与单位。

$$\ell_\beta(r)=\begin{cases}r^2/(2\beta),&|r|<\beta,\\ |r|-\beta/2,&|r|\ge\beta.\end{cases}$$

$$L_{\rm tensor}=\sum_{q\in\{H_i,H_{ij},\partial\mu,\partial\alpha\}}\frac1{N_q}\sum_j\ell_1(\hat T_{qj}-T_{qj}).$$

<details><summary>来源报告与 SHA-256 指纹</summary>

- [vibrational_forward_paired_logs_20261116.json](https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/results/vibrational_forward_paired_logs_20261116.json) — SHA-256 `3e35b2c5b0c5b83715f49397e9d3ab5a744429ec90bff2551a96ea0d1641e087`

</details>


[Model implementation / 模型实现](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks) · [Model review / 模型检查](../model-audit.md)

## 参考文献

- OpenMolSpec contributors. openSpec models and benchmark training workflows. Source archive, v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)
- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
