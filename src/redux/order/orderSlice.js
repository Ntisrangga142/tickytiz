import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: {}, // menyimpan berdasarkan key unik (misalnya movieId)
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // tambah / update order berdasarkan key
    addOrder: (state, action) => {
      const { key, order } = action.payload;
      state.orders[key] = order;
    },

    // hapus order berdasarkan key
    removeOrder: (state, action) => {
      const key = action.payload;
      delete state.orders[key];
    },

    // hapus semua order
    clearOrders: (state) => {
      state.orders = {};
    },
  },
});

export const { addOrder, removeOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
