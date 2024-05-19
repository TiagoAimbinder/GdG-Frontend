interface Currency {
  cur_id: number;
  cur_name: string;
}

interface CurrencyTotal {
  cur_id: number,
  cur_name: string,
  total: number, 
}



export {
  CurrencyTotal,
  Currency,
}
