# openmolspec.peak_learning

Estimate H/C site shifts using observed spectra matched to atom environments.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.peak_learning.environments` |  |
| {py:func}`openmolspec.peak_learning.estimate` |  |
| {py:class}`openmolspec.peak_learning.PeakLearningPredictor` | Load a fitted hierarchy of rooted Morgan environments for hydrogen or carbon. |

```{eval-rst}
.. py:module:: openmolspec.peak_learning

.. py:function:: environments(mol)



   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/peak_learning.py#L13>`__

.. py:function:: estimate(codes, tables, prior, minimum=3, shrink=3.0)



   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/peak_learning.py#L39>`__

.. py:class:: PeakLearningPredictor(directory, *, sha256=None)

   Load a fitted hierarchy of rooted Morgan environments for hydrogen or carbon.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/peak_learning.py#L54>`__

   .. py:method:: predict(smiles, solvent=None)



      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/peak_learning.py#L73>`__
```
