# openmolspec.nmrgym_proton

NMRGym-specific transfer model for unassigned 1H peak lists.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.nmrgym_proton.fingerprint_generator` |  |
| {py:func}`openmolspec.nmrgym_proton.resample` | Interpolate an ordered spectrum at evenly spaced ranks, including both ends. |
| {py:func}`openmolspec.nmrgym_proton.proton_features` | Use the released proton environment model as the frozen shift backbone. |
| {py:class}`openmolspec.nmrgym_proton.NMRGymProtonPredictor` | Predict unassigned proton peak positions from a SMILES string. |
| {py:func}`openmolspec.nmrgym_proton.adapter_outputs` |  |
| {py:func}`openmolspec.nmrgym_proton.decode` |  |
| {py:data}`openmolspec.nmrgym_proton.GRID` | Module constant or schema value. |
| {py:data}`openmolspec.nmrgym_proton.FP_SIZE` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.nmrgym_proton

.. py:function:: fingerprint_generator()



   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/nmrgym_proton.py#L18>`__

.. py:function:: resample(values, size)

   Interpolate an ordered spectrum at evenly spaced ranks, including both ends.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/nmrgym_proton.py#L24>`__

.. py:function:: proton_features(mol, weak)

   Use the released proton environment model as the frozen shift backbone.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/nmrgym_proton.py#L32>`__

.. py:class:: NMRGymProtonPredictor(directory)

   Predict unassigned proton peak positions from a SMILES string.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/nmrgym_proton.py#L67>`__

   .. py:method:: predict(smiles, solvent=None)



      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/nmrgym_proton.py#L111>`__

.. py:function:: adapter_outputs(features, site_counts, weights)



   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/nmrgym_proton.py#L144>`__

.. py:function:: decode(curve, count, released, released_weight, snap_radius=0.0)



   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/nmrgym_proton.py#L153>`__

.. py:data:: GRID

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/nmrgym_proton.py#L13>`__

.. py:data:: FP_SIZE

   ::

      512

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/nmrgym_proton.py#L14>`__
```
