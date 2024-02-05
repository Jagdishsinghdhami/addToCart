import { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer } from "./Reducer";
import { faker } from "@faker-js/faker";

const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {
  const products = [...Array(30)].map(() => ({
    id: faker.string.alpha(10),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.avatar(),
    inStock: faker.number.int({ min: 0, max: 7 }),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.number.int({ min: 1, max: 5 }),
  }));

  console.log(products);

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const cartState = () => {
  return useContext(Cart);
};
