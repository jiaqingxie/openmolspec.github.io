# 31P solution chemical shifts

The validation-selected model predicts chemical shifts in ppm from a SMILES string and an optional solvent. The training partition contains 35,696 molecular connectivities. Models were selected by giving each of 4,372 validation connectivities equal weight. The selected combination (50% 31P-gnn-r1, 50% 31P-gnn-r2) achieved 5.10 ppm validation MAE.

The independent test contains 4,248 connectivities and 6,693 measured single-environment observations. Observation MAE is **4.32 ppm**, molecule-weighted MAE is **5.60 ppm**, and the 90th percentile absolute error is 7.84 ppm. Each prediction lists the input atom indices belonging to that symmetry class. Multi-environment site assignments require separate validation.

[Run a structure online](https://jiaqingxie.github.io/openmolspec.github.io/#tool-31p) · [Download the model and SDK](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/solution-nmr-v2/openmolspec-31P.zip)

An independently initialized four-layer bond-message network was trained with the same 35,696 structures. The previous deployed GNN scored 5.95 ppm per connectivity on the same test. The paired 95% interval for the change is [-0.45, -0.25] ppm. [First release](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/phosphorus31-v2)

Extract the ZIP and run the following commands in its directory.

```bash
python -m pip install "./openmolspec-1.0.0-py3-none-any.whl[phosphorus-gnn,solution-nmr]"
```

```python
from openmolspec.model import SolutionShiftPredictor

model = SolutionShiftPredictor("model")
print(model.predict("CCOP(=O)(OCC)OCC", "CDCl3"))
```
