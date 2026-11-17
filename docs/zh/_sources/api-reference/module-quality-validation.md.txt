# openmolspec.quality.validation

Non-destructive internal validation for legacy and v1-style datasets.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.quality.validation.validate_record` | Validate one record and return flags without changing the record. |
| {py:func}`openmolspec.quality.validation.validate_dataframe` | Validate all rows and return report tables. |
| {py:func}`openmolspec.quality.validation.run` | Run internal QC on a pickle or Parquet DataFrame. |
| {py:func}`openmolspec.quality.validation.main` | Run the validation command-line workflow. |
| {py:data}`openmolspec.quality.validation.PROPERTY_FIELDS` | Module constant or schema value. |
| {py:data}`openmolspec.quality.validation.SPECTRUM_FIELDS` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.quality.validation

.. py:function:: validate_record(record: Mapping[str, Any], sample_id: Any) -> Dict[str, Any]

   Validate one record and return flags without changing the record.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/validation.py#L37>`__

.. py:function:: validate_dataframe(frame: pd.DataFrame, workers: int=1) -> Dict[str, pd.DataFrame]

   Validate all rows and return report tables.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/validation.py#L201>`__

.. py:function:: run(dataset: str, output: str, workers: int=1) -> Dict[str, Any]

   Run internal QC on a pickle or Parquet DataFrame.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/validation.py#L246>`__

.. py:function:: main()

   Run the validation command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/validation.py#L270>`__

.. py:data:: PROPERTY_FIELDS

   ::

      ('energy', 'zpve', 'dipole', 'polar', 'homo', 'lumo', 'gap', 'U', 'H', 'G')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/validation.py#L14>`__

.. py:data:: SPECTRUM_FIELDS

   ::

      ('freq', 'ir', 'raman', 'frequencies', 'ir_spectrum', 'raman_spectrum')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/validation.py#L15>`__
```
