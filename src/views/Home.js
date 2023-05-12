import "./Home.css";

import axios from "axios";
import { useEffect, useState } from "react";
import AddPost from "../components/AddPost";
import Post from "../components/Post";
import FollowRecommendations from "../components/FollowRecommendations";

const Home = (props) => {
    //hoki stan usestae destr tablicy na dwie czesci stan i funkcja
    // startowa wartosc funkcji jest pusta [] mapujemy po pustej pustej tablicy 
    const [posts, setPost] = useState([])



    const getLatestPosts = (props) => {
        axios.post("https://akademia108.pl/api/social-app/post/latest")
            .then((res) => {
                // console.log(req);
                console.log(res);
                setPost(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
        // req.data nowa wartoa ktora chcemy miec dostepna pod nazwa post
        //pytanie czemy data
        //kiedy chcemy ta funkcje wywolac-chcemy jak pokaze sie w widoku 
        // cialo zapytania. then wywolujemy funkcje zwrotna ktora na zwroci obiket najsze odpowiedzi
    };
    //useState  funkcja i tablice  zaleznosci [] wykona sie 1 gdy zostanie zamontowany 
    // pokazuje 10 postow ostanich .



    // jesli chcemy dostarc starsze posty + plus drugi paramet czytaj data postu
    const getNextPosts = () => {
        axios
            .post("https://akademia108.pl/api/social-app/post/older-then", {
                date: posts[posts.length - 1].created_at
            })


            // created_at odwolujemy sie do danych
            // pobieranie ostatni element dlugosc minus 1 czytja wyciagnij ostatni element z indeksu

            .then((res) => {
                // console.log(req);
                // console.log(res);
                setPost(posts.concat(res.data));
                // req.data jest scalona za pomoca concat z poprzednia tablica
                // za pomoca metody concat doklejamy posty do poprzednich bez usuwania ich z ekranu
            })
            .catch((error) => {
                console.error(error);
            });

    }

    const getPrevPosts = () => {
        axios
            .post("https://akademia108.pl/api/social-app/post/newer-then", {
                date: posts[0].created_at,
                // dajemy indeks 0 poniewaz chcemy 1 post ktory zostal dodany
            })
            .then((res) => {

                // console.log(res);
                setPost(res.data.concat(posts));
                // tablica ktora laczy stare z najnowzszym postem i dodaj e do stanu 
            })
            .catch((error) => {
                console.error(error);
            });

    };





    useEffect(() => {
        getLatestPosts();
    }, [props.user])
    console.log(posts);
    //  czemu tu az user

    //wylowanie metody .map
    return (
        <div className="home">

            {props.user && <AddPost getPrevPosts={getPrevPosts} />}
            {props.user && <FollowRecommendations getLatestPosts={getLatestPosts} posts={posts} user={props.user} />}
            <div className="postList">

                {posts.map(post => {
                    return (<Post post={post} key={post.id} user={props.user} setPost={setPost}  getLatestPosts={getLatestPosts}/>)

                })}

                <button className="btn loadMore" onClick={getNextPosts}>Load more</button>
            </div>
        </div>
        // przekazjue propa czytaj post obiket post do kazdego wylowania komponentu obiekt post z mapowanej tablicy

    );

};
export default Home;