# openmolspec.release.export

Export legacy DataFrame pickles as resumable Parquet + HDF5 shards.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.release.export.export_pickle` | Export selected release records as Python pickle data. |
| {py:func}`openmolspec.release.export.export_release` | Export the configured molecular release formats. |
| {py:func}`openmolspec.release.export.index_payload` | Rebuild global indices and a complete payload summary from shard manifests. |
| {py:func}`openmolspec.release.export.read_array_row` | Read one array from a release shard; useful for examples and tests. |
| {py:data}`openmolspec.release.export.EXPORT_VERSION` | Module constant or schema value. |
| {py:data}`openmolspec.release.export.FIELD_ALIASES` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.release.export

.. py:function:: export_pickle(source: Path, destination: Path, *, kind: str, shard_size: int, compression: Optional[str]='lzf', workers: int=1) -> Dict[str, Any]

   Export selected release records as Python pickle data.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/export.py#L201>`__

.. py:function:: export_release(config: Mapping[str, Any], only: Optional[str]=None) -> Dict[str, Any]

   Export the configured molecular release formats.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/export.py#L267>`__

.. py:function:: index_payload(config: Mapping[str, Any]) -> Dict[str, Any]

   Rebuild global indices and a complete payload summary from shard manifests.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/export.py#L358>`__

.. py:function:: read_array_row(path: str | Path, field: str, row: int) -> Optional[np.ndarray]

   Read one array from a release shard; useful for examples and tests.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/export.py#L389>`__

.. py:data:: EXPORT_VERSION

   ::

      '1.0.0'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/export.py#L22>`__

.. py:data:: FIELD_ALIASES

   ::

      {'atom': 'atomic_numbers',
       'coordinate': 'coordinates',
       'freq': 'frequencies',
       'ir': 'ir_spectrum',
       'raman': 'raman_spectrum',
       'isotropic': 'nmr_isotropic',
       'anisotropy': 'nmr_anisotropy',
       'shielding_tensor': 'nmr_tensor'}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/export.py#L27>`__
```
