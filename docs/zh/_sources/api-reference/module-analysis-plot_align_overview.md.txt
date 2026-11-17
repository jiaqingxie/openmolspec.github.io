# openmolspec.analysis.plot_align_overview

Draw the main OpenMolSpec Align overview figure.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.analysis.plot_align_overview.repository_root` | Return the repository root for the standard ``src`` layout. |
| {py:func}`openmolspec.analysis.plot_align_overview.resolve` | Resolve a configured input or output path. |
| {py:func}`openmolspec.analysis.plot_align_overview.compact_count` | Format a count with a compact magnitude suffix. |
| {py:func}`openmolspec.analysis.plot_align_overview.build_align_geometry_cache` | Build molecule-level atom statistics from matched Align geometries. |
| {py:func}`openmolspec.analysis.plot_align_overview.load_align_composition` | Read the composition statistics of the aligned release. |
| {py:func}`openmolspec.analysis.plot_align_overview.element_prevalence` | Compute elemental prevalence from molecular composition counts. |
| {py:func}`openmolspec.analysis.plot_align_overview.load_functional_group_summary` | Count molecule-level functional-group presence in the Align split. |
| {py:func}`openmolspec.analysis.plot_align_overview.plot_overview` | Draw the aligned-release composition overview. |
| {py:func}`openmolspec.analysis.plot_align_overview.main` | Run the plot align overview command-line workflow. |
| {py:data}`openmolspec.analysis.plot_align_overview.DATASETS` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.YEARS` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.FIDELITY_LEVELS` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.DATASET_FIDELITY` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.FIDELITY_PROTOCOLS` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.MOLECULE_COUNTS` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.SPECTRAL_MODALITIES` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.SPECTRAL_COVERAGE` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.ELEMENT_SYMBOLS` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.ELEMENT_ORDER` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.FUNCTIONAL_GROUP_SMARTS` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.BLUE` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.LIGHT_BLUE` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.GRAY` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.DARK_GRAY` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.GRID` | Module constant or schema value. |
| {py:data}`openmolspec.analysis.plot_align_overview.TEXT` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.analysis.plot_align_overview

.. py:function:: repository_root() -> Path

   Return the repository root for the standard ``src`` layout.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L148>`__

.. py:function:: resolve(root: Path, path: Path) -> Path

   Resolve a configured input or output path.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L154>`__

.. py:function:: compact_count(value: float, _position: float | None=None) -> str

   Format a count with a compact magnitude suffix.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L159>`__

.. py:function:: build_align_geometry_cache(align_path: Path, frequency_index_path: Path, frequency_payload_dir: Path, cache_path: Path) -> pd.DataFrame

   Build molecule-level atom statistics from matched Align geometries.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L182>`__

.. py:function:: load_align_composition(align_path: Path, frequency_index_path: Path, frequency_payload_dir: Path, cache_path: Path, rebuild_cache: bool) -> pd.DataFrame

   Read the composition statistics of the aligned release.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L251>`__

.. py:function:: element_prevalence(values: Iterable[object]) -> pd.Series

   Compute elemental prevalence from molecular composition counts.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L274>`__

.. py:function:: load_functional_group_summary(align_path: Path, cache_path: Path, rebuild_cache: bool) -> dict[str, object]

   Count molecule-level functional-group presence in the Align split.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L284>`__

.. py:function:: plot_overview(composition: pd.DataFrame, scaffold_keys: pd.Series, functional_group_summary: dict[str, object], align_molecules: int, trajectory_frames: int, output: Path) -> dict[str, object]

   Draw the aligned-release composition overview.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L547>`__

.. py:function:: main() -> None

   Run the plot align overview command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L761>`__

.. py:data:: DATASETS

   ::

      ['QM9S',
       'QMe14S',
       'ChEMBL IR/Raman',
       'SQuIRL',
       'Multimodal Spec.',
       'SpecX Large',
       'OpenMolSpec']

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L29>`__

.. py:data:: YEARS

   ::

      {'QM9S': 2023,
       'QMe14S': 2025,
       'ChEMBL IR/Raman': 2025,
       'SQuIRL': 2026,
       'Multimodal Spec.': 2024,
       'SpecX Large': 2026,
       'OpenMolSpec': 2026}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L38>`__

.. py:data:: FIDELITY_LEVELS

   ::

      ['Classical /\nempirical',
       'Mixed-\nfidelity',
       'GGA /\nDZ',
       'Hybrid /\nTZ',
       'Hybrid / TZ\n+ diffuse',
       'RSH /\naug-TZ']

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L48>`__

.. py:data:: DATASET_FIDELITY

   ::

      {'Multimodal Spec.': 1,
       'SpecX Large': 2,
       'ChEMBL IR/Raman': 3,
       'QM9S': 4,
       'QMe14S': 4,
       'OpenMolSpec': 5,
       'SQuIRL': 6}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L56>`__

.. py:data:: FIDELITY_PROTOCOLS

   ::

      {'Multimodal Spec.': 'GAFF/LAMMPS IR; MestReNova NMR; predicted MS/MS',
       'SpecX Large': 'GAFF/LAMMPS IR; MestReNova NMR; DFT Raman; TD-DFT UV; CFM-ID MS/MS',
       'ChEMBL IR/Raman': 'PBEPBE/6-31G',
       'QM9S': 'B3LYP/def-TZVP',
       'QMe14S': 'B3LYP/TZVP',
       'OpenMolSpec': 'B3LYP-D3(BJ)/6-311+G(d,p) vibration; OPBE/6-311+G(2d,p) NMR',
       'SQuIRL': 'ωB97X-D/aug-cc-pVTZ IR'}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L65>`__

.. py:data:: MOLECULE_COUNTS

   ::

      {'QM9S': 133885,
       'QMe14S': 186102,
       'ChEMBL IR/Raman': 220000,
       'SQuIRL': 133885,
       'Multimodal Spec.': 794403,
       'SpecX Large': 994386}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L77>`__

.. py:data:: SPECTRAL_MODALITIES

   ::

      ['IR', 'Raman', 'NMR', 'MS', 'UV–Vis']

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L87>`__

.. py:data:: SPECTRAL_COVERAGE

   ::

      {'QM9S': ('●', '●', '–', '–', '–'),
       'QMe14S': ('●', '●', '◐', '–', '–'),
       'ChEMBL IR/Raman': ('●', '●', '–', '–', '–'),
       'SQuIRL': ('●', '–', '–', '–', '–'),
       'Multimodal Spec.': ('○', '–', '○', '○', '–'),
       'SpecX Large': ('○', '●', '○', '○', '○'),
       'OpenMolSpec': ('●', '●', '●', '–', '–')}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L88>`__

.. py:data:: ELEMENT_SYMBOLS

   ::

      {1: 'H',
       5: 'B',
       6: 'C',
       7: 'N',
       8: 'O',
       9: 'F',
       13: 'Al',
       14: 'Si',
       15: 'P',
       16: 'S',
       17: 'Cl',
       32: 'Ge',
       33: 'As',
       34: 'Se',
       35: 'Br',
       53: 'I'}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L98>`__

.. py:data:: ELEMENT_ORDER

   ::

      ['H', 'B', 'C', 'N', 'O', 'F', 'Al', 'Si', 'P', 'S', 'Cl', 'Br', 'As', 'Se', 'I', 'Ge']

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L116>`__

.. py:data:: FUNCTIONAL_GROUP_SMARTS

   ::

      {'Aromatic': '[a;r]',
       'Carbonyl': '[CX3]=[OX1]',
       'Amine': '[NX3;!$([N][C,S,P]=[O,S,N]);!$([N+])]',
       'Ether': '[OD2;!$([O][C,S,P]=O)]([#6])[#6]',
       'Amide': '[NX3][CX3](=[OX1])',
       'Halogen': '[F,Cl,Br,I]',
       'Hydroxyl': '[OX2H;!$([O][C,S,P]=O)]',
       'Ester': '[CX3](=[OX1])[OX2][#6]',
       'Carboxylic acid': '[CX3](=[OX1])[OX2H1]',
       'Nitrile': '[CX2]#[NX1]',
       'Sulfonyl': '[SX4](=[OX1])(=[OX1])',
       'Nitro': '[$([NX3+](=O)[O-]),$([NX3](=O)=O)]',
       'Thiol': '[SX2H]',
       'Phosphoryl': '[PX4](=[OX1])'}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L123>`__

.. py:data:: BLUE

   ::

      '#2F6FDB'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L140>`__

.. py:data:: LIGHT_BLUE

   ::

      '#A9C5F5'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L141>`__

.. py:data:: GRAY

   ::

      '#A9B9CC'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L142>`__

.. py:data:: DARK_GRAY

   ::

      '#536273'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L143>`__

.. py:data:: GRID

   ::

      '#D7DEE8'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L144>`__

.. py:data:: TEXT

   ::

      '#263442'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/analysis/plot_align_overview.py#L145>`__
```
