# openmolspec.inversion

Nonnegative regularized inversion of time-domain NMR measurements.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.inversion.kernel` | Construct a relaxation or diffusion inversion matrix. |
| {py:class}`openmolspec.inversion.InversionResult` | Recovered nonnegative distribution and its fitted signal. |
| {py:func}`openmolspec.inversion.invert` | Recover nonnegative amplitudes with Tikhonov regularization. |

```{eval-rst}
.. py:module:: openmolspec.inversion

.. py:function:: kernel(samples, grid, *, experiment='T2')

   Construct a relaxation or diffusion inversion matrix.

   :param samples: Strictly increasing, finite, nonnegative acquisition coordinates.
                   Relaxation experiments use time; diffusion experiments use b-values.
   :type samples: array-like of shape (n_samples,)
   :param grid: Strictly increasing positive relaxation times or diffusion constants.
                Relaxation times use the same unit as ``samples``; diffusion units
                are chosen so that ``samples * grid`` is dimensionless.
   :type grid: array-like of shape (n_bins,)
   :param experiment: Select exponential decay, saturation recovery, inversion recovery,
                      or diffusion attenuation. Defaults to ``'T2'``.
   :type experiment: {'T2', 'T1_saturation', 'T1_inversion', 'diffusion'}

   :returns: Matrix mapping discrete component amplitudes to the measured signal.
   :rtype: numpy.ndarray of shape (n_samples, n_bins)

   :raises ValueError: If coordinates are invalid, either vector has fewer than three values,
       or the experiment name is unsupported.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/inversion.py#L9>`__

.. py:class:: InversionResult(grid: object, weights: object, fitted_signal: object, residuals: object, alpha: float, experiment: str, diagnostics: dict)

   Recovered nonnegative distribution and its fitted signal.

   :param grid: Relaxation-time or diffusion-constant bins supplied to :func:`invert`.
   :type grid: numpy.ndarray
   :param weights: Nonnegative discrete amplitudes, one per grid bin.
   :type weights: numpy.ndarray
   :param fitted_signal: Signal reconstructed by multiplying the kernel by ``weights``.
   :type fitted_signal: numpy.ndarray
   :param residuals: Observed signal minus the reconstructed signal.
   :type residuals: numpy.ndarray
   :param alpha: Regularization strength used by the solver.
   :type alpha: float
   :param experiment: Kernel selected for the inversion.
   :type experiment: str
   :param diagnostics: Solver convergence, iteration count, residual error, penalty norm,
                       matrix condition number and coordinate counts.
   :type diagnostics: dict

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/inversion.py#L53>`__

   .. py:attribute:: grid
      :type: object

      The ``grid`` field; see the constructor parameter description.

   .. py:attribute:: weights
      :type: object

      The ``weights`` field; see the constructor parameter description.

   .. py:attribute:: fitted_signal
      :type: object

      The ``fitted_signal`` field; see the constructor parameter description.

   .. py:attribute:: residuals
      :type: object

      The ``residuals`` field; see the constructor parameter description.

   .. py:attribute:: alpha
      :type: float

      The ``alpha`` field; see the constructor parameter description.

   .. py:attribute:: experiment
      :type: str

      The ``experiment`` field; see the constructor parameter description.

   .. py:attribute:: diagnostics
      :type: dict

      The ``diagnostics`` field; see the constructor parameter description.

.. py:function:: invert(samples, signal, grid, *, experiment='T2', alpha=0.01, penalty='curvature', noise_std=None)

   Recover nonnegative amplitudes with Tikhonov regularization.

   :param samples: Acquisition coordinates accepted by :func:`kernel`.
   :type samples: array-like of shape (n_samples,)
   :param signal: Finite observed signal, with baseline and phase corrections applied.
   :type signal: array-like of shape (n_samples,)
   :param grid: Positive component coordinates. Curvature regularization requires an
                equally spaced logarithmic grid.
   :type grid: array-like of shape (n_bins,)
   :param experiment: Relaxation or diffusion kernel; see :func:`kernel`.
   :type experiment: str, default 'T2'
   :param alpha: Nonnegative regularization strength.
   :type alpha: float, default 0.01
   :param penalty: Second-difference smoothing on the log grid or amplitude regularization.
   :type penalty: {'curvature', 'identity'}, default 'curvature'
   :param noise_std: Positive standard deviation used to weight each residual. A scalar
                     applies the same weight to all measurements.
   :type noise_std: float or array-like, optional

   :returns: Discrete bin amplitudes, fitted signal, residuals and solver diagnostics.
             The objective is ``||W(Kf - signal)||² + alpha * ||Lf||²`` with ``f >= 0``.
   :rtype: InversionResult

   :raises ValueError: If inputs, noise weights or regularization settings are invalid.
   :raises RuntimeError: If the bounded least-squares solver does not converge.

   .. rubric:: Examples

   >>> import numpy as np
   >>> times = np.linspace(0, 1, 40)
   >>> bins = np.geomspace(0.01, 2, 80)
   >>> recovered = invert(times, np.exp(-times / 0.2), bins, alpha=0.01)

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/inversion.py#L83>`__
```

## References

- NMRInversions.jl contributors. NMRInversions.jl: inversion of NMR relaxation and diffusion measurements. Software and theory documentation. Accessed 18 November 2026. [Source](https://github.com/aris-mav/NMRInversions.jl)
