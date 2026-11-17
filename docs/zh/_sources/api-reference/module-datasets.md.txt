# openmolspec.dataset

Versioned dataset descriptions and lazy local spectroscopy readers.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.dataset.sha256` | Compute the SHA-256 checksum of a file. |
| {py:func}`openmolspec.dataset.list_datasets` | List the datasets available through ``molspectra``. |
| {py:func}`openmolspec.dataset.dataset_info` | Look up a dataset's format, files and source information. |
| {py:class}`openmolspec.dataset.SpectraSplit` | A streaming view of one spectroscopy dataset split. |
| {py:class}`openmolspec.dataset.MolecularSpectra` | A dataset card together with its train, validation and test views. |
| {py:func}`openmolspec.dataset.molspectra` | Load a registered molecular spectroscopy dataset. |
| {py:func}`openmolspec.dataset.audit_splits` | Scan supplied views for molecular overlap using a disk-backed identity index. |

```{eval-rst}
.. py:module:: openmolspec.dataset

.. py:function:: sha256(path)

   Compute the SHA-256 checksum of a file.

   :param path: File to read in binary mode.
   :type path: str or pathlib.Path

   :returns: The 64-character hexadecimal digest.
   :rtype: str

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L20>`__

.. py:function:: list_datasets()

   List the datasets available through :func:`molspectra`.

   :returns: Dataset cards containing ``name``, ``version``, ``domain``, ``format``,
             split filenames, source references and dataset statistics.
   :rtype: list of dict

   .. rubric:: Examples

   >>> names = [card['name'] for card in list_datasets()]
   >>> 'opendatalab_nmr' in names
   True

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L40>`__

.. py:function:: dataset_info(name)

   Look up a dataset's format, files and source information.

   :param name: Registered dataset name, such as ``'opendatalab_nmr'``.
   :type name: str

   :returns: Dataset card for ``name``.
   :rtype: dict

   :raises ValueError: If the name is absent from :func:`list_datasets`.

   .. rubric:: Examples

   >>> dataset_info('opendatalab_nmr')['domain']
   'experimental'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L58>`__

.. py:class:: SpectraSplit(path: Path, role: str, dataset: str, domain: str, format: str = 'nmr_jsonl', trusted: bool = False, modalities: tuple[str, ...] = (), limit: int | None = None)

   A streaming view of one spectroscopy dataset split.

   :param path: JSONL, MassSpecGym CSV/TSV, or openSpec LMDB file.
   :type path: str or pathlib.Path
   :param role: Split to read. ``'valid'`` and ``'validation'`` are aliases for ``'val'``.
   :type role: {'train', 'val', 'test'}
   :param dataset: Dataset name attached to each returned record.
   :type dataset: str
   :param domain: Origin of the spectral measurements.
   :type domain: {'experimental', 'computed'}
   :param format: Reader format: ``'nmr_jsonl'``, ``'jsonl'``, ``'massspecgym_csv'``,
                  ``'massspecgym_tsv'`` or ``'openspec_lmdb'``.
   :type format: str, default 'nmr_jsonl'
   :param trusted: Set to ``True`` when opening a trusted pickle-based LMDB.
   :type trusted: bool, default False
   :param modalities: Channels required in each selected record: ``'1H'``, ``'13C'``,
                      ``'11B'``, ``'19F'``, ``'29Si'``, ``'31P'``, ``'IR'``, ``'Raman'``,
                      ``'MS'`` or ``'MS/MS'``.
   :type modalities: tuple of str, default ()
   :param limit: Maximum number of selected records.
   :type limit: int or None, default None

   :Yields: *dict* -- Molecular and spectral fields plus ``_openmolspec`` metadata containing
            the split, dataset, domain, record locator and available channels.

   .. rubric:: Examples

   >>> split = SpectraSplit('test.jsonl', 'test', 'my_nmr', 'experimental')
   >>> first_three = split.head(3)
   >>> hc = split.select(modalities=['1H', '13C'], limit=32)

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L114>`__

   .. py:method:: __iter__()

      Stream the selected molecular spectra in file order.

      Yields
      ------
      dict
          Original spectral fields plus normalized ``smiles`` and
          ``_openmolspec`` dataset, role, locator and channel metadata.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L208>`__

   .. py:method:: head(n=3)

      Read the first ``n`` selected records.

      :param n: Number of records to return; zero returns an empty list.
      :type n: int, default 3

      :returns: Up to ``n`` records in source-file order.
      :rtype: list of dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L248>`__

   .. py:method:: select(*, modalities=(), limit=None)

      Create a view restricted to the requested spectral channels.

      :param modalities: Channels that must be present together in a record.
      :type modalities: str or sequence of str, default ()
      :param limit: Maximum number of matching records to read.
      :type limit: int or None, default None

      :returns: A new view with the combined channel filters and the original split.
      :rtype: SpectraSplit

      .. rubric:: Examples

      >>> paired = split.select(modalities=['1H', '13C'])
      >>> examples = paired.head(5)

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L265>`__

   .. py:method:: fingerprint()

      Return file identity and view selection settings.

      :returns: Path, SHA-256, role, dataset, domain, channel filters and row limit.
      :rtype: dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L291>`__

   .. py:attribute:: path
      :type: Path

      The ``path`` field; see the constructor parameter description.

   .. py:attribute:: role
      :type: str

      The ``role`` field; see the constructor parameter description.

   .. py:attribute:: dataset
      :type: str

      The ``dataset`` field; see the constructor parameter description.

   .. py:attribute:: domain
      :type: str

      The ``domain`` field; see the constructor parameter description.

   .. py:attribute:: format
      :type: str

      The ``format`` field; see the constructor parameter description.

   .. py:attribute:: trusted
      :type: bool

      The ``trusted`` field; see the constructor parameter description.

   .. py:attribute:: modalities
      :type: tuple[str, ...]

      The ``modalities`` field; see the constructor parameter description.

   .. py:attribute:: limit
      :type: int | None

      The ``limit`` field; see the constructor parameter description.

.. py:class:: MolecularSpectra(card, splits)

   A dataset card together with its train, validation and test views.

   :param card: Dataset metadata, including the name, version and source information.
   :type card: dict
   :param splits: Named split views, indexed by ``'train'``, ``'val'`` and ``'test'``.
   :type splits: mapping of str to SpectraSplit

   .. rubric:: Examples

   >>> data = molspectra('opendatalab_nmr', root='data/nmr')
   >>> test = data['test']
   >>> record = test.head(1)[0]
   >>> print(record['smiles'])

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L304>`__

   .. py:method:: get_split()

      Return the dataset's named split views.

      :returns: Mapping from split names to streaming readers.
      :rtype: dict of str to SpectraSplit

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L325>`__

   .. py:method:: __getitem__(split)

      Select a named dataset split with ``data[split]``.

      :param split: Requested split role; validation aliases normalize to ``'val'``.
      :type split: {'train', 'val', 'validation', 'valid', 'test'}

      :returns: Streaming reader for the selected local file.
      :rtype: SpectraSplit

      :raises KeyError: If the dataset has no file for the requested role.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L335>`__

   .. py:method:: summary()

      Describe the dataset card and locally available files.

      :returns: Dataset card and each split's local path and file size.
      :rtype: dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L355>`__

   .. py:method:: verify()

      Verify local split files against the dataset card's SHA-256 values.

      :returns: ``verified=True`` and the checksum of each split.
      :rtype: dict

      :raises ValueError: If a reference checksum is missing or a local file differs.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L367>`__

   .. py:method:: from_jsonl(*, splits, name, domain, format='nmr_jsonl')
      :classmethod:

      Create a dataset from your own JSONL files.

      :param splits: JSONL files keyed by split, for example
                     ``{'train': 'train.jsonl', 'val': 'val.jsonl'}``.
      :type splits: mapping of str to path-like
      :param name: Name to attach to returned records.
      :type name: str
      :param domain: Spectral data origin.
      :type domain: {'experimental', 'computed'}
      :param format: Use ``'nmr_jsonl'`` for H/C peak-text records and ``'jsonl'`` for
                     general molecular/spectral dictionaries.
      :type format: {'nmr_jsonl', 'jsonl'}, default 'nmr_jsonl'

      :returns: Dataset with the supplied split files.
      :rtype: MolecularSpectra

      .. rubric:: Examples

      >>> custom = MolecularSpectra.from_jsonl(
      ...     splits={'train': 'train.jsonl', 'val': 'val.jsonl'},
      ...     name='my_measurements', domain='experimental')

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L392>`__

.. py:function:: molspectra(name, *, root, trusted=False)

   Load a registered molecular spectroscopy dataset.

   :param name: Name returned by :func:`list_datasets`.
   :type name: str
   :param root: Directory containing the dataset card's split files. Single-file
                datasets also accept the file path directly.
   :type root: str or pathlib.Path
   :param trusted: Enable the reader for a trusted pickle-based LMDB.
   :type trusted: bool, default False

   :returns: Dataset with lazy split readers.
   :rtype: MolecularSpectra

   :raises FileNotFoundError: If no expected split file exists under ``root``.
   :raises ValueError: If ``name`` is unknown.

   .. rubric:: Examples

   >>> data = molspectra('opendatalab_nmr', root='data/nmr')
   >>> records = data['test'].select(modalities=['1H', '13C']).head(3)

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L433>`__

.. py:function:: audit_splits(splits, *, identity='connectivity', check_nmr=False)

   Scan supplied views for molecular overlap using a disk-backed identity index.

   :param splits: Named molecular record streams, usually ``data.get_split()``.
   :type splits: mapping of str to iterable of dict
   :param identity: Compare the connectivity block or the full standard InChIKey.
                    Connectivity grouping keeps stereoisomers together.
   :type identity: {'connectivity', 'inchi'}, default 'connectivity'
   :param check_nmr: Validate each record's H/C peak representation while scanning.
   :type check_nmr: bool, default False

   :returns: Record and unique-identity counts, repeated identities, cross-split
             overlaps and molecular-identity policy. Standard InChIKeys are
             recomputed from SMILES.
   :rtype: dict

   .. rubric:: Examples

   >>> report = audit_splits(data.get_split(), identity='connectivity')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/dataset.py#L475>`__
```

## References

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Wang, J.-J., Jin, Y., Zhi, C.-Y., et al. NMRexp: A database of 3.3 million experimental NMR spectra. Scientific Data 12, 1954 (2025). doi:10.1038/s41597-025-06245-5. [Source](https://www.nature.com/articles/s41597-025-06245-5)
- Bushuiev, R., Bushuiev, A., de Jonge, N. F., Young, A., et al. MassSpecGym: A benchmark for the discovery and identification of molecules. Advances in Neural Information Processing Systems 37, Datasets and Benchmarks Track (2024). arXiv:2410.23326. [Source](https://arxiv.org/abs/2410.23326)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
