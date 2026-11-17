# openmolspec.workflows.manifest

Orchestrate source scanning and assembly of the unified manifest.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.workflows.manifest.build_manifest` | Build the input-file manifest for molecular data processing. |

```{eval-rst}
.. py:module:: openmolspec.workflows.manifest

.. py:function:: build_manifest(*, frequency_root: str, nmr_root: str, output_dir: str, datasets: Iterable[str], nmr_datasets: Iterable[str], include_nmr: bool=True, hash_files: bool=True, workers: int=1, show_rdkit_warnings: bool=False, cache_dir: str | None=None, incremental: bool=True, min_file_age_seconds: float=0.0, audit_all_records: bool=False, write_compatibility_json: bool=True) -> Dict[str, Any]

   Build the input-file manifest for molecular data processing.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest.py#L18>`__
```
