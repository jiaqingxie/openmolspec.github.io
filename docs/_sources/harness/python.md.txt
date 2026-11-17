# Python interface

Create a Harness once, then use it for discovery, input validation and prediction. Each family plugin translates its task request into the corresponding model call.

```python
from openmolspec.harness import SpectraHarness

harness = SpectraHarness()
inputs = {'smiles': 'CCO'}
settings = {'root': '/path/to/models',
            'python': '/path/to/nmr-env/bin/python'}

harness.validate('nmr.forward.13C', inputs, settings)
report = harness.run('nmr.forward.13C', inputs, settings, repeats=2)
print(report['result']['records'])
print(report['repeat_predictions_equal'])
```

## Read the response

| Field | Meaning |
| --- | --- |
| `completed` | Whether all requested calls finished successfully. |
| `result` | Prediction returned by the last call. |
| `calls` | Per-call index, status, elapsed seconds and output hashes. |
| `repeat_predictions_equal` | Equality of the prediction fields across repeated calls. |
| `repeat_results` | Complete outputs when repeating a request. |

```python
prediction = report['result']
for call in report['calls']:
    print(call['index'], call['status'], call['elapsed_seconds'])
```

## Custom backends

Provide a validation function and an execution function to replace the backend of a registered task.

```python
from openmolspec.harness import HarnessPlugin, SpectraHarness

def validate(task, inputs, settings):
    if not inputs.get('smiles'):
        raise ValueError('Supply smiles')

def execute(task, inputs, settings):
    return my_model.predict(inputs['smiles'])

plugin = HarnessPlugin('My NMR model', ('nmr.forward.13C',),
                       validate, execute)
harness = SpectraHarness(plugins=[plugin])
```


## References

- DeepSeek-AI. DeepSeek Harness: modular agent tools and execution infrastructure. Software repository. Accessed 18 November 2026. [Source](https://github.com/deepseek-ai/deepseek-harness)
- Xu, F., Guo, W., Wang, F., Yao, L., Wang, H., Tang, F., Gao, Z., Zhang, L., E, W., Tian, Z.-Q., et al. Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts. Nature Computational Science 5, 292–300 (2025). doi:10.1038/s43588-025-00783-z. [Source](https://doi.org/10.1038/s43588-025-00783-z)
- Wang, R.-X., Wang, R. & Coley, C. W. GLACIER: Rethinking Mass Spectrum Prediction as an Object Detection Problem. NeurIPS 2026. arXiv:2606.29161 (2026). [Source](https://arxiv.org/abs/2606.29161)
- Wang, R., Manjrekar, M., Mahjour, B., Avila-Pacheco, J., et al. Neural Spectral Prediction for Structure Elucidation with Tandem Mass Spectrometry. bioRxiv (2025). doi:10.1101/2025.05.28.656653. [Source](https://doi.org/10.1101/2025.05.28.656653)
- OpenMolSpec contributors. openSpec models and benchmark training workflows. Source archive, v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)
