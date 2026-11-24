# openmolspec.ultranmr_input

Prepare the inputs to UltraNMR's formula-conditioned NMRGym decoder.

| Name | Description |
| --- | --- |
| {py:func}`openmolspec.ultranmr_input.decoder_inputs` | Encode a measured H/C peak list and independently supplied neutral formula. |

```{eval-rst}
.. py:module:: openmolspec.ultranmr_input

.. py:function:: decoder_inputs(h_shifts, c_shifts, formula, atom_types)

   Encode a measured H/C peak list and independently supplied neutral formula.

   Pass the installed UltraNMR release's DEFAULT_ATOM_TYPES to keep its element
   vocabulary order. Return numeric lists suitable for conversion to tensors.
   Repeated shifts retain their original counts and ordering.

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/ultranmr_input.py#L7>`__
```
