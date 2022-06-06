import { Product } from "../../adminResource/product/productSlice";

export const addItem = (item: Product, next: any) => {

  let cart: any[] = [];
  const cartKey = 'bookTrekker_cart'

  if (typeof window !== 'undefined') {

    if (localStorage.getItem(cartKey))

      cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

    cart.push({
      ...item,
      count: 1
    });


    cart = Array.from(new Set(cart.map((p: Product) => p._id))).map(id => cart.find((p: Product) => p._id === id))

    localStorage.setItem(cartKey, JSON.stringify(cart))

    next()

  }






} 