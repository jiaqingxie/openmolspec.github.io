# openmolspec.release

Versioned OpenMolSpec release construction utilities.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.release.build_catalog` | Create record, full-molecule and strict-align Parquet tables. |
| {py:func}`openmolspec.release.build_splits` | Build the configured molecular training, validation and test partitions. |

```{eval-rst}
.. py:module:: openmolspec.release

.. py:function:: build_catalog(config: Mapping[str, Any], *, manifest_path: Optional[str]=None, frequency_report_path: Optional[str]=None, nmr_report_path: Optional[str]=None) -> Dict[str, Any]

   Create record, full-molecule and strict-align Parquet tables.

   ``full`` is molecular-identity unique. It retains independent sample IDs for
   the best frequency and NMR records. ``align`` is a subset whose modalities
   coexist on one source record, preventing accidental cross-conformer pairing.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/catalog.py#L62>`__

.. py:function:: build_splits(config: Mapping[str, Any]) -> Dict[str, Any]

   Build the configured molecular training, validation and test partitions.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/splits.py#L89>`__
```
