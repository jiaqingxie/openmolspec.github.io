# openmolspec.legacy.extract_properties

Extract structures and quantum-chemical properties from Gaussian logs.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.legacy.extract_properties.get_raman_spectrum` | Construct a Raman spectrum from vibrational frequencies and activities. |
| {py:func}`openmolspec.legacy.extract_properties.get_ir_spectrum` | Construct an infrared spectrum from vibrational frequencies and intensities. |
| {py:class}`openmolspec.legacy.extract_properties.LogParser` | Compatibility wrapper preserving the historical no-scaling path. |
| {py:func}`openmolspec.legacy.extract_properties.init_worker` | Initialize shared inputs used by the parallel extraction workers. |
| {py:func}`openmolspec.legacy.extract_properties.process_log` | Extract molecular properties and spectra from one source log. |
| {py:func}`openmolspec.legacy.extract_properties.process_log_with_report` | Extract one source log and attach structured processing metadata. |
| {py:func}`openmolspec.legacy.extract_properties.main` | Run the extract properties command-line workflow. |

```{eval-rst}
.. py:module:: openmolspec.legacy.extract_properties

.. py:function:: get_raman_spectrum(freq, raman_activity, x_axis=None)

   Construct a Raman spectrum from vibrational frequencies and activities.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_properties.py#L25>`__

.. py:function:: get_ir_spectrum(freq, ir_intensity, x_axis=None)

   Construct an infrared spectrum from vibrational frequencies and intensities.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_properties.py#L32>`__

.. py:class:: LogParser(file_path, unique_id, smiles_map=None)

   Compatibility wrapper preserving the historical no-scaling path.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_properties.py#L39>`__

.. py:function:: init_worker(smiles_dict)

   Initialize shared inputs used by the parallel extraction workers.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_properties.py#L46>`__

.. py:function:: process_log(task)

   Extract molecular properties and spectra from one source log.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_properties.py#L52>`__

.. py:function:: process_log_with_report(task)

   Extract one source log and attach structured processing metadata.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_properties.py#L59>`__

.. py:function:: main()

   Run the extract properties command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_properties.py#L79>`__
```
