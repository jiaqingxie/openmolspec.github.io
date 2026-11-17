# openmolspec.workflows.nmr

Batch NMR extraction for the OpenSpec staged pipeline.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.workflows.nmr.extract_nmr` | Parse all NMR files listed by the manifest-generated ID map. |

```{eval-rst}
.. py:module:: openmolspec.workflows.nmr

.. py:function:: extract_nmr(*, file_dict: Optional[str]=None, smiles_dict: Optional[str]=None, manifest_path: Optional[str]=None, output: str, report_dir: str, workers: int, broadening_sigma: float=SPECTRUM_PARAMETERS['nmr_broadening_sigma']) -> Dict[str, Any]

   Parse all NMR files listed by the manifest-generated ID map.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/nmr.py#L45>`__
```
