# openmolspec.core.schema

Field names, dtypes, shapes and units shared by release builders and validators.

| Name | Description |
| --- | --- |
| {py:class}`openmolspec.core.schema.FieldSpec` | Describe one field in the OpenSpec molecular record schema. |
| {py:func}`openmolspec.core.schema.schema_as_dict` | Return the complete schema as serializable dictionaries. |
| {py:func}`openmolspec.core.schema.validate_record_keys` | Identify required field names absent from a molecular record. |
| {py:data}`openmolspec.core.schema.SCHEMA_VERSION` | Module constant or schema value. |
| {py:data}`openmolspec.core.schema.OPEN_SPEC_V1_SCHEMA` | Module constant or schema value. |
| {py:data}`openmolspec.core.schema.REQUIRED_FIELDS` | Module constant or schema value. |
| {py:data}`openmolspec.core.schema.SCHEMA_METADATA` | Module constant or schema value. |

```{eval-rst}
.. py:module:: openmolspec.core.schema

.. py:class:: FieldSpec(dtype: str, shape: str, unit: Optional[str], missing_value_policy: str, description: str, required: bool = False)

   Describe one field in the OpenSpec molecular record schema.

   :param dtype: Logical storage type, such as ``'float32'`` or ``'string'``.
   :type dtype: str
   :param shape: Scalar or array dimensions, including symbolic atom count ``N``.
   :type shape: str
   :param unit: Physical unit; ``None`` denotes a unitless metadata field.
   :type unit: str or None
   :param missing_value_policy: Representation of an unavailable value and its associated flags.
   :type missing_value_policy: str
   :param description: Meaning of the field for a molecular record.
   :type description: str
   :param required: Whether the field name must be present in a conforming record.
   :type required: bool, default False

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/schema.py#L16>`__

   .. py:method:: as_dict() -> Dict[str, Any]

      Return the field specification as a plain dictionary.

      :returns: Dtype, shape, unit, missing-value policy, description and required flag.
      :rtype: dict

      `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/schema.py#L42>`__

   .. py:attribute:: dtype
      :type: str

      The ``dtype`` field; see the constructor parameter description.

   .. py:attribute:: shape
      :type: str

      The ``shape`` field; see the constructor parameter description.

   .. py:attribute:: unit
      :type: Optional[str]

      The ``unit`` field; see the constructor parameter description.

   .. py:attribute:: missing_value_policy
      :type: str

      The ``missing_value_policy`` field; see the constructor parameter description.

   .. py:attribute:: description
      :type: str

      The ``description`` field; see the constructor parameter description.

   .. py:attribute:: required
      :type: bool

      The ``required`` field; see the constructor parameter description.

.. py:function:: schema_as_dict() -> Dict[str, Any]

   Return the complete schema as serializable dictionaries.

   :returns: ``'schema'`` contains version and processing metadata; ``'fields'``
             maps every molecular record field to its :class:`FieldSpec` values.
   :rtype: dict

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/schema.py#L149>`__

.. py:function:: validate_record_keys(record: Mapping[str, Any]) -> Tuple[str, ...]

   Identify required field names absent from a molecular record.

   :param record: Molecular record whose keys are checked against ``REQUIRED_FIELDS``.
   :type record: mapping

   :returns: Required field names missing from the record, in schema order.
   :rtype: tuple of str

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/schema.py#L165>`__

.. py:data:: SCHEMA_VERSION

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/schema.py#L72>`__

.. py:data:: OPEN_SPEC_V1_SCHEMA

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/schema.py#L74>`__

.. py:data:: REQUIRED_FIELDS

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/schema.py#L134>`__

.. py:data:: SCHEMA_METADATA

   `Source code <https://github.com/jiaqingxie/openmolspec-studio-frontend/blob/release/openmolspec-v1/src/openmolspec/core/schema.py#L139>`__
```
