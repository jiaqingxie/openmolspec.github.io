# SpectraLLM 多谱结构生成

11 月 24 日快照中，SpectraLLM 评测已暂停。仍可通过本地权重接口调用。

根据多谱文本生成分子结构。

32B 权重读取作者提供的系统消息与谱图问题，参考 SMILES 仅用于评分。

统计格式有效率及规范 SMILES 完全匹配率。

| Field | Meaning |
| --- | --- |
| `spectrum` | 按作者格式提供的谱图文本。 |
| `model_config.checkpoint` | 本地合并权重目录。 |
| `system` | 作者题例中的可选系统消息。 |

| Field | Meaning |
| --- | --- |
| `answer` | 模型解码得到的完整回答。 |
| `prompt_sha256 / provenance` | 提示文本指纹及模型信息。 |



[Evidence / 运行记录](../assets/examples/multispectral-spectrallm-generation.json) · [MCP](../harness/mcp.md)

```bash
python -m openmolspec_bench run --workspace /path/to/OpenMolSpec --tasks multispectral.spectrallm.generation --language-checkpoint /path/to/SpectraLLM_32B --language-data /path/to/QM9S.jsonl --device cuda --limit 8 --output results/multispectral-spectrallm-generation.json
```

[Model / 模型](https://github.com/OPilgrim/SpectraLLM)
