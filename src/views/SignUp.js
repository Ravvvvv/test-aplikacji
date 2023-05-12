import { useState } from "react";
import { Navigate } from "react-router-dom";
import './SignUp.css'
import axios from "axios";

const SignUp = (props) => {


    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        reaptPassword: ""
        // puste stringi""

    })


    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        reaptPassword: ""
        // puste stringi""
    })



    const handelInputChange = (e) => {
        // console.log(e.target.value);// pokazuje nam co obecnie jest pisane
        const target = e.target;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: target.value
            // daje nam aktualizacje stanu setFormData
        });
        // 3xkropki polaczenie starego obiektu z nowym spredsyntax... ...formData copy wszystko tego obiektu
    };
    console.log(formData);

    const [singUpMessage, setSingUpMessage] = useState('');
    const validate = () => {
        let validationErros = {
            username: false,
            email: false,
            password: false,
            reaptPassword: false
        };

        // user name
        if (formData.username.trim() < 4) {
            //  jesli ten warunek bedzie prawdziwy  to bedzie true w validate
            validationErros.username = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors, username: "username should have at least 4 symbols",
                };

            });

        }
        else if (!/^[^/s]*$/.test(formData.username.trim())) {

            validationErros.username = true;
            //   czemu na true??

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    username: "User name should not have empty characters"
                };
            });

        } else {
            validationErros.email = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    username: "",
                };
            });
        }

        //emial
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
            validationErros.email = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    email: 'niepoprawny emial',
                }
            })

        } else {
            validationErros.email = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    email: '',
                }
            })

        }
        //password

        if (formData.password.trim().length < 6) {
            validationErros.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: 'za krotki haslo',
                }
            })
        } else if (!/^[^/s]*$/.test(formData.password.trim())) {
            validationErros.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: 'nieprowne znaki',
                }
            });
        } else if (
            !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())
        ) {
            validationErros.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: 'musi miec specjalny znak !-@%#',
                }
            });

        } else {
            validationErros.password = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: '',
                };
            });
        }


        //   repatPassword
        if (formData.password.trim() !== formData.reaptPassword.trim()) {
            validationErros.reaptPassword = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    reaptPassword: " not the same pass"
                };

            });
        } else {
            validationErros.reaptPassword = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: '',
                };
            });
        }


        //  sprawdzi mi w tym stringu wystepuje pusty ciag znakow
        // trim oznacz obciecie biale znaki z tylu i z przodu ale nie z srodaka

        return (
            !validationErros.username &&
            !validationErros.email &&
            !validationErros.password &&
            !validationErros.reaptPassword)
        // to jest odwrotnosc prawdy czyli fals bedzie

    };
    //    validacja odpoiwda za bledy ktory wynikaj za zle uzupelnnie pol formularza 




    const handleSubmit = (e) => {
        // obsluguje formularz singup
        e.preventDefault();
        // console.log('wysylam');
        if (!validate()) {
            // jesli funkcja zwroci falsz to jest prwada to przerwij dzialeni tej funkcji 

            return
        }
        console.log("handleSubmit");
        axios
            .post("https://akademia108.pl/api/social-app/user/signup", {
                username: formData.username,
                email: formData.email,
                password: formData.password,

            })

            .then((res) => {
                console.log(res.data);
                let resData = res.data;

                if (resData.SignUp) {
                    setSingUpMessage(' account creat')

                } else {

                }
                // console.log(res.data);
                // if (Array.isArray(res.data.username)) {
                //     setLoginMessage(res.data.username[0]);
                // } else if (Array.isArray(res.data.password)) {
                //     setLoginMessage(res.data.password[0]);
                // } else if (res.data.error) {
                //     setLoginMessage('panie zle');
                // } else {
                //     setLoginMessage("")
                //     props.setUser(res.data);
                //     localStorage.setItem("user", JSON.stringify(res.data));
                // }
            })
            .catch((error) => {
                console.error(error);
            });



    }


    return (
        <div className="singUp">
            {props.user && <Navigate to="/" />}
            <form onSubmit={handleSubmit}>
                {singUpMessage && <h2> {singUpMessage}</h2>}
                <input
                    type="text"
                    name="username"
                    placeholder="User name"
                    value={formData.username}
                    onChange={handelInputChange}
                />
                {errors.username && <p>{errors.username} </p>}
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handelInputChange} />
                {errors.email && <p>{errors.email} </p>}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handelInputChange}
                />
                {errors.password && <p>{errors.password} </p>}

                <input
                    type="password"
                    name="reaptPassword"
                    placeholder="ReaptPassword"
                    value={formData.reaptPassword}
                    onChange={handelInputChange} />




                <button className="btn">Sing Up</button>
            </form>
        </div>
    )

};
export default SignUp;