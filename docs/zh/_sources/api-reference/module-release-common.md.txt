# openmolspec.release.common

Shared helpers for versioned OpenMolSpec release construction.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.release.common.load_config` | Read a YAML release configuration. |
| {py:func}`openmolspec.release.common.resolve_path` | Resolve a release path relative to its repository. |
| {py:func}`openmolspec.release.common.output_dir` | Resolve the configured release destination. |
| {py:func}`openmolspec.release.common.atomic_json` | Write JSON through a temporary file and atomically replace its destination. |
| {py:func}`openmolspec.release.common.json_default` | Convert path and NumPy values for JSON encoding. |
| {py:func}`openmolspec.release.common.stable_digest` | Hash a value with a deterministic seed prefix. |
| {py:func}`openmolspec.release.common.file_sha256` | Compute a file checksum using bounded-memory reads. |
| {py:func}`openmolspec.release.common.files_below` | Iterate over release files in stable path order. |

```{eval-rst}
.. py:module:: openmolspec.release.common

.. py:function:: load_config(path: str | Path) -> Dict[str, Any]

   Read a YAML release configuration.

   :param path: YAML file containing a ``release`` mapping.
   :type path: str or pathlib.Path

   :returns: Parsed configuration with its absolute path in ``_config_path``.
   :rtype: dict

   :raises ValueError: If the YAML document is not a release configuration mapping.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/common.py#L15>`__

.. py:function:: resolve_path(config: Mapping[str, Any], value: str | Path) -> Path

   Resolve a release path relative to its repository.

   :param config: Configuration returned by :func:`load_config`.
   :type config: mapping
   :param value: Absolute path or path relative to the parent of the config directory.
   :type value: str or pathlib.Path

   :returns: Resolved release input or output path.
   :rtype: pathlib.Path

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/common.py#L42>`__

.. py:function:: output_dir(config: Mapping[str, Any]) -> Path

   Resolve the configured release destination.

   :param config: Release configuration containing ``release.output_dir``.
   :type config: mapping

   :returns: Release output directory.
   :rtype: pathlib.Path

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/common.py#L66>`__

.. py:function:: atomic_json(path: Path, payload: Any) -> None

   Write JSON through a temporary file and atomically replace its destination.

   :param path: JSON destination; parent directories are created as needed.
   :type path: pathlib.Path
   :param payload: JSON-compatible data, with NumPy and path values converted by
                   :func:`json_default`.
   :type payload: object

   :returns: Writes an indented UTF-8 JSON file.
   :rtype: None

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/common.py#L82>`__

.. py:function:: json_default(value: Any) -> Any

   Convert path and NumPy values for JSON encoding.

   :param value: A path, NumPy scalar or NumPy array.
   :type value: object

   :returns: JSON-compatible representation.
   :rtype: str, number or list

   :raises TypeError: If the object has no supported conversion.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/common.py#L106>`__

.. py:function:: stable_digest(value: str, seed: int=0) -> str

   Hash a value with a deterministic seed prefix.

   :param value: Identifier to hash.
   :type value: str
   :param seed: Namespace seed prepended to the identifier.
   :type seed: int, default 0

   :returns: SHA-256 hexadecimal digest of ``f'{seed}:{value}'``.
   :rtype: str

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/common.py#L133>`__

.. py:function:: file_sha256(path: Path, block_size: int=16 * 1024 * 1024) -> str

   Compute a file checksum using bounded-memory reads.

   :param path: File to hash.
   :type path: pathlib.Path
   :param block_size: Bytes read per iteration.
   :type block_size: int, default 16777216

   :returns: SHA-256 hexadecimal digest.
   :rtype: str

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/common.py#L151>`__

.. py:function:: files_below(root: Path) -> Iterable[Path]

   Iterate over release files in stable path order.

   :param root: Directory searched recursively.
   :type root: pathlib.Path

   :Yields: *pathlib.Path* -- Regular files, excluding temporary ``.partial-`` files.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/release/common.py#L176>`__
```
