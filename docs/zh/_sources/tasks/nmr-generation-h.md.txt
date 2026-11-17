# 从 ¹H NMR 解析结构

根据 NMR 峰表和分子式生成候选结构。

## 输入是什么

| Field | Meaning |
| --- | --- |
| `h_nmr / c_nmr` | H 谱记录：位移（ppm）及原记录中的多重性、积分、J 值；按模态掩码选择输入。 |
| `formula` | 此 checkpoint 必须显式提供已知分子式。 |
| `beam_size` | 解码候选数；本页实验使用 5。 |

## 输出是什么

| Field | Meaning |
| --- | --- |
| `candidates` | 生成 SMILES、规范结构、有效性、分子式一致性及模型分数。 |
| `exact_match` | 与参考分子规范结构的一致性。 |

## 真实运行案例

下面展示示例的输入、预测与参考。下载 JSON 可获取完整数值数组及更多示例。

![nmr.generation.h actual results](../assets/gallery/nmr-generation-h.png)

[SVG](../assets/gallery/nmr-generation-h.svg) · [PNG](../assets/gallery/nmr-generation-h.png) · [Full input/output JSON](../assets/examples/nmr-generation-h.json)

<details><summary>展开查看实际输入与输出字段</summary>

```json
{
  "input": {
    "formula": "C22H28",
    "h_nmr": [
      {
        "type": "1H NMR",
        "chemical_shift": "7.34 (s, 4H), 7.265 (m, 2H), 7.165 (m, 3H), 5.26 (d, J=1.6 Hz, 1H), 5.01 (t, J=1.4 Hz, 1H), 2.61 (t, J=7.8 Hz, 2H), 2.53 (t, J=7.6 Hz, 2H), 1.665 (m, 2H), 1.52 (d, J=7.7 Hz, 2H), 1.33 (s, 9H)"
      }
    ],
    "c_nmr": [],
    "modality_mask": [
      1,
      0
    ]
  },
  "reference_smiles": "C=C(CCCCc1ccccc1)c1ccc(C(C)(C)C)cc1",
  "candidates": {
    "length": 5,
    "first_values": [
      {
        "smiles": "C=C(CCCCc1ccccc1)c1ccc(C(C)(C)C)cc1",
        "canonical_smiles": "C=C(CCCCc1ccccc1)c1ccc(C(C)(C)C)cc1",
        "score": -2.1940921595343212,
        "valid": true,
        "formula_match": true
      },
      {
        "smiles": "C=C(CCCCc1ccccc1)CCCc1ccccc1",
        "canonical_smiles": "C=C(CCCCc1ccccc1)CCCc1ccccc1",
        "score": -1.869783622449546,
        "valid": true,
        "formula_match": false
      },
      {
        "smiles": "C=C(CCCCc1ccccc1)C(=C)CCc1ccccc1",
        "canonical_smiles": "C=C(CCCCc1ccccc1)C(=C)CCc1ccccc1",
        "score": -2.15992978554236,
        "valid": true,
        "formula_match": false
      },
      {
        "smiles": "C=C(CCCCc1ccccc1)CCc1ccc(C(C)(C)C)cc1",
        "canonical_smiles": "C=C(CCCCc1ccccc1)CCc1ccc(C(C)(C)C)cc1",
        "score": -2.962536625102061,
        "valid": true,
        "formula_match": false
      }
    ]
  },
  "exact_match": true
}
```

</details>

## 实际评测结果

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrspec_test | recorded model | modality | available |
| nmrspec_test | recorded model | examples | 32 |
| nmrspec_test | recorded model | skipped_missing_modality | 0 |
| nmrspec_test | recorded model | valid | 32 |
| nmrspec_test | recorded model | formula_match | 27 |
| nmrspec_test | recorded model | exact | 3 |
| nmrspec_test | recorded model | valid_rate | 1 |
| nmrspec_test | recorded model | formula_match_rate | 0.84375 |
| nmrspec_test | recorded model | exact_rate | 0.09375 |
| patent_test_10k | recorded model | modality | available |
| patent_test_10k | recorded model | examples | 32 |
| patent_test_10k | recorded model | skipped_missing_modality | 0 |
| patent_test_10k | recorded model | valid | 23 |
| patent_test_10k | recorded model | formula_match | 5 |
| patent_test_10k | recorded model | exact | 0 |
| patent_test_10k | recorded model | valid_rate | 0.71875 |
| patent_test_10k | recorded model | formula_match_rate | 0.15625 |
| patent_test_10k | recorded model | exact_rate | 0 |
| nmrexp_exp_10k | recorded model | modality | available |
| nmrexp_exp_10k | recorded model | examples | 32 |
| nmrexp_exp_10k | recorded model | skipped_missing_modality | 0 |
| nmrexp_exp_10k | recorded model | valid | 32 |
| nmrexp_exp_10k | recorded model | formula_match | 27 |
| nmrexp_exp_10k | recorded model | exact | 15 |
| nmrexp_exp_10k | recorded model | valid_rate | 1 |
| nmrexp_exp_10k | recorded model | formula_match_rate | 0.84375 |
| nmrexp_exp_10k | recorded model | exact_rate | 0.46875 |
| nmrgym_test | recorded model | modality | available |
| nmrgym_test | recorded model | examples | 32 |
| nmrgym_test | recorded model | skipped_missing_modality | 0 |
| nmrgym_test | recorded model | valid | 30 |
| nmrgym_test | recorded model | formula_match | 15 |
| nmrgym_test | recorded model | exact | 0 |
| nmrgym_test | recorded model | valid_rate | 0.9375 |
| nmrgym_test | recorded model | formula_match_rate | 0.46875 |
| nmrgym_test | recorded model | exact_rate | 0 |

## 模型与方法

NMRTransformer 的谱编码器将峰表转为表征，分子解码器通过 beam search 生成 SMILES。每个候选附有分子式一致性和解码分数。

用规范化结构的 top-k 准确率与有效 SMILES 比例汇总生成结果。

## 复现方式

[Notebook with executed figures](../notebooks/nmr-generation-h.ipynb) · [Quick Start](../quickstart.md)

```bash
python -m openmolspec_bench run --workspace /path/to/OpenMolSpec \
  --tasks nmr.generation.h --limit 8 --output results/nmr-generation-h-new.json
```

## 调用模型与微调

```python
from openmolspec.model import NMRTransformer
model = NMRTransformer.from_pretrained(
    '/path/to/checkpoint.pt', stage='generate',
    python='/path/to/nmr-env/bin/python')
result = model.predict(query, beam_size=5)
plan = model.training_plan(
    'prepared-nmr', run_dir='runs/my-model', epochs=10, batch_size=32,
    alignment_checkpoint='/path/to/alignment.pt')
print(plan.validate())
# trained = model.fit(plan)
```

先用 `prepare_nmr_training` 准备相互独立的 train/val；生成阶段需要对齐 checkpoint。用 H/C 掩码定义输入通道，在验证集选择模型。已有权重可用于初始化。[数据准备与训练指南](../api.md)给出完整流程。

### 训练目标

$$L_{\rm LM}=-\frac{1}{N_{\rm token}}\sum_t\log p_\theta(y_t\mid y_{<t},x,F).$$

生成使用 token 交叉熵，可按配置加入联合对齐项。对齐使用归一化谱学／分子表征的双向对比交叉熵；ITM 配置增加正负配对分类项。具体目标与权重以训练配置为准。

<details><summary>来源报告与 SHA-256 指纹</summary>

- [nmr_documented_examples_20261117_v2.json](https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/results/nmr_documented_examples_20261117_v2.json) — SHA-256 `669413d6fc0939bdb6826782d41fc13cf12926a672418ecb46303f0b8ba05b99`

</details>


[Model implementation / 模型实现](https://github.com/jiaqingxie/openmolspec-studio-frontend) · [Model review / 模型检查](../model-audit.md)

## 参考文献

- Yang, L., Yang, Z., Xie, J., Wang, Y., Gao, B., Fu, T., Wei, X., Sun, J., Wu, J., He, C., Li, Y. & Gu, Q. NMRTrans: Structure Elucidation from Experimental NMR Spectra via Set Transformers. arXiv:2602.10158 (2026). [Source](https://arxiv.org/abs/2602.10158)
- Fang, Z., Yang, C., Yu, H., Luo, H., He, H., Xie, J., Yang, Z. & Xia, J. NMRGym: A Comprehensive Benchmark for Nuclear Magnetic Resonance Based Molecular Structure Elucidation. arXiv:2601.15763 (2026). [Source](https://arxiv.org/abs/2601.15763)
- OpenDataLab. WanJuan MolSpectra, version 1.0.3. Experimental molecular spectroscopy dataset. [Source](https://opendatalab.com/)
