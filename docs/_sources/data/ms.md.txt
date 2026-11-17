# Mass spectrometry data

Mass spectra store m/z positions and intensities. MS/MS prediction additionally uses the ion/adduct, collision energy, instrument and precursor mass to define the acquisition conditions.

## OpenDataLab

Numerical m/z–intensity peak lists and molecular structures. 5,233 spectra across 4,980 molecules.

Cleaning retains spectra with at least two finite positive m/z values, finite nonnegative intensities and a positive intensity sum. Exact duplicates with the same molecular identity and source conditions are removed.

![Cleaned MS molecular size and peak positions](../assets/gallery/data-cleaned-ms.png)

```python
from openmolspec.dataset import molspectra

data = molspectra("opendatalab_ms", root="data/experimental")
record = data["test"].head(1)[0]
print(record["smiles"])
print(record["peaks"][:5])  # [[m/z, intensity], ...]
```

## MassSpecGym

The v1.5 forward-prediction view contains 119,029 spectra with the acquisition fields required by the simulation task. The dataset reader preserves `spec_id`, `smiles`, `peaks`, `adduct`, `collision_energy`, `instrument` and `precursor_mz`. Use `molspectra("massspecgym_1_5", root=...)` for the TSV source, or import a prepared CSV with `SpectraSplit(format="massspecgym_csv", ...)`.

## MassBank

The numerical MS2 view contains 120,512 spectra with valid molecular structures. Retain the spectrum accession, ion mode, instrument, collision conditions and source license alongside the peak array.

## References

- OpenDataLab. WanJuan MolSpectra, version 1.0.3. Experimental molecular spectroscopy dataset. [Source](https://opendatalab.com/)
- Bushuiev, R., Bushuiev, A., de Jonge, N. F., Young, A., et al. MassSpecGym: A benchmark for the discovery and identification of molecules. Advances in Neural Information Processing Systems 37, Datasets and Benchmarks Track (2024). arXiv:2410.23326. [Source](https://arxiv.org/abs/2410.23326)
- Horai, H., Arita, M., Kanaya, S., et al. MassBank: a public repository for sharing mass spectral data for life sciences. Journal of Mass Spectrometry 45, 703–714 (2010). doi:10.1002/jms.1777. [Source](https://doi.org/10.1002/jms.1777)
