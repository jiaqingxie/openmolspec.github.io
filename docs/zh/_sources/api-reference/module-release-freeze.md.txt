# openmolspec.release.freeze

Create an immutable release lock with provenance and SHA-256 inventories.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.release.freeze.freeze_release` | Freeze the release inventory and its file-identity metadata. |
| {py:data}`openmolspec.release.freeze.FREEZE_VERSION` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.release.freeze

.. py:function:: freeze_release(config: Mapping[str, Any], hash_workers: int=2) -> Dict[str, Any]

   Freeze the release inventory and its file-identity metadata.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/freeze.py#L79>`__

.. py:data:: FREEZE_VERSION

   ::

      '1.0.0'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/freeze.py#L20>`__
```
