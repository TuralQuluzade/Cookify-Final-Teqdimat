import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Navigate } from "react-router-dom";
import {checkAuthThunk} from "../redux/reducers/authReducer.js";

const PrivateRoute = ({ children, allowedRoles }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading);
    const  userChecked = useSelector((state) => state.user.userChecked);
    useEffect(() => {
        dispatch(checkAuthThunk());
    }, [dispatch]);
    if (!userChecked) {
        return <div>Yuklenir</div>
    }
    console.log("PrivateRoute user:", user);
    console.log("Allowed roles:", allowedRoles);
    console.log("Includes:", allowedRoles.includes(user?.role));
    if (loading) {
        return <div>Yüklənir...</div>;
    }

    if (!user || !user.role) {
        return <Navigate to="/auth/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};

export default PrivateRoute;
