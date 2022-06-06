import { Product } from "../../adminResource/product/productSlice";

const cartKey = 'bookTrekker_cart'

export const addItem = (item: Product, next: any) => {

  let cart: any[] = [];

  if (typeof window !== 'undefined') {

    if (localStorage.getItem(cartKey))

      cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

    cart.push({
      ...item,
      count: 1
    });


    cart = Array.from(new Set(cart.map((p: Product) => p._id))).map(id => cart.find((p: Product) => p._id === id))

    localStorage.setItem(cartKey, JSON.stringify(cart || "[]"))

    next()

  }
}

export const itemTotal = () => {

  if (typeof window !== 'undefined')
    if (localStorage.getItem(cartKey))
      return JSON.parse(localStorage.getItem(cartKey) || "[]")?.length;
}