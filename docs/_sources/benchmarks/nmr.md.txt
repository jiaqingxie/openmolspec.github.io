# NMR benchmarks

The sections below give each task definition and the results from its recorded evaluation runs. Open the task guide for model calls and full input/output examples.

## 1H chemical shift prediction

`nmr.forward.1H`

Predict the 1H chemical shifts of a molecule from its structure. Use the atom indices to display predictions on the molecular graph or compare them with measured peaks.

MAE and RMSE are reported in ppm.

[Task guide](../tasks/nmr-forward-1H.md) · [Tutorial](../notebooks/nmr-forward-1H.ipynb) · [Predictions](../assets/examples/nmr-forward-1H.json)

Run settings: `dataset="nmrspec_test"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrspec_test | nmrnet | matched_peak_mae_ppm | 0.134143 |
| nmrspec_test | nmrnet | matched_peak_rmse_ppm | 0.236816 |
| nmrspec_test | nmrnet | peak_count_mae | 10.2188 |
| nmrspec_test | nmrnet | matched_fraction | 0.519243 |
| nmrspec_test | nmrnet | examples | 32 |
| nmrspec_test | nmrnet | scored_examples | 32 |
| nmrspec_test | nmrnet | aggregation | equal_weight_per_molecule |
| nmrspec_test | nmrnet | assignment | minimum_absolute_error_without_atom_labels |
| nmrspec_test | nmrnetpp | matched_peak_mae_ppm | 0.0769934 |
| nmrspec_test | nmrnetpp | matched_peak_rmse_ppm | 0.163875 |
| nmrspec_test | nmrnetpp | peak_count_mae | 10.2188 |
| nmrspec_test | nmrnetpp | matched_fraction | 0.519243 |
| nmrspec_test | nmrnetpp | examples | 32 |
| nmrspec_test | nmrnetpp | scored_examples | 32 |
| nmrspec_test | nmrnetpp | aggregation | equal_weight_per_molecule |
| nmrspec_test | nmrnetpp | assignment | minimum_absolute_error_without_atom_labels |

Run settings: `dataset="patent_test_10k"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| patent_test_10k | nmrnet | matched_peak_mae_ppm | 0.26912 |
| patent_test_10k | nmrnet | matched_peak_rmse_ppm | 0.530869 |
| patent_test_10k | nmrnet | peak_count_mae | 24.7586 |
| patent_test_10k | nmrnet | matched_fraction | 0.294737 |
| patent_test_10k | nmrnet | examples | 29 |
| patent_test_10k | nmrnet | scored_examples | 29 |
| patent_test_10k | nmrnet | aggregation | equal_weight_per_molecule |
| patent_test_10k | nmrnet | assignment | minimum_absolute_error_without_atom_labels |
| patent_test_10k | nmrnetpp | matched_peak_mae_ppm | 0.227842 |
| patent_test_10k | nmrnetpp | matched_peak_rmse_ppm | 0.484549 |
| patent_test_10k | nmrnetpp | peak_count_mae | 24.7586 |
| patent_test_10k | nmrnetpp | matched_fraction | 0.294737 |
| patent_test_10k | nmrnetpp | examples | 29 |
| patent_test_10k | nmrnetpp | scored_examples | 29 |
| patent_test_10k | nmrnetpp | aggregation | equal_weight_per_molecule |
| patent_test_10k | nmrnetpp | assignment | minimum_absolute_error_without_atom_labels |

Run settings: `dataset="nmrexp_exp_10k"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrexp_exp_10k | nmrnet | matched_peak_mae_ppm | 0.0485825 |
| nmrexp_exp_10k | nmrnet | matched_peak_rmse_ppm | 0.0797388 |
| nmrexp_exp_10k | nmrnet | peak_count_mae | 8.09375 |
| nmrexp_exp_10k | nmrnet | matched_fraction | 0.530831 |
| nmrexp_exp_10k | nmrnet | examples | 32 |
| nmrexp_exp_10k | nmrnet | scored_examples | 32 |
| nmrexp_exp_10k | nmrnet | aggregation | equal_weight_per_molecule |
| nmrexp_exp_10k | nmrnet | assignment | minimum_absolute_error_without_atom_labels |
| nmrexp_exp_10k | nmrnetpp | matched_peak_mae_ppm | 0.030637 |
| nmrexp_exp_10k | nmrnetpp | matched_peak_rmse_ppm | 0.0626249 |
| nmrexp_exp_10k | nmrnetpp | peak_count_mae | 8.09375 |
| nmrexp_exp_10k | nmrnetpp | matched_fraction | 0.530831 |
| nmrexp_exp_10k | nmrnetpp | examples | 32 |
| nmrexp_exp_10k | nmrnetpp | scored_examples | 32 |
| nmrexp_exp_10k | nmrnetpp | aggregation | equal_weight_per_molecule |
| nmrexp_exp_10k | nmrnetpp | assignment | minimum_absolute_error_without_atom_labels |

Run settings: `dataset="nmrgym_test"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrgym_test | nmrnet | matched_peak_mae_ppm | 0.196824 |
| nmrgym_test | nmrnet | matched_peak_rmse_ppm | 0.393488 |
| nmrgym_test | nmrnet | peak_count_mae | 15.8438 |
| nmrgym_test | nmrnet | matched_fraction | 0.529103 |
| nmrgym_test | nmrnet | examples | 32 |
| nmrgym_test | nmrnet | scored_examples | 32 |
| nmrgym_test | nmrnet | aggregation | equal_weight_per_molecule |
| nmrgym_test | nmrnet | assignment | minimum_absolute_error_without_atom_labels |
| nmrgym_test | nmrnetpp | matched_peak_mae_ppm | 0.198216 |
| nmrgym_test | nmrnetpp | matched_peak_rmse_ppm | 0.406316 |
| nmrgym_test | nmrnetpp | peak_count_mae | 15.8438 |
| nmrgym_test | nmrnetpp | matched_fraction | 0.529103 |
| nmrgym_test | nmrnetpp | examples | 32 |
| nmrgym_test | nmrnetpp | scored_examples | 32 |
| nmrgym_test | nmrnetpp | aggregation | equal_weight_per_molecule |
| nmrgym_test | nmrnetpp | assignment | minimum_absolute_error_without_atom_labels |

## 13C chemical shift prediction

`nmr.forward.13C`

Predict the 13C chemical shifts of a molecule from its structure. Use the atom indices to display predictions on the molecular graph or compare them with measured peaks.

MAE and RMSE are reported in ppm.

[Task guide](../tasks/nmr-forward-13C.md) · [Tutorial](../notebooks/nmr-forward-13C.ipynb) · [Predictions](../assets/examples/nmr-forward-13C.json)

Run settings: `dataset="nmrspec_test"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrspec_test | nmrnet | matched_peak_mae_ppm | 1.16684 |
| nmrspec_test | nmrnet | matched_peak_rmse_ppm | 2.38985 |
| nmrspec_test | nmrnet | peak_count_mae | 2.65625 |
| nmrspec_test | nmrnet | matched_fraction | 0.868315 |
| nmrspec_test | nmrnet | examples | 32 |
| nmrspec_test | nmrnet | scored_examples | 32 |
| nmrspec_test | nmrnet | aggregation | equal_weight_per_molecule |
| nmrspec_test | nmrnet | assignment | minimum_absolute_error_without_atom_labels |
| nmrspec_test | nmrnetpp | matched_peak_mae_ppm | 0.816381 |
| nmrspec_test | nmrnetpp | matched_peak_rmse_ppm | 2.01372 |
| nmrspec_test | nmrnetpp | peak_count_mae | 2.65625 |
| nmrspec_test | nmrnetpp | matched_fraction | 0.868315 |
| nmrspec_test | nmrnetpp | examples | 32 |
| nmrspec_test | nmrnetpp | scored_examples | 32 |
| nmrspec_test | nmrnetpp | aggregation | equal_weight_per_molecule |
| nmrspec_test | nmrnetpp | assignment | minimum_absolute_error_without_atom_labels |

Run settings: `dataset="patent_test_10k"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| patent_test_10k | nmrnet | matched_peak_mae_ppm | 8.04192 |
| patent_test_10k | nmrnet | matched_peak_rmse_ppm | 24.2975 |
| patent_test_10k | nmrnet | peak_count_mae | 18.1935 |
| patent_test_10k | nmrnet | matched_fraction | 0.433151 |
| patent_test_10k | nmrnet | examples | 31 |
| patent_test_10k | nmrnet | scored_examples | 31 |
| patent_test_10k | nmrnet | aggregation | equal_weight_per_molecule |
| patent_test_10k | nmrnet | assignment | minimum_absolute_error_without_atom_labels |
| patent_test_10k | nmrnetpp | matched_peak_mae_ppm | 7.56152 |
| patent_test_10k | nmrnetpp | matched_peak_rmse_ppm | 22.9178 |
| patent_test_10k | nmrnetpp | peak_count_mae | 18.1935 |
| patent_test_10k | nmrnetpp | matched_fraction | 0.433151 |
| patent_test_10k | nmrnetpp | examples | 31 |
| patent_test_10k | nmrnetpp | scored_examples | 31 |
| patent_test_10k | nmrnetpp | aggregation | equal_weight_per_molecule |
| patent_test_10k | nmrnetpp | assignment | minimum_absolute_error_without_atom_labels |

Run settings: `dataset="nmrexp_exp_10k"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrexp_exp_10k | nmrnet | matched_peak_mae_ppm | 1.30638 |
| nmrexp_exp_10k | nmrnet | matched_peak_rmse_ppm | 7.49856 |
| nmrexp_exp_10k | nmrnet | peak_count_mae | 3.90625 |
| nmrexp_exp_10k | nmrnet | matched_fraction | 0.753554 |
| nmrexp_exp_10k | nmrnet | examples | 32 |
| nmrexp_exp_10k | nmrnet | scored_examples | 32 |
| nmrexp_exp_10k | nmrnet | aggregation | equal_weight_per_molecule |
| nmrexp_exp_10k | nmrnet | assignment | minimum_absolute_error_without_atom_labels |
| nmrexp_exp_10k | nmrnetpp | matched_peak_mae_ppm | 1.29252 |
| nmrexp_exp_10k | nmrnetpp | matched_peak_rmse_ppm | 8.09745 |
| nmrexp_exp_10k | nmrnetpp | peak_count_mae | 3.90625 |
| nmrexp_exp_10k | nmrnetpp | matched_fraction | 0.753554 |
| nmrexp_exp_10k | nmrnetpp | examples | 32 |
| nmrexp_exp_10k | nmrnetpp | scored_examples | 32 |
| nmrexp_exp_10k | nmrnetpp | aggregation | equal_weight_per_molecule |
| nmrexp_exp_10k | nmrnetpp | assignment | minimum_absolute_error_without_atom_labels |

Run settings: `dataset="nmrgym_test"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrgym_test | nmrnet | matched_peak_mae_ppm | 2.27653 |
| nmrgym_test | nmrnet | matched_peak_rmse_ppm | 3.99254 |
| nmrgym_test | nmrnet | peak_count_mae | 2.625 |
| nmrgym_test | nmrnet | matched_fraction | 0.908013 |
| nmrgym_test | nmrnet | examples | 32 |
| nmrgym_test | nmrnet | scored_examples | 32 |
| nmrgym_test | nmrnet | aggregation | equal_weight_per_molecule |
| nmrgym_test | nmrnet | assignment | minimum_absolute_error_without_atom_labels |
| nmrgym_test | nmrnetpp | matched_peak_mae_ppm | 2.45342 |
| nmrgym_test | nmrnetpp | matched_peak_rmse_ppm | 4.1577 |
| nmrgym_test | nmrnetpp | peak_count_mae | 2.625 |
| nmrgym_test | nmrnetpp | matched_fraction | 0.908013 |
| nmrgym_test | nmrnetpp | examples | 32 |
| nmrgym_test | nmrnetpp | scored_examples | 32 |
| nmrgym_test | nmrnetpp | aggregation | equal_weight_per_molecule |
| nmrgym_test | nmrnetpp | assignment | minimum_absolute_error_without_atom_labels |

## 19F chemical shift prediction

`nmr.forward.19F`

Predict the 19F chemical shifts of a molecule from its structure. Use the atom indices to display predictions on the molecular graph or compare them with measured peaks.

MAE and RMSE are reported in ppm.

[Task guide](../tasks/nmr-forward-19F.md) · [Tutorial](../notebooks/nmr-forward-19F.ipynb) · [Predictions](../assets/examples/nmr-forward-19F.json)

Run settings: `dataset="recorded evaluation"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded evaluation | recorded model | mae_ppm | 356.345 |
| recorded evaluation | recorded model | rmse_ppm | 364.396 |
| recorded evaluation | recorded model | examples | 32 |

## 31P chemical shift prediction

`nmr.forward.31P`

Predict the 31P chemical shifts of a molecule from its structure. Use the atom indices to display predictions on the molecular graph or compare them with measured peaks.

MAE and RMSE are reported in ppm.

[Task guide](../tasks/nmr-forward-31P.md) · [Tutorial](../notebooks/nmr-forward-31P.ipynb) · [Predictions](../assets/examples/nmr-forward-31P.json)

Run settings: `dataset="recorded evaluation"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded evaluation | recorded model | mae_ppm | 226.449 |
| recorded evaluation | recorded model | rmse_ppm | 237.252 |
| recorded evaluation | recorded model | examples | 32 |

## 11B chemical shift prediction

`nmr.forward.11B`

Predict the 11B chemical shifts of a molecule from its structure. Use the atom indices to display predictions on the molecular graph or compare them with measured peaks.

MAE and RMSE are reported in ppm.

[Task guide](../tasks/nmr-forward-11B.md) · [Tutorial](../notebooks/nmr-forward-11B.ipynb) · [Predictions](../assets/examples/nmr-forward-11B.json)

Run settings: `dataset="recorded evaluation"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded evaluation | recorded model | mae_ppm | 8.68453 |
| recorded evaluation | recorded model | rmse_ppm | 12.4365 |
| recorded evaluation | recorded model | molecules | 32 |
| recorded evaluation | recorded model | atoms | 32 |

## 29Si chemical shift prediction

`nmr.forward.29Si`

Predict the 29Si chemical shifts of a molecule from its structure. Use the atom indices to display predictions on the molecular graph or compare them with measured peaks.

MAE and RMSE are reported in ppm.

[Task guide](../tasks/nmr-forward-29Si.md) · [Tutorial](../notebooks/nmr-forward-29Si.ipynb) · [Predictions](../assets/examples/nmr-forward-29Si.json)

Run settings: `dataset="recorded evaluation"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded evaluation | recorded model | mae_ppm | 56.1336 |
| recorded evaluation | recorded model | rmse_ppm | 58.1058 |
| recorded evaluation | recorded model | molecules | 32 |
| recorded evaluation | recorded model | atoms | 32 |

## Spectrum-to-structure retrieval: ¹H

`nmr.retrieval.h.s2m`

Rank the candidates that best match the query molecule or spectrum.

Report Recall@1/5/10 and mean reciprocal rank together with the candidate count.

[Task guide](../tasks/nmr-retrieval-h-s2m.md) · [Tutorial](../notebooks/nmr-retrieval-h-s2m.ipynb) · [Predictions](../assets/examples/nmr-retrieval-h-s2m.json)

Run settings: `dataset="nmrspec_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrspec_test | recorded model | recall_at_1 | 1 |
| nmrspec_test | recorded model | recall_at_5 | 1 |
| nmrspec_test | recorded model | recall_at_10 | 1 |
| nmrspec_test | recorded model | mrr | 1 |
| nmrspec_test | recorded model | queries | 32 |
| nmrspec_test | recorded model | candidate_pool | 32 |
| nmrspec_test | recorded model | unique_candidates | 32 |
| nmrspec_test | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="patent_test_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| patent_test_10k | recorded model | recall_at_1 | 0.6875 |
| patent_test_10k | recorded model | recall_at_5 | 0.96875 |
| patent_test_10k | recorded model | recall_at_10 | 1 |
| patent_test_10k | recorded model | mrr | 0.819568 |
| patent_test_10k | recorded model | queries | 32 |
| patent_test_10k | recorded model | candidate_pool | 32 |
| patent_test_10k | recorded model | unique_candidates | 32 |
| patent_test_10k | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="nmrexp_exp_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrexp_exp_10k | recorded model | recall_at_1 | 0.875 |
| nmrexp_exp_10k | recorded model | recall_at_5 | 0.96875 |
| nmrexp_exp_10k | recorded model | recall_at_10 | 1 |
| nmrexp_exp_10k | recorded model | mrr | 0.917708 |
| nmrexp_exp_10k | recorded model | queries | 32 |
| nmrexp_exp_10k | recorded model | candidate_pool | 32 |
| nmrexp_exp_10k | recorded model | unique_candidates | 32 |
| nmrexp_exp_10k | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="nmrgym_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrgym_test | recorded model | recall_at_1 | 0.6875 |
| nmrgym_test | recorded model | recall_at_5 | 0.875 |
| nmrgym_test | recorded model | recall_at_10 | 0.9375 |
| nmrgym_test | recorded model | mrr | 0.76864 |
| nmrgym_test | recorded model | queries | 32 |
| nmrgym_test | recorded model | candidate_pool | 32 |
| nmrgym_test | recorded model | unique_candidates | 32 |
| nmrgym_test | recorded model | tie_policy | stable_candidate_order |

## Structure-to-spectrum retrieval: ¹H

`nmr.retrieval.h.m2s`

Rank the candidates that best match the query molecule or spectrum.

Report Recall@1/5/10 and mean reciprocal rank together with the candidate count.

[Task guide](../tasks/nmr-retrieval-h-m2s.md) · [Tutorial](../notebooks/nmr-retrieval-h-m2s.ipynb) · [Predictions](../assets/examples/nmr-retrieval-h-m2s.json)

Run settings: `dataset="nmrspec_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrspec_test | recorded model | recall_at_1 | 1 |
| nmrspec_test | recorded model | recall_at_5 | 1 |
| nmrspec_test | recorded model | recall_at_10 | 1 |
| nmrspec_test | recorded model | mrr | 1 |
| nmrspec_test | recorded model | queries | 32 |
| nmrspec_test | recorded model | candidate_pool | 32 |
| nmrspec_test | recorded model | unique_candidates | 32 |
| nmrspec_test | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="patent_test_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| patent_test_10k | recorded model | recall_at_1 | 0.625 |
| patent_test_10k | recorded model | recall_at_5 | 0.9375 |
| patent_test_10k | recorded model | recall_at_10 | 0.96875 |
| patent_test_10k | recorded model | mrr | 0.775298 |
| patent_test_10k | recorded model | queries | 32 |
| patent_test_10k | recorded model | candidate_pool | 32 |
| patent_test_10k | recorded model | unique_candidates | 32 |
| patent_test_10k | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="nmrexp_exp_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrexp_exp_10k | recorded model | recall_at_1 | 0.84375 |
| nmrexp_exp_10k | recorded model | recall_at_5 | 0.96875 |
| nmrexp_exp_10k | recorded model | recall_at_10 | 1 |
| nmrexp_exp_10k | recorded model | mrr | 0.88776 |
| nmrexp_exp_10k | recorded model | queries | 32 |
| nmrexp_exp_10k | recorded model | candidate_pool | 32 |
| nmrexp_exp_10k | recorded model | unique_candidates | 32 |
| nmrexp_exp_10k | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="nmrgym_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrgym_test | recorded model | recall_at_1 | 0.65625 |
| nmrgym_test | recorded model | recall_at_5 | 0.90625 |
| nmrgym_test | recorded model | recall_at_10 | 0.90625 |
| nmrgym_test | recorded model | mrr | 0.749297 |
| nmrgym_test | recorded model | queries | 32 |
| nmrgym_test | recorded model | candidate_pool | 32 |
| nmrgym_test | recorded model | unique_candidates | 32 |
| nmrgym_test | recorded model | tie_policy | stable_candidate_order |

## Structure elucidation from ¹H NMR

`nmr.generation.h`

Generate candidate molecular structures from NMR peak lists and a molecular formula.

Canonical top-k accuracy and valid-SMILES rate summarize generation.

[Task guide](../tasks/nmr-generation-h.md) · [Tutorial](../notebooks/nmr-generation-h.ipynb) · [Predictions](../assets/examples/nmr-generation-h.json)

Run settings: `dataset="nmrspec_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=true`; `beam_size=5`

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

Run settings: `dataset="patent_test_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=true`; `beam_size=5`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| patent_test_10k | recorded model | modality | available |
| patent_test_10k | recorded model | examples | 32 |
| patent_test_10k | recorded model | skipped_missing_modality | 0 |
| patent_test_10k | recorded model | valid | 23 |
| patent_test_10k | recorded model | formula_match | 5 |
| patent_test_10k | recorded model | exact | 0 |
| patent_test_10k | recorded model | valid_rate | 0.71875 |
| patent_test_10k | recorded model | formula_match_rate | 0.15625 |
| patent_test_10k | recorded model | exact_rate | 0 |

Run settings: `dataset="nmrexp_exp_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=true`; `beam_size=5`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrexp_exp_10k | recorded model | modality | available |
| nmrexp_exp_10k | recorded model | examples | 32 |
| nmrexp_exp_10k | recorded model | skipped_missing_modality | 0 |
| nmrexp_exp_10k | recorded model | valid | 32 |
| nmrexp_exp_10k | recorded model | formula_match | 27 |
| nmrexp_exp_10k | recorded model | exact | 15 |
| nmrexp_exp_10k | recorded model | valid_rate | 1 |
| nmrexp_exp_10k | recorded model | formula_match_rate | 0.84375 |
| nmrexp_exp_10k | recorded model | exact_rate | 0.46875 |

Run settings: `dataset="nmrgym_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=true`; `beam_size=5`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrgym_test | recorded model | modality | available |
| nmrgym_test | recorded model | examples | 32 |
| nmrgym_test | recorded model | skipped_missing_modality | 0 |
| nmrgym_test | recorded model | valid | 30 |
| nmrgym_test | recorded model | formula_match | 15 |
| nmrgym_test | recorded model | exact | 0 |
| nmrgym_test | recorded model | valid_rate | 0.9375 |
| nmrgym_test | recorded model | formula_match_rate | 0.46875 |
| nmrgym_test | recorded model | exact_rate | 0 |

## Spectrum-to-structure retrieval: ¹³C

`nmr.retrieval.c.s2m`

Rank the candidates that best match the query molecule or spectrum.

Report Recall@1/5/10 and mean reciprocal rank together with the candidate count.

[Task guide](../tasks/nmr-retrieval-c-s2m.md) · [Tutorial](../notebooks/nmr-retrieval-c-s2m.ipynb) · [Predictions](../assets/examples/nmr-retrieval-c-s2m.json)

Run settings: `dataset="nmrspec_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrspec_test | recorded model | recall_at_1 | 0.90625 |
| nmrspec_test | recorded model | recall_at_5 | 0.9375 |
| nmrspec_test | recorded model | recall_at_10 | 0.96875 |
| nmrspec_test | recorded model | mrr | 0.929167 |
| nmrspec_test | recorded model | queries | 32 |
| nmrspec_test | recorded model | candidate_pool | 32 |
| nmrspec_test | recorded model | unique_candidates | 32 |
| nmrspec_test | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="patent_test_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| patent_test_10k | recorded model | recall_at_1 | 0.53125 |
| patent_test_10k | recorded model | recall_at_5 | 0.8125 |
| patent_test_10k | recorded model | recall_at_10 | 0.9375 |
| patent_test_10k | recorded model | mrr | 0.662424 |
| patent_test_10k | recorded model | queries | 32 |
| patent_test_10k | recorded model | candidate_pool | 32 |
| patent_test_10k | recorded model | unique_candidates | 32 |
| patent_test_10k | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="nmrexp_exp_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrexp_exp_10k | recorded model | recall_at_1 | 0.625 |
| nmrexp_exp_10k | recorded model | recall_at_5 | 0.9375 |
| nmrexp_exp_10k | recorded model | recall_at_10 | 0.96875 |
| nmrexp_exp_10k | recorded model | mrr | 0.774554 |
| nmrexp_exp_10k | recorded model | queries | 32 |
| nmrexp_exp_10k | recorded model | candidate_pool | 32 |
| nmrexp_exp_10k | recorded model | unique_candidates | 32 |
| nmrexp_exp_10k | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="nmrgym_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrgym_test | recorded model | recall_at_1 | 0.78125 |
| nmrgym_test | recorded model | recall_at_5 | 0.96875 |
| nmrgym_test | recorded model | recall_at_10 | 1 |
| nmrgym_test | recorded model | mrr | 0.87066 |
| nmrgym_test | recorded model | queries | 32 |
| nmrgym_test | recorded model | candidate_pool | 32 |
| nmrgym_test | recorded model | unique_candidates | 32 |
| nmrgym_test | recorded model | tie_policy | stable_candidate_order |

## Structure-to-spectrum retrieval: ¹³C

`nmr.retrieval.c.m2s`

Rank the candidates that best match the query molecule or spectrum.

Report Recall@1/5/10 and mean reciprocal rank together with the candidate count.

[Task guide](../tasks/nmr-retrieval-c-m2s.md) · [Tutorial](../notebooks/nmr-retrieval-c-m2s.ipynb) · [Predictions](../assets/examples/nmr-retrieval-c-m2s.json)

Run settings: `dataset="nmrspec_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrspec_test | recorded model | recall_at_1 | 0.9375 |
| nmrspec_test | recorded model | recall_at_5 | 0.96875 |
| nmrspec_test | recorded model | recall_at_10 | 0.96875 |
| nmrspec_test | recorded model | mrr | 0.950321 |
| nmrspec_test | recorded model | queries | 32 |
| nmrspec_test | recorded model | candidate_pool | 32 |
| nmrspec_test | recorded model | unique_candidates | 32 |
| nmrspec_test | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="patent_test_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| patent_test_10k | recorded model | recall_at_1 | 0.5625 |
| patent_test_10k | recorded model | recall_at_5 | 0.8125 |
| patent_test_10k | recorded model | recall_at_10 | 0.875 |
| patent_test_10k | recorded model | mrr | 0.694401 |
| patent_test_10k | recorded model | queries | 32 |
| patent_test_10k | recorded model | candidate_pool | 32 |
| patent_test_10k | recorded model | unique_candidates | 32 |
| patent_test_10k | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="nmrexp_exp_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrexp_exp_10k | recorded model | recall_at_1 | 0.65625 |
| nmrexp_exp_10k | recorded model | recall_at_5 | 0.9375 |
| nmrexp_exp_10k | recorded model | recall_at_10 | 0.96875 |
| nmrexp_exp_10k | recorded model | mrr | 0.774595 |
| nmrexp_exp_10k | recorded model | queries | 32 |
| nmrexp_exp_10k | recorded model | candidate_pool | 32 |
| nmrexp_exp_10k | recorded model | unique_candidates | 32 |
| nmrexp_exp_10k | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="nmrgym_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrgym_test | recorded model | recall_at_1 | 0.78125 |
| nmrgym_test | recorded model | recall_at_5 | 0.9375 |
| nmrgym_test | recorded model | recall_at_10 | 1 |
| nmrgym_test | recorded model | mrr | 0.861111 |
| nmrgym_test | recorded model | queries | 32 |
| nmrgym_test | recorded model | candidate_pool | 32 |
| nmrgym_test | recorded model | unique_candidates | 32 |
| nmrgym_test | recorded model | tie_policy | stable_candidate_order |

## Structure elucidation from ¹³C NMR

`nmr.generation.c`

Generate candidate molecular structures from NMR peak lists and a molecular formula.

Canonical top-k accuracy and valid-SMILES rate summarize generation.

[Task guide](../tasks/nmr-generation-c.md) · [Tutorial](../notebooks/nmr-generation-c.ipynb) · [Predictions](../assets/examples/nmr-generation-c.json)

Run settings: `dataset="nmrspec_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=true`; `beam_size=5`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrspec_test | recorded model | modality | available |
| nmrspec_test | recorded model | examples | 32 |
| nmrspec_test | recorded model | skipped_missing_modality | 0 |
| nmrspec_test | recorded model | valid | 31 |
| nmrspec_test | recorded model | formula_match | 23 |
| nmrspec_test | recorded model | exact | 3 |
| nmrspec_test | recorded model | valid_rate | 0.96875 |
| nmrspec_test | recorded model | formula_match_rate | 0.71875 |
| nmrspec_test | recorded model | exact_rate | 0.09375 |

Run settings: `dataset="patent_test_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=true`; `beam_size=5`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| patent_test_10k | recorded model | modality | available |
| patent_test_10k | recorded model | examples | 32 |
| patent_test_10k | recorded model | skipped_missing_modality | 0 |
| patent_test_10k | recorded model | valid | 28 |
| patent_test_10k | recorded model | formula_match | 3 |
| patent_test_10k | recorded model | exact | 0 |
| patent_test_10k | recorded model | valid_rate | 0.875 |
| patent_test_10k | recorded model | formula_match_rate | 0.09375 |
| patent_test_10k | recorded model | exact_rate | 0 |

Run settings: `dataset="nmrexp_exp_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=true`; `beam_size=5`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrexp_exp_10k | recorded model | modality | available |
| nmrexp_exp_10k | recorded model | examples | 32 |
| nmrexp_exp_10k | recorded model | skipped_missing_modality | 0 |
| nmrexp_exp_10k | recorded model | valid | 32 |
| nmrexp_exp_10k | recorded model | formula_match | 30 |
| nmrexp_exp_10k | recorded model | exact | 19 |
| nmrexp_exp_10k | recorded model | valid_rate | 1 |
| nmrexp_exp_10k | recorded model | formula_match_rate | 0.9375 |
| nmrexp_exp_10k | recorded model | exact_rate | 0.59375 |

Run settings: `dataset="nmrgym_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=true`; `beam_size=5`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrgym_test | recorded model | modality | available |
| nmrgym_test | recorded model | examples | 32 |
| nmrgym_test | recorded model | skipped_missing_modality | 0 |
| nmrgym_test | recorded model | valid | 30 |
| nmrgym_test | recorded model | formula_match | 16 |
| nmrgym_test | recorded model | exact | 0 |
| nmrgym_test | recorded model | valid_rate | 0.9375 |
| nmrgym_test | recorded model | formula_match_rate | 0.5 |
| nmrgym_test | recorded model | exact_rate | 0 |

## Spectrum-to-structure retrieval: ¹H + ¹³C

`nmr.retrieval.hc.s2m`

Rank the candidates that best match the query molecule or spectrum.

Report Recall@1/5/10 and mean reciprocal rank together with the candidate count.

[Task guide](../tasks/nmr-retrieval-hc-s2m.md) · [Tutorial](../notebooks/nmr-retrieval-hc-s2m.ipynb) · [Predictions](../assets/examples/nmr-retrieval-hc-s2m.json)

Run settings: `dataset="nmrspec_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrspec_test | recorded model | recall_at_1 | 1 |
| nmrspec_test | recorded model | recall_at_5 | 1 |
| nmrspec_test | recorded model | recall_at_10 | 1 |
| nmrspec_test | recorded model | mrr | 1 |
| nmrspec_test | recorded model | queries | 32 |
| nmrspec_test | recorded model | candidate_pool | 32 |
| nmrspec_test | recorded model | unique_candidates | 32 |
| nmrspec_test | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="patent_test_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| patent_test_10k | recorded model | recall_at_1 | 0.65625 |
| patent_test_10k | recorded model | recall_at_5 | 0.9375 |
| patent_test_10k | recorded model | recall_at_10 | 0.9375 |
| patent_test_10k | recorded model | mrr | 0.776217 |
| patent_test_10k | recorded model | queries | 32 |
| patent_test_10k | recorded model | candidate_pool | 32 |
| patent_test_10k | recorded model | unique_candidates | 32 |
| patent_test_10k | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="nmrexp_exp_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrexp_exp_10k | recorded model | recall_at_1 | 0.90625 |
| nmrexp_exp_10k | recorded model | recall_at_5 | 1 |
| nmrexp_exp_10k | recorded model | recall_at_10 | 1 |
| nmrexp_exp_10k | recorded model | mrr | 0.9375 |
| nmrexp_exp_10k | recorded model | queries | 32 |
| nmrexp_exp_10k | recorded model | candidate_pool | 32 |
| nmrexp_exp_10k | recorded model | unique_candidates | 32 |
| nmrexp_exp_10k | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="nmrgym_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrgym_test | recorded model | recall_at_1 | 0.8125 |
| nmrgym_test | recorded model | recall_at_5 | 0.96875 |
| nmrgym_test | recorded model | recall_at_10 | 0.96875 |
| nmrgym_test | recorded model | mrr | 0.886979 |
| nmrgym_test | recorded model | queries | 32 |
| nmrgym_test | recorded model | candidate_pool | 32 |
| nmrgym_test | recorded model | unique_candidates | 32 |
| nmrgym_test | recorded model | tie_policy | stable_candidate_order |

## Structure-to-spectrum retrieval: ¹H + ¹³C

`nmr.retrieval.hc.m2s`

Rank the candidates that best match the query molecule or spectrum.

Report Recall@1/5/10 and mean reciprocal rank together with the candidate count.

[Task guide](../tasks/nmr-retrieval-hc-m2s.md) · [Tutorial](../notebooks/nmr-retrieval-hc-m2s.ipynb) · [Predictions](../assets/examples/nmr-retrieval-hc-m2s.json)

Run settings: `dataset="nmrspec_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrspec_test | recorded model | recall_at_1 | 1 |
| nmrspec_test | recorded model | recall_at_5 | 1 |
| nmrspec_test | recorded model | recall_at_10 | 1 |
| nmrspec_test | recorded model | mrr | 1 |
| nmrspec_test | recorded model | queries | 32 |
| nmrspec_test | recorded model | candidate_pool | 32 |
| nmrspec_test | recorded model | unique_candidates | 32 |
| nmrspec_test | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="patent_test_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| patent_test_10k | recorded model | recall_at_1 | 0.625 |
| patent_test_10k | recorded model | recall_at_5 | 0.90625 |
| patent_test_10k | recorded model | recall_at_10 | 0.90625 |
| patent_test_10k | recorded model | mrr | 0.738817 |
| patent_test_10k | recorded model | queries | 32 |
| patent_test_10k | recorded model | candidate_pool | 32 |
| patent_test_10k | recorded model | unique_candidates | 32 |
| patent_test_10k | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="nmrexp_exp_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrexp_exp_10k | recorded model | recall_at_1 | 0.875 |
| nmrexp_exp_10k | recorded model | recall_at_5 | 1 |
| nmrexp_exp_10k | recorded model | recall_at_10 | 1 |
| nmrexp_exp_10k | recorded model | mrr | 0.924479 |
| nmrexp_exp_10k | recorded model | queries | 32 |
| nmrexp_exp_10k | recorded model | candidate_pool | 32 |
| nmrexp_exp_10k | recorded model | unique_candidates | 32 |
| nmrexp_exp_10k | recorded model | tie_policy | stable_candidate_order |

Run settings: `dataset="nmrgym_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=false`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrgym_test | recorded model | recall_at_1 | 0.84375 |
| nmrgym_test | recorded model | recall_at_5 | 0.96875 |
| nmrgym_test | recorded model | recall_at_10 | 0.96875 |
| nmrgym_test | recorded model | mrr | 0.897254 |
| nmrgym_test | recorded model | queries | 32 |
| nmrgym_test | recorded model | candidate_pool | 32 |
| nmrgym_test | recorded model | unique_candidates | 32 |
| nmrgym_test | recorded model | tie_policy | stable_candidate_order |

## Structure elucidation from ¹H + ¹³C NMR

`nmr.generation.hc`

Generate candidate molecular structures from NMR peak lists and a molecular formula.

Canonical top-k accuracy and valid-SMILES rate summarize generation.

[Task guide](../tasks/nmr-generation-hc.md) · [Tutorial](../notebooks/nmr-generation-hc.ipynb) · [Predictions](../assets/examples/nmr-generation-hc.json)

Run settings: `dataset="nmrspec_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=true`; `beam_size=5`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrspec_test | recorded model | modality | available |
| nmrspec_test | recorded model | examples | 32 |
| nmrspec_test | recorded model | skipped_missing_modality | 0 |
| nmrspec_test | recorded model | valid | 32 |
| nmrspec_test | recorded model | formula_match | 29 |
| nmrspec_test | recorded model | exact | 4 |
| nmrspec_test | recorded model | valid_rate | 1 |
| nmrspec_test | recorded model | formula_match_rate | 0.90625 |
| nmrspec_test | recorded model | exact_rate | 0.125 |

Run settings: `dataset="patent_test_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=true`; `beam_size=5`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| patent_test_10k | recorded model | modality | available |
| patent_test_10k | recorded model | examples | 32 |
| patent_test_10k | recorded model | skipped_missing_modality | 0 |
| patent_test_10k | recorded model | valid | 24 |
| patent_test_10k | recorded model | formula_match | 1 |
| patent_test_10k | recorded model | exact | 0 |
| patent_test_10k | recorded model | valid_rate | 0.75 |
| patent_test_10k | recorded model | formula_match_rate | 0.03125 |
| patent_test_10k | recorded model | exact_rate | 0 |

Run settings: `dataset="nmrexp_exp_10k"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=true`; `beam_size=5`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrexp_exp_10k | recorded model | modality | available |
| nmrexp_exp_10k | recorded model | examples | 32 |
| nmrexp_exp_10k | recorded model | skipped_missing_modality | 0 |
| nmrexp_exp_10k | recorded model | valid | 32 |
| nmrexp_exp_10k | recorded model | formula_match | 29 |
| nmrexp_exp_10k | recorded model | exact | 22 |
| nmrexp_exp_10k | recorded model | valid_rate | 1 |
| nmrexp_exp_10k | recorded model | formula_match_rate | 0.90625 |
| nmrexp_exp_10k | recorded model | exact_rate | 0.6875 |

Run settings: `dataset="nmrgym_test"`; `sampling="first_distinct_canonical_structures_in_file_order"`; `given_formula=true`; `beam_size=5`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrgym_test | recorded model | modality | available |
| nmrgym_test | recorded model | examples | 32 |
| nmrgym_test | recorded model | skipped_missing_modality | 0 |
| nmrgym_test | recorded model | valid | 25 |
| nmrgym_test | recorded model | formula_match | 15 |
| nmrgym_test | recorded model | exact | 0 |
| nmrgym_test | recorded model | valid_rate | 0.78125 |
| nmrgym_test | recorded model | formula_match_rate | 0.46875 |
| nmrgym_test | recorded model | exact_rate | 0 |

## Peak-to-atom assignment

`nmr.assignment`

Assign measured NMR peaks to atoms in a known molecular structure.

Peak coverage and matched-peak MAE summarize the assignment.

[Task guide](../tasks/nmr-assignment.md) · [Tutorial](../notebooks/nmr-assignment.ipynb) · [Predictions](../assets/examples/nmr-assignment.json)

Run settings: `dataset="recorded evaluation"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded evaluation | recorded model | molecules | 32 |
| recorded evaluation | recorded model | matched_peaks | 488 |
| recorded evaluation | recorded model | matched_peak_fraction_macro | 0.939238 |
| recorded evaluation | recorded model | matched_residual_mae_ppm | 0.899131 |
| recorded evaluation | recorded model | assignment_accuracy | not measured |

## Cross-solvent chemical shift transfer

`nmr.solvent_transfer`

Estimate a spectrum in a target solvent from measurements in a source solvent.

Evaluate H and C shifts separately using MAE in ppm.

[Task guide](../tasks/nmr-solvent_transfer.md) · [Tutorial](../notebooks/nmr-solvent_transfer.ipynb) · [Predictions](../assets/examples/nmr-solvent_transfer.json)

Run settings: `dataset="recorded evaluation"`; `counts={"distinct_molecules": 32, "paired_atoms": 296, "skipped_pairs": 3}`; `seed=42`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded evaluation | 13C | atoms | 140 |
| recorded evaluation | 13C | molecules | 13 |
| recorded evaluation | 13C | mae_ppm | 1.09429 |
| recorded evaluation | 13C | unchanged_shift_mae_ppm | 1.16371 |
| recorded evaluation | 13C | rmse_ppm | 1.90935 |
| recorded evaluation | 1H | atoms | 156 |
| recorded evaluation | 1H | molecules | 19 |
| recorded evaluation | 1H | mae_ppm | 0.137628 |
| recorded evaluation | 1H | unchanged_shift_mae_ppm | 0.135385 |
| recorded evaluation | 1H | rmse_ppm | 0.376179 |


## References

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Xu, F., Guo, W., Wang, F., Yao, L., Wang, H., Tang, F., Gao, Z., Zhang, L., E, W., Tian, Z.-Q., et al. Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts. Nature Computational Science 5, 292–300 (2025). doi:10.1038/s43588-025-00783-z. [Source](https://doi.org/10.1038/s43588-025-00783-z)
- Yang, L., Yang, Z., Xie, J., Wang, Y., Gao, B., Fu, T., Wei, X., Sun, J., Wu, J., He, C., Li, Y. & Gu, Q. NMRTrans: Structure Elucidation from Experimental NMR Spectra via Set Transformers. arXiv:2602.10158 (2026). [Source](https://arxiv.org/abs/2602.10158)
