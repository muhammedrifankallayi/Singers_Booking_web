import React from "react";
import { Navigate } from "react-router-dom";
function ComonPublicRoute(props) {
    if (localStorage.getItem('token')) {
        return <Navigate to='/home' />
    } else if (localStorage.getItem('artistKey')) {
        return <Navigate to='/artist' />
    }
    else {
        return props.children
    }
}
export default ComonPublicRoute 