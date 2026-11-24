# 快速开始

本教程从安装开始，依次介绍如何读取 NMR 记录、预测化学位移，以及用自己的数据训练模型。命令在克隆后的仓库根目录运行，示例文件位于仓库中。

## 使用网页

在[工作台](https://jiaqingxie.github.io/openmolspec.github.io/?lang=zh#tool)中选择任务，查看输入和输出。[蔗糖案例](https://jiaqingxie.github.io/openmolspec.github.io/?lang=zh#tool-sucrose)可载入 BMRB bmse000119 在重水中的 11 组实测（¹³C，¹H）HSQC 峰对。首页的氢谱和碳谱来自同一样品。

在[数据探索](https://jiaqingxie.github.io/openmolspec.github.io/?lang=zh#dataset)中选择谱种并输入 SMILES。命中同结构记录时可查看实验谱及来源，缺少对应核磁、红外或拉曼记录时调用已部署的预测器。预测 MS/MS 时请在工作台填写采集条件。配对案例可查看基于独立位点标注的核磁 R² 与峰位匹配。[智能体案例](https://jiaqingxie.github.io/openmolspec.github.io/?lang=zh#agent-demo)支持免密钥回放，实时提问需要服务端配置模型提供方。

## 1. 安装 OpenMolSpec

使用 Python 3.10 或更新版本。创建环境后，安装工具包及数据格式、绘图依赖。

```bash
git clone --branch release/openmolspec-v1 https://github.com/jiaqingxie/openmolspec-studio-frontend.git
cd openmolspec-studio-frontend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -e ".[data,analysis]"
```

[v1.0 发布页](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)也提供 wheel 安装包。release 分支包含当前数据卡与手册示例。

## 2. 读取第一条谱

先读取仓库自带的三个 NMRSpec 示例分子。`MolecularSpectra` 按名称组织数据划分，每个划分从文件逐条读取；`head(1)` 返回第一条记录。

```python
from openmolspec.dataset import MolecularSpectra

examples = MolecularSpectra.from_jsonl(
    splits={"test": "documentation/assets/sdk-nmr-test-examples.jsonl"},
    name="nmrspec_examples", domain="experimental")
record = examples["test"].head(1)[0]
print(record["smiles"])
print(record["formula"])
print(record["c_nmr"])
```

`smiles` 描述分子结构，`formula` 保存分子式，`h_nmr`／`c_nmr` 保存实验谱记录。`_openmolspec` 记录数据集名称、划分和可用通道。

## 3. 加载完整数据集

使用清洗后的 OpenDataLab H/C 集合时，将 `train.jsonl`、`val.jsonl`、`test.jsonl` 放在 `data/nmr`，再按注册名称加载。

```python
from openmolspec.dataset import molspectra, list_datasets

print([card["name"] for card in list_datasets()])
data = molspectra("opendatalab_nmr", root="data/nmr")
paired = data["train"].select(modalities=["1H", "13C"], limit=100)
for molecule in paired.head(3):
    print(molecule["smiles"], molecule["h_peaks_ppm"])
print(data.verify())
```

通道筛选会选择同时含 H、C 谱的分子。`verify()` 核对本地文件与数据版本是否一致。[数据指南](data/index.md)提供清洗后数量、各核种文件、实验条件及其他资源。

## 4. 预测化学位移

NMRNet 使用发布的模型文件和对应 Python 环境。`models_root` 指向包含 `nmrnet/` 的目录，`python` 指向安装了 NMRNet 依赖的解释器。[模型指南](tasks/nmr-forward-13C.md)介绍所需文件及核种设置。

```python
from openmolspec.model import NMRNet

model = NMRNet.from_pretrained(
    "models", nucleus="13C", python="/path/to/nmr-env/bin/python")
result = model.predict("CCO")
print(result["records"][0]["atom_indices"])
print(result["records"][0]["prediction_ppm"])
```

乙醇示例返回碳原子编号 `[0, 1]`，位移约为 `[17.774, 57.774]` ppm。原子编号遵循 RDKit 加氢后的 0 起始顺序，可用这些编号把位移标到分子图上。

## 5. 与实测峰比较并保存结果

```python
import json
from pathlib import Path
from openmolspec.benchmark import evaluate_nmr

metrics = evaluate_nmr(result, [[18.2, 58.3]])
print(metrics)
Path("ethanol-prediction.json").write_text(json.dumps(result, indent=2))
model.save_config("nmrnet-config.json")
restored = NMRNet.from_config("nmrnet-config.json")
```

`evaluate_nmr` 匹配预测峰与实测峰，并返回误差和覆盖率。结果 JSON 保存逐原子预测及模型来源；配置文件保存模型设置，便于后续加载。

## 6. 使用自己的 NMR 数据训练

先安装训练依赖，再按 [NMR 字段格式](data/nmr.md)准备独立的训练、验证 JSONL 文件。每条记录包含分子结构、分子式、谱文本与通道掩码。

```bash
python -m pip install -e ".[train]"
```

```python
from openmolspec.dataset import MolecularSpectra
from openmolspec.training import prepare_nmr_training
from openmolspec.model import NMRTransformer

custom = MolecularSpectra.from_jsonl(
    splits={"train": "train.jsonl", "val": "val.jsonl"},
    name="my_nmr", domain="experimental")
prepared = prepare_nmr_training(
    custom["train"], custom["val"], "prepared-nmr")
model = NMRTransformer(stage="align", device="cpu")
plan = model.training_plan(
    prepared, run_dir="runs/my-encoder", epochs=10, batch_size=32)
print(plan.validate())
trained = model.fit(plan)
print(trained)
```

数据准备会检查分子式、核种标签及训练／验证分子重叠。对齐阶段学习共享的谱与分子表征。训练结构生成器时使用 `stage="generate"`，并提供保存的对齐 checkpoint。[训练教程](notebooks/sdk-training-preflight.ipynb)逐步介绍数据准备、参数配置、权重保存与重载。

## 继续学习

- [Tasks](tasks/index.md): 每个谱学任务的输入、输出与模型调用。
- [Tutorials](notebooks/index.md): 已执行的示例、图与解释。
- [API reference](api-reference/index.md): 类、签名、参数与返回值。
- [Agent Harness](harness.md): Python、CLI 与 MCP 谱学工具。
