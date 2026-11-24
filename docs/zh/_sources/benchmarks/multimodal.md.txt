# 多谱联合 benchmarks

下面按任务列出定义及保存的评测结果。模型调用和完整输入输出示例见相应任务指南。

## SpecMol 谱学问答

发布版 SpecMol-7B 在 GPU 上回答了 32 道 NMRSpec 四选一题，任务是数出 ¹H 或 ¹³C 峰表中的条目。完整生成回答中，**4/32 题答对（12.5%）**，**29/32 个回答可解析为有效选项（90.6%）**。

另有四卡 LoRA 微调提交，按分子连通性划分 8,192 条训练题与 512 条验证题。11 月 24 日快照收录了上述基础模型结果，微调模型留出集成绩待回收。

[下载全部问题、生成回答与标准选项](../assets/benchmarks/specmol-qa-responses.json)

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

## 生成结构排序

在原有的 64 个四谱查询上，按去重后有效 beam 候选的默认顺序，第一名命中 48 个目标；匹配头打分排序后为 44 个。另选 24 个查询后，两种顺序的第一名均命中 14 个，前三名均命中 19 个。

[下载指标与原始报告指纹](../assets/benchmarks/heldout-tasks.json)

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

## SpecMol 谱学问答

`spectroscopy.qa`

针对输入谱图文本提问。

统计完整回答的选项正确率和格式有效率，首个 token 的诊断单列。

[Task guide](../tasks/spectroscopy-qa.md) · [Tutorial](../notebooks/spectroscopy-qa.ipynb) · [Predictions](../assets/examples/spectroscopy-qa.json)

运行设置：`dataset="First token only / 4 NMR counting questions"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| First token only / 4 NMR counting questions | recorded model | examples | 4 |
| First token only / 4 NMR counting questions | recorded model | unrestricted_first_token_hits | 0 |
| First token only / 4 NMR counting questions | recorded model | four_choice_hits | 0 |

运行设置：`dataset="Full generated responses / 32 examples"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| Full generated responses / 32 examples | recorded model | examples | 32 |
| Full generated responses / 32 examples | recorded model | exact_rate | 0.125 |
| Full generated responses / 32 examples | recorded model | format_valid_rate | 0.90625 |

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

## SpectraLLM 多谱结构生成

`multispectral.spectrallm.generation`

根据多谱文本生成分子结构。

统计格式有效率及规范 SMILES 完全匹配率。

[Task guide](../tasks/multispectral-spectrallm-generation.md) · [Tutorial](../notebooks/multispectral-spectrallm-generation.ipynb) · [Predictions](../assets/examples/multispectral-spectrallm-generation.json)


## 参考文献

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
