# openmolspec.mcp

MCP stdio tools backed by the same Spectra Harness used in Python.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.mcp.create_server` | Create the OpenMolSpec MCP server and register its spectroscopy tools. |
| {py:func}`openmolspec.mcp.main` | Start the ``openmolspec-mcp`` stdio service. |

```{eval-rst}
.. py:module:: openmolspec.mcp

.. py:function:: create_server()

   Create the OpenMolSpec MCP server and register its spectroscopy tools.

   :returns: Server exposing ``spectra_tasks``, ``spectra_datasets``,
             ``spectra_validate`` and ``spectra_predict``. Prediction and validation
             tools take ``task``, ``inputs`` and ``model_settings``; prediction also
             accepts ``repeats``.
   :rtype: mcp.server.MCPServer

   :raises RuntimeError: If the optional MCP dependency is absent.

   .. rubric:: Examples

   >>> server = create_server()
   >>> server.run(transport='stdio')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/mcp.py#L4>`__

.. py:function:: main()

   Start the ``openmolspec-mcp`` stdio service.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/mcp.py#L58>`__
```
