# openmolspec.legacy.extract_spectra

Extract structures, quantum properties, IR and Raman data from Gaussian logs.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.legacy.extract_spectra.get_raman_spectrum` | Construct a Raman spectrum from vibrational frequencies and activities. |
| {py:class}`openmolspec.legacy.extract_spectra.LogParser` | Compatibility wrapper preserving the historical spectra convention. |
| {py:func}`openmolspec.legacy.extract_spectra.init_worker` | Initialize shared inputs used by the parallel extraction workers. |
| {py:func}`openmolspec.legacy.extract_spectra.process_log` | Extract molecular properties and spectra from one source log. |
| {py:func}`openmolspec.legacy.extract_spectra.process_log_with_report` | Extract one source log and attach structured processing metadata. |
| {py:func}`openmolspec.legacy.extract_spectra.main` | Run the extract spectra command-line workflow. |

```{eval-rst}
.. py:module:: openmolspec.legacy.extract_spectra

.. py:function:: get_raman_spectrum(freq, raman_activity, x_axis=None)

   Construct a Raman spectrum from vibrational frequencies and activities.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_spectra.py#L27>`__

.. py:class:: LogParser(file_path, unique_id, smiles_map=None)

   Compatibility wrapper preserving the historical spectra convention.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_spectra.py#L35>`__

.. py:function:: init_worker(smiles_dict)

   Initialize shared inputs used by the parallel extraction workers.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_spectra.py#L42>`__

.. py:function:: process_log(task)

   Extract molecular properties and spectra from one source log.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_spectra.py#L48>`__

.. py:function:: process_log_with_report(task)

   Extract one source log and attach structured processing metadata.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_spectra.py#L55>`__

.. py:function:: main()

   Run the extract spectra command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_spectra.py#L75>`__
```
