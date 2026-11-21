# 1H experimental peak-list prediction

Input a SMILES to predict peak positions in ppm. Each peak lists the contributing heavy-atom indices in input order, starting at zero. For ¹H these are the atoms to which the hydrogens are attached. Closely spaced predictions within 0.03 ppm are reported together. Hydrogen shifts at a single heavy-atom site are pooled.

The two error columns give equal weight to each connectivity and include a 1 ppm penalty per missing or extra peak. Model and peak-merging settings were selected on patent_test_10k, then held fixed across the following corpora. Each connectivity appears in one corpus.

| Independent corpus | Paired structures | NMRNet++ | Selected predictor | Matched fraction |
| --- | ---: | ---: | ---: | ---: |
| nmrspec_test | 1,000 | 0.545 ppm | 0.350 ppm | 86.7% |
| nmrexp_exp_10k | 991 | 0.560 ppm | 0.339 ppm | 86.0% |
| nmrgym_test | 980 | 0.524 ppm | 0.417 ppm | 78.6% |

[Run online](https://jiaqingxie.github.io/openmolspec.github.io/#tool-1h) · [Download model and SDK](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/peak-nmr-v2/openmolspec-1H.zip)

After extracting the ZIP, install the SDK and run the example in the extracted directory.

```bash
python -m pip install "./openmolspec-1.0.0-py3-none-any.whl[solution-nmr]"
```

```python
from openmolspec.model import PeakSpectrumPredictor

model = PeakSpectrumPredictor('model')
print(model.predict('CCO')['peaks'])
```
