# Multimodal spectroscopy benchmarks

The sections below give each task definition and the results from its recorded evaluation runs. Open the task guide for model calls and full input/output examples.

## HOMO–LUMO gap from IR + Raman + NMR

`vibrational.gap.ir_raman_hc`

Estimate the molecular HOMO–LUMO energy gap from spectra.

Report MAE and RMSE in eV.

[Task guide](../tasks/vibrational-gap-ir_raman_hc.md) · [Tutorial](../notebooks/vibrational-gap-ir_raman_hc.ipynb) · [Predictions](../assets/examples/vibrational-gap-ir_raman_hc.json)

Run settings: `sampling="reservoir"`; `seed=42`; `given_nmr=true`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | mae_ev | 0.131446 |
| recorded sample | recorded model | rmse_ev | 0.205964 |
| recorded sample | recorded model | examples | 128 |
| recorded sample | Training-mean baseline | constant_ev | 5.64512 |
| recorded sample | Training-mean baseline | mae_ev | 0.89994 |
| recorded sample | Training-mean baseline | rmse_ev | 1.06962 |
| recorded sample | Training-mean baseline | examples | 128 |

## Structure retrieval: IR + Raman + NMR

`vibrational.retrieval.hc`

Rank molecular structures by agreement with the input spectra.

Report top-k accuracy for generation, and Recall@k/MRR for ranking.

[Task guide](../tasks/vibrational-retrieval-hc.md) · [Tutorial](../notebooks/vibrational-retrieval-hc.ipynb) · [Predictions](../assets/examples/vibrational-retrieval-hc.json)

Run settings: `sampling="reservoir"`; `seed=42`; `given_formula=false`; `given_nmr=true`

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

## Structure generation: IR + Raman + NMR

`vibrational.generation.hc`

Generate structures from molecular spectra.

Report top-k accuracy for generation, and Recall@k/MRR for ranking.

[Task guide](../tasks/vibrational-generation-hc.md) · [Tutorial](../notebooks/vibrational-generation-hc.ipynb) · [Predictions](../assets/examples/vibrational-generation-hc.json)

Run settings: `sampling="reservoir"`; `seed=42`; `given_formula=false`; `given_nmr=true`; `beam_size=10`

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

## Candidate reranking: IR + Raman + NMR

`spectroscopy.reranking.hc`

Rank molecular structures by agreement with the input spectra.

Report top-k accuracy for generation, and Recall@k/MRR for ranking.

[Task guide](../tasks/spectroscopy-reranking-hc.md) · [Tutorial](../notebooks/spectroscopy-reranking-hc.ipynb) · [Predictions](../assets/examples/spectroscopy-reranking-hc.json)

Run settings: `sampling="reservoir"`; `seed=42`; `given_formula=false`; `given_nmr=true`

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


## References

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
