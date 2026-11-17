# openmolspec.maintenance.parse_zinc_v2_nmr

Parse only the ZINCV2 NMR Gaussian logs.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.maintenance.parse_zinc_v2_nmr.parse_zinc_v2_nmr` | Parse the ZINC v2 NMR records into the maintained output representation. |
| {py:func}`openmolspec.maintenance.parse_zinc_v2_nmr.main` | Run the parse zinc v2 nmr command-line workflow. |

```{eval-rst}
.. py:module:: openmolspec.maintenance.parse_zinc_v2_nmr

.. py:function:: parse_zinc_v2_nmr(*, log_path: str, smiles_dict: str, save_path: str, report_dir: str, workers: int, broadening_sigma: float, require_normal_termination: bool) -> Dict[str, Any]

   Parse the ZINC v2 NMR records into the maintained output representation.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/maintenance/parse_zinc_v2_nmr.py#L95>`__

.. py:function:: main() -> None

   Run the parse zinc v2 nmr command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/maintenance/parse_zinc_v2_nmr.py#L141>`__
```
