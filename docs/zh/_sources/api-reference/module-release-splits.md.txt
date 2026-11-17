# openmolspec.release.splits

Scaffold-disjoint official train/validation/test splits for OpenMolSpec.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.release.splits.build_splits` | Build the configured molecular training, validation and test partitions. |
| {py:data}`openmolspec.release.splits.SPLIT_VERSION` | Module constant or schema value. |
| {py:data}`openmolspec.release.splits.PARTITIONS` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.release.splits

.. py:function:: build_splits(config: Mapping[str, Any]) -> Dict[str, Any]

   Build the configured molecular training, validation and test partitions.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/splits.py#L89>`__

.. py:data:: SPLIT_VERSION

   ::

      '1.1.0'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/splits.py#L12>`__

.. py:data:: PARTITIONS

   ::

      ('train', 'validation', 'test')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/splits.py#L13>`__
```
