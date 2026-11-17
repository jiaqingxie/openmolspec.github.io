# IR / Raman benchmarks

The sections below give each task definition and the results from its recorded evaluation runs. Open the task guide for model calls and full input/output examples.

## HOMO–LUMO gap from IR

`vibrational.gap.ir`

Estimate the molecular HOMO–LUMO energy gap from spectra.

Report MAE and RMSE in eV.

[Task guide](../tasks/vibrational-gap-ir.md) · [Tutorial](../notebooks/vibrational-gap-ir.ipynb) · [Predictions](../assets/examples/vibrational-gap-ir.json)

Run settings: `sampling="reservoir"`; `seed=42`; `given_nmr=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | mae_ev | 1.17771 |
| recorded sample | recorded model | rmse_ev | 1.47487 |
| recorded sample | recorded model | examples | 128 |
| recorded sample | Training-mean baseline | constant_ev | 5.64512 |
| recorded sample | Training-mean baseline | mae_ev | 0.89994 |
| recorded sample | Training-mean baseline | rmse_ev | 1.06962 |
| recorded sample | Training-mean baseline | examples | 128 |

## HOMO–LUMO gap from Raman

`vibrational.gap.raman`

Estimate the molecular HOMO–LUMO energy gap from spectra.

Report MAE and RMSE in eV.

[Task guide](../tasks/vibrational-gap-raman.md) · [Tutorial](../notebooks/vibrational-gap-raman.ipynb) · [Predictions](../assets/examples/vibrational-gap-raman.json)

Run settings: `sampling="reservoir"`; `seed=42`; `given_nmr=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | mae_ev | 2.97818 |
| recorded sample | recorded model | rmse_ev | 3.15661 |
| recorded sample | recorded model | examples | 128 |
| recorded sample | Training-mean baseline | constant_ev | 5.64512 |
| recorded sample | Training-mean baseline | mae_ev | 0.89994 |
| recorded sample | Training-mean baseline | rmse_ev | 1.06962 |
| recorded sample | Training-mean baseline | examples | 128 |

## HOMO–LUMO gap from IR + Raman

`vibrational.gap.ir_raman`

Estimate the molecular HOMO–LUMO energy gap from spectra.

Report MAE and RMSE in eV.

[Task guide](../tasks/vibrational-gap-ir_raman.md) · [Tutorial](../notebooks/vibrational-gap-ir_raman.ipynb) · [Predictions](../assets/examples/vibrational-gap-ir_raman.json)

Run settings: `sampling="reservoir"`; `seed=42`; `given_nmr=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | mae_ev | 1.27764 |
| recorded sample | recorded model | rmse_ev | 1.4789 |
| recorded sample | recorded model | examples | 128 |
| recorded sample | Training-mean baseline | constant_ev | 5.64512 |
| recorded sample | Training-mean baseline | mae_ev | 0.89994 |
| recorded sample | Training-mean baseline | rmse_ev | 1.06962 |
| recorded sample | Training-mean baseline | examples | 128 |

## IR and Raman from a molecular geometry

`vibrational.forward`

Predict infrared and Raman spectra from atomic coordinates using the openSpec model.

Compare IR and Raman separately using cosine similarity and intensity MAE.

[Task guide](../tasks/vibrational-forward.md) · [Tutorial](../notebooks/vibrational-forward.ipynb) · [Predictions](../assets/examples/vibrational-forward.json)

Run settings:

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | ir_cosine_similarity | 0.977503 |
| recorded sample | recorded model | ir_mae | 0.00519438 |
| recorded sample | recorded model | raman_cosine_similarity | 0.990194 |
| recorded sample | recorded model | raman_mae | 0.00164467 |

## Structure retrieval: IR + Raman

`vibrational.retrieval`

Rank molecular structures by agreement with the input spectra.

Report top-k accuracy for generation, and Recall@k/MRR for ranking.

[Task guide](../tasks/vibrational-retrieval.md) · [Tutorial](../notebooks/vibrational-retrieval.ipynb) · [Predictions](../assets/examples/vibrational-retrieval.json)

Run settings: `sampling="reservoir"`; `seed=42`; `given_formula=false`; `given_nmr=false`

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

## Structure generation: IR + Raman

`vibrational.generation`

Generate structures from molecular spectra.

Report top-k accuracy for generation, and Recall@k/MRR for ranking.

[Task guide](../tasks/vibrational-generation.md) · [Tutorial](../notebooks/vibrational-generation.ipynb) · [Predictions](../assets/examples/vibrational-generation.json)

Run settings: `sampling="first_distinct_canonical_structures_in_lmdb_order"`; `given_formula=false`; `given_nmr=false`; `beam_size=3`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | valid_rate | 1 |
| recorded sample | recorded model | exact_rate | 0 |
| recorded sample | recorded model | examples | 4 |

## Candidate reranking: IR + Raman

`spectroscopy.reranking`

Rank molecular structures by agreement with the input spectra.

Report top-k accuracy for generation, and Recall@k/MRR for ranking.

[Task guide](../tasks/spectroscopy-reranking.md) · [Tutorial](../notebooks/spectroscopy-reranking.ipynb) · [Predictions](../assets/examples/spectroscopy-reranking.json)

Run settings: `sampling="reservoir"`; `seed=42`; `given_formula=false`; `given_nmr=false`

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


## References

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
