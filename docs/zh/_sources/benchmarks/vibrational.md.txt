# 红外 / 拉曼 IR / Raman benchmarks

下面按任务列出定义及保存的评测结果。模型调用和完整输入输出示例见相应任务指南。

## 由 IR 预测 HOMO–LUMO 能隙

`vibrational.gap.ir`

根据谱图估计分子的 HOMO–LUMO 能隙。

报告以 eV 为单位的 MAE 与 RMSE。

[Task guide](../tasks/vibrational-gap-ir.md) · [Tutorial](../notebooks/vibrational-gap-ir.ipynb) · [Predictions](../assets/examples/vibrational-gap-ir.json)

运行设置：`sampling="reservoir"`; `seed=42`; `given_nmr=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | mae_ev | 1.17771 |
| recorded sample | recorded model | rmse_ev | 1.47487 |
| recorded sample | recorded model | examples | 128 |
| recorded sample | Training-mean baseline | constant_ev | 5.64512 |
| recorded sample | Training-mean baseline | mae_ev | 0.89994 |
| recorded sample | Training-mean baseline | rmse_ev | 1.06962 |
| recorded sample | Training-mean baseline | examples | 128 |

## 由 Raman 预测 HOMO–LUMO 能隙

`vibrational.gap.raman`

根据谱图估计分子的 HOMO–LUMO 能隙。

报告以 eV 为单位的 MAE 与 RMSE。

[Task guide](../tasks/vibrational-gap-raman.md) · [Tutorial](../notebooks/vibrational-gap-raman.ipynb) · [Predictions](../assets/examples/vibrational-gap-raman.json)

运行设置：`sampling="reservoir"`; `seed=42`; `given_nmr=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | mae_ev | 2.97818 |
| recorded sample | recorded model | rmse_ev | 3.15661 |
| recorded sample | recorded model | examples | 128 |
| recorded sample | Training-mean baseline | constant_ev | 5.64512 |
| recorded sample | Training-mean baseline | mae_ev | 0.89994 |
| recorded sample | Training-mean baseline | rmse_ev | 1.06962 |
| recorded sample | Training-mean baseline | examples | 128 |

## 由 IR + Raman 预测 HOMO–LUMO 能隙

`vibrational.gap.ir_raman`

根据谱图估计分子的 HOMO–LUMO 能隙。

报告以 eV 为单位的 MAE 与 RMSE。

[Task guide](../tasks/vibrational-gap-ir_raman.md) · [Tutorial](../notebooks/vibrational-gap-ir_raman.ipynb) · [Predictions](../assets/examples/vibrational-gap-ir_raman.json)

运行设置：`sampling="reservoir"`; `seed=42`; `given_nmr=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | mae_ev | 1.27764 |
| recorded sample | recorded model | rmse_ev | 1.4789 |
| recorded sample | recorded model | examples | 128 |
| recorded sample | Training-mean baseline | constant_ev | 5.64512 |
| recorded sample | Training-mean baseline | mae_ev | 0.89994 |
| recorded sample | Training-mean baseline | rmse_ev | 1.06962 |
| recorded sample | Training-mean baseline | examples | 128 |

## 从分子构象预测 IR 与 Raman

`vibrational.forward`

使用 openSpec 模型，从原子坐标预测红外与拉曼光谱。

分别使用余弦相似度和强度 MAE 比较 IR 与 Raman。

[Task guide](../tasks/vibrational-forward.md) · [Tutorial](../notebooks/vibrational-forward.ipynb) · [Predictions](../assets/examples/vibrational-forward.json)

运行设置：

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | ir_cosine_similarity | 0.977503 |
| recorded sample | recorded model | ir_mae | 0.00519438 |
| recorded sample | recorded model | raman_cosine_similarity | 0.990194 |
| recorded sample | recorded model | raman_mae | 0.00164467 |

## 结构检索：IR + Raman

`vibrational.retrieval`

按候选结构与输入谱图的一致性进行排序。

生成报告 top-k 准确率，排序报告 Recall@k 与 MRR。

[Task guide](../tasks/vibrational-retrieval.md) · [Tutorial](../notebooks/vibrational-retrieval.ipynb) · [Predictions](../assets/examples/vibrational-retrieval.json)

运行设置：`sampling="reservoir"`; `seed=42`; `given_formula=false`; `given_nmr=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | recall_at_1 | 0.0625 |
| recorded sample | recorded model | recall_at_5 | 0.5625 |
| recorded sample | recorded model | recall_at_10 | 0.875 |
| recorded sample | recorded model | mrr | 0.257068 |
| recorded sample | recorded model | queries | 16 |
| recorded sample | recorded model | candidate_pool | 16 |
| recorded sample | recorded model | unique_candidates | 16 |
| recorded sample | recorded model | tie_policy | stable_candidate_order |

## 结构生成：IR + Raman

`vibrational.generation`

从分子谱图生成结构。

生成报告 top-k 准确率，排序报告 Recall@k 与 MRR。

[Task guide](../tasks/vibrational-generation.md) · [Tutorial](../notebooks/vibrational-generation.ipynb) · [Predictions](../assets/examples/vibrational-generation.json)

运行设置：`sampling="first_distinct_canonical_structures_in_lmdb_order"`; `given_formula=false`; `given_nmr=false`; `beam_size=3`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | valid_rate | 1 |
| recorded sample | recorded model | exact_rate | 0 |
| recorded sample | recorded model | examples | 4 |

## 候选重排：IR + Raman

`spectroscopy.reranking`

按候选结构与输入谱图的一致性进行排序。

生成报告 top-k 准确率，排序报告 Recall@k 与 MRR。

[Task guide](../tasks/spectroscopy-reranking.md) · [Tutorial](../notebooks/spectroscopy-reranking.ipynb) · [Predictions](../assets/examples/spectroscopy-reranking.json)

运行设置：`sampling="reservoir"`; `seed=42`; `given_formula=false`; `given_nmr=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | recall_at_1 | 0.0625 |
| recorded sample | recorded model | recall_at_5 | 0.375 |
| recorded sample | recorded model | recall_at_10 | 0.6875 |
| recorded sample | recorded model | mrr | 0.238472 |
| recorded sample | recorded model | queries | 16 |
| recorded sample | recorded model | candidate_pool | 16 |
| recorded sample | recorded model | unique_candidates | 16 |
| recorded sample | recorded model | tie_policy | stable_candidate_order |
| recorded sample | recorded model | top_1_hit_rate | 0.0625 |


## 参考文献

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
