import { Route, Routes } from "react-router-dom";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import Home from "../views/Home";
const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path="/" element={<Home user={props.user} />} />
            <Route path="login" element={<Login user={props.user} setUser={props.setUser} />} />
            {/* dajemy probsa zeby miec mozliwosc zalogowania sie. APp ma funkcje axiosa ktora odbiera informacje o uzytkowniki. Dodatkowo funkcja zapisuje informacje w localStorga i przechowuje go.
             */}
            <Route path="signup" element={<SignUp user={props.user} />} />
        </Routes>
    )

};
export default AppRoutes;