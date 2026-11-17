# openmolspec.analysis.plot_align_chemical_distribution

Visualize the chemical distribution of the molecule-unique align catalog.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.analysis.plot_align_chemical_distribution.plot_distribution` | Draw the chemical-space distributions of the aligned molecular data. |
| {py:func}`openmolspec.analysis.plot_align_chemical_distribution.main` | Run the plot align chemical distribution command-line workflow. |
| {py:data}`openmolspec.analysis.plot_align_chemical_distribution.COLORS` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_chemical_distribution.SPLIT_ORDER` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.analysis.plot_align_chemical_distribution

.. py:function:: plot_distribution(frame: pd.DataFrame, output: Path) -> None

   Draw the chemical-space distributions of the aligned molecular data.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_chemical_distribution.py#L74>`__

.. py:function:: main() -> None

   Run the plot align chemical distribution command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_chemical_distribution.py#L191>`__

.. py:data:: COLORS

   ::

      {'train': '#2474B5', 'validation': '#E69F00', 'test': '#D55E00'}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_chemical_distribution.py#L20>`__

.. py:data:: SPLIT_ORDER

   ::

      ('train', 'validation', 'test')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_chemical_distribution.py#L25>`__
```
