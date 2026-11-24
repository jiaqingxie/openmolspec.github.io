# openmolspec.model

Public model facades. Heavy dependencies load only inside the selected runtime.

| Name | Description |
| --- | --- |
| {py:class}`openmolspec.model.NMRNet` | Predict atomwise H/C chemical shifts and assign NMR peaks. |
| {py:class}`openmolspec.model.NMRTransformer` | Retrieve and generate molecular structures from experimental NMR. |
| {py:class}`openmolspec.model.GapModel` | Predict the HOMO–LUMO energy gap from molecular spectra. |
| {py:class}`openmolspec.model.Vib2Mol` | Generate, retrieve and rerank structures with the openSpec Vib2Mol model. |
| {py:class}`openmolspec.model.MSPredictor` | Predict tandem mass spectra with GLACIER or ICEBERG. |

```{eval-rst}
.. py:module:: openmolspec.model

.. py:class:: NMRNet(*, models_root, nucleus='13C', python=None, device='cpu')

   Predict atomwise H/C chemical shifts and assign NMR peaks.

   :param models_root: Directory containing ``nmrnet/nmrnet-orig`` and ``nmrnet/weights``.
   :type models_root: str or pathlib.Path
   :param nucleus: Nucleus to predict with the liquid-state fold-0 checkpoint and scaler.
   :type nucleus: {'1H', '13C'}, default '13C'
   :param python: Interpreter of the NMR model environment. ``None`` selects the current
                  Python interpreter.
   :type python: str or None, default None
   :param device: Device used by the NMRNet runtime adapter.
   :type device: {'cpu'}, default 'cpu'

   .. rubric:: Examples

   >>> model = NMRNet.from_pretrained('models', nucleus='13C',
   ...     python='/path/to/nmr-env/bin/python')
   >>> prediction = model.predict('CCO')
   >>> shifts = prediction['records'][0]['prediction_ppm']

   Atom indices follow the zero-based RDKit ``AddHs`` graph of the input SMILES.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L56>`__

   .. py:method:: from_pretrained(models_root, **kwargs)
      :classmethod:

      Create an NMRNet predictor from a model-assets directory.

      :param models_root: Directory containing the NMRNet source and weights.
      :type models_root: str or pathlib.Path
      :param \*\*kwargs: ``nucleus``, ``python`` and ``device`` constructor settings.

      :returns: Configured chemical-shift predictor.
      :rtype: NMRNet

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L92>`__

   .. py:method:: predict(smiles)

      Predict chemical shifts for one molecule or a batch.

      :param smiles: Molecular structures as SMILES strings.
      :type smiles: str or iterable of str

      :returns: ``records`` contains one dictionary per molecule, with ``smiles``,
                ``nucleus``, ``atom_indices`` and ``prediction_ppm``. Runtime and
                checkpoint information is returned in ``provenance``.
      :rtype: dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L109>`__

   .. py:method:: assign(smiles, peaks_ppm, *, tolerance_ppm=None)

      Match measured peak positions to predicted atomic environments.

      :param smiles: Known molecular structure.
      :type smiles: str
      :param peaks_ppm: Measured chemical shifts in ppm, in the desired peak-index order.
      :type peaks_ppm: iterable of float
      :param tolerance_ppm: Maximum peak/site residual. The default is 0.5 ppm for H and 5 ppm
                            for C.
      :type tolerance_ppm: float or None, default None

      :returns: Assignments with peak indices, candidate atom indices, predicted
                shifts, residuals and unmatched peaks/sites.
      :rtype: dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L131>`__

   .. py:method:: save_config(path)

      Save model and runtime settings as JSON.

      :param path: New configuration file to create. It stores the model class,
                   checkpoint paths, runtime interpreter and device settings.
      :type path: str or pathlib.Path

      :raises FileExistsError: If the destination already exists.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L14>`__

   .. py:method:: from_config(path, **overrides)
      :classmethod:

      Construct a model from a saved configuration.

      :param path: JSON file written by :meth:`save_config`.
      :type path: str or pathlib.Path
      :param \*\*overrides: Constructor options to replace, such as ``python`` or ``device``.

      :returns: Configured instance of the requested model class.
      :rtype: model instance

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L32>`__

   .. py:attribute:: capabilities
      :type: dict

      Supported model operations, nuclei and input domain.

.. py:class:: NMRTransformer(*, checkpoint=None, stage='generate', python=None, device='cpu')

   Retrieve and generate molecular structures from experimental NMR.

   :param checkpoint: Alignment or generation checkpoint for prediction or initialization.
   :type checkpoint: str or pathlib.Path or None, default None
   :param stage: ``'align'`` selects the dual encoder; ``'generate'`` selects the molecular
                 decoder. The stage also determines the training plan.
   :type stage: {'align', 'generate'}, default 'generate'
   :param python: Interpreter containing the NMR Transformer dependencies.
   :type python: str or None, default None
   :param device: Torch device, for example ``'cpu'`` or ``'cuda:0'``.
   :type device: str, default 'cpu'

   .. rubric:: Examples

   >>> model = NMRTransformer.from_pretrained('alignment.pt', stage='align')
   >>> ranking = model.retrieve(query, ['CCO', 'COC'], top_k=2)

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L154>`__

   .. py:method:: from_pretrained(checkpoint, **kwargs)
      :classmethod:

      Configure a pretrained alignment or generation model.

      :param checkpoint: Trained checkpoint file.
      :type checkpoint: str or pathlib.Path
      :param \*\*kwargs: Model ``stage``, runtime ``python`` and ``device`` settings.

      :returns: Model configured for the requested stage.
      :rtype: NMRTransformer

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L184>`__

   .. py:method:: predict(records, *, beam_size=5)

      Generate SMILES candidates from NMR spectra and molecular formulae.

      :param records: Each query contains ``formula``, ``h_nmr``, ``c_nmr`` and optional
                      ``modality_mask``. NMR records store ``chemical_shift`` text and
                      optional multiplicity, integration, coupling, solvent and frequency.
      :type records: dict or iterable of dict
      :param beam_size: Number of candidate sequences explored by beam search.
      :type beam_size: int, default 5

      :returns: Generated candidates with SMILES, model scores, validity and
                molecular-formula agreement.
      :rtype: dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L201>`__

   .. py:method:: retrieve(query, candidates, *, top_k=10)

      Rank candidate molecules for an NMR query.

      :param query: H/C NMR records and their ``modality_mask``.
      :type query: dict
      :param candidates: Candidate molecular SMILES.
      :type candidates: iterable of str
      :param top_k: Number of ranked candidates to return.
      :type top_k: int, default 10

      :returns: Candidate identities and embedding similarity scores in rank order.
      :rtype: dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L228>`__

   .. py:method:: training_plan(data_dir, *, run_dir, **kwargs)

      Create a training plan for the current model stage.

      :param data_dir: Directory returned by ``prepare_nmr_training``.
      :type data_dir: str or pathlib.Path
      :param run_dir: New output directory for logs and checkpoints.
      :type run_dir: str or pathlib.Path
      :param \*\*kwargs: :class:`openmolspec.training.TrainingPlan` options, including
                         ``epochs``, ``batch_size``, ``learning_rate`` and ``parameters``.

      :returns: Plan that can be inspected, validated and passed to :meth:`fit`.
      :rtype: openmolspec.training.TrainingPlan

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L251>`__

   .. py:method:: fit(plan)

      Train the model and select the best validation checkpoint.

      :param plan: Training settings for the same stage as this model.
      :type plan: openmolspec.training.TrainingPlan

      :returns: Best checkpoint path and SHA-256. The model's configuration is
                updated to use the newly trained checkpoint.
      :rtype: dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L274>`__

   .. py:method:: save_config(path)

      Save model and runtime settings as JSON.

      :param path: New configuration file to create. It stores the model class,
                   checkpoint paths, runtime interpreter and device settings.
      :type path: str or pathlib.Path

      :raises FileExistsError: If the destination already exists.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L14>`__

   .. py:method:: from_config(path, **overrides)
      :classmethod:

      Construct a model from a saved configuration.

      :param path: JSON file written by :meth:`save_config`.
      :type path: str or pathlib.Path
      :param \*\*overrides: Constructor options to replace, such as ``python`` or ``device``.

      :returns: Configured instance of the requested model class.
      :rtype: model instance

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L32>`__

   .. py:attribute:: capabilities
      :type: dict

      Supported model operations, nuclei and input domain.

.. py:class:: GapModel(*, root, python=None, device='cpu')

   Predict the HOMO–LUMO energy gap from molecular spectra.

   :param root: openSpec model-assets directory.
   :type root: str or pathlib.Path
   :param python: Interpreter containing the openSpec model dependencies.
   :type python: str or None, default None
   :param device: Torch device used for inference.
   :type device: str, default 'cpu'

   .. rubric:: Examples

   >>> model = GapModel(root='models/openspec', python='/path/to/model/python')
   >>> result = model.predict(inputs)
   >>> gap_ev = result['gap_ev']

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L296>`__

   .. py:method:: predict(inputs, *, allow_missing_modalities=False)

      Predict a molecular energy gap in eV.

      :param inputs: ``ir`` and ``raman`` are 1024-point intensity arrays on the
                     400–4000 cm⁻¹ grid; ``nmr_h`` and ``nmr_c`` contain shifts in ppm.
      :type inputs: dict
      :param allow_missing_modalities: IR alone, Raman alone or both use their dedicated vibrational regressor.
                                       Set this flag for ablations that include a partial NMR input.
      :type allow_missing_modalities: bool, default False

      :returns: Predicted ``gap_ev``, checkpoint information and channel settings.
      :rtype: dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L320>`__

   .. py:method:: save_config(path)

      Save model and runtime settings as JSON.

      :param path: New configuration file to create. It stores the model class,
                   checkpoint paths, runtime interpreter and device settings.
      :type path: str or pathlib.Path

      :raises FileExistsError: If the destination already exists.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L14>`__

   .. py:method:: from_config(path, **overrides)
      :classmethod:

      Construct a model from a saved configuration.

      :param path: JSON file written by :meth:`save_config`.
      :type path: str or pathlib.Path
      :param \*\*overrides: Constructor options to replace, such as ``python`` or ``device``.

      :returns: Configured instance of the requested model class.
      :rtype: model instance

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L32>`__

   .. py:attribute:: capabilities
      :type: dict

      Supported model operations, nuclei and input domain.

.. py:class:: Vib2Mol(*, root, python=None, device='cpu')

   Generate, retrieve and rerank structures with the openSpec Vib2Mol model.

   :param root: Directory containing spectral encoders, molecular decoder, tokenizer
                and matching checkpoints.
   :type root: str or pathlib.Path
   :param python: Interpreter containing the openSpec dependencies.
   :type python: str or None, default None
   :param device: Torch inference device.
   :type device: str, default 'cpu'

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L340>`__

   .. py:method:: predict(inputs, *, top_k=10, allow_missing_modalities=False, ranking='beam', estimate_missing_nmr=True)

      Generate molecular structures from IR, Raman and NMR spectra.

      :param inputs: Spectral arrays with keys ``ir``, ``raman``, ``nmr_h`` and ``nmr_c``;
                     see :meth:`GapModel.predict` for their units and shapes.
      :type inputs: dict
      :param top_k: Number of candidates to return, between 1 and 10.
      :type top_k: int, default 10
      :param allow_missing_modalities: Permit additional missing-channel ablations.
      :type allow_missing_modalities: bool, default False
      :param estimate_missing_nmr: With only IR and Raman, estimate chemical shifts from the two spectra
                                   before decoding. The result includes the estimated shifts in ppm.
                                   Combine False with allow_missing_modalities=True for the unadapted decoder.
      :type estimate_missing_nmr: bool, default True

      :returns: Canonical candidate structures, decoding/matching scores and
                checkpoint metadata. The decoder ranks canonical valid beams by default.
                Pass ranking="itm" to rank by the matching model instead.
      :rtype: dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L355>`__

   .. py:method:: predict_native(inputs, *, formula, checkout, top_k=10)

      Generate with Xinyu Lu's VB-Mols IR+Raman checkpoint and a supplied formula.

      The checkout must contain the author's model code, tokenizers and released
      MMM generation weights under checkpoints/mols. Supply 1024 points per
      channel on the 400–4000 cm⁻¹ grid. Results include decoded order and
      formula agreement for each valid candidate.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L386>`__

   .. py:method:: retrieve(inputs, candidates, *, top_k=10, rerank=False, allow_missing_modalities=False, estimate_missing_nmr=False, shortlist=None)

      Rank a supplied molecular library against a spectral query.

      :param inputs: IR/Raman intensity arrays and H/C shift arrays.
      :type inputs: dict
      :param candidates: Candidate structures as SMILES.
      :type candidates: iterable of str
      :param top_k: Number of ranked structures to return.
      :type top_k: int, default 10
      :param rerank: Use the ITM matching head when ``True``; otherwise use embedding
                     cosine similarity.
      :type rerank: bool, default False
      :param allow_missing_modalities: Enable inference with selected channels omitted.
      :type allow_missing_modalities: bool, default False
      :param estimate_missing_nmr: Estimate H/C shifts from measured IR and Raman with the fitted adapter.
      :type estimate_missing_nmr: bool, default False
      :param shortlist: Apply ITM to this many embedding-ranked candidates. With None, score the full supplied library.
      :type shortlist: int or None

      :returns: ``candidate_pool``, ranking method, and ``candidates`` with SMILES
                and their scores in descending order.
      :rtype: dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L397>`__

   .. py:method:: save_config(path)

      Save model and runtime settings as JSON.

      :param path: New configuration file to create. It stores the model class,
                   checkpoint paths, runtime interpreter and device settings.
      :type path: str or pathlib.Path

      :raises FileExistsError: If the destination already exists.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L14>`__

   .. py:method:: from_config(path, **overrides)
      :classmethod:

      Construct a model from a saved configuration.

      :param path: JSON file written by :meth:`save_config`.
      :type path: str or pathlib.Path
      :param \*\*overrides: Constructor options to replace, such as ``python`` or ``device``.

      :returns: Configured instance of the requested model class.
      :rtype: model instance

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L32>`__

   .. py:attribute:: capabilities
      :type: dict

      Supported model operations, nuclei and input domain.

.. py:class:: MSPredictor(*, model, source, weights, python=None, device='cpu', author_baseline=False)

   Predict tandem mass spectra with GLACIER or ICEBERG.

   :param model: Spectrum-prediction architecture.
   :type model: {'glacier', 'iceberg'}
   :param source: Directory containing the ``ms-pred`` implementation.
   :type source: str or pathlib.Path
   :param weights: Checkpoint or checkpoint directory for the selected architecture.
   :type weights: str or pathlib.Path
   :param python: Interpreter of the MS model environment.
   :type python: str or None, default None
   :param device: Inference device.
   :type device: str, default 'cpu'
   :param author_baseline: Return the original checkpoint intensities for comparison.
   :type author_baseline: bool, default False

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L434>`__

   .. py:method:: predict(*, smiles, adduct, collision_energy, instrument, precursor_mz=None)

      Predict fragment m/z values and relative intensities.

      :param smiles: Molecular structure.
      :type smiles: str
      :param adduct: Ion type, for example ``'[M+H]+'`` or ``'[M+Na]+'``.
      :type adduct: str
      :param collision_energy: Collision energy in the checkpoint's acquisition convention.
      :type collision_energy: float
      :param instrument: Instrument category, for example ``'Orbitrap'`` or ``'QTOF'``.
      :type instrument: str
      :param precursor_mz: Measured precursor mass-to-charge ratio when available.
      :type precursor_mz: float or None, default None

      :returns: Numerical predicted MS/MS peaks and the acquisition/model metadata.
      :rtype: dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L463>`__

   .. py:method:: save_config(path)

      Save model and runtime settings as JSON.

      :param path: New configuration file to create. It stores the model class,
                   checkpoint paths, runtime interpreter and device settings.
      :type path: str or pathlib.Path

      :raises FileExistsError: If the destination already exists.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L14>`__

   .. py:method:: from_config(path, **overrides)
      :classmethod:

      Construct a model from a saved configuration.

      :param path: JSON file written by :meth:`save_config`.
      :type path: str or pathlib.Path
      :param \*\*overrides: Constructor options to replace, such as ``python`` or ``device``.

      :returns: Configured instance of the requested model class.
      :rtype: model instance

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/model.py#L32>`__

   .. py:attribute:: capabilities
      :type: dict

      Supported model operations, nuclei and input domain.
```

## References

- Xu, F., Guo, W., Wang, F., Yao, L., Wang, H., Tang, F., Gao, Z., Zhang, L., E, W., Tian, Z.-Q., et al. Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts. Nature Computational Science 5, 292–300 (2025). doi:10.1038/s43588-025-00783-z. [Source](https://doi.org/10.1038/s43588-025-00783-z)
- OpenMolSpec contributors. openSpec models and benchmark training workflows. Source archive, v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)
- Wang, R.-X., Wang, R. & Coley, C. W. GLACIER: Rethinking Mass Spectrum Prediction as an Object Detection Problem. NeurIPS 2026. arXiv:2606.29161 (2026). [Source](https://arxiv.org/abs/2606.29161)
- Wang, R., Manjrekar, M., Mahjour, B., Avila-Pacheco, J., et al. Neural Spectral Prediction for Structure Elucidation with Tandem Mass Spectrometry. bioRxiv (2025). doi:10.1101/2025.05.28.656653. [Source](https://doi.org/10.1101/2025.05.28.656653)
