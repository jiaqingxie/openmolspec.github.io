# Mass spectrometry benchmarks

The sections below give each task definition and the results from its recorded evaluation runs. Open the task guide for model calls and full input/output examples.

## MS/MS prediction with GLACIER

`ms.forward.glacier`

Predict the fragment masses and intensities of a molecule under specified acquisition conditions.

Compare the predicted and measured spectra using cosine and entropy similarity.

[Task guide](../tasks/ms-forward-glacier.md) · [Tutorial](../notebooks/ms-forward-glacier.ipynb) · [Predictions](../assets/examples/ms-forward-glacier.json)

Run settings: `dataset="recorded evaluation"`; `counts={"passed": 31, "skipped": 1}`; `sampling="first_real_test_records_with_at_most_40_heavy_atoms"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded evaluation | recorded model | cosine_similarity | 0.485717 |
| recorded evaluation | recorded model | entropy_similarity | 0.41328 |

## MS/MS prediction with ICEBERG

`ms.forward.iceberg`

Predict the fragment masses and intensities of a molecule under specified acquisition conditions.

Compare the predicted and measured spectra using cosine and entropy similarity.

[Task guide](../tasks/ms-forward-iceberg.md) · [Tutorial](../notebooks/ms-forward-iceberg.ipynb) · [Predictions](../assets/examples/ms-forward-iceberg.json)

Run settings: `dataset="recorded evaluation"`; `counts={"passed": 31, "skipped": 1}`; `sampling="first_real_test_records_with_at_most_40_heavy_atoms"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded evaluation | recorded model | cosine_similarity | 0.4625 |
| recorded evaluation | recorded model | entropy_similarity | 0.369847 |

## MS/MS fragment annotation

`ms.annotation.magma`

Find molecular fragments that explain the measured MS/MS peaks.

Report matched-peak coverage and mass errors in ppm.

[Task guide](../tasks/ms-annotation-magma.md) · [Tutorial](../notebooks/ms-annotation-magma.ipynb) · [Predictions](../assets/examples/ms-annotation-magma.json)

Run settings: `dataset="recorded evaluation"`; `counts={"passed": 2}`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded evaluation | recorded model | matched_peak_fraction | 0.568182 |
| recorded evaluation | recorded model | annotated_spectra | 2 |
| recorded evaluation | recorded model | checked_fragments | 1534 |


## References

- Bushuiev, R., Bushuiev, A., de Jonge, N. F., Young, A., et al. MassSpecGym: A benchmark for the discovery and identification of molecules. Advances in Neural Information Processing Systems 37, Datasets and Benchmarks Track (2024). arXiv:2410.23326. [Source](https://arxiv.org/abs/2410.23326)
