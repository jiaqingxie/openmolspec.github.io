# 19F solution chemical shifts

The validation-selected model predicts chemical shifts in ppm from a SMILES string and an optional solvent. The training partition contains 116,126 molecular connectivities. Models were selected by giving each of 13,962 validation connectivities equal weight. The selected combination (60% 19F-gnn-refined, 40% 19F-tree-r2) achieved 5.66 ppm validation MAE.

The independent test contains 14,330 connectivities and 15,803 measured single-environment observations. Observation MAE is **5.92 ppm**, molecule-weighted MAE is **5.62 ppm**, and the 90th percentile absolute error is 4.73 ppm. Each prediction lists the input atom indices belonging to that symmetry class. Multi-environment site assignments require separate validation.

[Run a structure online](https://jiaqingxie.github.io/openmolspec.github.io/#tool-19f) · [Download the model and SDK](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/solution-nmr-v2/openmolspec-19F.zip)

Extract the ZIP and run the following commands in its directory.

```bash
python -m pip install "./openmolspec-1.0.0-py3-none-any.whl[phosphorus-gnn,solution-nmr]"
```

```python
from openmolspec.model import SolutionShiftPredictor

model = SolutionShiftPredictor("model")
print(model.predict("Fc1ccccc1", "CDCl3"))
```
