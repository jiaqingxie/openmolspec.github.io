# openmolspec.core.processing

Shared structured processing results for the extraction CLIs.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.core.processing.classify_exception` | Map a parser exception to the stable v1 error taxonomy. |
| {py:func}`openmolspec.core.processing.source_parts` | Return a best-effort source dataset and source ID from a sample ID. |
| {py:func}`openmolspec.core.processing.file_sha256` | Return a source-file SHA-256, or ``None`` when the file is unavailable. |
| {py:func}`openmolspec.core.processing.report_row` | Build one machine-readable processing-report row. |
| {py:func}`openmolspec.core.processing.record_quality_metadata` | Return non-destructive missing-field and quality flags for a record. |
| {py:func}`openmolspec.core.processing.write_processing_reports` | Write the required parquet report and JSON summary. |
| {py:data}`openmolspec.core.processing.ERROR_TYPES` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.core.processing

.. py:function:: classify_exception(exc: BaseException) -> str

   Map a parser exception to the stable v1 error taxonomy.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/processing.py#L33>`__

.. py:function:: source_parts(sample_id: str) -> Dict[str, str]

   Return a best-effort source dataset and source ID from a sample ID.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/processing.py#L56>`__

.. py:function:: file_sha256(path: str) -> Optional[str]

   Return a source-file SHA-256, or ``None`` when the file is unavailable.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/processing.py#L67>`__

.. py:function:: report_row(sample_id: str, source_path: str, *, status: str, error_type: Optional[str]=None, error_message: Optional[str]=None, missing_fields: Optional[Iterable[str]]=None, quality_flags: Optional[Iterable[str]]=None) -> Dict[str, Any]

   Build one machine-readable processing-report row.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/processing.py#L80>`__

.. py:function:: record_quality_metadata(record: Mapping[str, Any], modality: str='gaussian')

   Return non-destructive missing-field and quality flags for a record.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/processing.py#L107>`__

.. py:function:: write_processing_reports(rows: Iterable[Mapping[str, Any]], output_dir: str) -> None

   Write the required parquet report and JSON summary.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/processing.py#L141>`__

.. py:data:: ERROR_TYPES

   ::

      ('FILE_NOT_FOUND',
       'LOG_INCOMPLETE',
       'SCF_FAILED',
       'OPT_NOT_CONVERGED',
       'GEOMETRY_PARSE_FAILED',
       'ENERGY_PARSE_FAILED',
       'FREQUENCY_PARSE_FAILED',
       'IR_PARSE_FAILED',
       'RAMAN_PARSE_FAILED',
       'NMR_PARSE_FAILED',
       'HESSIAN_PARSE_FAILED',
       'SMILES_MISSING',
       'ATOM_COUNT_MISMATCH',
       'INVALID_NUMERIC_VALUE',
       'UNKNOWN_ERROR')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/processing.py#L14>`__
```
