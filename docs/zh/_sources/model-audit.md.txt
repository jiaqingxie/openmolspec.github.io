# 模型与训练

选择任务即可查看对应模型、准确输入输出、调用方式、训练路径与目标函数。Python SDK 与作者训练实现使用文档中列出的数据约定。

| Task | Spectroscopy | Guide |
| --- | --- | --- |
| `nmr.forward.1H` | 1H | [结构 → 1H 峰列表](tasks/nmr-forward-1H.md) |
| `nmr.forward.13C` | 13C | [结构 → 13C 峰列表](tasks/nmr-forward-13C.md) |
| `nmr.forward.19F` | 19F | [结构 → 19F 峰列表](tasks/nmr-forward-19F.md) |
| `nmr.forward.31P` | 31P | [结构 → 31P 峰列表](tasks/nmr-forward-31P.md) |
| `nmr.forward.11B` | 11B | [结构 → 11B 峰列表](tasks/nmr-forward-11B.md) |
| `nmr.forward.29Si` | 29Si | [结构 → 29Si 峰列表](tasks/nmr-forward-29Si.md) |
| `nmr.retrieval.h.s2m` | 1H | [谱图 → 结构检索 · H](tasks/nmr-retrieval-h-s2m.md) |
| `nmr.retrieval.h.m2s` | 1H | [结构 → 谱图检索 · H](tasks/nmr-retrieval-h-m2s.md) |
| `nmr.generation.h` | 1H | [谱图 → SMILES · H](tasks/nmr-generation-h.md) |
| `nmr.retrieval.c.s2m` | 13C | [谱图 → 结构检索 · C](tasks/nmr-retrieval-c-s2m.md) |
| `nmr.retrieval.c.m2s` | 13C | [结构 → 谱图检索 · C](tasks/nmr-retrieval-c-m2s.md) |
| `nmr.generation.c` | 13C | [谱图 → SMILES · C](tasks/nmr-generation-c.md) |
| `nmr.retrieval.hc.s2m` | 1H, 13C | [谱图 → 结构检索 · HC](tasks/nmr-retrieval-hc-s2m.md) |
| `nmr.retrieval.hc.m2s` | 1H, 13C | [结构 → 谱图检索 · HC](tasks/nmr-retrieval-hc-m2s.md) |
| `nmr.generation.hc` | 1H, 13C | [谱图 → SMILES · HC](tasks/nmr-generation-hc.md) |
| `vibrational.gap.ir` | IR | [IR → HOMO–LUMO gap](tasks/vibrational-gap-ir.md) |
| `vibrational.gap.raman` | RAMAN | [RAMAN → HOMO–LUMO gap](tasks/vibrational-gap-raman.md) |
| `vibrational.gap.ir_raman` | IR, RAMAN | [IR_RAMAN → HOMO–LUMO gap](tasks/vibrational-gap-ir_raman.md) |
| `vibrational.gap.ir_raman_hc` | IR, Raman, 1H, 13C | [IR + Raman + H/C NMR → HOMO–LUMO gap](tasks/vibrational-gap-ir_raman_hc.md) |
| `vibrational.forward` | IR, Raman | [构象 → IR / Raman](tasks/vibrational-forward.md) |
| `vibrational.retrieval` | IR, Raman | [IR / Raman → 结构检索](tasks/vibrational-retrieval.md) |
| `vibrational.generation` | IR, Raman | [IR / Raman → SMILES](tasks/vibrational-generation.md) |
| `nmr.assignment` | 1H, 13C | [H/C 峰 → 原子指认](tasks/nmr-assignment.md) |
| `nmr.solvent_transfer` | 1H, 13C | [H/C 跨溶剂位移 · 参考检索基线](tasks/nmr-solvent_transfer.md) |
| `spectroscopy.reranking` | IR, Raman | [谱图 + 候选结构 → 重排](tasks/spectroscopy-reranking.md) |
| `vibrational.retrieval.hc` | IR, Raman, 1H, 13C | [IR + Raman + H/C → 结构检索](tasks/vibrational-retrieval-hc.md) |
| `vibrational.generation.hc` | IR, Raman, 1H, 13C | [IR + Raman + H/C → SMILES（Xinyu 协议）](tasks/vibrational-generation-hc.md) |
| `spectroscopy.reranking.hc` | IR, Raman, 1H, 13C | [IR + Raman + H/C + 候选 → ITM 重排](tasks/spectroscopy-reranking-hc.md) |
| `nmr.hsqc.transpeaknet` | HSQC | [结构与溶剂 → HSQC 交叉峰](tasks/nmr-hsqc-transpeaknet.md) |
| `ms.forward.glacier` | MS/MS | [分子 → MS/MS（GLACIER）](tasks/ms-forward-glacier.md) |
| `ms.forward.iceberg` | MS/MS | [分子 → MS/MS（ICEBERG）](tasks/ms-forward-iceberg.md) |
| `ms.annotation.magma` | MS/MS | [MS/MS 峰 → MAGMa 候选碎片标注](tasks/ms-annotation-magma.md) |

[Python SDK](api.md) · [Data splits](data/splits.md) · [Tutorials](notebooks/index.md) · [Spectra Harness](harness.md)
