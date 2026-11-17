# openmolspec.cli

OpenMolSpec staged data-production entry point.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.cli.load_config` | Read the workflow configuration from its source file. |
| {py:func}`openmolspec.cli.main` | Run the cli command-line workflow. |
| {py:data}`openmolspec.cli.STAGES` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.cli

.. py:function:: load_config(path: str)

   Read the workflow configuration from its source file.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/cli.py#L20>`__

.. py:function:: main()

   Run the cli command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/cli.py#L31>`__

.. py:data:: STAGES

   ::

      ('manifest', 'freq', 'nmr', 'validate', 'dedup', 'split', 'all')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/cli.py#L17>`__
```
