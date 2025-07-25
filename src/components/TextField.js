import React, { useRef, useEffect } from 'react';
import './TextField.css';

const TextField = ({ value, onChange, placeholder, onFocus, onBlur }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '42px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="text-field"
      rows={1}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default TextField;