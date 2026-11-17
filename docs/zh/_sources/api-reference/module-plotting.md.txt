# openmolspec.plotting

Shared Arial typography for scientific figures and molecular drawings.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.plotting.arial_path` | Find and register Arial for scientific plots and molecular drawings. |
| {py:func}`openmolspec.plotting.figure_style` | Apply the shared typography and vector-export settings to Matplotlib. |

```{eval-rst}
.. py:module:: openmolspec.plotting

.. py:function:: arial_path()

   Find and register Arial for scientific plots and molecular drawings.

   :returns: Absolute TTF path, selected from ``OPENMOLSPEC_ARIAL_FONT``, the local
             plotting runtime or Matplotlib's installed fonts.
   :rtype: str

   :raises RuntimeError: If Arial is unavailable. Set ``OPENMOLSPEC_ARIAL_FONT`` to its TTF file.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/plotting.py#L6>`__

.. py:function:: figure_style()

   Apply the shared typography and vector-export settings to Matplotlib.

   :returns: Updates ``matplotlib.rcParams`` with Arial, compact labels, open axes,
             editable SVG text and embedded TrueType PDF fonts.
   :rtype: None

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/plotting.py#L33>`__
```
