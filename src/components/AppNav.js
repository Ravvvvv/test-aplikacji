import { Link } from "react-router-dom";
import './AppNav.css'
import axios from "axios";

const AppNav = (props) => {


    const handleLogOut = (e) => {
        e.preventDefault();
        axios
            .post("http://akademia108.pl/api/social-app/user/logout")
            .then((res) => {
                console.log(res.data);
                if (res.data.message) {
                    props.setUser(null)
                    localStorage.setItem('user', null)

                };
                // co to bylo ten res?
            })
            .catch((error) => {
                props.setUser(null);
                localStorage.setItem("user", null);
                console.error(error);
            })
        //    czy procesy maja zajsc na raz czyta logout i czyscimy storage i usera
        // czemu set item  i set user ????


    };


    //  zle przdkazny props.
    return (
        <nav className="mainNav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>


                {!props.user && <li>
                    <Link to="/login">Login</Link>
                </li>}


                {!props.user && <li>
                    <Link to="/signup">SignUp</Link>
                </li>}
                {props.user && <li>
                    <Link to="/" onClick={handleLogOut}>logout</Link>
                </li>}
            </ul>

        </nav>
    );
};
//  robimy pozycje w nawigacji login out
export default AppNav