# openmolspec.solution_shifts

Atom-centred chemical-shift prediction for experimental phosphorus and fluorine NMR.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.solution_shifts.solvent_id` | Encode common deuterated solvents. Mixtures and other recorded solvents share a category. |
| {py:func}`openmolspec.solution_shifts.analyte` | Extract the target-bearing component when all other components are simple counterions. |
| {py:func}`openmolspec.solution_shifts.site_features` | Return symmetry classes, nested rooted environments and sparse shell descriptors. |
| {py:func}`openmolspec.solution_shifts.root_estimate` | Use the most specific local environment supported by at least two training observations. |
| {py:func}`openmolspec.solution_shifts.feature_matrix` | Build a CSR matrix. Column zero is the optional solvent category. |
| {py:class}`openmolspec.solution_shifts.SolutionShiftPredictor` | Load a fitted OpenMolSpec solution model and predict shifts in input SMILES atom order. |
| {py:func}`openmolspec.solution_shifts.main` | Predict experimental chemical shifts from a SMILES and an optional solvent. |
| {py:data}`openmolspec.solution_shifts.NUCLEI` | Module constant or schema value. |
| {py:data}`openmolspec.solution_shifts.BINS` | Module constant or schema value. |
| {py:data}`openmolspec.solution_shifts.SOLVENTS` | Module constant or schema value. |
| {py:data}`openmolspec.solution_shifts.N_FEATURES` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.solution_shifts

.. py:function:: solvent_id(value)

   Encode common deuterated solvents. Mixtures and other recorded solvents share a category.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/solution_shifts.py#L27>`__

.. py:function:: analyte(smiles, nucleus)

   Extract the target-bearing component when all other components are simple counterions.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/solution_shifts.py#L64>`__

.. py:function:: site_features(mol, nucleus)

   Return symmetry classes, nested rooted environments and sparse shell descriptors.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/solution_shifts.py#L101>`__

.. py:function:: root_estimate(tables, codes)

   Use the most specific local environment supported by at least two training observations.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/solution_shifts.py#L160>`__

.. py:function:: feature_matrix(rows)

   Build a CSR matrix. Column zero is the optional solvent category.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/solution_shifts.py#L169>`__

.. py:class:: SolutionShiftPredictor(model_dir)

   Load a fitted OpenMolSpec solution model and predict shifts in input SMILES atom order.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/solution_shifts.py#L196>`__

   .. py:method:: predict(smiles, solvent=None)

      Predict ppm for every target atom of one connected molecule, optionally in a named solvent.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/solution_shifts.py#L224>`__

.. py:function:: main(argv=None)

   Predict experimental chemical shifts from a SMILES and an optional solvent.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/solution_shifts.py#L257>`__

.. py:data:: NUCLEI

   ::

      {'31P': 15, '19F': 9}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/solution_shifts.py#L9>`__

.. py:data:: BINS

   ::

      1536

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/solution_shifts.py#L10>`__

.. py:data:: SOLVENTS

   ::

      ('unknown',
       'cdcl3',
       'dmso',
       'd2o',
       'methanol',
       'benzene',
       'acetone',
       'acetonitrile',
       'thf',
       'dichloromethane',
       'toluene',
       'other')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/solution_shifts.py#L11>`__

.. py:data:: N_FEATURES

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/solution_shifts.py#L157>`__
```
