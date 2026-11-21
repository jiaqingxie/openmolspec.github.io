# 31P chemical shift prediction

Predict solution-state phosphorus chemical shifts in ppm from a SMILES and an optional NMR solvent. The online tool runs the validation-selected GNN checkpoint. Equivalent sites share a shift. Atom indices follow the input SMILES and start at zero.

[Run a ³¹P prediction](https://jiaqingxie.github.io/openmolspec.github.io/#tool-31p) · [Download model and Python wheel](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/phosphorus31-v2/openmolspec-31P.zip)

## Model selection

The four-layer graph neural network passes bond-conditioned messages between connected atoms and reads out the target phosphorus site. Training used 35,696 molecular connectivities. We selected epoch 90 and a local-environment median weight of 0.75 on validation. The tree baseline uses 5,960 boosting rounds. Both candidates have access to the same training-only local shift medians. The criterion was validation MAE with equal weight per molecular connectivity. Test records were scored after freezing the choice.

| Split / model | Molecules | Observations | MAE / ppm | MAE per molecule / ppm |
| --- | ---: | ---: | ---: | ---: |
| validation · LightGBM | 4,372 | 6,813 | 5.42 | 7.17 |
| validation · GNN alone | 4,372 | 6,813 | 4.21 | 5.40 |
| validation · GNN + local median | 4,372 | 6,813 | 4.07 | 5.28 |
| test · LightGBM | 4,248 | 6,693 | 5.94 | 7.77 |
| test · GNN alone | 4,248 | 6,693 | 4.74 | 6.12 |
| test · GNN + local median | 4,248 | 6,693 | 4.56 | 5.95 |

## Test groups

| Subset | Molecules | LightGBM MAE / ppm | GNN with local median MAE / ppm |
| --- | ---: | ---: | ---: |
| unseen scaffold | 1,225 | 10.80 | 9.18 |
| P=O | 2,735 | 3.99 | 3.62 |
| P=S | 243 | 6.70 | 6.17 |
| neutral P, three neighbours including a heteroatom | 311 | 16.98 | 11.66 |
| other P environments | 495 | 21.81 | 13.74 |

Subset MAEs weight each molecular connectivity equally. Evaluation uses one observed shift and one graph-equivalence class per spectrum. Site assignments in multisite spectra, intensities, couplings and line shapes need separate validation. This comparison uses one GNN training seed.

## Local inference

Unzip the download and run these commands inside the extracted directory.

```bash
python -m pip install "./openmolspec-1.0.0-py3-none-any.whl[phosphorus-gnn]"
openmolspec-solution-shift --model-dir model --smiles "CCOP(=O)(OCC)OCC" --solvent CDCl3
```

```python
from openmolspec.model import SolutionShiftPredictor

predictor = SolutionShiftPredictor("model")
print(predictor.predict("CCOP(=O)(OCC)OCC", "CDCl3")["environments"])
```
