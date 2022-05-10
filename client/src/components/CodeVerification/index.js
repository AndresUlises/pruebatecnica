import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CodeVerificationContainer, {
  CodeField,
  CodeFieldShadows,
} from './CodeVerificationContainer';

const CODE_LENGTH = new Array(6).fill(0);

export function CodeVerification({ handleChangeField }) {
  const input = React.createRef();
  const [value, setValues] = useState('');
  const [focused, setFocused] = useState(false);

  function handleClick() {
    input.current.focus();
  }

  function handleFocus() {
    setFocused(true);
  }

  function handleBlur() {
    setFocused(true);
  }

  function handleKeyUp(e) {
    if (e.key === 'Backspace') {
      const valueLength = value.length;
      setValues(value.slice(0, valueLength - 1));
    }
  }

  async function handleChange(e) {
    const v = e.target.value;
    if (value.length < CODE_LENGTH.length) {
      setValues(`${value}${v}`.slice(0, CODE_LENGTH.length));
      const codeValue = `${value}${v}`;
      if (codeValue.length === CODE_LENGTH.length && handleChangeField) {
        handleChangeField(codeValue);
      }
    }
  }

  const values = value.split('');
  const selectedIndex =
    values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1;
  const hideInput = !(values.length < CODE_LENGTH.length);

  return (
    <CodeVerificationContainer handleClick={handleClick}>
      <input
        value=""
        ref={input}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="code-input"
        style={{
          left: `${selectedIndex * 60}px`,
          opacity: hideInput ? 0 : 1,
        }}
      />
      {CODE_LENGTH.map((v, index) => {
        const selected = values.length === index;
        const filled =
          values.length === CODE_LENGTH.length &&
          index === CODE_LENGTH.length - 1;
        return (
          <CodeField key={index}>
            {values[index]}
            {(selected || filled) && focused && (
              <CodeFieldShadows
                style={
                  index === 0
                    ? {
                        borderBottomLeftRadius: '6px',
                        borderTopLeftRadius: '6px',
                      }
                    : index === 5
                    ? {
                        borderBottomRightRadius: '6px',
                        borderTopRightRadius: '6px',
                      }
                    : {}
                }
              />
            )}
          </CodeField>
        );
      })}
    </CodeVerificationContainer>
  );
}

CodeVerification.propTypes = {
  handleChangeField: PropTypes.func,
};

CodeVerification.defaultProps = {
  handleChangeField: () => {},
};
