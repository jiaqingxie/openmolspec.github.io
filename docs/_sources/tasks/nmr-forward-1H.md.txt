# 1H chemical shift prediction

Predict the 1H chemical shifts of a molecule from its structure. Use the atom indices to display predictions on the molecular graph or compare them with measured peaks.

## What goes in

| Field | Meaning |
| --- | --- |
| `smiles / geometry` | A valid molecular graph and a compatible 3D conformer; atom order must be preserved. |
| `nucleus` | 1H; the checkpoint must cover this nucleus. |
| `reference peaks` | Optional measured ppm values for evaluation; not an inference input. |

## What comes out

| Field | Meaning |
| --- | --- |
| `prediction_ppm` | Per-atom chemical shifts in ppm, with atom indices or a peak list. |
| `error / coverage` | Reference-matched errors and peak coverage. |

## A real recorded example

Inspect the input, prediction and reference for the example below. Download the JSON for the complete numerical arrays and additional examples.

![nmr.forward.1H actual results](../assets/gallery/nmr-forward-1H.png)

[SVG](../assets/gallery/nmr-forward-1H.svg) · [PNG](../assets/gallery/nmr-forward-1H.png) · [Full input/output JSON](../assets/examples/nmr-forward-1H.json)

<details><summary>Inspect the actual input and output fields</summary>

```json
{
  "input": {
    "smiles": "C=C(CCCCc1ccccc1)c1ccc(C(C)(C)C)cc1"
  },
  "output": {
    "prediction_ppm": {
      "length": 28,
      "first_values": [
        5.080643653869629,
        5.033477783203125,
        2.49700927734375,
        2.570378065109253
      ]
    },
    "model": "nmrnet"
  },
  "reference": {
    "peaks_ppm": {
      "length": 10,
      "first_values": [
        7.34,
        7.265,
        7.165,
        5.26
      ]
    }
  }
}
```

</details>

## Actual evaluation results

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| nmrspec_test | nmrnet | matched_peak_mae_ppm | 0.134143 |
| nmrspec_test | nmrnet | matched_peak_rmse_ppm | 0.236816 |
| nmrspec_test | nmrnet | peak_count_mae | 10.2188 |
| nmrspec_test | nmrnet | matched_fraction | 0.519243 |
| nmrspec_test | nmrnet | examples | 32 |
| nmrspec_test | nmrnet | scored_examples | 32 |
| nmrspec_test | nmrnet | aggregation | equal_weight_per_molecule |
| nmrspec_test | nmrnet | assignment | minimum_absolute_error_without_atom_labels |
| nmrspec_test | nmrnetpp | matched_peak_mae_ppm | 0.0769934 |
| nmrspec_test | nmrnetpp | matched_peak_rmse_ppm | 0.163875 |
| nmrspec_test | nmrnetpp | peak_count_mae | 10.2188 |
| nmrspec_test | nmrnetpp | matched_fraction | 0.519243 |
| nmrspec_test | nmrnetpp | examples | 32 |
| nmrspec_test | nmrnetpp | scored_examples | 32 |
| nmrspec_test | nmrnetpp | aggregation | equal_weight_per_molecule |
| nmrspec_test | nmrnetpp | assignment | minimum_absolute_error_without_atom_labels |
| patent_test_10k | nmrnet | matched_peak_mae_ppm | 0.26912 |
| patent_test_10k | nmrnet | matched_peak_rmse_ppm | 0.530869 |
| patent_test_10k | nmrnet | peak_count_mae | 24.7586 |
| patent_test_10k | nmrnet | matched_fraction | 0.294737 |
| patent_test_10k | nmrnet | examples | 29 |
| patent_test_10k | nmrnet | scored_examples | 29 |
| patent_test_10k | nmrnet | aggregation | equal_weight_per_molecule |
| patent_test_10k | nmrnet | assignment | minimum_absolute_error_without_atom_labels |
| patent_test_10k | nmrnetpp | matched_peak_mae_ppm | 0.227842 |
| patent_test_10k | nmrnetpp | matched_peak_rmse_ppm | 0.484549 |
| patent_test_10k | nmrnetpp | peak_count_mae | 24.7586 |
| patent_test_10k | nmrnetpp | matched_fraction | 0.294737 |
| patent_test_10k | nmrnetpp | examples | 29 |
| patent_test_10k | nmrnetpp | scored_examples | 29 |
| patent_test_10k | nmrnetpp | aggregation | equal_weight_per_molecule |
| patent_test_10k | nmrnetpp | assignment | minimum_absolute_error_without_atom_labels |
| nmrexp_exp_10k | nmrnet | matched_peak_mae_ppm | 0.0485825 |
| nmrexp_exp_10k | nmrnet | matched_peak_rmse_ppm | 0.0797388 |
| nmrexp_exp_10k | nmrnet | peak_count_mae | 8.09375 |
| nmrexp_exp_10k | nmrnet | matched_fraction | 0.530831 |
| nmrexp_exp_10k | nmrnet | examples | 32 |
| nmrexp_exp_10k | nmrnet | scored_examples | 32 |
| nmrexp_exp_10k | nmrnet | aggregation | equal_weight_per_molecule |
| nmrexp_exp_10k | nmrnet | assignment | minimum_absolute_error_without_atom_labels |
| nmrexp_exp_10k | nmrnetpp | matched_peak_mae_ppm | 0.030637 |
| nmrexp_exp_10k | nmrnetpp | matched_peak_rmse_ppm | 0.0626249 |
| nmrexp_exp_10k | nmrnetpp | peak_count_mae | 8.09375 |
| nmrexp_exp_10k | nmrnetpp | matched_fraction | 0.530831 |
| nmrexp_exp_10k | nmrnetpp | examples | 32 |
| nmrexp_exp_10k | nmrnetpp | scored_examples | 32 |
| nmrexp_exp_10k | nmrnetpp | aggregation | equal_weight_per_molecule |
| nmrexp_exp_10k | nmrnetpp | assignment | minimum_absolute_error_without_atom_labels |
| nmrgym_test | nmrnet | matched_peak_mae_ppm | 0.196824 |
| nmrgym_test | nmrnet | matched_peak_rmse_ppm | 0.393488 |
| nmrgym_test | nmrnet | peak_count_mae | 15.8438 |
| nmrgym_test | nmrnet | matched_fraction | 0.529103 |
| nmrgym_test | nmrnet | examples | 32 |
| nmrgym_test | nmrnet | scored_examples | 32 |
| nmrgym_test | nmrnet | aggregation | equal_weight_per_molecule |
| nmrgym_test | nmrnet | assignment | minimum_absolute_error_without_atom_labels |
| nmrgym_test | nmrnetpp | matched_peak_mae_ppm | 0.198216 |
| nmrgym_test | nmrnetpp | matched_peak_rmse_ppm | 0.406316 |
| nmrgym_test | nmrnetpp | peak_count_mae | 15.8438 |
| nmrgym_test | nmrnetpp | matched_fraction | 0.529103 |
| nmrgym_test | nmrnetpp | examples | 32 |
| nmrgym_test | nmrnetpp | scored_examples | 32 |
| nmrgym_test | nmrnetpp | aggregation | equal_weight_per_molecule |
| nmrgym_test | nmrnetpp | assignment | minimum_absolute_error_without_atom_labels |

## Model and method

NMRNet encodes the molecular geometry and predicts chemical shifts at the selected atoms. The adapter prepares a conformer, loads the nucleus-specific weights and applies the checkpoint scaler.

MAE and RMSE are reported in ppm.

## Reproduce

[Notebook with executed figures](../notebooks/nmr-forward-1H.ipynb) · [Quick Start](../quickstart.md)

```bash
python -m openmolspec_bench run --workspace /path/to/OpenMolSpec \
  --tasks nmr.forward.1H --limit 8 --output results/nmr-forward-1H-new.json
```

## Call and adapt this model

```python
from openmolspec.model import NMRNet
model = NMRNet.from_pretrained('/path/to/models', nucleus='1H',
    python='/path/to/nmr-env/bin/python')
result = model.predict(smiles)
```

For fine-tuning, use the [NMRNet author training implementation](https://github.com/Colin-Jay/NMRNet), preparing atom-labelled structures/coordinates, target masks and train/validation LMDBs for the selected nucleus. Its `atom_regloss_mae` and `atom_regloss_mse` criteria operate on supervised target atoms. Retain the scaler/reference convention and select the checkpoint on validation data. This author training route is separate from the SDK inference facade.

$$L_{\rm MAE}=\frac{1}{N_{\rm labelled}}\sum_{i\in\mathcal M}|\hat\delta_i-\delta_i|,\qquad L_{\rm MSE}=\frac{1}{N_{\rm labelled}}\sum_{i\in\mathcal M}(\hat\delta_i-\delta_i)^2.$$


| Model setting | Value |
| --- | --- |
| Checkpoint | NMRNet 1H fold 0 |
| Training domain | liquid |
| Shift unit | ppm |

<details><summary>Source reports and SHA-256 fingerprints</summary>

- [nmr_documented_examples_20261117_v2.json](https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/results/nmr_documented_examples_20261117_v2.json) — SHA-256 `669413d6fc0939bdb6826782d41fc13cf12926a672418ecb46303f0b8ba05b99`

</details>


[Model implementation / 模型实现](https://github.com/Colin-Jay/NMRNet) · [Model review / 模型检查](../model-audit.md)

## References

- Xu, F., Guo, W., Wang, F., Yao, L., Wang, H., Tang, F., Gao, Z., Zhang, L., E, W., Tian, Z.-Q., et al. Toward a unified benchmark and framework for deep learning-based prediction of nuclear magnetic resonance chemical shifts. Nature Computational Science 5, 292–300 (2025). doi:10.1038/s43588-025-00783-z. [Source](https://doi.org/10.1038/s43588-025-00783-z)
- OpenDataLab. WanJuan MolSpectra, version 1.0.3. Experimental molecular spectroscopy dataset. [Source](https://opendatalab.com/)
