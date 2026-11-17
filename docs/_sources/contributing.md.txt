# Contributing

Contributions can add datasets, model adapters, tasks, tutorials or theory examples. Include the source citation, data representation, units, input/output contract and a reproducible example.

A new dataset should state experimental/computed origin, version, record/identity counting unit, access conditions and split policy. A model adapter should name its source implementation, checkpoint, expected conditions and supported training route. A task needs explicit metrics and a real recorded example; teaching simulations identify their parameters and synthetic origin.

Run relevant package tests, regenerate changed pages, execute affected notebooks, then build documentation:

```bash
python scripts/build_bilingual_docs.py --check
python scripts/build_sdk_notebooks.py --check
python scripts/build_readthedocs.py --output site --strict
```

The build validates stored notebook source/evidence hashes. Execute changed tutorials before publication. Use [GitHub issues](https://github.com/jiaqingxie/openmolspec-studio-frontend/issues) for a reproducible bug report with task ID, input schema, environment and the error; omit credentials and unpublished raw data.
