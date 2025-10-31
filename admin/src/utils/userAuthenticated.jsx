import { Navigate } from "react-router-dom";
import userStore from "../store/userStore.js";

const ProtectRoute = ({children}) => {
    const {user,isAuthenticated} = userStore();
    
    if(!user && !isAuthenticated){
        return <Navigate to="/" replace />
    }

    return children
}

const AuthenticatedUserRoute = ({children}) => {
    const {user,isAuthenticated} = userStore();
    if(user && isAuthenticated){
        return <Navigate to="/index" replace />
    }

    return children
}

export {
    ProtectRoute,
    AuthenticatedUserRoute
}