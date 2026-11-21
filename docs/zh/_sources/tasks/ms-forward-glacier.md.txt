# 使用 GLACIER 预测 MS/MS

在指定采集条件下预测分子的碎片质量和强度。

## 新增结构复核

在 280 种可评分的验证分子上做五折验证并锁定设置，再从 MassSpecGym 测试集中另取 1,024 种结构，排除首轮的全部 384 种。此次有 875 种得到配对分数，跳过 149 种。原模型与候选模型的平均余弦相似度分别为 0.6009 和 0.6039，差值的配对 95% 区间为 [+0.0005, +0.0056]。线上模型在上述条件下采用选出的相对强度设置。SDK 可通过 `author_baseline=True` 复算原始输出。该校准适用于经过评测的权重及至多 40 个重原子的分子。复算本次结果时使用单 CPU 线程（`--threads 1`），与网页模型相同。 [配对评测记录](https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/results/forward_confirmation_glacier.json)

## 验证与独立测试

在 MassSpecGym 上给 GLACIER 比较了 189 组峰强变换、前体峰权重与保留峰数设置。验证集和测试集各抽取 384 种结构，分别有 280 和 327 种结构获得可评分预测。在同一批 327 种测试结构上，默认模型的平均余弦相似度为 0.5828，验证集选中的设置为 0.5831。差值的配对 95% 区间为 [-0.0044, 0.0051]，首轮比较后保留了原模型输出。

## 输入是什么

| Field | Meaning |
| --- | --- |
| `smiles / adduct` | 分子结构与记录中的离子/加合物类型，例如 [M+H]+ 或 [M+Na]+。 |
| `collision_energy / instrument` | 模型支持的碰撞能与仪器条件。 |
| `precursor_mz` | 记录中的前体 m/z；按作者接口解释输入条件。 |

## 输出是什么

| Field | Meaning |
| --- | --- |
| `predicted_peaks` | m/z 与相对强度对；图中显示预测强度最高的 100 个峰。 |
| `similarity` | 与全部实测参考峰比较的余弦/熵相似度，同时统计跳过记录。 |

## 真实运行案例

下面展示示例的输入、预测与参考。下载 JSON 可获取完整数值数组及更多示例。

![ms.forward.glacier actual results](../assets/gallery/ms-forward-glacier.png)

[SVG](../assets/gallery/ms-forward-glacier.svg) · [PNG](../assets/gallery/ms-forward-glacier.png) · [Full input/output JSON](../assets/examples/ms-forward-glacier.json)

### 示例 2

![ms.forward.glacier example 2](../assets/gallery/ms-forward-glacier-example-2.png)

### 示例 3

![ms.forward.glacier example 3](../assets/gallery/ms-forward-glacier-example-3.png)

<details><summary>展开查看实际输入与输出字段</summary>

```json
{
  "input": {
    "smiles": "CC(C)(C)c1ccc(C(=O)CCCN2CCC(OC(c3ccccc3)c3ccccc3)CC2)cc1",
    "adduct": "[M+H]+",
    "collision_energy": "40.0",
    "instrument": "QTOF",
    "precursor_mz": 470.3054
  },
  "sample_id": "MassSpecGymID0028855",
  "output": {
    "predicted_peaks_top100": {
      "length": 100,
      "first_values": [
        [
          55.05422667404919,
          0.0020994183141738176
        ],
        [
          57.069876707999995,
          0.008048541843891144
        ],
        [
          70.065125676,
          0.0050727734342217445
        ],
        [
          82.06512569102459,
          0.0035072911996394396
        ]
      ]
    }
  },
  "reference": {
    "observed_peaks": {
      "length": 14,
      "first_values": [
        [
          152.0611,
          0.036036036036036036
        ],
        [
          161.0953,
          0.1831831831831832
        ],
        [
          162.0985,
          0.021021021021021023
        ],
        [
          165.069,
          0.04104104104104104
        ]
      ]
    }
  },
  "metrics": {
    "cosine_similarity": 0.8689625892568168,
    "entropy_similarity": 0.7960058641892032,
    "predicted_nonzero_bins": 100,
    "reference_nonzero_bins": 14
  }
}
```

</details>

## 实际评测结果

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded evaluation | recorded model | cosine_similarity | 0.485717 |
| recorded evaluation | recorded model | entropy_similarity | 0.41328 |

## 模型与方法

GLACIER 接收分子结构、加合物、碰撞能和仪器类型，通过碎片与强度预测模块生成 MS/MS 峰表。

使用余弦相似度与熵相似度比较预测谱和实测谱。

## 复现方式

[Notebook with executed figures](../notebooks/ms-forward-glacier.ipynb) · [Quick Start](../quickstart.md)

```bash
python -m openmolspec_bench run --workspace /path/to/OpenMolSpec \
  --tasks ms.forward.glacier --limit 8 --output results/ms-forward-glacier-new.json
```

## 调用模型与微调

```python
from openmolspec.model import MSPredictor
model = MSPredictor(model='glacier', source='/path/to/ms-pred',
    weights='/path/to/weights', python='/path/to/ms-env/bin/python')
result = model.predict(smiles=smiles, adduct='[M+H]+',
    collision_energy=20., instrument='Orbitrap')
```

微调使用 [作者训练模块](https://github.com/coleygroup/ms-pred)。准备分子独立的 train/val，包含结构、采集条件、实测峰强度及所选架构需要的碎片目标。ICEBERG 对应 `ms_pred.iceberg.train_gen`、`ms_pred.iceberg.train_inten`；GLACIER 提供 `ms_pred.glacier.train_joint` 及联合对比训练。启动前对照发布配置和各模块的 `--help`。 ICEBERG 碎片生成对有效原子决策使用二元交叉熵，强度模块支持余弦或熵目标。GLACIER 联合／对比损失随配置变化，报告微调时须注明具体变体。 其中 m 为调度的 MAGMa 权重，w_I、w_F 为配置权重；碎片监督结合匹配后的原子归属与碎片基数交叉熵。对比训练变体另使用其配置的 decoy 目标。

$$L_{\rm cosine}=1-\frac{\hat s\cdot s}{\|\hat s\|\|s\|}.$$

$$L_{\rm joint}=w_I[mL_{I,\rm MAGMa}+(1-m)L_{I,\rm end-to-end}]+w_FmL_{\rm fragment}.$$

<details><summary>来源报告与 SHA-256 指纹</summary>

- [ms_glacier_32_molecules_20261116.json](https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/results/ms_glacier_32_molecules_20261116.json) — SHA-256 `a4d084c72c7df758f49500942cdfcea91047cb3da3616b9adb93b5bc6e8470c6`

</details>


[Model implementation / 模型实现](https://github.com/coleygroup/ms-pred) · [Model review / 模型检查](../model-audit.md)

## 参考文献

- Wang, R.-X., Wang, R. & Coley, C. W. GLACIER: Rethinking Mass Spectrum Prediction as an Object Detection Problem. NeurIPS 2026. arXiv:2606.29161 (2026). [Source](https://arxiv.org/abs/2606.29161)
- Bushuiev, R., Bushuiev, A., de Jonge, N. F., Young, A., et al. MassSpecGym: A benchmark for the discovery and identification of molecules. Advances in Neural Information Processing Systems 37, Datasets and Benchmarks Track (2024). arXiv:2410.23326. [Source](https://arxiv.org/abs/2410.23326)
