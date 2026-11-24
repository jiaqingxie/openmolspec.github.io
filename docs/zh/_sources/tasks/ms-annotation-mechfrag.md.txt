# MechFrag-MS 碎片候选指认

[同批实测峰的质量覆盖率](../benchmarks/ms.md)在 10 ppm 容差下比较 MechFrag-MS 和 MAGMa。

寻找质量与实测子离子一致的候选碎片及原子编号。

锁定的策略模型根据分子结构与采集条件提出碎片离子。

报告 10 ppm 窗口内实测峰的质量匹配覆盖率，结构正确率需要实验碎片原子标注。

| Field | Meaning |
| --- | --- |
| `smiles / mz` | 分子结构及实测子离子质荷比。 |
| `adduct / collision_energy / instrument` | 谱图记录中的加合物、碰撞能与仪器。 |

| Field | Meaning |
| --- | --- |
| `peaks` | 实测质荷比与候选碎片原子编号、离子质量和质量误差。 |

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| MassSpecGym / 10 ppm | recorded model | variant | balanced_neutral_context |
| MassSpecGym / 10 ppm | recorded model | peaks | 1741 |
| MassSpecGym / 10 ppm | recorded model | matched_fraction | 0.622631 |
| MassSpecGym / 10 ppm | recorded model | magma_matched_fraction_same_peaks | 0.581275 |

[Evidence / 运行记录](../assets/examples/ms-annotation-mechfrag.json) · [MCP](../harness/mcp.md)

```bash
python -m openmolspec_bench run --workspace /path/to/OpenMolSpec --tasks ms.annotation.mechfrag --mechfrag-root /path/to/MechFrag-MS --mechfrag-study /path/to/locked-study --limit 8 --output results/ms-annotation-mechfrag.json
```
