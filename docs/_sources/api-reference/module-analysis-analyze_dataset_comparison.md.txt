# openmolspec.analysis.analyze_dataset_comparison

Build statistical analyses comparing OpenMolSpec with reference datasets.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.analysis.analyze_dataset_comparison.read_json` | Read a JSON document from a file. |
| {py:func}`openmolspec.analysis.analyze_dataset_comparison.mol_descriptors` | Compute molecular size and composition descriptors from a SMILES string. |
| {py:func}`openmolspec.analysis.analyze_dataset_comparison.descriptor_table` | Build a table of molecular descriptors for the supplied records. |
| {py:func}`openmolspec.analysis.analyze_dataset_comparison.trajectory_total` | Extract the total trajectory count from dataset summary metadata. |
| {py:func}`openmolspec.analysis.analyze_dataset_comparison.build_analysis` | Build current statistics using successfully parsed, complete spectra. |
| {py:func}`openmolspec.analysis.analyze_dataset_comparison.ecdf` | Compute empirical cumulative-distribution coordinates for numerical values. |
| {py:func}`openmolspec.analysis.analyze_dataset_comparison.plot` | Plot the molecular dataset comparison. |
| {py:func}`openmolspec.analysis.analyze_dataset_comparison.main` | Run the analyze dataset comparison command-line workflow. |
| {py:data}`openmolspec.analysis.analyze_dataset_comparison.REFERENCE` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.analysis.analyze_dataset_comparison

.. py:function:: read_json(path: Path) -> dict

   Read a JSON document from a file.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/analyze_dataset_comparison.py#L35>`__

.. py:function:: mol_descriptors(smiles: str) -> dict

   Compute molecular size and composition descriptors from a SMILES string.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/analyze_dataset_comparison.py#L41>`__

.. py:function:: descriptor_table(manifest: pd.DataFrame, cache_path: Path) -> pd.DataFrame

   Build a table of molecular descriptors for the supplied records.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/analyze_dataset_comparison.py#L60>`__

.. py:function:: trajectory_total(root: Path) -> int

   Extract the total trajectory count from dataset summary metadata.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/analyze_dataset_comparison.py#L76>`__

.. py:function:: build_analysis(root: Path, *, manifest_path: Path=Path('datasets/openspec_manifest.parquet'), frequency_report_path: Path=Path('reports/extraction/processing_report.parquet'), nmr_report_path: Path=Path('reports/nmr/processing_report.parquet'), descriptor_cache_path: Path=Path('reports/analysis/chemical_descriptors.parquet')) -> tuple[pd.DataFrame, pd.DataFrame, dict]

   Build current statistics using successfully parsed, complete spectra.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/analyze_dataset_comparison.py#L94>`__

.. py:function:: ecdf(series: pd.Series) -> tuple[np.ndarray, np.ndarray]

   Compute empirical cumulative-distribution coordinates for numerical values.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/analyze_dataset_comparison.py#L184>`__

.. py:function:: plot(desc: pd.DataFrame, source: pd.DataFrame, summary: dict, output: Path) -> None

   Plot the molecular dataset comparison.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/analyze_dataset_comparison.py#L190>`__

.. py:function:: main() -> None

   Run the analyze dataset comparison command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/analyze_dataset_comparison.py#L289>`__

.. py:data:: REFERENCE

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/analyze_dataset_comparison.py#L28>`__
```
