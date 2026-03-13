import React from 'react';

/**
 * Reusable FormField component for form inputs.
 * Props:
 * - label: The label text for the input field.
 * - name: The name attribute for the input field.
 * - type: The type of the input field (e.g., text, email, tel).
 * - value: The current value of the input field.
 * - onChange: The function to handle input changes.
 * - placeholder: Placeholder text for the input field.
 * - required: Whether the input is required (default: false).
 * - inputStyle: Custom styles for the input field.
 */
export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  inputStyle,
}) {
  return (
    <div className="form-field">
      <label
        className="block text-sm font-medium mb-1.5"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = '#D40662')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
      />
    </div>
  );
}