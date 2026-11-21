# openmolspec.phosphorus_gnn

Bond-conditioned message passing from a molecular graph to a solution NMR chemical shift.

| Name | Description |
| --- | --- |
| {py:class}`openmolspec.phosphorus_gnn.GraphIndex` | Share identical message-passing computations across atoms, without trainable ID tables. |
| {py:func}`openmolspec.phosphorus_gnn.index_tensor` |  |
| {py:func}`openmolspec.phosphorus_gnn.graph_batch` | Gather the exact dependency graph needed for these root embeddings. |
| {py:class}`openmolspec.phosphorus_gnn.PhosphorusGNN` |  |
| {py:class}`openmolspec.phosphorus_gnn.PhosphorusGNNPredictor` |  |
| {py:data}`openmolspec.phosphorus_gnn.DEPTH` | Module constant or schema value. |
| {py:data}`openmolspec.phosphorus_gnn.ATOM_DIMS` | Module constant or schema value. |
| {py:data}`openmolspec.phosphorus_gnn.BOND_DIM` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.phosphorus_gnn

.. py:class:: GraphIndex()

   Share identical message-passing computations across atoms, without trainable ID tables.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/phosphorus_gnn.py#L18>`__

   .. py:method:: add(mol, roots)



      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/phosphorus_gnn.py#L24>`__

   .. py:method:: arrays()



      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/phosphorus_gnn.py#L80>`__

.. py:function:: index_tensor(values)



   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/phosphorus_gnn.py#L96>`__

.. py:function:: graph_batch(arrays, roots)

   Gather the exact dependency graph needed for these root embeddings.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/phosphorus_gnn.py#L100>`__

.. py:class:: PhosphorusGNN(width=64)



   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/phosphorus_gnn.py#L125>`__

   .. py:method:: forward(graph, conditions, solvent)



      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/phosphorus_gnn.py#L148>`__

.. py:class:: PhosphorusGNNPredictor(directory)



   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/phosphorus_gnn.py#L164>`__

   .. py:method:: predict(smiles, solvent=None)



      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/phosphorus_gnn.py#L187>`__

.. py:data:: DEPTH

   ::

      4

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/phosphorus_gnn.py#L13>`__

.. py:data:: ATOM_DIMS

   ::

      (119, 15, 13, 9, 8, 2, 2, 5, 4)

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/phosphorus_gnn.py#L14>`__

.. py:data:: BOND_DIM

   ::

      64

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/phosphorus_gnn.py#L15>`__
```
