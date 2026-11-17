# openmolspec.legacy.function



| Name | Description |
| --- | --- |
| {py:func}`openmolspec.legacy.function.car2xyz` | Convert a CAR molecular geometry representation to XYZ. |
| {py:func}`openmolspec.legacy.function.log2arc` | Extract molecular archive data from a Gaussian log. |
| {py:func}`openmolspec.legacy.function.arc2xyz` | Convert molecular archive coordinates to XYZ. |
| {py:func}`openmolspec.legacy.function.np2xyz` | Format atomic identities and NumPy coordinates as XYZ. |
| {py:func}`openmolspec.legacy.function.obmol2rdmol` | Convert an Open Babel molecule to an RDKit molecular graph. |
| {py:func}`openmolspec.legacy.function.xyz2rdmol_AC` | Construct an RDKit molecular graph from XYZ geometry and connectivity. |
| {py:func}`openmolspec.legacy.function.pdb2rdmol_AC` | Construct an RDKit molecular graph from PDB geometry and connectivity. |
| {py:func}`openmolspec.legacy.function.rdmol2x_pos` | Extract atomic features and Cartesian positions from an RDKit molecule. |
| {py:func}`openmolspec.legacy.function.generate_atoms_edge_index` | Construct atom-level graph edge indices. |
| {py:func}`openmolspec.legacy.function.atoms2bonds_edge_index` | Convert atom connections to bond-level graph edge indices. |
| {py:func}`openmolspec.legacy.function.generate_angel_edge_bondes` | Construct angular relationships between molecular graph bonds. |
| {py:func}`openmolspec.legacy.function.Is_bonds_edge_index` | Check membership in the molecular bond-edge indices. |
| {py:func}`openmolspec.legacy.function.generate_data` | Assemble molecular graph features for the model input format. |
| {py:func}`openmolspec.legacy.function.HessiantoHiHij` | Partition a Cartesian Hessian into atomic diagonal and pair blocks. |
| {py:func}`openmolspec.legacy.function.str2dedipole` | Parse dipole-derivative values from molecular archive text. |
| {py:func}`openmolspec.legacy.function.str2polar` | Parse polarizability values from molecular archive text. |
| {py:func}`openmolspec.legacy.function.str2depolar` | Parse polarizability-derivative values from molecular archive text. |
| {py:func}`openmolspec.legacy.function.str2hessian` | Parse Cartesian Hessian values from molecular archive text. |
| {py:func}`openmolspec.legacy.function.arc2tensor` | Convert molecular archive quantities to tensor-based model inputs. |
| {py:func}`openmolspec.legacy.function.shiftactfromfile` | Read atomwise NMR quantities from a source file. |
| {py:func}`openmolspec.legacy.function.file2pt` | Convert a molecular source file to tensor-based model data. |
| {py:func}`openmolspec.legacy.function.rdmol2pt` | Convert an RDKit molecular graph to tensor-based model data. |

```{eval-rst}
.. py:module:: openmolspec.legacy.function

.. py:function:: car2xyz(car_filepath: str, xyz_filepath: str)

   Convert a CAR molecular geometry representation to XYZ.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L26>`__

.. py:function:: log2arc(log_filepath, arc_filepath)

   Extract molecular archive data from a Gaussian log.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L40>`__

.. py:function:: arc2xyz(arc_path: str, xyz_path: str)

   Convert molecular archive coordinates to XYZ.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L77>`__

.. py:function:: np2xyz(atoms_x: np.array, atoms_pos: np.array, file_path: str)

   Format atomic identities and NumPy coordinates as XYZ.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L91>`__

.. py:function:: obmol2rdmol(obmol: openbabel.openbabel.OBMol, rdmol: Chem.rdchem.Mol)

   Convert an Open Babel molecule to an RDKit molecular graph.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L99>`__

.. py:function:: xyz2rdmol_AC(mol_path: str)

   Construct an RDKit molecular graph from XYZ geometry and connectivity.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L123>`__

.. py:function:: pdb2rdmol_AC(pdb_file: str)

   Construct an RDKit molecular graph from PDB geometry and connectivity.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L137>`__

.. py:function:: rdmol2x_pos(rdmol)

   Extract atomic features and Cartesian positions from an RDKit molecule.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L159>`__

.. py:function:: generate_atoms_edge_index(atoms_adjacent_matrix: np.array=None, mol: Chem.rdchem.Mol=None)

   Construct atom-level graph edge indices.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L170>`__

.. py:function:: atoms2bonds_edge_index(atoms_edge_index: np.array=None, mol: Chem.rdchem.Mol=None)

   Convert atom connections to bond-level graph edge indices.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L197>`__

.. py:function:: generate_angel_edge_bondes(atoms_pos: np.array=None, atoms_edge_index: np.array=None)

   Construct angular relationships between molecular graph bonds.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L221>`__

.. py:function:: Is_bonds_edge_index(bonds_edge_index, bonds_x)

   Check membership in the molecular bond-edge indices.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L243>`__

.. py:function:: generate_data(atomicNumList, xyz_coordinates, rdmol, matrix_mol)

   Assemble molecular graph features for the model input format.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L251>`__

.. py:function:: HessiantoHiHij(Hessian: torch.tensor=None, atoms_edge_index: torch.tensor=None)

   Partition a Cartesian Hessian into atomic diagonal and pair blocks.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L275>`__

.. py:function:: str2dedipole(s: str, atoms_count: int)

   Parse dipole-derivative values from molecular archive text.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L287>`__

.. py:function:: str2polar(s: str, atoms_count: int)

   Parse polarizability values from molecular archive text.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L291>`__

.. py:function:: str2depolar(s: str, atoms_count: int)

   Parse polarizability-derivative values from molecular archive text.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L300>`__

.. py:function:: str2hessian(s: str, atoms_count: int)

   Parse Cartesian Hessian values from molecular archive text.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L304>`__

.. py:function:: arc2tensor(arc_filepath: str)

   Convert molecular archive quantities to tensor-based model inputs.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L314>`__

.. py:function:: shiftactfromfile(b_filepath: str, out_filepath: str, max_step: int)

   Read atomwise NMR quantities from a source file.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L338>`__

.. py:function:: file2pt(xyz_pdb_path: str, arc_path: str=None)

   Convert a molecular source file to tensor-based model data.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L355>`__

.. py:function:: rdmol2pt(rdmol: Chem.rdchem.Mol, name: str)

   Convert an RDKit molecular graph to tensor-based model data.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/function.py#L392>`__
```
