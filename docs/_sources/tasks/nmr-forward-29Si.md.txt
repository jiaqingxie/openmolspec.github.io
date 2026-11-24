# 29Si solution chemical shifts

The validation-selected model predicts chemical shifts in ppm from a SMILES string and an optional solvent. The training partition contains 1,543 molecular connectivities. Models were selected by giving each of 171 validation connectivities equal weight. The selected combination (80% 29Si-gnn, 20% 29Si-tree-r2) achieved 2.91 ppm validation MAE.

The complete test set contains 177 connectivities and 187 measured single-environment observations. Observation MAE is **1.96 ppm**, molecule-weighted MAE is **2.03 ppm**, and the 90th percentile absolute error is 3.90 ppm. Each prediction lists the input atom indices belonging to that symmetry class. Multi-environment site assignments require separate validation.

[Run a structure online](https://jiaqingxie.github.io/openmolspec.github.io/#tool-29si) · [Download the model and SDK](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/solution-nmr-v2/openmolspec-29Si.zip)

Extract the ZIP and run the following commands in its directory.

```bash
python -m pip install "./openmolspec-1.0.0-py3-none-any.whl[phosphorus-gnn,solution-nmr]"
```

```python
from openmolspec.model import SolutionShiftPredictor

model = SolutionShiftPredictor("model")
print(model.predict("C[Si](C)(C)C", "CDCl3"))
```
