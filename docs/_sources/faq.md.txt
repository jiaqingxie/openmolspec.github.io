# Common workflows

## Choose your input

Use molecular structures for spectrum prediction, structures plus peaks for assignment, spectra for retrieval/generation, and time-domain traces for numerical inversion. [Tasks](tasks/index.md).

## Read a peak list

NMR uses ppm positions; MS uses m/z–intensity pairs; IR and Raman use cm⁻¹ positions with intensities where supplied. To produce dense optical inputs, save the grid and broadening parameters with the array.

## Select model environments

Pass the interpreter containing the model dependencies through `python=`. Set the checkpoint or model-root path on the corresponding model class. [SDK](api.md).

## Train with your own data

Import named train/validation files with `MolecularSpectra.from_jsonl`, prepare them with `prepare_nmr_training`, create a training plan and call `model.fit(plan)`.

## Create dataset splits

Use `split_records` with grouped random or scaffold assignment. Inspect the manifest for split counts, group policy and file hashes. [Splits](data/splits.md).

## Map predictions to atoms

NMRNet uses zero-based RDKit AddHs atom indices. MAGMa returns indices on its `engine_smiles` graph. Keep the returned graph with the indices when drawing annotations.

## Run a tutorial

Clone the release branch and install `requirements-docs-examples.txt`. Scientific plots use Arial; set `OPENMOLSPEC_ARIAL_FONT` to the TTF file on your machine. Configure model paths for the SDK inference notebook.

## Connect an agent

Use Spectra Harness from Python, JSON CLI requests or MCP. Discover tasks, validate the request, execute it, then read `result`. [Agent Harness](harness.md).
