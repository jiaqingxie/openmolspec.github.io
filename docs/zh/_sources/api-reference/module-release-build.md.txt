# openmolspec.release.build

Build a frozen, leakage-safe and publication-ready OpenMolSpec release.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.release.build.run` | Run the release build workflow with the supplied settings. |
| {py:func}`openmolspec.release.build.main` | Run the build command-line workflow. |
| {py:data}`openmolspec.release.build.STAGES` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.release.build

.. py:function:: run(config_path: str, stage: str, *, only: str | None=None, hash_workers: int=2) -> Dict[str, Any]

   Run the release build workflow with the supplied settings.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/build.py#L25>`__

.. py:function:: main() -> None

   Run the build command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/build.py#L46>`__

.. py:data:: STAGES

   ::

      ('catalog', 'split', 'validate', 'export', 'index', 'freeze', 'all')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/build.py#L22>`__
```
