# 多谱联合 benchmarks

下面按任务列出定义及保存的评测结果。模型调用和完整输入输出示例见相应任务指南。

## 由 IR + Raman + NMR 预测 HOMO–LUMO 能隙

`vibrational.gap.ir_raman_hc`

根据谱图估计分子的 HOMO–LUMO 能隙。

报告以 eV 为单位的 MAE 与 RMSE。

[Task guide](../tasks/vibrational-gap-ir_raman_hc.md) · [Tutorial](../notebooks/vibrational-gap-ir_raman_hc.ipynb) · [Predictions](../assets/examples/vibrational-gap-ir_raman_hc.json)

运行设置：`sampling="reservoir"`; `seed=42`; `given_nmr=true`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | mae_ev | 0.131446 |
| recorded sample | recorded model | rmse_ev | 0.205964 |
| recorded sample | recorded model | examples | 128 |
| recorded sample | Training-mean baseline | constant_ev | 5.64512 |
| recorded sample | Training-mean baseline | mae_ev | 0.89994 |
| recorded sample | Training-mean baseline | rmse_ev | 1.06962 |
| recorded sample | Training-mean baseline | examples | 128 |

## 结构检索：IR + Raman + NMR

`vibrational.retrieval.hc`

按候选结构与输入谱图的一致性进行排序。

生成报告 top-k 准确率，排序报告 Recall@k 与 MRR。

[Task guide](../tasks/vibrational-retrieval-hc.md) · [Tutorial](../notebooks/vibrational-retrieval-hc.ipynb) · [Predictions](../assets/examples/vibrational-retrieval-hc.json)

运行设置：`sampling="reservoir"`; `seed=42`; `given_formula=false`; `given_nmr=true`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | recall_at_1 | 1 |
| recorded sample | recorded model | recall_at_5 | 1 |
| recorded sample | recorded model | recall_at_10 | 1 |
| recorded sample | recorded model | mrr | 1 |
| recorded sample | recorded model | queries | 16 |
| recorded sample | recorded model | candidate_pool | 16 |
| recorded sample | recorded model | unique_candidates | 16 |
| recorded sample | recorded model | tie_policy | stable_candidate_order |

## 结构生成：IR + Raman + NMR

`vibrational.generation.hc`

从分子谱图生成结构。

生成报告 top-k 准确率，排序报告 Recall@k 与 MRR。

[Task guide](../tasks/vibrational-generation-hc.md) · [Tutorial](../notebooks/vibrational-generation-hc.ipynb) · [Predictions](../assets/examples/vibrational-generation-hc.json)

运行设置：`sampling="reservoir"`; `seed=42`; `given_formula=false`; `given_nmr=true`; `beam_size=10`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | exact_canonical_top1 | 0.75 |
| recorded sample | recorded model | exact_canonical_top3 | 0.890625 |
| recorded sample | recorded model | exact_canonical_top5 | 0.890625 |
| recorded sample | recorded model | exact_canonical_top10 | 0.890625 |
| recorded sample | recorded model | valid_smiles_fraction | 0.959375 |
| recorded sample | recorded model | duplicate_valid_beams | 455 |
| recorded sample | recorded model | examples | 64 |
| recorded sample | ITM reranked | exact_canonical_top1 | 0.6875 |
| recorded sample | ITM reranked | exact_canonical_top3 | 0.84375 |
| recorded sample | ITM reranked | exact_canonical_top5 | 0.890625 |
| recorded sample | ITM reranked | exact_canonical_top10 | 0.890625 |

## 候选重排：IR + Raman + NMR

`spectroscopy.reranking.hc`

按候选结构与输入谱图的一致性进行排序。

生成报告 top-k 准确率，排序报告 Recall@k 与 MRR。

[Task guide](../tasks/spectroscopy-reranking-hc.md) · [Tutorial](../notebooks/spectroscopy-reranking-hc.ipynb) · [Predictions](../assets/examples/spectroscopy-reranking-hc.json)

运行设置：`sampling="reservoir"`; `seed=42`; `given_formula=false`; `given_nmr=true`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | recall_at_1 | 1 |
| recorded sample | recorded model | recall_at_5 | 1 |
| recorded sample | recorded model | recall_at_10 | 1 |
| recorded sample | recorded model | mrr | 1 |
| recorded sample | recorded model | queries | 16 |
| recorded sample | recorded model | candidate_pool | 16 |
| recorded sample | recorded model | unique_candidates | 16 |
| recorded sample | recorded model | tie_policy | stable_candidate_order |
| recorded sample | recorded model | top_1_hit_rate | 1 |


## 参考文献

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
