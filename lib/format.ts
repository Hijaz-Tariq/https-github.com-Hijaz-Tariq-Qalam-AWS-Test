

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ILS"
  }).format(price)
}


export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("dd-mm-yyyy").format(date)
}

