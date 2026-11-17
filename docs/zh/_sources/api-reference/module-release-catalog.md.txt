# openmolspec.release.catalog

Build molecule-level full and strictly aligned OpenMolSpec catalogs.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.release.catalog.build_catalog` | Create record, full-molecule and strict-align Parquet tables. |
| {py:data}`openmolspec.release.catalog.CATALOG_VERSION` | Module constant or schema value. |
| {py:data}`openmolspec.release.catalog.STRICT_ALIGN_DEFINITION` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.release.catalog

.. py:function:: build_catalog(config: Mapping[str, Any], *, manifest_path: Optional[str]=None, frequency_report_path: Optional[str]=None, nmr_report_path: Optional[str]=None) -> Dict[str, Any]

   Create record, full-molecule and strict-align Parquet tables.

   ``full`` is molecular-identity unique. It retains independent sample IDs for
   the best frequency and NMR records. ``align`` is a subset whose modalities
   coexist on one source record, preventing accidental cross-conformer pairing.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/catalog.py#L62>`__

.. py:data:: CATALOG_VERSION

   ::

      '1.1.0'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/catalog.py#L15>`__

.. py:data:: STRICT_ALIGN_DEFINITION

   ::

      ('frequency parser success with frequencies, IR and Raman present, and NMR parser '
       'success for the same sample_id')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/catalog.py#L16>`__
```
