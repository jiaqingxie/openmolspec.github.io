# Multimodal spectroscopy benchmarks

The sections below give each task definition and the results from its recorded evaluation runs. Open the task guide for model calls and full input/output examples.

## SpecMol spectroscopy QA

The released SpecMol-7B model answered 32 four-choice questions counting entries in NMRSpec ¹H or ¹³C peak lists on GPU. Scoring the full decoded answer gave **4/32 correct (12.5%)** and **29/32 valid choices (90.6%)**.

The separate four-GPU LoRA submission uses 8,192 training and 512 validation questions split by connectivity. The 24 November snapshot contains the base-model result above. The adapted-model held-out result is pending.

[Download all questions and decoded choices](../assets/benchmarks/specmol-qa-responses.json)

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

## Ranking generated structures

On the original 64 four-spectrum queries, the default order of distinct valid beam candidates recovered 48 top-1 targets. Sorting by the matching head recovered 44. In a separately selected panel of 24, both orders recovered 14 top-1 and 19 top-3 targets.

[Download the metrics and source fingerprints](../assets/benchmarks/heldout-tasks.json)

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

## Spectral question answering with SpecMol

`spectroscopy.qa`

Ask a question about a supplied spectrum.

Score the complete choice and report response format validity. The separately labeled pilot scores only the first token.

[Task guide](../tasks/spectroscopy-qa.md) · [Tutorial](../notebooks/spectroscopy-qa.ipynb) · [Predictions](../assets/examples/spectroscopy-qa.json)

Run settings: `dataset="First token only / 4 NMR counting questions"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| First token only / 4 NMR counting questions | recorded model | examples | 4 |
| First token only / 4 NMR counting questions | recorded model | unrestricted_first_token_hits | 0 |
| First token only / 4 NMR counting questions | recorded model | four_choice_hits | 0 |

Run settings: `dataset="Full generated responses / 32 examples"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| Full generated responses / 32 examples | recorded model | examples | 32 |
| Full generated responses / 32 examples | recorded model | exact_rate | 0.125 |
| Full generated responses / 32 examples | recorded model | format_valid_rate | 0.90625 |

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

## Structure generation with SpectraLLM

`multispectral.spectrallm.generation`

Generate a structure from a multispectral text prompt.

Report valid output format and canonical SMILES exact match.

[Task guide](../tasks/multispectral-spectrallm-generation.md) · [Tutorial](../notebooks/multispectral-spectrallm-generation.ipynb) · [Predictions](../assets/examples/multispectral-spectrallm-generation.json)


## References

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
