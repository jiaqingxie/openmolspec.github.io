# SpecMol 谱学问答

基础模型在 32 道 NMRSpec 峰数题中答对 4 道，29 道返回有效选项。[查看完整回答与微调协议](../benchmarks/multimodal.md)。

针对输入谱图文本提问。

将问题与谱图文本交给发布的 SpecMol-7B 聊天模型。

统计完整回答的选项正确率和格式有效率，首个 token 的诊断单列。

| Field | Meaning |
| --- | --- |
| `spectrum` | 按作者格式提供的谱图文本。 |
| `model_config.checkpoint` | 本地合并权重目录。 |
| `question` | 问题与可选答案。 |

| Field | Meaning |
| --- | --- |
| `answer` | 模型解码得到的完整回答。 |
| `prompt_sha256 / provenance` | 提示文本指纹及模型信息。 |

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
