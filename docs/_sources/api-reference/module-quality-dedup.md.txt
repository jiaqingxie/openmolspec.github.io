# openmolspec.quality.dedup

Molecular identity and duplicate analysis for OpenSpec records.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.quality.dedup.molecule_identity` | Return canonical SMILES, InChIKey and scaffold for one SMILES. |
| {py:func}`openmolspec.quality.dedup.build_identity_table` | Build the standardized molecular identity table used for deduplication. |
| {py:func}`openmolspec.quality.dedup.analyze` | Analyze duplicate molecular identity groups. |
| {py:func}`openmolspec.quality.dedup.run` | Run the quality dedup workflow with the supplied settings. |
| {py:func}`openmolspec.quality.dedup.main` | Run the dedup command-line workflow. |

```{eval-rst}
.. py:module:: openmolspec.quality.dedup

.. py:function:: molecule_identity(smiles: Optional[str]) -> Dict[str, Optional[str]]

   Return canonical SMILES, InChIKey and scaffold for one SMILES.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/dedup.py#L27>`__

.. py:function:: build_identity_table(frame: pd.DataFrame, workers: int=1) -> pd.DataFrame

   Build the standardized molecular identity table used for deduplication.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/dedup.py#L70>`__

.. py:function:: analyze(frame: pd.DataFrame, workers: int=1) -> Dict[str, Any]

   Analyze duplicate molecular identity groups.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/dedup.py#L95>`__

.. py:function:: run(dataset: str, output: str, workers: int=1) -> Dict[str, Any]

   Run the quality dedup workflow with the supplied settings.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/dedup.py#L123>`__

.. py:function:: main()

   Run the dedup command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/dedup.py#L136>`__
```
