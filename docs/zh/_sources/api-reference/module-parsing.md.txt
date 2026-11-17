# openmolspec.parsing

Gaussian frequency, NMR and optimization-trajectory parsers.

| Name | Description |
| --- | --- |
| {py:class}`openmolspec.parsing.GaussianLogParser` | Parse one Gaussian log into the legacy OpenSpec property dictionary. |
| {py:class}`openmolspec.parsing.GaussianNMRParser` | Parse Gaussian shielding output into an OpenSpec NMR record. |
| {py:func}`openmolspec.parsing.parse_gaussian_trajectory` | Parse all optimization-cycle information from one Gaussian log. |

```{eval-rst}
.. py:module:: openmolspec.parsing

.. py:class:: GaussianLogParser(file_path: str, unique_id: str, smiles_map: Optional[Mapping[str, str]]=None, *, frequency_scaling_factor: float=SPECTRUM_PARAMETERS['frequency_scaling_factor'], ir_broadening_sigma: float=SPECTRUM_PARAMETERS['ir_broadening_sigma_cm-1'], raman_broadening_sigma: float=SPECTRUM_PARAMETERS['raman_broadening_sigma_cm-1'])

   Parse one Gaussian log into the legacy OpenSpec property dictionary.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/parsing/gaussian.py#L56>`__

   .. py:method:: parse_all()

      Parse molecular geometry, properties and spectra from the Gaussian log.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/parsing/gaussian.py#L94>`__

.. py:class:: GaussianNMRParser(file_path: str, unique_id: str, smiles_map: Optional[Mapping[str, str]]=None, *, broadening_sigma: float=SPECTRUM_PARAMETERS['nmr_broadening_sigma'])

   Parse Gaussian shielding output into an OpenSpec NMR record.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/parsing/gaussian.py#L264>`__

.. py:function:: parse_gaussian_trajectory(path: str) -> Dict[str, Any]

   Parse all optimization-cycle information from one Gaussian log.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/parsing/trajectory.py#L96>`__
```
