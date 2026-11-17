# Quick start

This tutorial takes you from installation to loading an NMR record, predicting chemical shifts and training a model with your own data. Run the commands from the cloned repository so the example files are available.

## 1. Install OpenMolSpec

Use Python 3.10 or newer. Create an environment and install the package with data-format and plotting dependencies.

```bash
git clone --branch release/openmolspec-v1 https://github.com/jiaqingxie/openmolspec-studio-frontend.git
cd openmolspec-studio-frontend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -e ".[data,analysis]"
```

For an existing installation, the [v1.0 release](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0) also provides a wheel. The release branch contains the current dataset cards and manual examples.

## 2. Read your first spectrum

Start with the three NMRSpec example molecules included in the repository. `MolecularSpectra` creates a dataset with named splits; a split streams records from its file. `head(1)` reads the first record.

```python
from openmolspec.dataset import MolecularSpectra

examples = MolecularSpectra.from_jsonl(
    splits={"test": "documentation/assets/sdk-nmr-test-examples.jsonl"},
    name="nmrspec_examples", domain="experimental")
record = examples["test"].head(1)[0]
print(record["smiles"])
print(record["formula"])
print(record["c_nmr"])
```

`smiles` describes the molecule, `formula` stores its molecular formula, and `h_nmr`/`c_nmr` contain the experimental spectral records. `_openmolspec` records the dataset name, split and available channels.

## 3. Load a complete dataset

For the cleaned OpenDataLab H/C collection, put `train.jsonl`, `val.jsonl` and `test.jsonl` in `data/nmr`, then open the registered dataset.

```python
from openmolspec.dataset import molspectra, list_datasets

print([card["name"] for card in list_datasets()])
data = molspectra("opendatalab_nmr", root="data/nmr")
paired = data["train"].select(modalities=["1H", "13C"], limit=100)
for molecule in paired.head(3):
    print(molecule["smiles"], molecule["h_peaks_ppm"])
print(data.verify())
```

The channel filter selects molecules containing both H and C spectra. `verify()` checks the local files against the dataset version. See [Data](data/index.md) for cleaned counts, per-nucleus files, experimental conditions and other supported resources.

## 4. Predict chemical shifts

NMRNet uses its released model files and Python environment. Set `models_root` to the directory containing `nmrnet/`, and `python` to the interpreter with the NMRNet dependencies. The [model guide](tasks/nmr-forward-13C.md) describes the files and nucleus settings.

```python
from openmolspec.model import NMRNet

model = NMRNet.from_pretrained(
    "models", nucleus="13C", python="/path/to/nmr-env/bin/python")
result = model.predict("CCO")
print(result["records"][0]["atom_indices"])
print(result["records"][0]["prediction_ppm"])
```

The ethanol example returns carbon atom indices `[0, 1]` and shifts of approximately `[17.774, 57.774]` ppm. Atom indices follow zero-based RDKit atom ordering after adding hydrogens. Use these indices to attach each shift to the molecular graph.

## 5. Compare with measurements and save the result

```python
import json
from pathlib import Path
from openmolspec.benchmark import evaluate_nmr

metrics = evaluate_nmr(result, [[18.2, 58.3]])
print(metrics)
Path("ethanol-prediction.json").write_text(json.dumps(result, indent=2))
model.save_config("nmrnet-config.json")
restored = NMRNet.from_config("nmrnet-config.json")
```

`evaluate_nmr` matches predicted and observed peak positions and returns the error and matching coverage. The JSON result contains the atomwise predictions and model provenance. The configuration file records the model settings for later use.

## 6. Train with your own NMR data

Install the training dependencies. Prepare separate training and validation JSONL files using the H/C schema in [Data](data/nmr.md): every record supplies a molecular structure, formula, spectrum text and channel mask.

```bash
python -m pip install -e ".[train]"
```

```python
from openmolspec.dataset import MolecularSpectra
from openmolspec.training import prepare_nmr_training
from openmolspec.model import NMRTransformer

custom = MolecularSpectra.from_jsonl(
    splits={"train": "train.jsonl", "val": "val.jsonl"},
    name="my_nmr", domain="experimental")
prepared = prepare_nmr_training(
    custom["train"], custom["val"], "prepared-nmr")
model = NMRTransformer(stage="align", device="cpu")
plan = model.training_plan(
    prepared, run_dir="runs/my-encoder", epochs=10, batch_size=32)
print(plan.validate())
trained = model.fit(plan)
print(trained)
```

Preparation checks formulas, nucleus labels and train/validation molecular overlap. The alignment stage learns a shared spectrum–molecule representation. For structure generation, use `stage="generate"` and provide the saved alignment checkpoint. The [training tutorial](notebooks/sdk-training-preflight.ipynb) walks through preparation, configuration, checkpoint saving and reloading.

## Next steps

- [Tasks](tasks/index.md): inputs, outputs and model calls for every spectroscopy task.
- [Tutorials](notebooks/index.md): executed examples, plots and explanations.
- [API reference](api-reference/index.md): classes, signatures, parameters and return values.
- [Agent Harness](harness.md): Python, CLI and MCP spectroscopy tools.
