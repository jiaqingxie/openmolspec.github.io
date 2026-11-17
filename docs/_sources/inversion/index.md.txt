# Inversion

NMR inversion estimates relaxation-time or diffusion-coefficient distributions from time-domain measurements. This section integrates the mathematical concepts described in [NMRInversions.jl](https://aris-mav.github.io/NMRInversions.jl/stable/theory/) into the OpenMolSpec workflow. The upstream Julia package offers additional algorithms and 2D functionality; the Python API below implements nonnegative quadratic regularization for 1D data.

## Choose the kernel

| Experiment | Kernel | Input unit requirement |
| --- | --- | --- |
| CPMG / T₂ decay | $\exp(-t/T_2)$ | time and T₂ in the same unit |
| Saturation recovery | $1-\exp(-t/T_1)$ | time and T₁ in the same unit |
| Inversion recovery | $1-2\exp(-t/T_1)$ | time and T₁ in the same unit; signed signal |
| Diffusion | $\exp(-bD)$ | bD dimensionless |

For a distribution on a chosen grid, measurements satisfy $g\approx Kf+\epsilon$. Here $f$ contains discrete bin amplitudes. A density per unit T or per unit log T requires the appropriate quadrature convention and must be identified separately.

## Why regularization is needed

Nearby exponential components produce similar signals. The kernel is ill-conditioned: a tiny perturbation can change the recovered distribution substantially. A small reconstruction residual therefore does not prove a unique distribution or resolve closely spaced physical components.

The implemented objective is

$$\min_{f\ge0}\|W(Kf-g)\|_2^2+\alpha\|Lf\|_2^2.$$

$W$ optionally weights observations by inverse noise standard deviation. $L$ is the identity or a second-difference operator on an equally spaced log grid. Increasing $\alpha$ increases regularization; excessive values can merge components. Alpha values depend on kernel, scaling, grid and weighting and should not be compared across conventions without care.

## Python interface

```python
import numpy as np
from openmolspec.inversion import invert

time = np.linspace(0, 1.5, 100)  # seconds
signal = .35*np.exp(-time/.05) + .65*np.exp(-time/.35)
grid = np.geomspace(.005, 2, 100)  # seconds
result = invert(time, signal, grid, experiment='T2',
                alpha=.01, penalty='curvature')
print(result.diagnostics)
weights = result.weights
reconstruction = result.fitted_signal
```

`samples`, `signal` and `grid` must be finite vectors; sampling coordinates and grid must increase strictly, and grid values must be positive. The caller performs phase/baseline correction and chooses physical units and an appropriate kernel. The result includes nonnegative weights, reconstruction, residuals, alpha and convergence diagnostics.

## Parameter selection and alternatives

Inspect reconstruction, residual structure, distribution stability and sensitivity to alpha/grid. GCV, L-curves and discrepancy criteria are alternative selection strategies. The current Python API accepts alpha explicitly. Sparse L1 regularization and multi-exponential nonlinear fitting make different assumptions; consult the upstream package for its available solvers and automatic selection procedures.

Run the [simulated inversion tutorial](../notebooks/theory-nmr-inversion.ipynb) to see known components, noisy observations and reconstructed distributions. For [the upstream Python/Julia integration](https://aris-mav.github.io/NMRInversions.jl/stable/python/), follow its installation instructions and API rather than treating OpenMolSpec as an identical implementation.

## References

- NMRInversions.jl contributors. NMRInversions.jl: inversion of NMR relaxation and diffusion measurements. Software and theory documentation. Accessed 18 November 2026. [Source](https://github.com/aris-mav/NMRInversions.jl)
- Xu, F., Guo, W., Wang, F., Yao, L., Wang, H., Tang, F., Gao, Z., Zhang, L., E, W., Tian, Z.-Q., et al. Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts. Nature Computational Science 5, 292–300 (2025). doi:10.1038/s43588-025-00783-z. [Source](https://doi.org/10.1038/s43588-025-00783-z)
