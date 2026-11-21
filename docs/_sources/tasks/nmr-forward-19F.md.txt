# 19F solution chemical shifts from SMILES

Predict shifts in ppm from a molecular structure and optional NMR solvent. Each environment includes its zero-based input atom indices. Symmetry-equivalent atoms share one predicted peak.

The held-out single-environment test contains 15,803 observations across 14,330 connectivities. MAE is 6.10 ppm and median absolute error is 0.52 ppm. MAE is 7.06 ppm on the subset with nonempty scaffolds absent from training.

Training uses experimental records with one observed signal and one graph-equivalence class. On multisite spectra, validation compares sorted peak lists when the observed count matches. Chemical shifts do not determine coupling constants, line shapes or intensities.

```python
from openmolspec.model import SolutionShiftPredictor

model = SolutionShiftPredictor("/path/to/OpenMolSpec/runs/solution-shifts-v1/19F")
print(model.predict("Fc1ccccc1", solvent="CDCl3")["environments"])
```

```bash
python -m pip install -e ".[solution-nmr]"
python -m openmolspec_bench run --workspace /path/to/OpenMolSpec --tasks nmr.forward.19F --limit 100000 --output results/nmr-forward-19F-test.json
```

The archived solid-state diagnostic is available in the original notebook. [Notebook](../notebooks/nmr-forward-19F.ipynb)
