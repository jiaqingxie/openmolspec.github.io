# openmolspec.harness

Spectra Harness: validated, observable model calls by spectroscopy family.

| Name | Description |
| --- | --- |
| {py:class}`openmolspec.harness.HarnessPlugin` | Backend functions for a family of spectroscopy tasks. |
| {py:class}`openmolspec.harness.SpectraHarness` | Discover, validate and run spectroscopy model tasks. |
| {py:func}`openmolspec.harness.default_plugins` | Create the NMR, MS and vibrational model plugins. |
| {py:func}`openmolspec.harness.main` | Run the ``spectra-harness`` command-line interface. |

```{eval-rst}
.. py:module:: openmolspec.harness

.. py:class:: HarnessPlugin(name: str, task_ids: tuple, validate: object, execute: object)

   Backend functions for a family of spectroscopy tasks.

   :param name: Display name of the model family.
   :type name: str
   :param task_ids: Task identifiers served by this plugin.
   :type task_ids: tuple of str
   :param validate: ``validate(task, inputs, model_config)`` checks the request and raises
                    ``ValueError`` for invalid fields.
   :type validate: callable
   :param execute: ``execute(task, inputs, model_config)`` runs the model and returns a
                   JSON-serializable prediction dictionary.
   :type execute: callable

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/harness.py#L21>`__

   .. py:attribute:: name
      :type: str

      The ``name`` field; see the constructor parameter description.

   .. py:attribute:: task_ids
      :type: tuple

      The ``task_ids`` field; see the constructor parameter description.

   .. py:attribute:: validate
      :type: object

      The ``validate`` field; see the constructor parameter description.

   .. py:attribute:: execute
      :type: object

      The ``execute`` field; see the constructor parameter description.

.. py:class:: SpectraHarness(plugins=None)

   Discover, validate and run spectroscopy model tasks.

   :param plugins: Model plugins to register. ``None`` installs the NMR, MS and vibrational
                   plugins returned by :func:`default_plugins`.
   :type plugins: iterable of HarnessPlugin or None, default None

   .. rubric:: Examples

   >>> harness = SpectraHarness()
   >>> tasks = harness.catalog()
   >>> inputs = {'smiles': 'CCO'}
   >>> settings = {'root': 'models', 'python': '/path/to/nmr-env/bin/python'}
   >>> harness.validate('nmr.forward.13C', inputs, settings)['valid']
   True

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/harness.py#L43>`__

   .. py:method:: catalog()

      List the registered model tasks.

      :returns: Task ID, title, modalities, data domain and Harness family name.
      :rtype: list of dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/harness.py#L68>`__

   .. py:method:: validate(task, inputs, model_config)

      Check task fields and spectral array shapes.

      :param task: Registered task identifier.
      :type task: str
      :param inputs: Molecular or spectral fields expected by the selected task.
      :type inputs: dict
      :param model_config: Model paths and runtime settings. NMR uses ``root`` or
                           ``checkpoint``; MS uses ``source`` and ``weights``; vibrational
                           models use ``root``. ``python`` selects the model environment.
      :type model_config: dict

      :returns: ``valid=True``, task identifier and plugin family.
      :rtype: dict

      :raises ValueError: If a task or required request field is invalid.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/harness.py#L80>`__

   .. py:method:: run(task, inputs, model_config, *, repeats=1)

      Run a model request and return its prediction and call history.

      :param task: Model task from :meth:`catalog`.
      :type task: str
      :param inputs: Task inputs, using the same fields as :meth:`validate`.
      :type inputs: dict
      :param model_config: Model and interpreter paths for the selected plugin.
      :type model_config: dict
      :param repeats: Number of identical calls, from 1 to 5.
      :type repeats: int, default 1

      :returns: ``completed``, ``result``, ``calls``, prediction/output hashes and
                repeat equality fields. For repeated requests, ``repeat_results``
                contains the individual outputs. Each call records elapsed seconds,
                status and, on failure, its error type and message.
      :rtype: dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/harness.py#L109>`__

.. py:function:: default_plugins()

   Create the NMR, MS and vibrational model plugins.

   :returns: The three plugin families and their task bindings.
   :rtype: list of HarnessPlugin

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/harness.py#L320>`__

.. py:function:: main()

   Run the ``spectra-harness`` command-line interface.

   Commands are ``catalog``, ``validate --request request.json`` and
   ``run --request request.json --output result.json``. Request files contain
   ``task``, ``inputs``, ``model_config`` and optional ``repeats``.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/harness.py#L340>`__
```

## References

- DeepSeek-AI. DeepSeek Harness: modular agent tools and execution infrastructure. Software repository. Accessed 18 November 2026. [Source](https://github.com/deepseek-ai/deepseek-harness)
- Xu, F., Guo, W., Wang, F., Yao, L., Wang, H., Tang, F., Gao, Z., Zhang, L., E, W., Tian, Z.-Q., et al. Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts. Nature Computational Science 5, 292–300 (2025). doi:10.1038/s43588-025-00783-z. [Source](https://doi.org/10.1038/s43588-025-00783-z)
- Wang, R.-X., Wang, R. & Coley, C. W. GLACIER: Rethinking Mass Spectrum Prediction as an Object Detection Problem. NeurIPS 2026. arXiv:2606.29161 (2026). [Source](https://arxiv.org/abs/2606.29161)
- OpenMolSpec contributors. openSpec models and benchmark training workflows. Source archive, v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)
