# openmolspec.parsing.gaussian

Shared Gaussian log parser used by the extraction entry points.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.parsing.gaussian.lorentzian_broadening` | Broaden discrete peaks onto a fixed grid with a Lorentzian line shape. |
| {py:func}`openmolspec.parsing.gaussian.raman_intensity` | Convert Raman activity to intensity using the existing project formula. |
| {py:class}`openmolspec.parsing.gaussian.GaussianLogParser` | Parse one Gaussian log into the legacy OpenSpec property dictionary. |
| {py:class}`openmolspec.parsing.gaussian.GaussianNMRParser` | Parse Gaussian shielding output into an OpenSpec NMR record. |

```{eval-rst}
.. py:module:: openmolspec.parsing.gaussian

.. py:function:: lorentzian_broadening(x0, y0, grid, sigma=12.0)

   Broaden discrete peaks onto a fixed grid with a Lorentzian line shape.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/parsing/gaussian.py#L27>`__

.. py:function:: raman_intensity(freq, raman_activity, temp=298.0, excitation_wavelength=532.0)

   Convert Raman activity to intensity using the existing project formula.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/parsing/gaussian.py#L40>`__

.. py:class:: GaussianLogParser(file_path: str, unique_id: str, smiles_map: Optional[Mapping[str, str]]=None, *, frequency_scaling_factor: float=SPECTRUM_PARAMETERS['frequency_scaling_factor'], ir_broadening_sigma: float=SPECTRUM_PARAMETERS['ir_broadening_sigma_cm-1'], raman_broadening_sigma: float=SPECTRUM_PARAMETERS['raman_broadening_sigma_cm-1'])

   Parse one Gaussian log into the legacy OpenSpec property dictionary.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/parsing/gaussian.py#L56>`__

   .. py:method:: parse_all()

      Parse molecular geometry, properties and spectra from the Gaussian log.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/parsing/gaussian.py#L94>`__

.. py:class:: GaussianNMRParser(file_path: str, unique_id: str, smiles_map: Optional[Mapping[str, str]]=None, *, broadening_sigma: float=SPECTRUM_PARAMETERS['nmr_broadening_sigma'])

   Parse Gaussian shielding output into an OpenSpec NMR record.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/parsing/gaussian.py#L264>`__
```
