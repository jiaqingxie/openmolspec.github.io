# Nuclear magnetic resonance

## Chemical shifts and molecular environments

A nucleus in a magnetic field experiences an effective field modified by electronic shielding. Chemical shift uses a reference frequency:

$$\delta = 10^6(\nu-\nu_\mathrm{ref})/\nu_\mathrm{ref}.$$

The unit is ppm. A frequency separation in Hz depends on the spectrometer frequency; ppm and Hz must therefore remain distinct. Solvent, temperature, concentration, exchange and referencing can alter the observed shift. Two identical structures need not produce identical experimental peak lists under different conditions.

## Coupling and peak lists

In the weak-coupling limit, scalar coupling splits resonances; a first-order $n+1$ pattern applies only for the relevant set of equivalent spin-½ neighbours. Strong coupling, magnetic inequivalence, exchange and overlap can invalidate this rule. Peak integration relates to populations under suitable acquisition and relaxation conditions. A reported multiplet centre, a picked line and an atomwise shift are different objects.

OpenMolSpec preserves shift prose and, when available, multiplicity, integration, coupling constants, solvent and frequency. H/C forward prediction returns atomwise shifts. Matching an unassigned experimental peak set to those predictions yields candidate assignments; symmetry and experimental correlation spectra determine how these should be interpreted.

## Time-domain signal and Fourier transform

A simple complex free induction decay can be written

$$s(t)=\sum_k A_k\exp(-t/T_{2,k}^{*})\exp[i(2\pi\nu_k t+\phi_k)].$$

The Fourier transform maps frequency components into a spectrum. Acquisition duration controls nominal frequency resolution, sampling controls bandwidth, and the Nyquist limit constrains unaliased offsets. Apodization changes line width and noise; zero filling interpolates the display without adding acquired information. Phase and baseline processing affect peak picking and intensity interpretation.

The [Fourier tutorial](../notebooks/theory-nmr-fourier.ipynb) constructs a complex FID from three known frequencies, transforms it and checks the recovered dominant frequency. Its frequency axis uses offsets in Hz.

## Relaxation and inverse problems

Longitudinal recovery is characterized by $T_1$; transverse decay by $T_2$. Effective $T_2^*$ also includes field inhomogeneity. A distribution of environments can generate a sum of decays, motivating [regularized inversion](../inversion/index.md). Pulse-sequence kernels and time units must match the experiment.

## Further reading

- [NMRInversions.jl theory](https://aris-mav.github.io/NMRInversions.jl/stable/theory/), for relaxation and diffusion inversion.
- [MLatom documentation](https://xacs.xmu.edu.cn/docs/mlatom/), for molecular simulations and computational spectroscopy workflows.

## References

- NMRInversions.jl contributors. NMRInversions.jl: inversion of NMR relaxation and diffusion measurements. Software and theory documentation. Accessed 18 November 2026. [Source](https://github.com/aris-mav/NMRInversions.jl)
- Xu, F., Guo, W., Wang, F., Yao, L., Wang, H., Tang, F., Gao, Z., Zhang, L., E, W., Tian, Z.-Q., et al. Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts. Nature Computational Science 5, 292–300 (2025). doi:10.1038/s43588-025-00783-z. [Source](https://doi.org/10.1038/s43588-025-00783-z)
