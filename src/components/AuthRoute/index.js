/**
 * @author MaZiXiao
 * @date 2022-07-31 16:00
 */
import {getToken} from "@/utils/getToken";
import {Navigate} from "react-router-dom";

export function AuthRoute({children}) {
    if (getToken()) {
        return <>{children}</>
    } else {
        return <Navigate to='/login' replace/>
    }

}
