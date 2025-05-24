import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

type ProductsState = {
    products: Product[];
};

const initialState: ProductsState = {
    products: []
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
        clearProducts() {
            return initialState;
        }
    }
});

export const { setProducts, clearProducts } = productSlice.actions;
export default productSlice.reducer;
