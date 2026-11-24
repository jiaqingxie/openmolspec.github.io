# OpenMolSpec project website

Public URL: https://jiaqingxie.github.io/openmolspec.github.io/

The project navigation opens the workspace, datasets, documentation and source repository. `portal.html`, `portal.css` and `portal.js` implement the active
interface. GitHub Pages hosts its static frontend; a separate Python service
executes the real model requests. The Documentation entry opens the bilingual manual bundled with the same site release at `docs/`. The English and Chinese manual links open the release bundled with the portal.

The Tool workspace offers NMR shift prediction and assignment, including the validation-selected ³¹P solution checkpoint under [Structure → Predict ³¹P solution NMR](https://jiaqingxie.github.io/openmolspec.github.io/#tool-31p), solvent transfer,
TransPeakNet HSQC prediction from SMILES and solvent, with optional measured peaks for assignment, H/C NMR search and generation, GLACIER and
ICEBERG MS/MS, conformer-based IR/Raman, energy gaps from one, two or four channels, four-channel structure generation, spectral library retrieval and shortlist reranking, and Agent Harness.
The agent uses an OpenAI-compatible model API and the actual OpenMolSpec MCP
stdio server. Expandable tool steps adapt the interaction in Luffy202's branch
`codex/next-fastapi-migration`, commit
`11577df2236241ee28f7c8940faf6ebab5f78476`. The project presentation draws on the
section pacing of Shanghai AI Lab's [Sage–Taiyi](https://alpha-innovator.github.io/Sage-Taiyi/),
with original OpenMolSpec styling and content.
The home page uses the self-hosted Google Fonts Instrument Sans for Latin text. The language switch also changes navigation, workspace forms, plot legends, examples and manual destinations. Link to `?lang=zh` for Chinese or `?lang=en` for English.

The sucrose molecular viewer rotates and zooms in the hero or in a full-window view. The ¹H, ¹³C and HSQC tabs use three measurements of the same sample in D₂O at 298 K from [BMRB bmse000119](https://bmrb.io/metabolomics/mol_summary/show_data.php?id=bmse000119). The HSQC link loads its eleven experimental C/H pairs into the assignment tool. The ethanol/dimethyl ether example shows how symmetry changes the number of carbon environments. The collection dashboard reports spectrum counts from the cleaning manifest. The benchmark cards link to evaluation conditions and denominators in the bilingual manual.

Explore includes 131 downloadable test records across eight experimental views. Its comparison panel pairs eight atom-labelled NMR examples with model predictions and three experimental IR peak lists with independent QM9S calculations. The NMR R² uses original site labels; the Hungarian peak assignment has its own coverage and error. Enter SMILES and choose a channel to retrieve experimental spectra from the indexed collection or request a prediction. The public API and the selected predictor must be available for new model runs. MS/MS inference additionally needs acquisition conditions in the workspace.

The external TransPeakNet dataset card links to the author's HSQC test archive.
Open that ZIP directly using `molspectra("transpeaknet_hsqc_test", root=zip_path)`.

Build from the release repository after regenerating documentation figures:

```bash
python scripts/build_dataset_preview.py --data-root /path/to/cleaned-data
python scripts/build_readthedocs.py --output .runtime/manual-site-v1 --strict
python scripts/build_project_site.py --output .runtime/github-pages-v1 --manual .runtime/manual-site-v1
python -m http.server 8769 --directory .runtime
```

Preview `http://localhost:8769/github-pages-v1/`. Publish the generated directory
to the `main` branch of `jiaqingxie/openmolspec.github.io`; GitHub Pages serves its
repository root. Keep `.nojekyll`. Relative asset paths support the project URL.

Set `website/assets/service-config.json` to the HTTPS API origin before building.
See [the API deployment instructions](../online_api/README.md). Provider keys stay
in the server process; the browser receives only the API origin. A temporary
tunnel is sufficient for a demonstration, but its URL and availability are not a
permanent deployment contract.

The Harness gallery includes downloadable recorded responses, bilingual screenshots and an MCP workflow diagram for ethanol NMR, MS/MS fragment annotation and solvent transfer. The ethanol run includes a model-provider call. The other records show direct MCP tool execution. Viewing a case uses static assets. Submitting a new natural-language question uses the live provider configured on the backend.
