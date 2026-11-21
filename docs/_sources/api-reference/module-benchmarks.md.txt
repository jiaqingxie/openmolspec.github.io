# openmolspec.benchmark

Run existing benchmark adapters through the same public Python package.

| Name | Description |
| --- | --- |
| {py:class}`openmolspec.benchmark.Benchmark` | Run spectroscopy benchmark tasks with configured model and data assets. |
| {py:func}`openmolspec.benchmark.evaluate_nmr` | Compare predicted NMR peaks with measured peak lists. |

```{eval-rst}
.. py:module:: openmolspec.benchmark

.. py:class:: Benchmark(*, workspace, python=None, **assets)

   Run spectroscopy benchmark tasks with configured model and data assets.

   :param workspace: Workspace containing the prepared evaluation datasets.
   :type workspace: str or pathlib.Path
   :param python: Interpreter used to launch the benchmark command.
   :type python: str or None, default None
   :param \*\*assets: Model/data locations accepted by the benchmark CLI: ``models_root``,
                      ``portable_root``, ``alignment_checkpoint``, ``generation_checkpoint``,
                      ``transpeaknet_source``, ``nmr_python``, ``ms_python``, ``solvent_library``, ``ms_source``,
                      ``ms_weights``, ``ms_input_csv``, ``ms_metadata_tsv``, ``magma_source``,
                      ``gap_lmdb`` and ``fp_inference_root``.

   .. rubric:: Examples

   >>> benchmark = Benchmark(workspace='data', models_root='models')
   >>> results = benchmark.run('nmr.forward.13C',
   ...     output='results/carbon.json', limit=32)

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/benchmark.py#L10>`__

   .. py:method:: run(tasks, *, output, datasets=None, limit=32, seed=42, sampling='reservoir', device='cpu', allow_cross_domain_diagnostic=False)

      Evaluate selected tasks and save their predictions and metrics.

      :param tasks: Task IDs returned by ``openmolspec.task.list_tasks``.
      :type tasks: str or iterable of str
      :param output: New JSON results file to create.
      :type output: str or pathlib.Path
      :param datasets: Prepared dataset views to evaluate.
      :type datasets: str or iterable of str or None, default None
      :param limit: Maximum number of selected examples per task/data view.
      :type limit: int, default 32
      :param seed: Seed used for example selection.
      :type seed: int, default 42
      :param sampling: Reservoir sampling or source-file order.
      :type sampling: {'reservoir', 'first'}, default 'reservoir'
      :param device: Model runtime device.
      :type device: str, default 'cpu'
      :param allow_cross_domain_diagnostic: Enable the F/P comparison of solid-state model predictions with
                                            solution-reference records. The result retains both domain labels.
      :type allow_cross_domain_diagnostic: bool, default False

      :returns: Saved result object with task IDs, metrics, sample information,
                predictions and model/data fingerprints.
      :rtype: dict

      :raises FileExistsError: If the output file already exists.
      :raises ValueError: If task IDs or sampling options are invalid.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/benchmark.py#L42>`__

.. py:function:: evaluate_nmr(prediction, references)

   Compare predicted NMR peaks with measured peak lists.

   :param prediction: NMRNet prediction containing ``records[*].prediction_ppm``.
   :type prediction: dict
   :param references: One reference peak list per prediction record, in ppm.
   :type references: iterable of iterable of float

   :returns: Peak-matching MAE/RMSE, matched coverage and peak-count statistics.
   :rtype: dict

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/benchmark.py#L102>`__
```
