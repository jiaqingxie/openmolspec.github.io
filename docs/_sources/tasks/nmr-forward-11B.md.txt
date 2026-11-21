# 11B solution chemical shifts

The validation-selected model predicts chemical shifts in ppm from a SMILES string and an optional solvent. The training partition contains 13,011 molecular connectivities. Models were selected by giving each of 1,501 validation connectivities equal weight. The selected combination (50% 11B-gnn, 50% 11B-gnn-r2) achieved 1.48 ppm validation MAE.

The independent test contains 1,517 connectivities and 1,669 measured single-environment observations. Observation MAE is **1.24 ppm**, molecule-weighted MAE is **1.28 ppm**, and the 90th percentile absolute error is 2.35 ppm. Each prediction lists the input atom indices belonging to that symmetry class. Multi-environment site assignments require separate validation.

[Run a structure online](https://jiaqingxie.github.io/openmolspec.github.io/#tool-11b) · [Download the model and SDK](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/solution-nmr-v2/openmolspec-11B.zip)

Extract the ZIP and run the following commands in its directory.

```bash
python -m pip install "./openmolspec-1.0.0-py3-none-any.whl[phosphorus-gnn,solution-nmr]"
```

```python
from openmolspec.model import SolutionShiftPredictor

model = SolutionShiftPredictor("model")
print(model.predict("OB(O)c1ccccc1", "CDCl3"))
```
