# MS/MS fragment candidates with MechFrag-MS

[Mass coverage on identical observed peaks](../benchmarks/ms.md) compares MechFrag-MS and MAGMa at 10 ppm.

Find atom-indexed fragments consistent with observed product ion masses.

The locked policy proposes fragment ions for the known molecule and acquisition conditions.

Report observed-peak mass coverage at 10 ppm. Experimental atom masks would be needed to measure structural accuracy.

| Field | Meaning |
| --- | --- |
| `smiles / mz` | Molecule and observed product ion masses. |
| `adduct / collision_energy / instrument` | Acquisition conditions from the spectrum record. |

| Field | Meaning |
| --- | --- |
| `peaks` | Observed mass and candidate atom indices, ion mass and mass error. |

| Dataset / scope | Model / variant | Metric | Value |
| --- | --- | --- | ---: |
| MassSpecGym / 10 ppm | recorded model | variant | balanced_neutral_context |
| MassSpecGym / 10 ppm | recorded model | peaks | 1741 |
| MassSpecGym / 10 ppm | recorded model | matched_fraction | 0.622631 |
| MassSpecGym / 10 ppm | recorded model | magma_matched_fraction_same_peaks | 0.581275 |

[Evidence / 运行记录](../assets/examples/ms-annotation-mechfrag.json) · [MCP](../harness/mcp.md)

```bash
python -m openmolspec_bench run --workspace /path/to/OpenMolSpec --tasks ms.annotation.mechfrag --mechfrag-root /path/to/MechFrag-MS --mechfrag-study /path/to/locked-study --limit 8 --output results/ms-annotation-mechfrag.json
```
