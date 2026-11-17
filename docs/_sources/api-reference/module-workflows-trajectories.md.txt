# openmolspec.workflows.trajectories

Extract optimization trajectories from Gaussian frequency logs.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.workflows.trajectories.run_dataset` | Run trajectory extraction for one configured source dataset. |
| {py:func}`openmolspec.workflows.trajectories.main` | Run the trajectories command-line workflow. |
| {py:data}`openmolspec.workflows.trajectories.SOURCE_PREFIXES` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.workflows.trajectories

.. py:function:: run_dataset(log_path: str, save_path: str, report_path: str, workers: int, prefix: str='') -> Dict[str, Any]

   Run trajectory extraction for one configured source dataset.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/trajectories.py#L54>`__

.. py:function:: main() -> None

   Run the trajectories command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/trajectories.py#L101>`__

.. py:data:: SOURCE_PREFIXES

   ::

      {'nist_ir': 'NISTIR',
       'pah': 'PAH',
       'pcqm4mv2': 'PCQM4MV2',
       'qm9': 'QM9',
       'rxn': 'RXN',
       'sdbs': 'SDBS',
       'wiley_ir': 'WILEYIR',
       'wiley_raman': 'WILEYRAMAN',
       'peptide': 'PEPTIDE',
       'zinc_v1': 'ZINCV1',
       'zinc_v2': 'ZINCV2'}

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/workflows/trajectories.py#L18>`__
```
