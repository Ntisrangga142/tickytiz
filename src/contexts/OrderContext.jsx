import { createContext, useContext, useReducer } from "react";

// Struktur data order history
// contoh: lihat data kamu di atas

const OrderContext = createContext();

const initialState = {
  orders: [], // simpan banyak history order
};

function orderReducer(state, action) {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case "CLEAR_ORDERS":
      return {
        ...state,
        orders: [],
      };
    default:
      return state;
  }
}

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // fungsi helper
  const addOrder = (order) => {
    dispatch({ type: "ADD_ORDER", payload: order });
  };

  const clearOrders = () => {
    dispatch({ type: "CLEAR_ORDERS" });
  };

  return (
    <OrderContext.Provider value={{ orders: state.orders, addOrder, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

// custom hook
export const useOrder = () => {
  return useContext(OrderContext);
};
