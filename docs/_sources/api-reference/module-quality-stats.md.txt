# openmolspec.quality.stats

Publication-ready validation statistics for the OpenSpec dataset.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.quality.stats.extract_core_features` | Compute per-record derived features from the core frequency pickle. |
| {py:func}`openmolspec.quality.stats.extract_trajectory_features` | Collapse all trajectory pickles to one row per record (final frame). |
| {py:func}`openmolspec.quality.stats.extract_nmr_features` | Compute per-record NMR summary features. |
| {py:func}`openmolspec.quality.stats.convergence_table` | Return (per-source convergence table, per-source n_steps statistics). |
| {py:func}`openmolspec.quality.stats.modality_success_table` | Return per-source calculation success rates for freq / Raman / NMR. |
| {py:func}`openmolspec.quality.stats.imaginary_frequency_table` | Return (per-source imaginary-frequency summary, global count distribution). |
| {py:func}`openmolspec.quality.stats.outlier_analysis` | Return (per-field robust statistics with flag counts, flagged records). |
| {py:func}`openmolspec.quality.stats.duplicate_conformer_tables` | Return (dedup summary table, conformer-count distribution, per-source conformers). |
| {py:func}`openmolspec.quality.stats.source_success_anomaly_table` | Merge the per-source tables into one combined summary. |
| {py:func}`openmolspec.quality.stats.element_coverage` | Return molecules-per-element coverage from the descriptor cache. |
| {py:func}`openmolspec.quality.stats.molecular_distribution_tables` | Return quantile tables for molecular-weight / heavy-atom / atom-count. |
| {py:func}`openmolspec.quality.stats.figure_convergence` | Plot geometry-optimization convergence statistics. |
| {py:func}`openmolspec.quality.stats.figure_modality_success` | Plot extraction success for each spectroscopy modality. |
| {py:func}`openmolspec.quality.stats.figure_imaginary_frequency` | Plot the distribution of imaginary vibrational frequencies. |
| {py:func}`openmolspec.quality.stats.figure_outlier_detection` | Plot the numerical outlier summary. |
| {py:func}`openmolspec.quality.stats.figure_conformer_distribution` | Plot the conformer-count distribution across molecules. |
| {py:func}`openmolspec.quality.stats.figure_molecular_distributions` | Plot molecular size and composition distributions. |
| {py:func}`openmolspec.quality.stats.figure_source_rates_heatmap` | Heatmap of per-source success/anomaly rates. |
| {py:func}`openmolspec.quality.stats.run` | Run the full validation-statistics pipeline and return the summary. |
| {py:func}`openmolspec.quality.stats.main` | Run the stats command-line workflow. |
| {py:data}`openmolspec.quality.stats.OUTLIER_MAD_MULTIPLIER` | Module constant or schema value. |
| {py:data}`openmolspec.quality.stats.OUTLIER_QUANTILES` | Module constant or schema value. |
| {py:data}`openmolspec.quality.stats.FIELD_UNITS` | Module constant or schema value. |
| {py:data}`openmolspec.quality.stats.OUTLIER_FIELDS` | Module constant or schema value. |
| {py:data}`openmolspec.quality.stats.QUALITATIVE_COLORS` | Module constant or schema value. |
| {py:data}`openmolspec.quality.stats.TRAJECTORY_SOURCE_MAP` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.quality.stats

.. py:function:: extract_core_features(frame: pd.DataFrame, manifest: Optional[pd.DataFrame]=None, workers: int=1) -> pd.DataFrame

   Compute per-record derived features from the core frequency pickle.

   The returned frame has one row per record and is the lightweight table all
   subsequent analyses are based on.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L186>`__

.. py:function:: extract_trajectory_features(trajectory_dir: str) -> pd.DataFrame

   Collapse all trajectory pickles to one row per record (final frame).

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L244>`__

.. py:function:: extract_nmr_features(frame: pd.DataFrame) -> pd.DataFrame

   Compute per-record NMR summary features.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L272>`__

.. py:function:: convergence_table(opt_reports_dir: str, trajectory_features: pd.DataFrame) -> Tuple[pd.DataFrame, pd.DataFrame]

   Return (per-source convergence table, per-source n_steps statistics).

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L300>`__

.. py:function:: modality_success_table(source_statistics: pd.DataFrame, core_features: pd.DataFrame) -> pd.DataFrame

   Return per-source calculation success rates for freq / Raman / NMR.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L355>`__

.. py:function:: imaginary_frequency_table(core_features: pd.DataFrame) -> Tuple[pd.DataFrame, pd.DataFrame]

   Return (per-source imaginary-frequency summary, global count distribution).

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L392>`__

.. py:function:: outlier_analysis(core_features: pd.DataFrame, trajectory_features: pd.DataFrame, nmr_features: pd.DataFrame) -> Tuple[pd.DataFrame, pd.DataFrame]

   Return (per-field robust statistics with flag counts, flagged records).

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L480>`__

.. py:function:: duplicate_conformer_tables(core_features: pd.DataFrame, dedup_summary_path: str) -> Tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]

   Return (dedup summary table, conformer-count distribution, per-source conformers).

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L547>`__

.. py:function:: source_success_anomaly_table(convergence: pd.DataFrame, modality: pd.DataFrame, imaginary: pd.DataFrame, outlier_rate_by_source: pd.DataFrame, record_qc: pd.DataFrame) -> pd.DataFrame

   Merge the per-source tables into one combined summary.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L639>`__

.. py:function:: element_coverage(descriptors: pd.DataFrame) -> pd.DataFrame

   Return molecules-per-element coverage from the descriptor cache.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L679>`__

.. py:function:: molecular_distribution_tables(descriptors: pd.DataFrame) -> Dict[str, pd.DataFrame]

   Return quantile tables for molecular-weight / heavy-atom / atom-count.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L716>`__

.. py:function:: figure_convergence(table: pd.DataFrame, output_dir: Path) -> None

   Plot geometry-optimization convergence statistics.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L739>`__

.. py:function:: figure_modality_success(table: pd.DataFrame, output_dir: Path) -> None

   Plot extraction success for each spectroscopy modality.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L764>`__

.. py:function:: figure_imaginary_frequency(core_features: pd.DataFrame, output_dir: Path) -> None

   Plot the distribution of imaginary vibrational frequencies.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L787>`__

.. py:function:: figure_outlier_detection(core_features: pd.DataFrame, trajectory_features: pd.DataFrame, nmr_features: pd.DataFrame, output_dir: Path) -> None

   Plot the numerical outlier summary.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L809>`__

.. py:function:: figure_conformer_distribution(conformer_table: pd.DataFrame, output_dir: Path) -> None

   Plot the conformer-count distribution across molecules.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L865>`__

.. py:function:: figure_molecular_distributions(descriptors: pd.DataFrame, element_table: pd.DataFrame, output_dir: Path) -> None

   Plot molecular size and composition distributions.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L879>`__

.. py:function:: figure_source_rates_heatmap(table: pd.DataFrame, output_dir: Path) -> None

   Heatmap of per-source success/anomaly rates.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L912>`__

.. py:function:: run(*, pickle_path: str, nmr_pickle_path: str, manifest_path: str, trajectory_dir: str, descriptors_path: str, opt_reports_dir: str, dedup_summary_path: str, source_statistics_path: str, record_qc_path: str, output: str, cache_dir: str, workers: int) -> Dict[str, Any]

   Run the full validation-statistics pipeline and return the summary.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L959>`__

.. py:function:: main() -> None

   Run the stats command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L1109>`__

.. py:data:: OUTLIER_MAD_MULTIPLIER

   ::

      10.0

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L34>`__

.. py:data:: OUTLIER_QUANTILES

   ::

      (0.001, 0.999)

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L35>`__

.. py:data:: FIELD_UNITS

   ::

      {'energy_per_atom': 'Hartree/atom',
       'energy': 'Hartree',
       'zpve': 'Hartree',
       'homo': 'Hartree',
       'lumo': 'Hartree',
       'gap': 'Hartree',
       'dipole_total': 'Debye',
       'max_force_final': 'Hartree/Bohr',
       'rms_force_final': 'Hartree/Bohr',
       'min_freq': 'cm^-1',
       'max_freq': 'cm^-1',
       'nmr_max_abs_isotropic': 'ppm',
       'nmr_min_isotropic': 'ppm'}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L37>`__

.. py:data:: OUTLIER_FIELDS

   ::

      ('energy_per_atom',
       'gap',
       'homo',
       'lumo',
       'dipole_total',
       'max_force_final',
       'min_freq',
       'max_freq',
       'nmr_max_abs_isotropic',
       'nmr_min_isotropic')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L53>`__

.. py:data:: QUALITATIVE_COLORS

   ::

      ['#4C72B0',
       '#DD8452',
       '#55A868',
       '#C44E52',
       '#8172B3',
       '#937860',
       '#DA8BC3',
       '#8C8C8C',
       '#CCB974',
       '#64B5CD']

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L66>`__

.. py:data:: TRAJECTORY_SOURCE_MAP

   ::

      {'nist_ir': 'NISTIR',
       'wiley_ir': 'WILEYIR',
       'wiley_raman': 'WILEYRAMAN',
       'zinc_v1': 'ZINCV1',
       'zinc_v2': 'ZINCV2',
       'pah': 'PAH',
       'pcqm4mv2': 'PCQM4MV2',
       'peptide': 'PEPTIDE',
       'qm9': 'QM9',
       'rxn': 'RXN',
       'sdbs': 'SDBS'}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/quality/stats.py#L77>`__
```
