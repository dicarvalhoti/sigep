import React from 'react';

export const validateFields = (fields, errors, attributes) => {
  const errorMessages = errors.message.split(','); 

  const updatedFields = { ...fields };

  attributes.forEach((attribute) => {
    const error = errorMessages.find((msg) =>
      msg.startsWith(`${attribute} `)
    );

    if (error) {
      const message = error.replace(`${attribute} `, '').trim();
      updatedFields[attribute] = {
        ...updatedFields[attribute],
        color: 'failure',
        helperText: (
          <>
            <span className="font-medium">Erro!</span> {message}
          </>
        ),
      };
    } else {
      updatedFields[attribute] = {
        ...updatedFields[attribute],
        color: 'gray',
        helperText: null,
      };
    }
  });

  return updatedFields;
};