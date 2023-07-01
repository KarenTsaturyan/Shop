import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cart/cartSlice";
import { productsReducer } from "./slices/products/productSlice";
import { categoriesReducer } from "./slices/categories/categoriesSlice";
import { usersReducer } from "./slices/users/usersSlice";

const store = configureStore({
    reducer:{
        products:productsReducer,
        cart: cartReducer,
        categories: categoriesReducer,
        users: usersReducer
    },
    // middleware: (getDefaultMiddlewares)=>{
    //     return [...getDefaultMiddlewares(), ]
    // }

})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store