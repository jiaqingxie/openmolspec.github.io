# openmolspec.workflows.frequency

Batch Gaussian extraction stage for the OpenSpec pipeline.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.workflows.frequency.extract_frequency` | Extract the frequency, property and vibrational-spectrum dataset. |

```{eval-rst}
.. py:module:: openmolspec.workflows.frequency

.. py:function:: extract_frequency(*, file_dict: Optional[str]=None, smiles_dict: Optional[str]=None, manifest_path: Optional[str]=None, output: str, report_dir: str, workers: int, frequency_scaling_factor: float, ir_broadening_sigma: float, raman_broadening_sigma: float) -> Dict[str, Any]

   Extract the frequency, property and vibrational-spectrum dataset.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/frequency.py#L49>`__
```
