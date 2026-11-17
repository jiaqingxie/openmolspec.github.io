# 数据集划分

清洗后的 H/C 文件保留原有训练、验证和测试角色，各文件之间的标准分子身份没有交集。

| Split | 分子数 |
| --- | --- |
| train | 2,172,790 |
| val | 250,836 |
| test | 254,885 |

其他实验视图采用固定 OpenMolSpec v1 骨架划分。下表统计各文件中的可用谱。

| 视图 | Train | Validation | Test |
| --- | --- | --- | --- |
| IR | 143,791 | 16,686 | 17,282 |
| 19F | 46,303 | 5,011 | 5,365 |
| 31P | 17,739 | 2,248 | 1,675 |
| MS | 4,266 | 467 | 500 |
| 11B | 967 | 81 | 92 |
| Raman | 34 | 3 | 5 |
| 29Si | 630 | 61 | 35 |

## 创建自己的划分

```python
from openmolspec.split import split_records

manifest = split_records(
    data["train"], "my-scaffold-dataset", method="scaffold",
    seed=2026, ratios=(.8, .1, .1),
    source="OpenDataLab", domain="experimental")
print(manifest["files"])
```

`method="scaffold"` 按规范化 Bemis–Murcko 骨架分组，`method="random"` 按分子连接关系分组。导出记录随机种子、分组策略、原始角色及文件哈希；划分后的数量见保存的 manifest。

固定分子成员文件：[Manifest](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/v1.0/manifest.json) · [Train](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/v1.0/train.csv.gz) · [Validation](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/v1.0/val.csv.gz) · [Test](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/v1.0/test.csv.gz)

## 参考文献

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- OpenDataLab. WanJuan MolSpectra, version 1.0.3. Experimental molecular spectroscopy dataset. [Source](https://opendatalab.com/)
