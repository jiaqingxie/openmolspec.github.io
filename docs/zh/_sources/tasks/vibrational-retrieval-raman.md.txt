# Raman 单谱到结构检索

查看[4,096 候选结构评测](../benchmarks/vibrational.md)，比较嵌入检索、前 32 名重排和全库匹配的结果及各自查询数。

用一条振动谱在 SMILES 候选库中检索结构。

检索独立的参考谱，再按参考分子与候选的指纹相似度排序。同时对原四谱模型进行了通道屏蔽消融。

报告查询数、库规模、Top-1/5 命中数与平均倒数排名。

| Field | Meaning |
| --- | --- |
| `IR / Raman` | 每个可见通道 1024 个强度点，按 400→4000 cm⁻¹ 排列，并采用 checkpoint 的归一化。 |
| `reference library` | 使用已知谱与结构成对的参考库，参考分子与候选分开。 |
| `candidate structures` | 用于排序的分子候选库。 |

| Field | Meaning |
| --- | --- |
| `ranking` | 候选结构 ID，以及相似度或 ITM 正类分数。 |
| `recall / MRR` | 排序指标、候选池大小及样本来源构成。 |

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

[Evidence / 运行记录](../assets/examples/vibrational-retrieval-raman.json) · [MCP](../harness/mcp.md)

```bash
python -m openmolspec_bench run --workspace /path/to/OpenMolSpec --tasks vibrational.retrieval.raman --portable-root /path/to/openmolspec-studio-portable --limit 8 --output results/vibrational-retrieval-raman.json
```
