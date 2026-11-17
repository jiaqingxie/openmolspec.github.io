# openmolspec.analysis.visualize_opt_trajectory

Visualize one molecular optimization trajectory as an animated GIF.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.analysis.visualize_opt_trajectory.align_coordinates` | Align two molecular coordinate arrays for geometric comparison. |
| {py:func}`openmolspec.analysis.visualize_opt_trajectory.infer_bonds` | Infer molecular bonds from elements and Cartesian coordinates. |
| {py:func}`openmolspec.analysis.visualize_opt_trajectory.main` | Run the visualize opt trajectory command-line workflow. |
| {py:data}`openmolspec.analysis.visualize_opt_trajectory.ATOM_COLORS` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.analysis.visualize_opt_trajectory

.. py:function:: align_coordinates(reference, coordinates)

   Align two molecular coordinate arrays for geometric comparison.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/visualize_opt_trajectory.py#L27>`__

.. py:function:: infer_bonds(atomic_numbers, coordinates, scale=1.25)

   Infer molecular bonds from elements and Cartesian coordinates.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/visualize_opt_trajectory.py#L40>`__

.. py:function:: main()

   Run the visualize opt trajectory command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/visualize_opt_trajectory.py#L58>`__

.. py:data:: ATOM_COLORS

   ::

      {1: '#E8E8E8',
       6: '#303030',
       7: '#3050F8',
       8: '#FF0D0D',
       9: '#90E050',
       15: '#FF8000',
       16: '#FFFF30',
       17: '#1FF01F',
       35: '#A62929',
       53: '#940094'}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/visualize_opt_trajectory.py#L13>`__
```
