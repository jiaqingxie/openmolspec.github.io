# openmolspec.datasets.splits

Generate deterministic dataset splits and molecule/scaffold leakage reports.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.datasets.splits.leakage_report` | Summarize molecular-group overlap between dataset splits. |
| {py:func}`openmolspec.datasets.splits.generate` | Assign molecular records to grouped training, validation and test splits. |
| {py:func}`openmolspec.datasets.splits.run` | Run the datasets splits workflow with the supplied settings. |
| {py:func}`openmolspec.datasets.splits.main` | Run the splits command-line workflow. |
| {py:data}`openmolspec.datasets.splits.SPLIT_NAMES` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.datasets.splits

.. py:function:: leakage_report(identity: pd.DataFrame, splits: Dict[str, List[int]]) -> Dict[str, pd.DataFrame]

   Summarize molecular-group overlap between dataset splits.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/datasets/splits.py#L79>`__

.. py:function:: generate(frame: pd.DataFrame, seed: int=2025, ratios: Optional[Dict[str, float]]=None, workers: int=1)

   Assign molecular records to grouped training, validation and test splits.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/datasets/splits.py#L95>`__

.. py:function:: run(dataset: str, output: str, seed: int=2025, train: float=0.8, validation: float=0.1, test: float=0.1, workers: int=1)

   Run the datasets splits workflow with the supplied settings.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/datasets/splits.py#L111>`__

.. py:function:: main()

   Run the splits command-line workflow.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/datasets/splits.py#L138>`__

.. py:data:: SPLIT_NAMES

   ::

      ('train', 'validation', 'test')

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/datasets/splits.py#L16>`__
```
