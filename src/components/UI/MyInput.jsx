import React, { useState, useEffect } from 'react';


const MyInput = ({ value: initialValue, onChange, className, type }) => {
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    setValue(initialValue || '0'); // Обновляем, если initialValue изменился
  }, [initialValue]);

  const handleChange = (e) => {
    let newValue = e.target.value || "0";

    // Не удаляем ноль, если вводится десятичная точка
    
      if (newValue.startsWith('0') && newValue.length > 1 && !isNaN(parseInt(newValue.substring(1)))) {
        newValue = newValue.substring(1);
      }
    

    setValue(newValue);
    onChange(e); // Вызываем внешний onChange
  };

  return (
    <input
      style={{textAlign: "end", fontSize: "20px"}}
      type={type}
      className={className}
      value={value}
      onChange={handleChange}
    />
  );
};

export default MyInput;