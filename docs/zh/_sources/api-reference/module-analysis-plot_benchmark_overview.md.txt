# openmolspec.analysis.plot_benchmark_overview

Draw the OpenMolSpec benchmark-utility overview figure.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.analysis.plot_benchmark_overview.repository_root` | Return the repository root for the standard ``src`` layout. |
| {py:func}`openmolspec.analysis.plot_benchmark_overview.resolve` | Resolve a configured input or output path. |
| {py:func}`openmolspec.analysis.plot_benchmark_overview.plot_benchmark_overview` | Create the four-panel benchmark overview and return plotted values. |
| {py:func}`openmolspec.analysis.plot_benchmark_overview.parse_args` | Parse command-line arguments into an argparse namespace. |
| {py:func}`openmolspec.analysis.plot_benchmark_overview.main` | Run the plot benchmark overview command-line workflow. |
| {py:data}`openmolspec.analysis.plot_benchmark_overview.BLUE` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_benchmark_overview.LIGHT_BLUE` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_benchmark_overview.PURPLE` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_benchmark_overview.GRAY` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_benchmark_overview.DARK_GRAY` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_benchmark_overview.GRID` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_benchmark_overview.TEXT` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.analysis.plot_benchmark_overview

.. py:function:: repository_root() -> Path

   Return the repository root for the standard ``src`` layout.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_benchmark_overview.py#L34>`__

.. py:function:: resolve(root: Path, path: Path) -> Path

   Resolve a configured input or output path.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_benchmark_overview.py#L40>`__

.. py:function:: plot_benchmark_overview(summary: dict[str, object], evaluations: dict[str, object], output: Path) -> dict[str, object]

   Create the four-panel benchmark overview and return plotted values.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_benchmark_overview.py#L131>`__

.. py:function:: parse_args() -> argparse.Namespace

   Parse command-line arguments into an argparse namespace.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_benchmark_overview.py#L303>`__

.. py:function:: main() -> None

   Run the plot benchmark overview command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_benchmark_overview.py#L325>`__

.. py:data:: BLUE

   ::

      '#2F6FDB'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_benchmark_overview.py#L25>`__

.. py:data:: LIGHT_BLUE

   ::

      '#A9C5F5'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_benchmark_overview.py#L26>`__

.. py:data:: PURPLE

   ::

      '#7957C8'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_benchmark_overview.py#L27>`__

.. py:data:: GRAY

   ::

      '#A9B9CC'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_benchmark_overview.py#L28>`__

.. py:data:: DARK_GRAY

   ::

      '#536273'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_benchmark_overview.py#L29>`__

.. py:data:: GRID

   ::

      '#D7DEE8'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_benchmark_overview.py#L30>`__

.. py:data:: TEXT

   ::

      '#263442'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_benchmark_overview.py#L31>`__
```
