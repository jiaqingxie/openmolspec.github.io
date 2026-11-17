# 常用流程

## 选择输入

结构用于谱预测，结构与峰用于指认，谱用于检索或生成，时域信号用于数值反演。见[任务](tasks/index.md)。

## 读取峰表

NMR 使用 ppm 位置，MS 使用 m/z–强度对，IR/Raman 使用 cm⁻¹ 位置及可用强度。构建密集光谱时，将网格和展宽参数与数组一起保存。

## 选择模型环境

通过 `python=` 指定安装了模型依赖的解释器，在模型类中指定 checkpoint 或模型根目录。见 [SDK](api.md)。

## 训练自己的数据

使用 `MolecularSpectra.from_jsonl` 导入训练／验证文件，再通过 `prepare_nmr_training` 准备数据，创建训练计划并调用 `model.fit(plan)`。

## 创建数据划分

使用 `split_records` 按连接关系随机分组或按骨架划分，再从 manifest 查看数量、分组策略和文件哈希。见[划分](data/splits.md)。

## 把预测映射到原子

NMRNet 使用 RDKit AddHs 后的 0 起始原子编号，MAGMa 使用 `engine_smiles` 图上的编号。绘制指认时同时保留返回的图和编号。

## 运行教程

克隆 release 分支并安装 `requirements-docs-examples.txt`。科学绘图使用 Arial，可通过 `OPENMOLSPEC_ARIAL_FONT` 指定本机 TTF；SDK 推理教程另外配置模型路径。

## 连接 Agent

通过 Python、JSON 命令行请求或 MCP 使用 Spectra Harness。先发现任务、验证请求，再执行并读取 `result`。见 [Agent Harness](harness.md)。
