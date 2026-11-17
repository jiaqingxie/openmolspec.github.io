# openmolspec.analysis.plot_dataset_statistics

Compare OpenMolSpec with established QM and spectroscopy datasets.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.analysis.plot_dataset_statistics.read_json` | Read a JSON document from a file. |
| {py:func}`openmolspec.analysis.plot_dataset_statistics.current_openmolspec_counts` | Read the molecular and spectrum counts for the current release. |
| {py:func}`openmolspec.analysis.plot_dataset_statistics.plot_comparison` | Plot the selected dataset statistics and reference collections. |
| {py:func}`openmolspec.analysis.plot_dataset_statistics.main` | Run the plot dataset statistics command-line workflow. |
| {py:data}`openmolspec.analysis.plot_dataset_statistics.DATASETS` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_dataset_statistics.PUBLIC_YEAR` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_dataset_statistics.MOLECULES` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_dataset_statistics.CONFIGURATIONS` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_dataset_statistics.MODALITIES` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_dataset_statistics.COVERAGE` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.analysis.plot_dataset_statistics

.. py:function:: read_json(path: Path) -> dict

   Read a JSON document from a file.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_dataset_statistics.py#L44>`__

.. py:function:: current_openmolspec_counts(root: Path) -> tuple[int, int, int, int, int]

   Read the molecular and spectrum counts for the current release.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_dataset_statistics.py#L50>`__

.. py:function:: plot_comparison(root: Path, output: Path) -> None

   Plot the selected dataset statistics and reference collections.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_dataset_statistics.py#L62>`__

.. py:function:: main() -> None

   Run the plot dataset statistics command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_dataset_statistics.py#L161>`__

.. py:data:: DATASETS

   ::

      ['QM9S', 'QMe14S', 'ChEMBL IR/Raman', 'SQuIRL', 'ANI-1', 'QM7-X', 'QCML', 'OpenMolSpec']

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_dataset_statistics.py#L13>`__

.. py:data:: PUBLIC_YEAR

   ::

      {'QM9S': 2023,
       'QMe14S': 2025,
       'ChEMBL IR/Raman': 2025,
       'SQuIRL': 2026,
       'ANI-1': 2017,
       'QM7-X': 2021,
       'QCML': 2025,
       'OpenMolSpec': 2026}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_dataset_statistics.py#L17>`__

.. py:data:: MOLECULES

   ::

      [133885, 186102, 220000, 133885, 57462, None, None, 1164603]

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_dataset_statistics.py#L27>`__

.. py:data:: CONFIGURATIONS

   ::

      [None, None, None, None, 20000000, 4200000, 33500000, 32333251]

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_dataset_statistics.py#L28>`__

.. py:data:: MODALITIES

   ::

      ['IR', 'Raman', 'NMR', 'Energy', 'Forces', 'Trajectories']

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_dataset_statistics.py#L31>`__

.. py:data:: COVERAGE

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_dataset_statistics.py#L32>`__
```
