# Mass spectrometry

## Molecular mass, ions and adducts

A mass spectrometer measures ions. The observed coordinate is mass-to-charge ratio, $m/z$, rather than neutral molecular mass. Protonation, deprotonation, sodium adduction, charge state and electron mass conventions affect the mapping from a molecular formula to an ion. Exact monoisotopic mass, nominal mass and average molecular weight serve different purposes.

An isolated reported m/z helps constrain molecular identity. Use complete m/z–intensity peak lists for MS/MS learning and evaluation. [Data](../data/index.md) distinguishes these record forms.

## Isotope patterns and resolving power

Natural isotope abundances produce a distribution of ion masses. In a carbon-only illustration, the number of ¹³C atoms follows a binomial distribution. Real envelopes also depend on hydrogen, nitrogen, oxygen, sulfur, halogens and the ion composition. Resolving power is commonly expressed as $R=m/\Delta m$, with the width convention specified, often FWHM.

The [isotope tutorial](../notebooks/theory-ms-isotopes.ipynb) normalizes a carbon-only probability distribution and shows two resolving powers. It illustrates how isotope abundance and resolving power shape the envelope.

## Tandem mass spectrometry

MS/MS selects a precursor and records product ions after activation. Fragmentation depends on molecular graph, charge localization, adduct, collision energy, instrument and acquisition mode. Relative intensities can change substantially across conditions. Numerical energy values from different instrument conventions are not automatically equivalent.

GLACIER and ICEBERG in OpenMolSpec require explicit acquisition inputs. MAGMa proposes mass-compatible fragments on a specified graph. A fragment mass match supports a candidate explanation; multiple pathways or isomers may remain possible.

## Comparing spectra

For vectors $x$ and $y$, cosine similarity is $(x\cdot y)/(\|x\|\|y\|)$. Peak tolerance or bin width, normalization, precursor removal, filtering and unassigned-peak handling all affect the result. Report these choices and the spectrum identities with every comparison. Evaluation should also respect molecule, acquisition and source partitions.

## Sources

- [MassSpecGym](https://huggingface.co/datasets/roman-bushuiev/MassSpecGym): versioned experimental MS/MS and benchmark definitions.
- [ms-pred](https://github.com/coleygroup/ms-pred): GLACIER/ICEBERG implementations and model training procedures.

## References

- Bushuiev, R., Bushuiev, A., de Jonge, N. F., Young, A., et al. MassSpecGym: A benchmark for the discovery and identification of molecules. Advances in Neural Information Processing Systems 37, Datasets and Benchmarks Track (2024). arXiv:2410.23326. [Source](https://arxiv.org/abs/2410.23326)
- Wang, R.-X., Wang, R. & Coley, C. W. GLACIER: Rethinking Mass Spectrum Prediction as an Object Detection Problem. NeurIPS 2026. arXiv:2606.29161 (2026). [Source](https://arxiv.org/abs/2606.29161)
- Wang, R., Manjrekar, M., Mahjour, B., Avila-Pacheco, J., et al. Neural Spectral Prediction for Structure Elucidation with Tandem Mass Spectrometry. bioRxiv (2025). doi:10.1101/2025.05.28.656653. [Source](https://doi.org/10.1101/2025.05.28.656653)
