# 从分子构象预测 IR 与 Raman

使用 openSpec 模型，从原子坐标预测红外与拉曼光谱。

## QM9S 参考条件

在 337 种验证分子上分别为 IR 和拉曼选择强度计算方式、频率修正系数与展宽。下表在另 303 种分子上评测，每个分子的权重相同。全部 640 种分子来自 OpenMolSpec 为评测留出的 QM9 结构。参考谱由 QM9S 同一优化构型的 Hessian 与响应导数计算。

| 通道 | 原模型 → 入选模型的余弦相似度 | 余弦提升的配对 95% 区间 | 原模型 → 入选模型的强度 MAE |
| --- | ---: | ---: | ---: |
| IR | 0.9621 → 0.9835 | [+0.0192, +0.0236] | 0.0100 → 0.0067 |
| 拉曼 | 0.9125 → 0.9850 | [+0.0682, +0.0764] | 0.0198 → 0.0070 |

IR 采用逐振动模式强度，频率系数为 0.9975，高斯展宽 σ 为 2 cm⁻¹。 拉曼 采用逐振动模式强度，频率系数为 0.9975，高斯展宽 σ 为 2 cm⁻¹。

QM9S 模式适用于仅含 H/C/N/O/F 且至多有 9 个重原子的分子。每个通道输出 500–4,000 cm⁻¹ 区间的 997 个归一化强度。计算参考谱采用 0.965 谐振频率系数和 10 cm⁻¹ 洛伦兹半高半宽，拉曼条件为 532 nm、298 K。基准使用原始优化坐标，网页会从 SMILES 生成坐标。网页也提供原始 openSpec 的 1,024 点模式。

[在线预测](https://jiaqingxie.github.io/openmolspec.github.io/#tool-ir-raman) · [下载配对评测集与 SDK](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/vibrational-forward-v2/openmolspec-qm9s.zip)

解压后安装包内的 wheel、NumPy 和 SciPy，并在解压目录运行以下命令。安装原始模型运行环境和权重后，可加 `--qm9s-fresh --portable-root /path/to/openmolspec-studio-portable`，从存档的坐标重新运行四个网络。

```bash
python -m openmolspec_bench run --tasks vibrational.forward --qm9s-bundle benchmark --limit 10000 --output qm9s-result.json
```

压缩包收录 Zou 等人发布的 QM9S 的转换子集，包括优化构型、重建的参考谱及 OpenMolSpec 输出。[QM9S 数据集](https://figshare.com/articles/dataset/QM9S_dataset/24235333) · [原论文](https://doi.org/10.1038/s43588-023-00550-y) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

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
