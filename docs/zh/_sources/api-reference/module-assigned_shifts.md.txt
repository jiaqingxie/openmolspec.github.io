# openmolspec.assigned_shifts

Predict experimental 1H and 13C shifts for symmetry-distinct heavy-atom sites.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.assigned_shifts.assigned_sites` |  |
| {py:class}`openmolspec.assigned_shifts.AssignedShiftPredictor` |  |
| {py:func}`openmolspec.assigned_shifts.merge_peaks` | Group unresolved site predictions within the fitted maximum ppm span. |
| {py:func}`openmolspec.assigned_shifts.combine_sites` |  |
| {py:class}`openmolspec.assigned_shifts.PeakSpectrumPredictor` | Predict a 1H or 13C peak list with contributing heavy-atom indices. |

```{eval-rst}
.. py:module:: openmolspec.assigned_shifts

.. py:function:: assigned_sites(molecule, nucleus)



   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/assigned_shifts.py#L10>`__

.. py:class:: AssignedShiftPredictor(directory)



   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/assigned_shifts.py#L26>`__

   .. py:method:: predict(smiles, solvent=None)



      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/assigned_shifts.py#L44>`__

   .. py:method:: assignment_predictions(smiles, solvent=None)

      Map heavy-site estimates to the explicit atom order used by the assignment API.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/assigned_shifts.py#L68>`__

.. py:function:: merge_peaks(sites, gap)

   Group unresolved site predictions within the fitted maximum ppm span.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/assigned_shifts.py#L87>`__

.. py:function:: combine_sites(base, weak, weight)



   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/assigned_shifts.py#L107>`__

.. py:class:: PeakSpectrumPredictor(directory)

   Predict a 1H or 13C peak list with contributing heavy-atom indices.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/assigned_shifts.py#L123>`__

   .. py:method:: predict(smiles, solvent=None)



      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/assigned_shifts.py#L149>`__
```
