# Python SDK

OpenMolSpec 提供流式数据集、谱学模型类、训练计划和评测入口。本节介绍这些接口如何配合使用。安装与首次预测步骤见[快速开始](quickstart.md)。

## 数据集对象

```python
from openmolspec.dataset import molspectra, list_datasets

print([card["name"] for card in list_datasets()])
data = molspectra("opendatalab_nmr", root="data/nmr")
splits = data.get_split()
rows = splits["test"].head(3)
paired = splits["train"].select(modalities=["1H", "13C"], limit=100)
print(data.summary())
print(data.verify())
```

`MolecularSpectra` 按名称组织划分；`SpectraSplit` 在迭代时逐条读取，避免把全库载入内存。`select` 组合通道筛选与行数上限，`head` 返回少量记录；`verify` 核对完整本地文件与数据版本。

| 注册名称 | Format | 说明 |
| --- | --- | --- |
| `transpeaknet_hsqc_test` | `transpeaknet_hsqc_zip` | 作者发布的 HSQC 测试 ZIP，含 479 张实验谱及专家碳原子指认。 |
| `opendatalab_nmr` | `nmr_jsonl` | 清洗后的实验 H/C NMR。 |
| `nmrspec_test` | `nmr_jsonl` | NMRSpec / NMRTrans |
| `patent_test_10k` | `nmr_jsonl` | OpenDataLab H/C 评测子集。 |
| `nmrexp_exp_10k` | `nmr_jsonl` | 整理后的 NMRexp 评测视图。 |
| `nmrgym_test` | `nmr_jsonl` | NMRGym |
| `openspec_test` | `openspec_lmdb` | 计算多谱及分子性质。 |
| `massspecgym_test` | `massspecgym_csv` | 整理后的 MS/MS 评测 CSV。 |
| `massspecgym_1_5` | `massspecgym_tsv` | 保留原划分的 MassSpecGym v1.5 TSV。 |
| `opendatalab_nmr_prepared` | `nmr_jsonl` | 原始准备版 H/C 文件。 |
| `opendatalab_ir` | `jsonl` | 清洗后的实验 IR |
| `opendatalab_19f` | `jsonl` | 清洗后的实验 19F |
| `opendatalab_31p` | `jsonl` | 清洗后的实验 31P |
| `opendatalab_ms` | `jsonl` | 清洗后的实验 MS |
| `opendatalab_11b` | `jsonl` | 清洗后的实验 11B |
| `opendatalab_raman` | `jsonl` | 清洗后的实验 RAMAN |
| `opendatalab_29si` | `jsonl` | 清洗后的实验 29SI |

从作者仓库下载 [TransPeakNet 测试 ZIP](https://github.com/siriusxiao62/2dNMR/tree/main/data_annotation)。读取器保留原始 SMILES 顺序，`hsqc_peaks` 是 [¹³C ppm, ¹H ppm] 坐标对，`hsqc_assignments` 是按碳原子整理的指认。完整训练谱和验证谱需向作者申请。

```python
hsqc = molspectra("transpeaknet_hsqc_test", root="HSQC_Annotation_TestData.zip")
print(hsqc.verify())
record = hsqc["test"].select(modalities=["HSQC"]).head(1)[0]
print(record["smiles"], record["hsqc_peaks"])
```

每条记录保留来源字段，`_openmolspec` 补充数据集、数据域、划分、文件位置与通道。数值字段、单位、采集条件及清洗后数量见[数据指南](data/index.md)。

## 导入自己的测量

```python
from openmolspec.dataset import MolecularSpectra

custom = MolecularSpectra.from_jsonl(
    splits={"train": "my-train.jsonl", "val": "my-val.jsonl"},
    name="my_measurements", domain="experimental")
print(custom["train"].head(1))
```

H/C JSONL 使用 `format="nmr_jsonl"`；杂核位移、光学峰表或一般谱字典使用 `format="jsonl"`。读取器识别 `nucleus` 与 `peaks_ppm`、`modality` 与 `wavenumber_cm1`，以及数值质谱 `peaks`。

## 模型接口

| Class | 输入 → 输出 | 训练方式 |
| --- | --- | --- |
| `NMRNet` | SMILES → ¹H/¹³C shifts; structure + peaks → assignments | [NMRNet](tasks/nmr-forward-13C.md) |
| `NMRTransformer(stage="align")` | NMR + 候选结构 → 排名 | `training_plan`, `fit` |
| `NMRTransformer(stage="generate")` | NMR + 分子式 → 分子结构 | `training_plan`, `fit` |
| `GapModel` | IR + Raman + H/C → gap (eV) | [openSpec](tasks/vibrational-gap-ir_raman_hc.md) |
| `Vib2Mol` | 光谱 → 分子结构或候选排序 | [openSpec](tasks/vibrational-generation-hc.md) |
| `MSPredictor` | 分子 + 采集条件 → MS/MS | [ms-pred](tasks/ms-forward-glacier.md) |

通过 `python=` 指定各模型的依赖环境，使 OpenMolSpec 客户端可以调用安装了作者实现及权重的解释器。

### NMRNet

```python
from openmolspec.model import NMRNet

model = NMRNet.from_pretrained(
    "models", nucleus="13C", python="/path/to/nmr-env/bin/python")
prediction = model.predict("CCO")
print(prediction["records"][0]["atom_indices"])
print(prediction["records"][0]["prediction_ppm"])
assignments = model.assign("CCO", [18.2, 58.3], tolerance_ppm=5.0)
```

模型目录包含 `nmrnet/nmrnet-orig` 与 `nmrnet/weights`。液相 fold-0 接口在 CPU 上预测 H/C 位移。原子编号采用 RDKit 加氢后的 0 起始顺序。指认结果把实测峰编号关联到预测原子位点，并提供残差与备选匹配。

### NMRTransformer

```python
from openmolspec.model import NMRTransformer

query = data["test"].head(1)[0]
aligner = NMRTransformer.from_pretrained(
    "alignment.pt", stage="align", python="/path/to/nmr-env/bin/python")
ranking = aligner.retrieve(query, ["CCO", "CCCO", "COC"], top_k=3)
generator = NMRTransformer.from_pretrained(
    "generation.pt", stage="generate",
    python="/path/to/nmr-env/bin/python")
candidates = generator.predict(query, beam_size=5)
```

检索利用谱与分子嵌入为给定候选排序；生成使用查询中的 NMR 通道和已知 `formula`。返回候选包括 SMILES、有效性、分子式一致性与模型分数。

### 振动谱与性质模型

```python
import json
from pathlib import Path
from openmolspec.model import GapModel, Vib2Mol

inputs = json.loads(Path(
    "documentation/assets/harness/vibrational-request.json").read_text())["inputs"]
gap_model = GapModel(root="openspec-models", python="/path/to/openspec-env/bin/python")
gap = gap_model.predict(inputs)
structure_model = Vib2Mol(root="openspec-models", python="/path/to/openspec-env/bin/python")
structures = structure_model.predict(inputs)
```

IR 和 Raman 各包含 400–4,000 cm⁻¹ 网格上的 1,024 点归一化强度。`nmr_h` 与 `nmr_c` 保存采用权重参考标准的 ppm 位移。`GapModel` 返回 eV 能隙；`Vib2Mol` 生成分子候选，`retrieve` 则为给定候选库排序。

### 质谱预测

```python
from openmolspec.model import MSPredictor

ms = MSPredictor(model="glacier", source="ms-pred",
    weights="glacier-weights", python="/path/to/ms-env/bin/python")
prediction = ms.predict(smiles="CCO", adduct="[M+H]+",
    collision_energy=20.0, instrument="Orbitrap")
print(prediction)
```

提供目标谱对应的分子结构、加合物、碰撞能与仪器。ICEBERG 接口使用 `model="iceberg"`。模型文件与谱比较设置见任务指南。

## 训练与权重复用

```python
from openmolspec.training import prepare_nmr_training

prepared = prepare_nmr_training(custom["train"], custom["val"], "prepared-nmr")
model = NMRTransformer(stage="align", device="cpu")
plan = model.training_plan(
    prepared, run_dir="runs/my-encoder", epochs=10, batch_size=32)
print(plan.describe())
print(plan.validate())
trained = model.fit(plan)
model.save_config("trained-model.json")
restored = NMRTransformer.from_config("trained-model.json")
```

准备阶段检查分子式、核种与训练／验证身份分离。`fit` 启动指定阶段训练，并选择最佳验证 checkpoint。生成器使用 `stage="generate"` 并指定对齐权重。[训练教程](notebooks/sdk-training-preflight.ipynb)解释准备步骤，并检查保存的训练与权重结果。

## 评测与数值反演

```python
from openmolspec.task import list_tasks
from openmolspec.benchmark import Benchmark

print(list_tasks(group="nmr"))
benchmark = Benchmark(workspace="/path/to/OpenMolSpec",
    python="/path/to/nmr-env/bin/python", alignment_checkpoint="alignment.pt", nmr_python="/path/to/nmr-env/bin/python")
report = benchmark.run("nmr.retrieval.hc.s2m", datasets=["nmrspec_test"],
    limit=64, output="results/my-retrieval.json")
```

任务指标与实验配置见[基准评测](benchmarks.md)。反演模块提供弛豫、扩散分布的非负正则化恢复，见 [NMR 反演](inversion/index.md)。完整 [API 参考](api-reference/index.md)列出签名、参数与返回值。

## 参考文献

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Xu, F., Guo, W., Wang, F., Yao, L., Wang, H., Tang, F., Gao, Z., Zhang, L., E, W., Tian, Z.-Q., et al. Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts. Nature Computational Science 5, 292–300 (2025). doi:10.1038/s43588-025-00783-z. [Source](https://doi.org/10.1038/s43588-025-00783-z)
- Yang, L., Yang, Z., Xie, J., Wang, Y., Gao, B., Fu, T., Wei, X., Sun, J., Wu, J., He, C., Li, Y. & Gu, Q. NMRTrans: Structure Elucidation from Experimental NMR Spectra via Set Transformers. arXiv:2602.10158 (2026). [Source](https://arxiv.org/abs/2602.10158)
- OpenMolSpec contributors. openSpec models and benchmark training workflows. Source archive, v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)
- Wang, R.-X., Wang, R. & Coley, C. W. GLACIER: Rethinking Mass Spectrum Prediction as an Object Detection Problem. NeurIPS 2026. arXiv:2606.29161 (2026). [Source](https://arxiv.org/abs/2606.29161)
- Wang, R., Manjrekar, M., Mahjour, B., Avila-Pacheco, J., et al. Neural Spectral Prediction for Structure Elucidation with Tandem Mass Spectrometry. bioRxiv (2025). doi:10.1101/2025.05.28.656653. [Source](https://doi.org/10.1101/2025.05.28.656653)
- NMRInversions.jl contributors. NMRInversions.jl: inversion of NMR relaxation and diffusion measurements. Software and theory documentation. Accessed 18 November 2026. [Source](https://github.com/aris-mav/NMRInversions.jl)
