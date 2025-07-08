
import React, {useEffect, useRef} from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthThunk } from "../redux/reducers/authReducer.js";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./ScrollToTop.jsx";
import Layout from "../components/Layout.jsx";

const AppWrapper = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);

    const hasCheckedAuth = useRef(false)

    useEffect(() => {
        // dispatch(checkAuthThunk()).then((res) => {
        //     console.log("checkAuthThunk", res);
        // })
        if (!hasCheckedAuth.current) {
            dispatch(checkAuthThunk());
            hasCheckedAuth.current = true;
        }
    }, [dispatch]);

    if (loading) {
        return <div style={{ textAlign: "center", marginTop: "100px" }}>Yüklənir...</div>;
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <ScrollToTop />
            <Layout />
        </>
    );
};

export default AppWrapper;

