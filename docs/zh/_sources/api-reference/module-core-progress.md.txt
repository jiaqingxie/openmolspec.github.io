# openmolspec.core.progress

Progress reporting that stays readable in terminals and log files.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.core.progress.progress_mode` | Return ``bar``, ``log`` or ``off`` for the current process. |
| {py:func}`openmolspec.core.progress.status` | Write one flush-safe, grep-friendly status line. |
| {py:func}`openmolspec.core.progress.track` | Iterate with a terminal bar or clean periodic log records. |
| {py:data}`openmolspec.core.progress.T` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.core.progress

.. py:function:: progress_mode(stream: Optional[TextIO]=None) -> str

   Return ``bar``, ``log`` or ``off`` for the current process.

   ``OPENSPEC_PROGRESS`` can force one of those modes.  The default ``auto``
   uses a bar only when the output stream is an interactive terminal.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/progress.py#L22>`__

.. py:function:: status(message: str, *, stream: Optional[TextIO]=None) -> None

   Write one flush-safe, grep-friendly status line.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/progress.py#L38>`__

.. py:function:: track(iterable: Iterable[T], *, total: Optional[int]=None, desc: str, unit: str='item', leave: bool=True, log_interval_seconds: float=60.0, stream: Optional[TextIO]=None) -> Iterator[T]

   Iterate with a terminal bar or clean periodic log records.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/progress.py#L55>`__

.. py:data:: T

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/progress.py#L18>`__
```
