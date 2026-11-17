# openmolspec.task

The shared task catalog, grouped for the public SDK.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.task.list_tasks` | List the spectroscopy tasks and their model/evaluation interfaces. |

```{eval-rst}
.. py:module:: openmolspec.task

.. py:function:: list_tasks(*, group=None, include_deferred=False)

   List the spectroscopy tasks and their model/evaluation interfaces.

   :param group: Select one task family. ``None`` returns all enabled families.
   :type group: {'nmr', 'ms', 'vibrational', 'multimodal', 'deferred'} or None
   :param include_deferred: Include the additional task definitions outside the active suite.
   :type include_deferred: bool, default False

   :returns: Task ID, title, spectral channels, domain, backend, metrics and group.
   :rtype: list of dict

   .. rubric:: Examples

   >>> nmr = list_tasks(group='nmr')
   >>> all(task['id'].startswith('nmr.') for task in nmr)
   True

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/task.py#L5>`__
```
