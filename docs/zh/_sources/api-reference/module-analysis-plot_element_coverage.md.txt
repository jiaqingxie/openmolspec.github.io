# openmolspec.analysis.plot_element_coverage

Plot documented element coverage of OpenMolSpec and public reference sets.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.analysis.plot_element_coverage.openmolspec_elements` | Collect the element coverage of the OpenMolSpec records. |
| {py:func}`openmolspec.analysis.plot_element_coverage.coverage_frame` | Build a tabular element-coverage summary for the compared collections. |
| {py:func}`openmolspec.analysis.plot_element_coverage.plot_coverage` | Draw the element-coverage comparison. |
| {py:func}`openmolspec.analysis.plot_element_coverage.main` | Run the plot element coverage command-line workflow. |
| {py:data}`openmolspec.analysis.plot_element_coverage.ELEMENTS` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_element_coverage.REFERENCE_ELEMENTS` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_element_coverage.PUBLIC_YEAR` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.analysis.plot_element_coverage

.. py:function:: openmolspec_elements(root: Path) -> set[str]

   Collect the element coverage of the OpenMolSpec records.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_element_coverage.py#L50>`__

.. py:function:: coverage_frame(open_elements: set[str]) -> pd.DataFrame

   Build a tabular element-coverage summary for the compared collections.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_element_coverage.py#L63>`__

.. py:function:: plot_coverage(frame: pd.DataFrame, output: Path) -> None

   Draw the element-coverage comparison.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_element_coverage.py#L76>`__

.. py:function:: main() -> None

   Run the plot element coverage command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_element_coverage.py#L127>`__

.. py:data:: ELEMENTS

   ::

      ['H', 'B', 'C', 'N', 'O', 'F', 'Al', 'Si', 'P', 'S', 'Cl', 'Br', 'As', 'Se', 'I', 'Ge']

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_element_coverage.py#L22>`__

.. py:data:: REFERENCE_ELEMENTS

   ::

      {'ANI-1': {'H', 'C', 'N', 'O'}, 'QM9S': {'H', 'C', 'N', 'O', 'F'}, 'SQuIRL': {'H', 'C', 'N', 'O', 'F'}, 'QM7-X': {'H', 'C', 'N', 'O', 'S', 'Cl'}, 'ChEMBL IR/Raman': {'H', 'C', 'N', 'O', 'F', 'P', 'S', 'Cl', 'Br'}, 'QCML': {'H', 'C', 'N', 'O'}, 'QMe14S': {'H', 'B', 'C', 'N', 'O', 'F', 'Al', 'Si', 'P', 'S', 'Cl', 'Br', 'As', 'Se'}}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_element_coverage.py#L29>`__

.. py:data:: PUBLIC_YEAR

   ::

      {'ANI-1': 2017,
       'QM9S': 2023,
       'SQuIRL': 2026,
       'QM7-X': 2021,
       'ChEMBL IR/Raman': 2025,
       'QCML': 2025,
       'QMe14S': 2025,
       'OpenMolSpec': 2026}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_element_coverage.py#L38>`__
```
