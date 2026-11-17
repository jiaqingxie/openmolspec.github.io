# 质谱 MS benchmarks

下面按任务列出定义及保存的评测结果。模型调用和完整输入输出示例见相应任务指南。

## 使用 GLACIER 预测 MS/MS

`ms.forward.glacier`

在指定采集条件下预测分子的碎片质量和强度。

使用余弦相似度与熵相似度比较预测谱和实测谱。

[Task guide](../tasks/ms-forward-glacier.md) · [Tutorial](../notebooks/ms-forward-glacier.ipynb) · [Predictions](../assets/examples/ms-forward-glacier.json)

运行设置：`dataset="recorded evaluation"`; `counts={"passed": 31, "skipped": 1}`; `sampling="first_real_test_records_with_at_most_40_heavy_atoms"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded evaluation | recorded model | cosine_similarity | 0.485717 |
| recorded evaluation | recorded model | entropy_similarity | 0.41328 |

## 使用 ICEBERG 预测 MS/MS

`ms.forward.iceberg`

在指定采集条件下预测分子的碎片质量和强度。

使用余弦相似度与熵相似度比较预测谱和实测谱。

[Task guide](../tasks/ms-forward-iceberg.md) · [Tutorial](../notebooks/ms-forward-iceberg.ipynb) · [Predictions](../assets/examples/ms-forward-iceberg.json)

运行设置：`dataset="recorded evaluation"`; `counts={"passed": 31, "skipped": 1}`; `sampling="first_real_test_records_with_at_most_40_heavy_atoms"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded evaluation | recorded model | cosine_similarity | 0.4625 |
| recorded evaluation | recorded model | entropy_similarity | 0.369847 |

## MS/MS 碎片指认

`ms.annotation.magma`

为实测 MS/MS 峰寻找对应的分子碎片。

报告峰匹配覆盖率及 ppm 单位的质量误差。

[Task guide](../tasks/ms-annotation-magma.md) · [Tutorial](../notebooks/ms-annotation-magma.ipynb) · [Predictions](../assets/examples/ms-annotation-magma.json)

运行设置：`dataset="recorded evaluation"`; `counts={"passed": 2}`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded evaluation | recorded model | matched_peak_fraction | 0.568182 |
| recorded evaluation | recorded model | annotated_spectra | 2 |
| recorded evaluation | recorded model | checked_fragments | 1534 |


## 参考文献

- Bushuiev, R., Bushuiev, A., de Jonge, N. F., Young, A., et al. MassSpecGym: A benchmark for the discovery and identification of molecules. Advances in Neural Information Processing Systems 37, Datasets and Benchmarks Track (2024). arXiv:2410.23326. [Source](https://arxiv.org/abs/2410.23326)
