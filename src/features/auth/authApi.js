// import { bindActionCreators } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
            //after sending network request and before getting response, we can do something based on queryFulfilled (a promise); do these follow up actions here if these are common dependent actions (login is required all time everywhere)
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    //set reg info to local storage
                    localStorage.setItem("auth", JSON.stringify({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    }));

                    //save reg info to redux store
                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    }));

                } catch (err) {
                    //handle error in ui
                }
            },
        }),
         login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
            
             async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    //set reg info to local storage
                    localStorage.setItem("auth", JSON.stringify({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    }));

                    //save reg info to redux store
                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    }));

                } catch (err) {
                    //handle error in ui
                }
            },
        }),
    })
});

export const {useRegisterMutation, useLoginMutation} = authApi;