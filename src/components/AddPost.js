import React, { useState } from "react";
import "./AddPost.css"
import { Form } from "react-router-dom";
import axios from "axios";

const AddPost = (props) => {

    const [postContent, setPostContent] = useState("");
    // console.log(postContent);

    const AddPost = (e) => {
        e.preventDefault();

        if (!postContent) {
            return;

        }

        axios.post("https://akademia108.pl/api/social-app/post/add", {
            content: postContent
            // wartosc tego pola to co jest napisane w innput w ciele zapytania.

        })
            .then((res) => {
                props.getPrevPosts();
                // console.log(res.data);
                setPostContent("")
            })
            .catch((error) => {
                console.error(error);
            });
        //   res to jest obiketem odpowiedz 
        // 1if jesli pusty jest formularz nie wysylaj go 
    };


    return <form onSubmit={AddPost} className="addPostForm">
        <textarea placeholder="Add post..."
            onChange={(e) => setPostContent(e.target.value)}
            value={postContent}>

        </textarea>
        <button className="btn">Add</button>
    </form>;
};
// e.target.value zbior wartosc z pola post

export default AddPost




// zrobic  owarunkowanie nawigacji!!!!!!!!!!!!!!!!!!!!!!!!!!! log in film
// add post