# Spectral question answering with SpecMol

The base model answered 4/32 NMRSpec counting questions correctly and returned a valid choice on 29/32. [Full responses and adapter protocol](../benchmarks/multimodal.md).

Ask a question about a supplied spectrum.

The released SpecMol-7B chat model receives the question and spectrum as text.

Score the complete choice and report response format validity. The separately labeled pilot scores only the first token.

| Field | Meaning |
| --- | --- |
| `spectrum` | Spectrum in the released text format. |
| `model_config.checkpoint` | Local merged model directory. |
| `question` | Question and optional answer choices. |

| Field | Meaning |
| --- | --- |
| `answer` | Decoded model response. |
| `prompt_sha256 / provenance` | Exact prompt fingerprint and model information. |

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| First token only / 4 NMR counting questions | recorded model | examples | 4 |
| First token only / 4 NMR counting questions | recorded model | unrestricted_first_token_hits | 0 |
| First token only / 4 NMR counting questions | recorded model | four_choice_hits | 0 |
| Full generated responses / 32 examples | recorded model | examples | 32 |
| Full generated responses / 32 examples | recorded model | exact_rate | 0.125 |
| Full generated responses / 32 examples | recorded model | format_valid_rate | 0.90625 |

[Evidence / 运行记录](../assets/examples/spectroscopy-qa.json) · [MCP](../harness/mcp.md)

```bash
python -m openmolspec_bench run --workspace /path/to/OpenMolSpec --tasks spectroscopy.qa --language-checkpoint /path/to/SpecMol-7B --language-data /path/to/test.jsonl --device cuda --limit 8 --output results/spectroscopy-qa.json
```

[Model / 模型](https://github.com/Eurekashen/SpecMol)
