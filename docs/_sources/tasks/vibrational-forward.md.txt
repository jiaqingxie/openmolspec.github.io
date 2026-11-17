# IR and Raman from a molecular geometry

Predict infrared and Raman spectra from atomic coordinates using the openSpec model.

## What goes in

| Field | Meaning |
| --- | --- |
| `geometry` | Element symbols and N×3 Cartesian coordinates in Å, taken from the same Gaussian log as the reference. |
| `checkpoints` | openSpec Equiformer-v3 Hessian Hi/Hij and dipole/polarizability derivative weights. |

## What comes out

| Field | Meaning |
| --- | --- |
| `IR / Raman` | Two normalized intensity arrays on 1024 points spanning 400–4000 cm⁻¹. |
| `spectral error` | Channel-wise cosine similarity and intensity MAE against paired computed reference spectra. |

## A real recorded example

Inspect the input, prediction and reference for the example below. Download the JSON for the complete numerical arrays and additional examples.

![vibrational.forward actual results](../assets/gallery/vibrational-forward.png)

[SVG](../assets/gallery/vibrational-forward.svg) · [PNG](../assets/gallery/vibrational-forward.png) · [Full input/output JSON](../assets/examples/vibrational-forward.json)

<details><summary>Inspect the actual input and output fields</summary>

```json
{
  "sample_id": "NISTIR-11730",
  "input": {
    "gaussian_log": "NISTIR-11730.log",
    "sha256": "894857d2c85d7106e5613540c593ff5a2ca3e2c90bed289575d38227086c2df1",
    "atoms": 13
  },
  "output": {
    "wavenumber_cm1": {
      "length": 1024,
      "first_values": [
        400.0,
        403.5190734863281,
        407.0381164550781,
        410.55718994140625
      ]
    },
    "predicted_ir": {
      "length": 1024,
      "first_values": [
        0.01742994412779808,
        0.013713346794247627,
        0.011153731495141983,
        0.009342214092612267
      ]
    },
    "predicted_raman": {
      "length": 1024,
      "first_values": [
        0.009821882471442223,
        0.007297216448932886,
        0.005653610453009605,
        0.004528572782874107
      ]
    }
  },
  "reference": {
    "reference_ir": {
      "length": 1024,
      "first_values": [
        0.01633988507091999,
        0.013211564160883427,
        0.011014701798558235,
        0.009432419203221798
      ]
    },
    "reference_raman": {
      "length": 1024,
      "first_values": [
        0.007780710235238075,
        0.005948643200099468,
        0.004715456161648035,
        0.0038486106786876917
      ]
    }
  },
  "metrics": {
    "ir_cosine_similarity": 0.9578531980514526,
    "ir_mae": 0.009397805668413639,
    "raman_cosine_similarity": 0.9989054203033447,
    "raman_mae": 0.0008200838346965611
  }
}
```

</details>

## Actual evaluation results

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| recorded sample | recorded model | ir_cosine_similarity | 0.977503 |
| recorded sample | recorded model | ir_mae | 0.00519438 |
| recorded sample | recorded model | raman_cosine_similarity | 0.990194 |
| recorded sample | recorded model | raman_mae | 0.00164467 |

## Model and method

The geometry model predicts the Hessian and dipole/polarizability response tensors. Normal-mode analysis converts these tensors into frequencies and activities, which are broadened onto the spectral grid.

Compare IR and Raman separately using cosine similarity and intensity MAE.

## Reproduce

[Notebook with executed figures](../notebooks/vibrational-forward.ipynb) · [Quick Start](../quickstart.md)

```bash
python -m openmolspec_bench run --workspace /path/to/OpenMolSpec \
  --tasks vibrational.forward --limit 8 --output results/vibrational-forward-new.json
```

## Call and adapt this model

```python
from openmolspec.benchmark import Benchmark
benchmark = Benchmark(workspace='/path/to/workspace',
    python='/path/to/vibrational-env/bin/python',
    portable_root='/path/to/portable-models')
result = benchmark.run('vibrational.forward',
    output='geometry-to-spectrum-results.json', limit=2)
```

Adapt the [openSpec training implementation](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks) with reference geometries, Hessians and response tensors using the same atom ordering, units and mode conventions. Tensor/property losses train the forward model; spectral similarity is a downstream evaluation, not automatically its training loss. Each released direct model trains its selected tensor head; the Hessian/response engine averages Cartesian SmoothL1 terms by the global number of tensor components. Separate checkpoints and target units are retained when reconstructing normal modes.

$$\ell_\beta(r)=\begin{cases}r^2/(2\beta),&|r|<\beta,\\ |r|-\beta/2,&|r|\ge\beta.\end{cases}$$

$$L_{\rm tensor}=\sum_{q\in\{H_i,H_{ij},\partial\mu,\partial\alpha\}}\frac1{N_q}\sum_j\ell_1(\hat T_{qj}-T_{qj}).$$

<details><summary>Source reports and SHA-256 fingerprints</summary>

- [vibrational_forward_paired_logs_20261116.json](https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/results/vibrational_forward_paired_logs_20261116.json) — SHA-256 `3e35b2c5b0c5b83715f49397e9d3ab5a744429ec90bff2551a96ea0d1641e087`

</details>


[Model implementation / 模型实现](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks) · [Model review / 模型检查](../model-audit.md)

## References

- OpenMolSpec contributors. openSpec models and benchmark training workflows. Source archive, v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/tree/release/openmolspec-v1/documentation/assets/benchmarks)
- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- Yuan, M., Zou, Z. & Hu, W. QMe14S, A Comprehensive and Efficient Spectral Dataset for Small Organic Molecules. arXiv:2501.18876 (2025). [Source](https://arxiv.org/abs/2501.18876)
- Zou, Z., Zhang, Y., Liang, L., Wei, M., Leng, J., Jiang, J., Luo, Y. & Hu, W. A deep learning model for predicting selected organic molecular spectra. Nature Computational Science 3, 957–964 (2023). doi:10.1038/s43588-023-00550-y. [Source](https://www.nature.com/articles/s43588-023-00550-y)
