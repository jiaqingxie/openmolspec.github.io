# IR spectrum-to-structure retrieval

The [4,096-candidate comparison](../benchmarks/vibrational.md) reports embedding search, top-32 reranking and exhaustive matching, with separate query counts.

Rank a SMILES library using one vibrational spectrum.

Retrieve independent reference spectra and rank candidate fingerprint similarity. The native four-channel model is also evaluated with the other channels masked.

Report query count, library size, Top-1/5 hits and mean reciprocal rank.

| Field | Meaning |
| --- | --- |
| `IR / Raman` | 1024 intensity samples per visible channel, ordered 400→4000 cm⁻¹, using the checkpoint normalization. |
| `reference library` | Known paired spectra and structures, separate from the supplied candidates. |
| `candidate structures` | The molecular candidate library to rank. |

| Field | Meaning |
| --- | --- |
| `ranking` | Candidate identities with similarity or ITM positive-class scores. |
| `recall / MRR` | Ranking metrics plus candidate-pool size and source composition. |

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

[Evidence / 运行记录](../assets/examples/vibrational-retrieval-ir.json) · [MCP](../harness/mcp.md)

```bash
python -m openmolspec_bench run --workspace /path/to/OpenMolSpec --tasks vibrational.retrieval.ir --portable-root /path/to/openmolspec-studio-portable --limit 8 --output results/vibrational-retrieval-ir.json
```
