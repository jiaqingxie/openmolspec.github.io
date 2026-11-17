# 参与贡献

可以贡献数据集、模型适配器、任务、教程或理论示例。请附来源引用、数据表示、单位、输入输出契约与可复现示例。

数据集需说明实验／计算来源、版本、计数单位、访问条件和划分方法。模型适配器说明原实现、checkpoint、预期条件与训练路径。任务需给出指标和实际案例；教学模拟需说明参数与模拟数据性质。

运行与改动相关的测试，更新页面并执行受影响的 notebook，然后构建：

```bash
python scripts/build_bilingual_docs.py --check
python scripts/build_sdk_notebooks.py --check
python scripts/build_readthedocs.py --output site --strict
```

构建会校验 notebook 源码与证据哈希，发布前须执行变化的教程。问题反馈可提交 [GitHub issue](https://github.com/jiaqingxie/openmolspec-studio-frontend/issues)，附任务 ID、输入格式、环境与错误信息，避免包含凭据和未公开原始数据。
