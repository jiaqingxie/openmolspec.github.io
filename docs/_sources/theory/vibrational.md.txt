# Infrared and Raman spectroscopy

## Normal modes from the Hessian

Near an equilibrium geometry, the harmonic approximation expands the energy to second order in nuclear displacements. The Hessian contains the second derivatives. Diagonalizing the mass-weighted Hessian gives normal-mode eigenvalues and eigenvectors; positive eigenvalues give squared angular frequencies. Translation and rotation are excluded when constructing vibrational modes. Imaginary frequencies indicate negative curvature and require interpretation before treating a geometry as a minimum.

A nonlinear molecule has $3N-6$ vibrational modes; an isolated linear molecule has $3N-5$. Frequencies depend on geometry, electronic-structure method, masses and harmonic/anharmonic treatment. A different conformer can produce a different spectrum.

## Complementary selection rules

IR activity depends on the change in electric dipole moment along a normal coordinate. Raman activity depends on derivatives of the polarizability tensor. These are complementary observables: an intense IR mode can be weak in Raman. Experimental Raman intensities additionally depend on excitation frequency, temperature, polarization and collection geometry. Stored Raman activity is not automatically the same as measured intensity.

## From discrete modes to line shapes

A plotted spectrum is commonly formed by broadening mode frequencies:

$$I(\tilde\nu)=\sum_k A_k L(\tilde\nu-\tilde\nu_k).$$

The line shape $L$ can be Gaussian or Lorentzian. Gaussian width $\sigma$ and FWHM satisfy $\mathrm{FWHM}=2\sqrt{2\ln2}\,\sigma$. Axis limits, line width, frequency scaling and intensity normalization should accompany a calculated spectrum. Broadening does not recover missing experimental physics.

The [broadening tutorial](../notebooks/theory-vibrational-broadening.ipynb) uses five declared modes and checks that the area under a normalized Gaussian sum equals the total supplied activity. IR and Raman use the same frequencies and different activity vectors.

## Experimental versus computed spectra

Absorbance and transmittance are related logarithmically under their respective measurement conventions. Sparse reported IR peak positions do not provide a full intensity curve. Gas, liquid and solid environments can change positions and widths. Frequency resampling must use explicit units and a defined axis; do not interpolate a peak list and claim it is a measured spectrum.

For conformer-to-spectrum evaluation, use the coordinates associated with the reference. For multimodal learning, define whether NMR and vibrational observables belong to the same conformer, molecular identity or condition and preserve their references.

## Sources

- [MLatom](https://xacs.xmu.edu.cn/docs/mlatom/): computational spectroscopy workflows.
- [QM9S](https://www.nature.com/articles/s43588-023-00550-y): calculated spectra and molecular response properties.
- [QMe14S](https://arxiv.org/abs/2501.18876): calculated spectra spanning a broader element set.

## References

- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- OpenMolSpec contributors. openSpec models and benchmark training workflows. Source archive, v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)
