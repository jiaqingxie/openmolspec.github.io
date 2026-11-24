# 质谱 MS benchmarks

下面按任务列出定义及保存的评测结果。模型调用和完整输入输出示例见相应任务指南。

## MS/MS 碎片质量覆盖率

在 55 张 MassSpecGym 谱图的同一批 1,741 个实测峰上，采用 10 ppm 容差，MechFrag-MS 的质量匹配率为 62.26%，MAGMa 为 58.13%。另有 9 张谱缺采集条件。碎片原子身份的准确率需要独立实验标注。

[下载指标与原始报告指纹](../assets/benchmarks/heldout-tasks.json)

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

## MechFrag-MS 碎片候选指认

`ms.annotation.mechfrag`

寻找质量与实测子离子一致的候选碎片及原子编号。

报告 10 ppm 窗口内实测峰的质量匹配覆盖率，结构正确率需要实验碎片原子标注。

[Task guide](../tasks/ms-annotation-mechfrag.md) · [Tutorial](../notebooks/ms-annotation-mechfrag.ipynb) · [Predictions](../assets/examples/ms-annotation-mechfrag.json)

运行设置：`dataset="MassSpecGym / 10 ppm"`

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| MassSpecGym / 10 ppm | recorded model | variant | balanced_neutral_context |
| MassSpecGym / 10 ppm | recorded model | peaks | 1741 |
| MassSpecGym / 10 ppm | recorded model | matched_fraction | 0.622631 |
| MassSpecGym / 10 ppm | recorded model | magma_matched_fraction_same_peaks | 0.581275 |


## 参考文献

- Bushuiev, R., Bushuiev, A., de Jonge, N. F., Young, A., et al. MassSpecGym: A benchmark for the discovery and identification of molecules. Advances in Neural Information Processing Systems 37, Datasets and Benchmarks Track (2024). arXiv:2410.23326. [Source](https://arxiv.org/abs/2410.23326)
