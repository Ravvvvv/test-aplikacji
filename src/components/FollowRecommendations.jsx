import axios, { Axios } from "axios"
import { useEffect, useState } from "react"
import React from "react"
import "./FollowRecommendations.css"




const FollowRecommendations = (props) => {

    const [recommendations, setRecommendations] = useState([])

    const getRecommendations = () => {
        axios
            .post("https://akademia108.pl/api/social-app/follows/recommendations")
            // pobieramy dane z servera
            .then((res) => {
                setRecommendations(res.data);
                console.log(res);

            })
            .catch((error) => console.error(error));

    };
    useEffect(() => {
        getRecommendations();
    }, [props.posts]);
    // use efect wylowuje getRecommendations po to zeby lista polecanych osob pojawila sie po zalogowaniu


    const follow = (id) => {
        axios
            .post("https://akademia108.pl/api/social-app/follows/follow", {
                // pobieramy dane kto faloowuje. czemu leader_id i
                leader_id: id

                // odswiezamy liste ostanich postow bez unfollow
            })
            .then((res) => {
                console.log(res);
                props.getLatestPosts();
            })
            .catch((error) => console.error(error));

        // czemu useEfect?
    }
    return (
        <div className="followRecom">
            {recommendations.map((recommendation) => {
                return (
                    <div className="singelRecom" key={recommendation.id}>
                        <img className="avatar" src={recommendation.avatar_url} />
                        <h3 className="avatar">{recommendation.username}</h3>
                        <button className="btn" onClick={() => follow(recommendation.id)}>Follow</button>
                    </div>
                )
            })}

        </div>

    );
}








// const FollowRecommendations = (props) => {
//     const [recommendations, setRecommendations] = useState([]);

//     const getRecommendations = () => {
//         // funkcja pobierająca rekomendacje z API
//         axios
//             .get("https://akademia108.pl/api/social-app/follows/")
//             .then((res) => {
//                 setRecommendations(res.data);
//             })
//             .catch((err) => console.log(err));
//     };

//     const follow = (userId) => {
//         // funkcja obsługująca przycisk follow
//         axios
//             .post("https://akademia108.pl/api/social-app/follows/disfollow", {
//                 userId,
//                 followedId: props.user.id,
//                 createdAt: new Date().toISOString().slice(0, 10),
//                 updatedAt: new Date().toISOString().slice(0, 10),
//             })
//             .then((res) => {
//                 console.log(res.data);
//                 // po udanym follow, pobieramy zaktualizowane rekomendacje
//                 getRecommendations();
//             })
//             .catch((err) => console.log(err));
//     };

// }

export default FollowRecommendations