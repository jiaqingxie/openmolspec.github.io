# openmolspec.training

Prepare train/validation data and explicitly launch the packaged NMR trainer.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.training.prepare_nmr_training` | Prepare train/validation files for NMRTransformer training. |
| {py:class}`openmolspec.training.TrainingPlan` | Training configuration for the NMR dual encoder or molecular generator. |

```{eval-rst}
.. py:module:: openmolspec.training

.. py:function:: prepare_nmr_training(train, validation, destination)

   Prepare train/validation files for NMRTransformer training.

   :param train: Experimental H/C NMR training view with role ``'train'``.
   :type train: openmolspec.dataset.SpectraSplit
   :param validation: Validation view with role ``'val'``. Records contain ``smiles``,
                      ``formula``, ``h_nmr``, ``c_nmr`` and a channel mask.
   :type validation: openmolspec.dataset.SpectraSplit
   :param destination: New directory for the prepared JSONLs and verification files.
   :type destination: str or pathlib.Path

   :returns: Directory containing ``train.jsonl``, ``val.jsonl``, ``summary.json``
             and ``verification.json``.
   :rtype: pathlib.Path

   :raises ValueError: If split roles, molecular formulae, nucleus labels or cross-split
       molecular identities disagree with the training format.
   :raises FileExistsError: If the destination already exists.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/training.py#L17>`__

.. py:class:: TrainingPlan(data_dir: str | Path, run_dir: str | Path, stage: str = 'align', checkpoint: str | None = None, alignment_checkpoint: str | None = None, python: str = sys.executable, device: str = 'cpu', epochs: int = 10, batch_size: int = 32, learning_rate: float = 0.0001, seed: int = 2026, parameters: dict = field(default_factory=dict))

   Training configuration for the NMR dual encoder or molecular generator.

   :param data_dir: Prepared directory returned by :func:`prepare_nmr_training`.
   :type data_dir: str or pathlib.Path
   :param run_dir: New directory for logs, configuration and model checkpoints.
   :type run_dir: str or pathlib.Path
   :param stage: Dual-encoder alignment or autoregressive SMILES generation.
   :type stage: {'align', 'generate'}, default 'align'
   :param checkpoint: Weights used to initialize the selected stage.
   :type checkpoint: str or None, default None
   :param alignment_checkpoint: Spectral/molecular encoder checkpoint used by the generation stage.
   :type alignment_checkpoint: str or None, default None
   :param python: Interpreter of the training environment.
   :type python: str, default sys.executable
   :param device: Torch training device.
   :type device: str, default 'cpu'
   :param epochs: Number of training epochs.
   :type epochs: int, default 10
   :param batch_size: Number of examples per minibatch, at least two.
   :type batch_size: int, default 32
   :param learning_rate: Optimizer learning rate.
   :type learning_rate: float, default 0.0001
   :param seed: Seed for model initialization and data order.
   :type seed: int, default 2026
   :param parameters: Stage-specific options. Alignment accepts ``hidden_size``, ``heads``,
                      ``encoder_layers``, ``decoder_layers``, ``feedforward_size``,
                      ``projection_size``, ``alignment_temperature``, ``input_representation``,
                      ``max_source_tokens``, ``max_val_examples`` and ``early_stop_patience``.
                      Generation accepts ``alignment_loss_weight``, ``max_val_batches``,
                      ``generate_examples`` and ``beam_size``. Both stages accept
                      ``max_train_batches``, ``shuffle_buffer``, ``drop_h_prob``,
                      ``drop_c_prob``, ``log_every`` and ``tqdm``.
   :type parameters: dict, optional

   .. rubric:: Examples

   >>> plan = TrainingPlan('prepared-nmr', 'runs/encoder',
   ...     epochs=20, batch_size=64, device='cuda:0')
   >>> settings = plan.describe()
   >>> validation = plan.validate()
   >>> result = plan.run()

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/training.py#L98>`__

   .. py:property:: command

      list of str: Training command with the current plan's arguments.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/training.py#L174>`__

   .. py:method:: describe()

      Return the training command and configuration summary.

      :returns: Command arguments, validation state and checkpoint settings.
      :rtype: dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/training.py#L188>`__

   .. py:method:: validate()

      Check the prepared data, checksums, roles and checkpoint files.

      :returns: ``validated=True`` with the train/validation split audit.
      :rtype: dict

      :raises ValueError: If data metadata, file checksums, batch sizes or split identities
          fail the training requirements.
      :raises FileNotFoundError: If a configured initialization checkpoint is absent.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/training.py#L200>`__

   .. py:method:: run()

      Train, validate and return the best checkpoint.

      :returns: ``checkpoint`` path, its ``checkpoint_sha256`` and training status.
                The run directory also contains ``plan.json``, ``training.log``
                and ``result.json``.
      :rtype: dict

      :raises FileExistsError: If the run directory already exists.
      :raises RuntimeError: If the trainer finishes without a best checkpoint.

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/training.py#L241>`__

   .. py:attribute:: data_dir
      :type: str | Path

      The ``data_dir`` field; see the constructor parameter description.

   .. py:attribute:: run_dir
      :type: str | Path

      The ``run_dir`` field; see the constructor parameter description.

   .. py:attribute:: stage
      :type: str

      The ``stage`` field; see the constructor parameter description.

   .. py:attribute:: checkpoint
      :type: str | None

      The ``checkpoint`` field; see the constructor parameter description.

   .. py:attribute:: alignment_checkpoint
      :type: str | None

      The ``alignment_checkpoint`` field; see the constructor parameter description.

   .. py:attribute:: python
      :type: str

      The ``python`` field; see the constructor parameter description.

   .. py:attribute:: device
      :type: str

      The ``device`` field; see the constructor parameter description.

   .. py:attribute:: epochs
      :type: int

      The ``epochs`` field; see the constructor parameter description.

   .. py:attribute:: batch_size
      :type: int

      The ``batch_size`` field; see the constructor parameter description.

   .. py:attribute:: learning_rate
      :type: float

      The ``learning_rate`` field; see the constructor parameter description.

   .. py:attribute:: seed
      :type: int

      The ``seed`` field; see the constructor parameter description.

   .. py:attribute:: parameters
      :type: dict

      The ``parameters`` field; see the constructor parameter description.
```
