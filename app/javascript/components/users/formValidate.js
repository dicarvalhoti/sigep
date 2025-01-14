  // Função para validar os erros
  function validateForm(errors, attributes){
    console.log("ADADAD",error)
    // const errorMessages = errors.message.split(','); // Separar os erros por vírgula

    // const updatedFields = { ...fields };

    // attributes.forEach((attribute) => {
    //   // Procurar o erro correspondente ao atributo
    //   const error = errorMessages.find((msg) =>
    //     msg.startsWith(`${attribute} `)
    //   );

    //   if (error) {
    //     const message = error.replace(`${attribute} `, '').trim();
    //     updatedFields[attribute] = {
    //       ...updatedFields[attribute],
    //       color: 'red',
    //       helperText: message,
    //     };
    //   } else {
    //     // Resetar caso não tenha erro
    //     updatedFields[attribute] = {
    //       ...updatedFields[attribute],
    //       color: 'default',
    //       helperText: '',
    //     };
    //   }
    // });

    // setFields(updatedFields);
  }
export default validateForm