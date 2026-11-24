# IR / Raman benchmarks

The sections below give each task definition and the results from its recorded evaluation runs. Open the task guide for model calls and full input/output examples.

## Retrieval and reranking in a 4,096-structure library

Each of 128 queries has its target in the same bank. Embedding search and matching-head reranking of the top 32 use all queries. Exhaustive reranking scores all 4,096 candidates for the first 32 queries. Targets use canonical SMILES with stereochemistry removed. The model receives no molecular formula.

| Input / model | Embedding Top-1 | Shortlist Top-1 | Exhaustive Top-1 | Exhaustive Top-5 |
| --- | --- | --- | --- | --- |
| IR only, masked model | 0 / 128 | 0 / 128 | 0 / 32 | 0 / 32 |
| Raman only, masked model | 0 / 128 | 0 / 128 | 0 / 32 | 0 / 32 |
| IR + Raman, VB-Mols | 0 / 128 | 0 / 128 | 0 / 32 | 1 / 32 |
| IR + Raman, estimated H/C | 41 / 128 | 39 / 128 | 8 / 32 | 13 / 32 |
| IR + Raman + supplied ¹H + ¹³C | 118 / 128 | 120 / 128 | 31 / 32 | 32 / 32 |

An independent method compares query spectra with a theoretical spectral library. Its first-pass Top-1 counts on the 128 queries were IR 27/128, Raman 28/128, IR + Raman 31/128, four spectra 34/128. The neural library supplies candidate SMILES only.

[Download candidates, individual ranks and model fingerprints](../assets/benchmarks/matched-library-4096.json)

A separate two-GPU IR + Raman adaptation submission uses connectivity-disjoint splits of 11,632 training, 1,558 validation and 24 test structures. The 24 November snapshot contains its split manifest and submission receipt. Its fitted checkpoint scores are pending.

## HOMO–LUMO gap

With IR, Raman and H/C available, the model reached 0.135 eV MAE and 0.199 eV RMSE on 1,024 molecules. In a separate connectivity-disjoint panel of 3,381, models fitted for IR, Raman and IR + Raman reached 0.382, 0.318 and 0.288 eV MAE. The corresponding training-mean baseline was 0.749 eV.

[Download the metrics and source fingerprints](../assets/benchmarks/heldout-tasks.json)

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

## IR spectrum-to-structure retrieval

`vibrational.retrieval.ir`

Rank a SMILES library using one vibrational spectrum.

Report query count, library size, Top-1/5 hits and mean reciprocal rank.

[Task guide](../tasks/vibrational-retrieval-ir.md) · [Tutorial](../notebooks/vibrational-retrieval-ir.ipynb) · [Predictions](../assets/examples/vibrational-retrieval-ir.json)

Run settings: `dataset="4096 candidates / 128 queries"`

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

## Raman spectrum-to-structure retrieval

`vibrational.retrieval.raman`

Rank a SMILES library using one vibrational spectrum.

Report query count, library size, Top-1/5 hits and mean reciprocal rank.

[Task guide](../tasks/vibrational-retrieval-raman.md) · [Tutorial](../notebooks/vibrational-retrieval-raman.ipynb) · [Predictions](../assets/examples/vibrational-retrieval-raman.json)

Run settings: `dataset="4096 candidates / 128 queries"`

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


## References

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
