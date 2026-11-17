# openmolspec.workflows.manifest_scan

Build reproducible OpenSpec sample manifests and legacy JSON maps.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.workflows.manifest_scan.configure_rdkit_logging` | Keep RDKit diagnostics from corrupting progress output. |
| {py:func}`openmolspec.workflows.manifest_scan.sha256_file` | Return a file hash, or ``None`` when the file cannot be read. |
| {py:func}`openmolspec.workflows.manifest_scan.normalize_smiles` | Validate and canonicalize a SMILES or InChI molecular identifier. |
| {py:func}`openmolspec.workflows.manifest_scan.normalize_peptide_sequence` | Build a standard or modified peptide from a hyphen-delimited ID. |
| {py:func}`openmolspec.workflows.manifest_scan.source_id` | Return globally unique sample ID and original source ID. |
| {py:func}`openmolspec.workflows.manifest_scan.label_candidates` | Return likely label JSON paths in priority order. |
| {py:func}`openmolspec.workflows.manifest_scan.load_labels` | Read molecular labels for matching source log files. |
| {py:func}`openmolspec.workflows.manifest_scan.collect_collection` | Collect one frequency/property or NMR collection. |
| {py:func}`openmolspec.workflows.manifest_scan.merge_records` | Merge frequency and NMR rows by global sample ID and check SMILES. |
| {py:func}`openmolspec.workflows.manifest_scan.write_outputs` | Write the scanned source manifest and its summary files. |
| {py:func}`openmolspec.workflows.manifest_scan.parse_args` | Parse command-line arguments into an argparse namespace. |
| {py:func}`openmolspec.workflows.manifest_scan.main` | Run the manifest scan command-line workflow. |
| {py:data}`openmolspec.workflows.manifest_scan.DEFAULT_DATASETS` | Module constant or schema value. |
| {py:data}`openmolspec.workflows.manifest_scan.DEFAULT_NMR_DATASETS` | Module constant or schema value. |
| {py:data}`openmolspec.workflows.manifest_scan.MANIFEST_CACHE_VERSION` | Module constant or schema value. |
| {py:data}`openmolspec.workflows.manifest_scan.IDENTITY_FIELDS` | Module constant or schema value. |
| {py:data}`openmolspec.workflows.manifest_scan.PUBLIC_ROW_FIELDS` | Module constant or schema value. |
| {py:data}`openmolspec.workflows.manifest_scan.AUDIT_FIELDS` | Module constant or schema value. |
| {py:data}`openmolspec.workflows.manifest_scan.SOURCE_PREFIXES` | Module constant or schema value. |
| {py:data}`openmolspec.workflows.manifest_scan.ALLOW_MISSING_LABEL_DATASETS` | Module constant or schema value. |
| {py:data}`openmolspec.workflows.manifest_scan.STANDARD_AMINO_ACIDS` | Module constant or schema value. |
| {py:data}`openmolspec.workflows.manifest_scan.MODIFIED_AMINO_ACIDS` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.workflows.manifest_scan

.. py:function:: configure_rdkit_logging(show_warnings: bool=False) -> None

   Keep RDKit diagnostics from corrupting progress output.

   Invalid labels and canonicalization failures are retained in the manifest
   audit table.  The high-volume RDKit warning stream is therefore hidden by
   default, while errors remain visible.  Set ``show_warnings`` when
   investigating a particular label.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L119>`__

.. py:function:: sha256_file(path: Path, block_size: int=1024 * 1024) -> Optional[str]

   Return a file hash, or ``None`` when the file cannot be read.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L134>`__

.. py:function:: normalize_smiles(smiles: Any) -> Dict[str, Optional[str]]

   Validate and canonicalize a SMILES or InChI molecular identifier.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L288>`__

.. py:function:: normalize_peptide_sequence(source: str) -> Dict[str, Optional[str]]

   Build a standard or modified peptide from a hyphen-delimited ID.

   ``p*`` residues carry phosphate and ``s*`` residues carry sulfate. The
   modification is attached to the named atom in the corresponding residue,
   preserving the peptide bonds and stereochemistry created by RDKit.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L316>`__

.. py:function:: source_id(raw_id: str, dataset: str) -> Tuple[str, str]

   Return globally unique sample ID and original source ID.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L400>`__

.. py:function:: label_candidates(dataset_dir: Path, log_dir: Path, dataset: str, fallback_dirs: Iterable[Path]=()) -> List[Path]

   Return likely label JSON paths in priority order.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L408>`__

.. py:function:: load_labels(candidates: Iterable[Path]) -> Tuple[Dict[str, Any], Optional[Path], Optional[str]]

   Read molecular labels for matching source log files.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L430>`__

.. py:function:: collect_collection(root: Path, dataset: str, *, nmr: bool=False, hash_files: bool=True, label_fallback_dirs: Iterable[Path]=(), workers: int=1, cache_path: Optional[Path]=None, incremental: bool=True, min_file_age_seconds: float=0.0, identity_lookup: Optional[Dict[str, Dict[str, Any]]]=None, audit_all_records: bool=True) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]

   Collect one frequency/property or NMR collection.

   Collection shards are reused when path, size, mtime, label metadata and
   cache schema are unchanged. ``identity_lookup`` lets NMR records reuse the
   already-normalized frequency identity, which is also required for peptide
   collections whose sequence is encoded in the filename.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L446>`__

.. py:function:: merge_records(records: List[Dict[str, Any]]) -> Tuple[pd.DataFrame, List[Dict[str, Any]]]

   Merge frequency and NMR rows by global sample ID and check SMILES.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L738>`__

.. py:function:: write_outputs(frame: pd.DataFrame, audit: pd.DataFrame, output_dir: Path, *, write_compatibility_json: bool=True) -> Dict[str, Any]

   Write the scanned source manifest and its summary files.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L788>`__

.. py:function:: parse_args() -> argparse.Namespace

   Parse command-line arguments into an argparse namespace.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L859>`__

.. py:function:: main() -> None

   Run the manifest scan command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L896>`__

.. py:data:: DEFAULT_DATASETS

   ::

      ('nist_ir',
       'pah',
       'pcqm4mv2',
       'qm9',
       'rxn',
       'sdbs',
       'wiley_ir',
       'wiley_raman',
       'peptide',
       'zinc_v1',
       'zinc_v2')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L41>`__

.. py:data:: DEFAULT_NMR_DATASETS

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L54>`__

.. py:data:: MANIFEST_CACHE_VERSION

   ::

      '2'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L55>`__

.. py:data:: IDENTITY_FIELDS

   ::

      ('smiles', 'canonical_smiles', 'inchikey', 'scaffold')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L56>`__

.. py:data:: PUBLIC_ROW_FIELDS

   ::

      ('sample_id',
       'source_dataset',
       'source_id',
       'smiles',
       'canonical_smiles',
       'inchikey',
       'scaffold',
       'log_path',
       'source_file_hash',
       'frequency_file_hash',
       'nmr_file_hash',
       'label_path',
       'label_status',
       'label_errors',
       'available_modalities',
       'frequency_log_path',
       'nmr_log_path')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L57>`__

.. py:data:: AUDIT_FIELDS

   ::

      ('sample_id',
       'source_dataset',
       'source_id',
       'modality',
       'status',
       'error_type',
       'log_path',
       'label_path')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L76>`__

.. py:data:: SOURCE_PREFIXES

   ::

      {'nist_ir': 'NISTIR',
       'pah': 'PAH',
       'pcqm4mv2': 'PCQM4MV2',
       'qm9': 'QM9',
       'rxn': 'RXN',
       'sdbs': 'SDBS',
       'wiley_ir': 'WILEYIR',
       'wiley_raman': 'WILEYRAMAN',
       'peptide': 'PEPTIDE',
       'zinc_v1': 'ZINCV1',
       'zinc_v2': 'ZINCV2'}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L88>`__

.. py:data:: ALLOW_MISSING_LABEL_DATASETS

   ::

      {'sdbs', 'peptide'}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L105>`__

.. py:data:: STANDARD_AMINO_ACIDS

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L106>`__

.. py:data:: MODIFIED_AMINO_ACIDS

   ::

      {'pS': ('S', 'OG', 'P'),
       'pT': ('T', 'OG1', 'P'),
       'pY': ('Y', 'OH', 'P'),
       'pH1': ('H', 'ND1', 'P'),
       'pH2': ('H', 'NE2', 'P'),
       'sS': ('S', 'OG', 'S'),
       'sT': ('T', 'OG1', 'S'),
       'sY': ('Y', 'OH', 'S')}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/manifest_scan.py#L107>`__
```
