
import './App.css';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';
import { useState } from 'react';
import axios from "axios";

//czemu setuser a nie user??:>?
function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + (user ? user.jwt_token : "")

  //  a co to te bearer
  // axios konfiguracja hedersow  przekauje nam informacje jwt_token. Dzieki temu mozemu ustawic domyslnie 
  // jwt_token tak zeby nie wyslac go za kazdym razm z zapytaniem axios 


  return (
    <div className="App">
      <AppNav user={user} setUser={setUser} />
      <AppRoutes user={user} setUser={setUser} />
      {/* dajemy propsy do app route */}


    </div>
  );
}

export default App;
