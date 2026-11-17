# Dataset splits

The cleaned H/C files retain the prepared train, validation and test roles. Their standard molecular identities do not overlap across files.

| Split | Molecules |
| --- | --- |
| train | 2,172,790 |
| val | 250,836 |
| test | 254,885 |

Other experimental views use the fixed OpenMolSpec v1 scaffold partition. The table gives usable spectra in each file.

| View | Train | Validation | Test |
| --- | --- | --- | --- |
| IR | 143,791 | 16,686 | 17,282 |
| 19F | 46,303 | 5,011 | 5,365 |
| 31P | 17,739 | 2,248 | 1,675 |
| MS | 4,266 | 467 | 500 |
| 11B | 967 | 81 | 92 |
| Raman | 34 | 3 | 5 |
| 29Si | 630 | 61 | 35 |

## Create your own split

```python
from openmolspec.split import split_records

manifest = split_records(
    data["train"], "my-scaffold-dataset", method="scaffold",
    seed=2026, ratios=(.8, .1, .1),
    source="OpenDataLab", domain="experimental")
print(manifest["files"])
```

Use `method="scaffold"` to group by normalized Bemis–Murcko scaffold, or `method="random"` to group by molecular connectivity. The export records the seed, grouping policy, original roles and file hashes. Inspect the saved manifest to see the resulting split sizes.

Fixed molecular-membership files: [Manifest](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/v1.0/manifest.json) · [Train](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/v1.0/train.csv.gz) · [Validation](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/v1.0/val.csv.gz) · [Test](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/download/v1.0/test.csv.gz)

## References

- OpenMolSpec contributors. OpenMolSpec: Chemical spectroscopy datasets, models and learning workflows. Software release v1.0 (2026). [Source](https://github.com/jiaqingxie/openmolspec-studio-frontend/releases/tag/v1.0)
- OpenDataLab. WanJuan MolSpectra, version 1.0.3. Experimental molecular spectroscopy dataset. [Source](https://opendatalab.com/)
