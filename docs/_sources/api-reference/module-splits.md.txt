# openmolspec.split

Deterministic grouped splits for user-owned spectroscopy records.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.split.scaffold_group_id` | Generate a connectivity-based key for a molecular scaffold. |
| {py:func}`openmolspec.split.molecular_group` | Assign a standard molecular identity and a split-group key. |
| {py:func}`openmolspec.split.split_records` | Export deterministic grouped training, validation and test files. |

```{eval-rst}
.. py:module:: openmolspec.split

.. py:function:: scaffold_group_id(scaffold)

   Generate a connectivity-based key for a molecular scaffold.

   :param scaffold: Scaffold SMILES or a 14-letter standard InChIKey connectivity block.
                    The optional prefix ``'scaffold:'`` is accepted.
   :type scaffold: str

   :returns: ``'scaffold:'`` followed by the normalized connectivity block.
   :rtype: str

   :raises ValueError: If the scaffold cannot be assigned a standard molecular identity.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/split.py#L15>`__

.. py:function:: molecular_group(smiles, method='scaffold')

   Assign a standard molecular identity and a split-group key.

   :param smiles: Molecular structure to group.
   :type smiles: str
   :param method: Scaffold grouping uses an achiral Bemis–Murcko scaffold after standard
                  InChI normalization. Random grouping uses molecular connectivity.
   :type method: {'scaffold', 'random'}, default 'scaffold'

   :returns: Full standard InChIKey, group key and parsed input molecule. Acyclic
             molecules use connectivity as their scaffold-group fallback.
   :rtype: tuple of (str, str, rdkit.Chem.Mol)

   :raises ValueError: If the structure, identity conversion or grouping method is invalid.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/split.py#L44>`__

.. py:function:: split_records(records, destination, *, method='scaffold', seed=2026, ratios=(0.8, 0.1, 0.1), source='user_supplied', domain='experimental')

   Export deterministic grouped training, validation and test files.

   :param records: Spectroscopy records containing ``smiles`` or ``kekule_smiles``.
                   Other molecular, spectral and acquisition fields are preserved.
   :type records: iterable of dict
   :param destination: New directory for three JSONL files and ``split-manifest.json``.
   :type destination: str or pathlib.Path
   :param method: Group molecules by achiral normalized scaffold or connectivity.
   :type method: {'scaffold', 'random'}, default 'scaffold'
   :param seed: Seed incorporated into the deterministic SHA-256 group assignment.
   :type seed: int, default 2026
   :param ratios: Training, validation and test proportions; nonnegative and summing to
                  one. Complete groups are assigned together, so row counts vary.
   :type ratios: tuple of float, default (0.8, 0.1, 0.1)
   :param source: Data-source label written to the manifest.
   :type source: str, default 'user_supplied'
   :param domain: Origin of the spectra written to the manifest.
   :type domain: {'experimental', 'computed'}, default 'experimental'

   :returns: Manifest with per-file counts and SHA-256 values, grouping policy,
             source fingerprint, requested ratios, seed and original split counts.
   :rtype: dict

   :raises FileExistsError: If the destination already exists.
   :raises ValueError: If records or settings are invalid, or one connectivity receives
       conflicting scaffold roles. Exports are staged before publication.

   .. rubric:: Examples

   >>> manifest = split_records(records, 'my-data', method='scaffold', seed=42)
   >>> manifest['groups_disjoint']
   True

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/split.py#L82>`__
```
