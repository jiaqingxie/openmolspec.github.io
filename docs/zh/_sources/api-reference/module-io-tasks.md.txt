# openmolspec.io.tasks

Input loading shared by native staged extraction pipelines.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.io.tasks.load_tasks` | Load extraction tasks from Parquet, falling back to legacy JSON maps. |

```{eval-rst}
.. py:module:: openmolspec.io.tasks

.. py:function:: load_tasks(*, path_field: str, manifest_path: Optional[str]=None, file_dict: Optional[str]=None, smiles_dict: Optional[str]=None) -> Tuple[List[Tuple[str, str]], Dict[str, str]]

   Load extraction tasks from Parquet, falling back to legacy JSON maps.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/io/tasks.py#L10>`__
```
