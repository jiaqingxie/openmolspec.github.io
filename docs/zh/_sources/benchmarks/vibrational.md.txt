# 红外 / 拉曼 IR / Raman benchmarks

下面按任务列出定义及保存的评测结果。模型调用和完整输入输出示例见相应任务指南。

## 4,096 个候选结构的检索与重排

128 个查询共用同一候选库，每个真结构都在库中。嵌入检索和前 32 名匹配头重排覆盖全部查询；全库重排对前 32 个查询分别给全部 4,096 个候选打分。目标按忽略立体化学的规范 SMILES 比对，模型输入不含分子式。

| 输入与模型 | 嵌入 Top-1 | 前 32 重排 Top-1 | 全库重排 Top-1 | 全库重排 Top-5 |
| --- | --- | --- | --- | --- |
| IR 单谱，屏蔽其余通道 | 0 / 128 | 0 / 128 | 0 / 32 | 0 / 32 |
| Raman 单谱，屏蔽其余通道 | 0 / 128 | 0 / 128 | 0 / 32 | 0 / 32 |
| IR + Raman，VB-Mols | 0 / 128 | 0 / 128 | 0 / 32 | 1 / 32 |
| IR + Raman，估计 H/C | 41 / 128 | 39 / 128 | 8 / 32 | 13 / 32 |
| IR + Raman + 给定 ¹H + ¹³C | 118 / 128 | 120 / 128 | 31 / 32 | 32 / 32 |

另一条检索路径将查询谱与独立理论参考谱库比较。128 个查询上，第一轮检索的 Top-1 命中数为 IR 27/128, Raman 28/128, IR + Raman 31/128, 四谱 34/128。上表神经模型的候选库仅提供 SMILES。

[下载候选结构、逐查询排名与模型指纹](../assets/benchmarks/matched-library-4096.json)

独立的 IR + Raman 双卡微调提交按连通结构划分 11,632 个训练、1,558 个验证和 24 个测试结构。11 月 24 日快照收录了数据划分与任务提交回执，微调权重的评测结果待回收。

## HOMO–LUMO 能隙

同时提供 IR、Raman、H/C 时，1,024 个分子的 MAE 为 0.135 eV，RMSE 为 0.199 eV。另一组按连通结构留出的 3,381 个分子上，针对 IR、Raman、IR + Raman 单独拟合的模型 MAE 分别为 0.382、0.318、0.288 eV，训练均值基线为 0.749 eV。

[下载指标与原始报告指纹](../assets/benchmarks/heldout-tasks.json)

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

## IR 单谱到结构检索

`vibrational.retrieval.ir`

用一条振动谱在 SMILES 候选库中检索结构。

报告查询数、库规模、Top-1/5 命中数与平均倒数排名。

[Task guide](../tasks/vibrational-retrieval-ir.md) · [Tutorial](../notebooks/vibrational-retrieval-ir.ipynb) · [Predictions](../assets/examples/vibrational-retrieval-ir.json)

运行设置：`dataset="4096 candidates / 128 queries"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| 4096 candidates / 128 queries | reference_rank | top1_hits | 27 |
| 4096 candidates / 128 queries | reference_rank | top5_hits | 64 |
| 4096 candidates / 128 queries | reference_rank | mrr | 0.351101 |
| 4096 candidates / 128 queries | reference_rank | queries | 128 |
| 4096 candidates / 128 queries | shortlist_rank | top1_hits | 23 |
| 4096 candidates / 128 queries | shortlist_rank | top5_hits | 71 |
| 4096 candidates / 128 queries | shortlist_rank | mrr | 0.331961 |
| 4096 candidates / 128 queries | shortlist_rank | queries | 128 |
| 4096 candidates / 128 queries | full_rank | top1_hits | 21 |
| 4096 candidates / 128 queries | full_rank | top5_hits | 62 |
| 4096 candidates / 128 queries | full_rank | mrr | 0.307802 |
| 4096 candidates / 128 queries | full_rank | queries | 128 |

## Raman 单谱到结构检索

`vibrational.retrieval.raman`

用一条振动谱在 SMILES 候选库中检索结构。

报告查询数、库规模、Top-1/5 命中数与平均倒数排名。

[Task guide](../tasks/vibrational-retrieval-raman.md) · [Tutorial](../notebooks/vibrational-retrieval-raman.ipynb) · [Predictions](../assets/examples/vibrational-retrieval-raman.json)

运行设置：`dataset="4096 candidates / 128 queries"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| 4096 candidates / 128 queries | reference_rank | top1_hits | 28 |
| 4096 candidates / 128 queries | reference_rank | top5_hits | 76 |
| 4096 candidates / 128 queries | reference_rank | mrr | 0.383086 |
| 4096 candidates / 128 queries | reference_rank | queries | 128 |
| 4096 candidates / 128 queries | shortlist_rank | top1_hits | 26 |
| 4096 candidates / 128 queries | shortlist_rank | top5_hits | 74 |
| 4096 candidates / 128 queries | shortlist_rank | mrr | 0.372979 |
| 4096 candidates / 128 queries | shortlist_rank | queries | 128 |
| 4096 candidates / 128 queries | full_rank | top1_hits | 21 |
| 4096 candidates / 128 queries | full_rank | top5_hits | 66 |
| 4096 candidates / 128 queries | full_rank | mrr | 0.320162 |
| 4096 candidates / 128 queries | full_rank | queries | 128 |


## 参考文献

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
