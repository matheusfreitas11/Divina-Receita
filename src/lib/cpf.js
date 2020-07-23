module.exports = {

   formatCpfCnpj(value) {
    value = value.replace(/\D/g,"")
  
    if(value.length > 14)
        value = value.slice(0,-1)
    // check if cnpj - 11.222.333/0001-11
    if(value.length > 11) {
        //11222333444455
  
        //11.222333444455
        value = value.replace(/(\d{2})(\d)/,"$1.$2")
  
        //11.222.333444455
        value = value.replace(/(\d{3})(\d)/,"$1.$2")
  
        //11.222.333/444455
        value = value.replace(/(\d{3})(\d)/,"$1/$2")
  
        //11.222.333/4444-55
        value = value.replace(/(\d{4})(\d)/,"$1-$2")
  
    } else {
        //cpf 111.222.333-44
        value = value.replace(/(\d{3})(\d)/,"$1.$2")
  
        value = value.replace(/(\d{3})(\d)/,"$1.$2")
  
        value = value.replace(/(\d{3})(\d)/,"$1-$2")
    }
    return value
  }
  
  };
  