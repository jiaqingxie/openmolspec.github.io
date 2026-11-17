# openmolspec.legacy.extract_nmr



| Name | Description |
| --- | --- |
| {py:func}`openmolspec.legacy.extract_nmr.Lorenz_broadening` | Lorenz broadening for Vibration and NMR spectroscopies |
| {py:func}`openmolspec.legacy.extract_nmr.get_nmr_spectrum` | Construct an NMR spectrum from the supplied peak positions and weights. |
| {py:class}`openmolspec.legacy.extract_nmr.LogParser` | Class for calculating and parsing properties from Gaussian log files. |
| {py:func}`openmolspec.legacy.extract_nmr.get_args_parser` | Construct the argument parser for the extraction command. |
| {py:func}`openmolspec.legacy.extract_nmr.process_log_file_wrapper` | Unpack one extraction job and process its source log. |
| {py:func}`openmolspec.legacy.extract_nmr.process_log_file_with_report` | Process a molecular log and return its processing-report entry. |

```{eval-rst}
.. py:module:: openmolspec.legacy.extract_nmr

.. py:function:: Lorenz_broadening(x0, y0, c, sigma=12)

   Lorenz broadening for Vibration and NMR spectroscopies
   x0 y0:Position of the horizontal and vertical axes to be broadening

   c:Position of the broadening horizontal axis and number of points

   sigma:spread half width

   The position of the vertical axis after the output has been broadened.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_nmr.py#L34>`__

.. py:function:: get_nmr_spectrum(shifts, sigma=0.05)

   Construct an NMR spectrum from the supplied peak positions and weights.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_nmr.py#L49>`__

.. py:class:: LogParser(file_path)

   Class for calculating and parsing properties from Gaussian log files.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_nmr.py#L53>`__

   .. py:method:: log2nmr()

      Extract NMR quantities from the loaded Gaussian log.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_nmr.py#L74>`__

.. py:function:: get_args_parser()

   Construct the argument parser for the extraction command.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_nmr.py#L112>`__

.. py:function:: process_log_file_wrapper(args_tuple)

   Unpack one extraction job and process its source log.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_nmr.py#L130>`__

.. py:function:: process_log_file_with_report(args_tuple)

   Process a molecular log and return its processing-report entry.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/legacy/extract_nmr.py#L142>`__
```
