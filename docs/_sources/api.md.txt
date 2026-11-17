# Python SDK

OpenMolSpec provides streaming datasets, spectroscopy model classes, training plans and benchmark runners. This guide explains how these interfaces fit together. Follow [Quick start](quickstart.md) for installation and your first prediction.

## Dataset objects

```python
from openmolspec.dataset import molspectra, list_datasets

print([card["name"] for card in list_datasets()])
data = molspectra("opendatalab_nmr", root="data/nmr")
splits = data.get_split()
rows = splits["test"].head(3)
paired = splits["train"].select(modalities=["1H", "13C"], limit=100)
print(data.summary())
print(data.verify())
```

`MolecularSpectra` groups the named splits. Each `SpectraSplit` reads records as you iterate, keeping memory usage bounded. `select` combines channel filters and a row limit; `head` reads a small list. `verify` checks the complete local files against the dataset version.

| Registered name | Format | Description |
| --- | --- | --- |
| `opendatalab_nmr` | `nmr_jsonl` | Cleaned experimental H/C NMR. |
| `nmrspec_test` | `nmr_jsonl` | NMRSpec / NMRTrans |
| `patent_test_10k` | `nmr_jsonl` | OpenDataLab H/C evaluation subset. |
| `nmrexp_exp_10k` | `nmr_jsonl` | Prepared NMRexp evaluation view. |
| `nmrgym_test` | `nmr_jsonl` | NMRGym |
| `openspec_test` | `openspec_lmdb` | Computed multimodal spectra and properties. |
| `massspecgym_test` | `massspecgym_csv` | Prepared MS/MS evaluation CSV. |
| `massspecgym_1_5` | `massspecgym_tsv` | MassSpecGym v1.5 TSV with source folds. |
| `opendatalab_nmr_prepared` | `nmr_jsonl` | Original prepared H/C files. |
| `opendatalab_ir` | `jsonl` | Cleaned experimental IR |
| `opendatalab_19f` | `jsonl` | Cleaned experimental 19F |
| `opendatalab_31p` | `jsonl` | Cleaned experimental 31P |
| `opendatalab_ms` | `jsonl` | Cleaned experimental MS |
| `opendatalab_11b` | `jsonl` | Cleaned experimental 11B |
| `opendatalab_raman` | `jsonl` | Cleaned experimental RAMAN |
| `opendatalab_29si` | `jsonl` | Cleaned experimental 29SI |

Each record retains its source fields. `_openmolspec` adds the dataset, domain, split, file locator and detected channels. The [Data guide](data/index.md) describes numerical fields, units, acquisition conditions and cleaned counts.

## Import your own measurements

```python
from openmolspec.dataset import MolecularSpectra

custom = MolecularSpectra.from_jsonl(
    splits={"train": "my-train.jsonl", "val": "my-val.jsonl"},
    name="my_measurements", domain="experimental")
print(custom["train"].head(1))
```

Use the H/C JSONL schema for `format="nmr_jsonl"`. For heteronuclear shifts, optical peak lists or general spectral dictionaries, choose `format="jsonl"`. The reader recognizes `nucleus` with `peaks_ppm`, `modality` with `wavenumber_cm1`, and numerical mass-spectral `peaks`.

## Model interfaces

| Class | Input → output | Training route |
| --- | --- | --- |
| `NMRNet` | SMILES → ¹H/¹³C shifts; structure + peaks → assignments | [NMRNet](tasks/nmr-forward-13C.md) |
| `NMRTransformer(stage="align")` | NMR + candidates → ranking | `training_plan`, `fit` |
| `NMRTransformer(stage="generate")` | NMR + formula → molecular structures | `training_plan`, `fit` |
| `GapModel` | IR + Raman + H/C → gap (eV) | [openSpec](tasks/vibrational-gap-ir_raman_hc.md) |
| `Vib2Mol` | Spectra → structures or candidate ranking | [openSpec](tasks/vibrational-generation-hc.md) |
| `MSPredictor` | Molecule + acquisition conditions → MS/MS | [ms-pred](tasks/ms-forward-glacier.md) |

Select each model’s dependencies through `python=`. This lets a lightweight OpenMolSpec client call the environment containing the author model implementation and its weights.

### NMRNet

```python
from openmolspec.model import NMRNet

model = NMRNet.from_pretrained(
    "models", nucleus="13C", python="/path/to/nmr-env/bin/python")
prediction = model.predict("CCO")
print(prediction["records"][0]["atom_indices"])
print(prediction["records"][0]["prediction_ppm"])
assignments = model.assign("CCO", [18.2, 58.3], tolerance_ppm=5.0)
```

The model directory contains `nmrnet/nmrnet-orig` and `nmrnet/weights`. The liquid-state fold-0 adapter predicts H/C shifts on CPU. Atom indices use the zero-based RDKit graph after adding hydrogens. The assignment output links measured peak indices to predicted atom sites and includes residuals and alternative matches.

### NMRTransformer

```python
from openmolspec.model import NMRTransformer

query = data["test"].head(1)[0]
aligner = NMRTransformer.from_pretrained(
    "alignment.pt", stage="align", python="/path/to/nmr-env/bin/python")
ranking = aligner.retrieve(query, ["CCO", "CCCO", "COC"], top_k=3)
generator = NMRTransformer.from_pretrained(
    "generation.pt", stage="generate",
    python="/path/to/nmr-env/bin/python")
candidates = generator.predict(query, beam_size=5)
```

Retrieval ranks the supplied molecular candidates from their spectral/molecular embeddings. Generation uses the NMR channels and the known `formula` in the query. Returned candidates include SMILES, validity, formula agreement and model scores.

### Vibrational and property models

```python
import json
from pathlib import Path
from openmolspec.model import GapModel, Vib2Mol

inputs = json.loads(Path(
    "documentation/assets/harness/vibrational-request.json").read_text())["inputs"]
gap_model = GapModel(root="openspec-models", python="/path/to/openspec-env/bin/python")
gap = gap_model.predict(inputs)
structure_model = Vib2Mol(root="openspec-models", python="/path/to/openspec-env/bin/python")
structures = structure_model.predict(inputs)
```

IR and Raman inputs each contain 1,024 normalized intensities on the 400–4,000 cm⁻¹ grid. `nmr_h` and `nmr_c` contain ppm shifts using the checkpoint reference. `GapModel` returns energy gaps in eV. `Vib2Mol` generates molecular candidates; its `retrieve` method ranks a supplied candidate library.

### Mass-spectrum prediction

```python
from openmolspec.model import MSPredictor

ms = MSPredictor(model="glacier", source="ms-pred",
    weights="glacier-weights", python="/path/to/ms-env/bin/python")
prediction = ms.predict(smiles="CCO", adduct="[M+H]+",
    collision_energy=20.0, instrument="Orbitrap")
print(prediction)
```

Supply the molecular structure, adduct, collision energy and instrument used for the desired spectrum. Choose `model="iceberg"` for the ICEBERG adapter. See the task guides for model assets and spectral comparison settings.

## Training and checkpoint reuse

```python
from openmolspec.training import prepare_nmr_training

prepared = prepare_nmr_training(custom["train"], custom["val"], "prepared-nmr")
model = NMRTransformer(stage="align", device="cpu")
plan = model.training_plan(
    prepared, run_dir="runs/my-encoder", epochs=10, batch_size=32)
print(plan.describe())
print(plan.validate())
trained = model.fit(plan)
model.save_config("trained-model.json")
restored = NMRTransformer.from_config("trained-model.json")
```

Preparation validates the molecular formula, nucleus labels and train/validation identity separation. `fit` launches the configured training stage and selects the best validation checkpoint. For a generator, use `stage="generate"` and supply its alignment checkpoint. The [training tutorial](notebooks/sdk-training-preflight.ipynb) explains every preparation step and inspects saved training/checkpoint results.

## Evaluation and numerical inversion

```python
from openmolspec.task import list_tasks
from openmolspec.benchmark import Benchmark

print(list_tasks(group="nmr"))
benchmark = Benchmark(workspace="/path/to/OpenMolSpec",
    python="/path/to/nmr-env/bin/python", alignment_checkpoint="alignment.pt", nmr_python="/path/to/nmr-env/bin/python")
report = benchmark.run("nmr.retrieval.hc.s2m", datasets=["nmrspec_test"],
    limit=64, output="results/my-retrieval.json")
```

Use [Benchmarks](benchmarks.md) for task metrics and experiment configurations. The inversion module provides nonnegative regularized recovery of relaxation and diffusion distributions; see [NMR inversion](inversion/index.md). The complete [API reference](api-reference/index.md) includes signatures, parameters and return values.

## References

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Xu, F., Guo, W., Wang, F., Yao, L., Wang, H., Tang, F., Gao, Z., Zhang, L., E, W., Tian, Z.-Q., et al. Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts. Nature Computational Science 5, 292–300 (2025). doi:10.1038/s43588-025-00783-z. [Source](https://doi.org/10.1038/s43588-025-00783-z)
- Yang, L., Yang, Z., Xie, J., Wang, Y., Gao, B., Fu, T., Wei, X., Sun, J., Wu, J., He, C., Li, Y. & Gu, Q. NMRTrans: Structure Elucidation from Experimental NMR Spectra via Set Transformers. arXiv:2602.10158 (2026). [Source](https://arxiv.org/abs/2602.10158)
- OpenMolSpec contributors. openSpec models and benchmark training workflows. Source archive, v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)
- Wang, R.-X., Wang, R. & Coley, C. W. GLACIER: Rethinking Mass Spectrum Prediction as an Object Detection Problem. NeurIPS 2026. arXiv:2606.29161 (2026). [Source](https://arxiv.org/abs/2606.29161)
- Wang, R., Manjrekar, M., Mahjour, B., Avila-Pacheco, J., et al. Neural Spectral Prediction for Structure Elucidation with Tandem Mass Spectrometry. bioRxiv (2025). doi:10.1101/2025.05.28.656653. [Source](https://doi.org/10.1101/2025.05.28.656653)
- NMRInversions.jl contributors. NMRInversions.jl: inversion of NMR relaxation and diffusion measurements. Software and theory documentation. Accessed 18 November 2026. [Source](https://github.com/aris-mav/NMRInversions.jl)
