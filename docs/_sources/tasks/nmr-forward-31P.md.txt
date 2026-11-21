# 31P solution chemical shifts

The validation-selected model predicts chemical shifts in ppm from a SMILES string and an optional solvent. The training partition contains 35,696 molecular connectivities. Models were selected by giving each of 4,372 validation connectivities equal weight. The selected combination (30% 31P-gnn-r1, 30% 31P-gnn-r2, 40% 31P-gnn-width96) achieved 5.00 ppm validation MAE.

The independent test contains 4,248 connectivities and 6,693 measured single-environment observations. Observation MAE is **4.27 ppm**, molecule-weighted MAE is **5.54 ppm**, and the 90th percentile absolute error is 7.57 ppm. Each prediction lists the input atom indices belonging to that symmetry class. Multi-environment site assignments require separate validation.

[Run a structure online](https://jiaqingxie.github.io/openmolspec.github.io/#tool-31p) · [Download the model and SDK](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/solution-31p-6f08e5689aa7/openmolspec-31P.zip)

On the same molecules, the previous release scored 4.32 ppm per observation and 5.60 ppm per molecule. The paired 95% bootstrap interval for the change in molecule-weighted MAE is [-0.125, -0.005] ppm. [Previous release](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/solution-nmr-v2)

SMILES is converted to a 2D graph of atoms and bonds. Four message-passing layers build the phosphorus-site representation, with molecular descriptors and a solvent embedding at readout. Equivalent local environments share computations. The widest network has 189,025 parameters. It reached its lowest validation error at epoch 69 and stopped at epoch 87. Training and validation took 10 min 18 s after graph preparation. [Training records for all components](https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/results/phosphorus_gnn_training_runs.json)

Extract the ZIP and run the following commands in its directory.

```bash
python -m pip install "./openmolspec-1.0.0-py3-none-any.whl[phosphorus-gnn,solution-nmr]"
```

```python
from openmolspec.model import SolutionShiftPredictor

model = SolutionShiftPredictor("model")
print(model.predict("CCOP(=O)(OCC)OCC", "CDCl3"))
```
