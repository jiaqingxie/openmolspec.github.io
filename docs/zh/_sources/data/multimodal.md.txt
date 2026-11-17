# 多模态数据

多模态记录将模型联合使用的光谱通道组织在一起。准备训练批次前先选择所需通道。实验 H/C 视图包含 238,226 个同时具有氢谱和碳谱的分子；计算 openSpec 视图联合 IR、Raman 与 H/C 位移。

```python
paired = data["train"].select(modalities=["1H", "13C"], limit=100)
for record in paired:
    print(record["smiles"], record["modality_mask"])
```

实验跨模态关联使用标准分子身份，同时保留来源文献和采集条件。构象到光谱的学习使用参考计算对应的坐标；NMR 模型输入元数据保留核种和化学位移参考。

## 参考文献

- OpenDataLab. WanJuan MolSpectra, version 1.0.3. Experimental molecular spectroscopy dataset. [Source](https://opendatalab.com/)
- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
