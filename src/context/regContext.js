import { createContext, useState, useEffect } from "react";
import { db } from "../Db/db";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [registro, setRegistro] = useState([]);

  const fetchDataDB = () => {
    const fetchData = async () => {
      const registroImprevisti = await db.registroImprevisti.toArray();
      setRegistro(registroImprevisti ? registroImprevisti : []);
    };
    fetchData();
  };

  useEffect(() => {
    fetchDataDB(); // eslint-disable-next-line
  }, []);

  const addToCart = (item) => {
    const isItemInCart = registro.find(
      (cartItem) => cartItem.title === item.title,
    );

    if (isItemInCart) {
      setRegistro(
        registro?.map((cartItem) =>
          cartItem.title === item.title
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
      updateValueDBAdd(item, isItemInCart);
    } else {
      setRegistro([...registro, { ...item }]);
      insertItem(item);
    }
  };

  const removeFromCart = (item) => {
    const isItemInCart = registro.find(
      (cartItem) => cartItem.title === item.title,
    );

    if (isItemInCart.quantity === 1) {
      setRegistro(
        registro?.filter((cartItem) => cartItem.title !== item.title),
      );
      removeItem(item);
    } else {
      setRegistro(
        registro?.map((cartItem) =>
          cartItem.title === item.title
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        ),
      );
      updateValueDBDel(item, isItemInCart);
    }
  };

  const insertItem = async (impr) => {
    try {
      const id = await db.registroImprevisti.add({
        title: impr.title,
        quantity: impr.quantity,
      });
      !id && console.log(id, impr);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (element) => {
    try {
      const id = await db.registroImprevisti.delete(element.id);
      console.log(id, element);
    } catch (error) {
      console.log(error);
    }
    fetchDataDB();
  };

  const deleteListDB = async () => {
    try {
      const id = await db.registroImprevisti.clear();
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateValueDBAdd = async (item, itemQuantity) => {
    try {
      const id = await db.registroImprevisti.put({
        id: item.id,
        quantity: itemQuantity.quantity === 3 ? 3 : itemQuantity.quantity + 1,
      });
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateValueDBDel = async (item, itemQuantity) => {
    try {
      const id = await db.registroImprevisti.put({
        id: item.id,
        quantity: itemQuantity.quantity - 1,
      });
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = () => {
    setRegistro([]);
    deleteListDB();
  };

  return (
    <CartContext.Provider
      value={{
        registro,
        addToCart,
        removeFromCart,
        clearCart,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
