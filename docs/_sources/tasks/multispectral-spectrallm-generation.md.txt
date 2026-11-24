# Structure generation with SpectraLLM

The SpectraLLM evaluation was paused in the 24 November snapshot. The optional local checkpoint interface is available.

Generate a structure from a multispectral text prompt.

The released 32B model reads the author system message and spectrum prompt. The reference SMILES is used only during scoring.

Report valid output format and canonical SMILES exact match.

| Field | Meaning |
| --- | --- |
| `spectrum` | Spectrum in the released text format. |
| `model_config.checkpoint` | Local merged model directory. |
| `system` | Optional system message from the upstream example. |

| Field | Meaning |
| --- | --- |
| `answer` | Decoded model response. |
| `prompt_sha256 / provenance` | Exact prompt fingerprint and model information. |



[Evidence / 运行记录](../assets/examples/multispectral-spectrallm-generation.json) · [MCP](../harness/mcp.md)

```bash
python -m openmolspec_bench run --workspace /path/to/OpenMolSpec --tasks multispectral.spectrallm.generation --language-checkpoint /path/to/SpectraLLM_32B --language-data /path/to/QM9S.jsonl --device cuda --limit 8 --output results/multispectral-spectrallm-generation.json
```

[Model / 模型](https://github.com/OPilgrim/SpectraLLM)
