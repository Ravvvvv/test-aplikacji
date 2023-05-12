import { useState } from "react";
import "./Post.css"
import axios from "axios";

const Post = (props) => {

    const [likesCount, setLikesCount] = useState(props.post.likes.length);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [doesUserLike, setDoesUserLike] = useState(props.post.likes.filter(like => like.username === props.user?.username).length !== 0);
    // usernamy sa porownywane z unsernamami ktore poubily posta  
    // like obiekt z tablicy. === jest taki sam user username

    const deletePost = (id) => {
        axios.post("https://akademia108.pl/api/social-app/post/delete", {
            post_id: id
        }).then(res => {
            console.log(res.data);
            props.setPost((posts) => {
                return posts.filter(post => post.id !== res.data.post_id)
                // do deleta post przekazuje posta ktorego chce usunac wykonujac zapytanie po stornie backend usuwa post po wskazanym id natomiast frontend musi na nowa robi filtr postow pomijajac post o  wskazany przekazanym id ktorego nie chcemy. Jest zmiana stanu robi sie renderowanie
                // zwracamay nowa tablice w ktorej tablica rozni sie od usunietego post. res.data.post_id
                //zwraca wszystkie posty oprcz id usunietego posta

            })
        })
            .catch((error) => {
                console.error(error);
            })
    }


    const Likepost = (id, isLiked) => {
        axios.post("https://akademia108.pl/api/social-app/post/" + (isLiked ? 'dislike' : 'like'), {
            post_id: id
        })
            .then(() => {
                setLikesCount(likesCount + (isLiked ? -1 : 1));
                setDoesUserLike(!isLiked)
                // nasza stan bedzie zalazal czy juz likujemy czy nie. dodaj jeden lub odejmy jeden

            })
        //isliked jest paramentrym przekazanym. Funkcja zalezy od naszego parametru.  

    }



    const unfollow = (id) => {
        console.log(id);
        axios
            .post("https://akademia108.pl/api/social-app/follows/disfollow", {

                // pobieramy dane kto faloowuje. 
                leader_id: id
                // odswiezamy liste ostanich postow bez unfollow
            })
            .then((res) => {
                console.log(res);
                props.getLatestPosts();
            })
            .catch((error) => console.error(error));


    }
    // function UnfollowClick() {
    //     const userId = getUserId(); // pobieranie identyfikatora użytkownika, którego posta chcemy unfollować
    //     fetch(`https://akademia108.pl/api/social-app/follows/disfollow/${userId}`, {
    //       method: 'POST',
    //       headers: {
    //         'Authorization': `Bearer ${getAuthToken()}`, // dodanie nagłówka z tokenem autoryzacyjnym
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //           console.log('Unfollowed user successfully');
    //           // wykonanie jakichkolwiek dodatkowych działań po pomyślnym unfollowaniu użytkownika
    //         } else {
    //           console.error('Failed to unfollow user');
    //           // obsługa błędu w przypadku niepowodzenia unfollowania użytkownika
    //         }
    //       })
    //       .catch(error => {
    //         console.error('Error occurred while trying to unfollow user:', error);
    //         // obsługa błędu w przypadku wystąpienia problemów z połączeniem z API
    //       });
    //     }


    //czemu dlugosc  tylko
    return (
        <div className="post">
            <div className="avatar">

                <img src={props.post.user.avatar_url} alt={props.post.user.username} />
                {props.user && props.user?.username !== props.post.user.username &&<button className="btn" onClick={() => unfollow(props.post.user.id)}>Unfollow</button>}
                {/* wysyłamy id uzytkowniak posta ktorego juz nie chcemy fallow robicprops.post.user.id */}
            </div>
            <div className="postData">
                <div className="postMeta">
                    <div className="author">{props.post.user.username}</div>
                    <div className="date">{props.post.created_at.substring(0, 10)}</div>
                    {/* substring pozwala wyciac znaki z wyrazaenia */}
                </div>
                <div className="postContent">{props.post.content}</div>
                {/* likesCount pobiera dane z tablicy  */}
                <div className="likes">
                    {props.user?.username === props.post.user.username && <button className="btn" onClick={() => setDeleteModalVisible(true)}>Delete</button>}
                    {/* motyw usuwania postu.operator znaku zapytania jesli to wyrazenie nie bedzie istnialo to nie wywali bledu ?*/}

                    {props.user && (<button className="btn" onClick={() => Likepost(props.post.id, doesUserLike)} >{doesUserLike ? "dislike" : "like"}</button>)}

                    {likesCount}

                </div>

            </div>
            {/* jesli deleteModalVisible jest prwada bedzie wyswietlany && */}
            {deleteModalVisible && <div className="deleteConfirmation"><h3>are y sure?</h3>
                <button className="btn yes" onClick={() => deletePost(props.post.id)}>yes</button>
                {/* podajemy id posta zeby mozna bylo go usunac */}
                <button className="btn no" onClick={() => setDeleteModalVisible(false)}>no</button>
            </div>}
        </div >
    )
};

export default Post;