import "./Login.css";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
const Login = (props) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [loginMessage, setLoginMessage] = useState('')



    const handelInputChange = (e) => {
        // console.log(e.target.value);// pokazuje nam co obecnie jest pisane
        const target = e.target;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: target.value
            // daje nam aktualizacje stanu setFormData
        });
        // 3xkropki polaczenie starego obiektu z nowym spredsyntax... ...fromData copy wszystko tego obiektu
    };




    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("https://akademia108.pl/api/social-app/user/login", {
                username: formData.username,
                password: formData.password
            })

            .then((res) => {
                //   czemu jestem zalogowany gdy nawet zle podalem haslo??
                console.log(res.data);
                if (Array.isArray(res.data.username)) {
                    setLoginMessage(res.data.username[0]);
                } else if (Array.isArray(res.data.password)) {
                    setLoginMessage(res.data.password[0]);
                } else if (res.data.error) {
                    setLoginMessage('panie zle');
                } else {
                    setLoginMessage("")
                    props.setUser(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));
                }
                // if (Array.isArray(res.data.username)) {
                //     setLoginMessage(res.data.username[0])
                // } else  if  (Array.isArray(res.data.password)){
                //    setLoginMessage(res.data.password[0]);{
                //  else if (res.data.error {
                //  set.LoginMessage('bledna zalogowanie pan');
                // } else { setLoginMessage()}
                // }
                // ......................
                //                 if (res.data.error) {
                //                     setLoginMessage('incorect user or pass')
                //                 } else {
                //                     setLoginMessage('success')

                //                     localStorage.setItem('user', JSON.stringify(res.data))
                //                     props.setUser(res.data)

                //                 }
                //                 // localStorage.setItem('user', JSON.stringify(res.data) zapisuje informacje w locakStorage nawet po zamkniecu karty strony  )
                //                 // localstorgy  dokumenentacja przezzyj
                //                 // setUser to funkcja aktualizujaca stan 
                // ..............

            })
            .catch((error) => {
                console.error(error);
            });

    };



    // console.log(fromData);
    //  e obiekt zdarzenai jako parametr
    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                {props.user && <Navigate to='/' />}
                {/*  przekierowanie na storn home gdy jestemy zalogowni */}
                {loginMessage && <h2>{loginMessage}</h2>}
                {/* jesli login masege bedzie false to&& nie wyswietlaj tej h2 a jak tak to dawaj loginMessage */}
                {/* co to jest? */}
                {/* z filmik uzpuelnic sobie zmiane axios w app.js */}
                {/* /* {  && oznacza ze po dwoch stronach musza byc informacje prawdziwe  zeby warunek zadzialal . */}
                {/* {
                loginMessage && <h3>{loginMessage}</h3>
            } */}

                <input
                    type="text"
                    name="username"
                    placeholder="User name"
                    value={formData.username}
                    onChange={handelInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handelInputChange} />
                <button className="btn">Login</button>
            </form>
        </div>
    )

};
export default Login;