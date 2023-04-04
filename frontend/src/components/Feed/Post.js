// import React, { useContext, useEffect, useState } from "react";
// import AuthContext from "../../store/authContext";
// import CreatePostCard from "./CreatePostCard";
// import PostCard from "./PostCard";

// const Post = () => {
//   const [dataPost, setDataPost] = useState([]);
//   // A l'ouverture de la page on prend les donnes de la BD et on display ds accueil
//   const url = `http://localhost:3000/api/post`;
//   const AuthCtx = useContext(AuthContext);
//   // const sortedPosts = responseData
//   // useEffect kullaninca try catch'a gerek kalmadi
//   useEffect(() => {
//     (async () => {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${AuthCtx.token}`,
//         },
//       });
//       if (response.ok) {
//         const dataResponse = await response.json();
//         // ANTECHRONOLOGIQUE OK
//         setDataPost(dataResponse.reverse());
//         // console.log(dataResponse);
//       } else {
//         throw new Error("Erreur lors de la récupération des posts");
//       }
//     })();
//   }, [url, AuthCtx.token]);

//   return (
//     <section>
//       <CreatePostCard setDataPost={setDataPost} dataPost={dataPost} />
//       {dataPost ? (
//         <>
//           {dataPost.map((item) => {
//             console.log("item==> ", item);
//             return <PostCard item={item} key={item._id} />;
//           })}
//         </>
//       ) : (
//         <p>Aucun post trouvé.</p>
//       )}
//     </section>
//   );
// };

// export default Post;

import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/authContext";
import CreatePostCard from "./CreatePostCard";
import PostCard from "./PostCard";

const Post = () => {
  const [dataPost, setDataPost] = useState([]);
  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/post", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthCtx.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDataPost(data.reverse());
        } else {
          throw new Error("Erreur lors de la récupération des posts");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPosts();
  }, [AuthCtx.token]);

  return (
    <section>
      <CreatePostCard setDataPost={setDataPost} dataPost={dataPost} />
      {dataPost.length > 0 ? (
        dataPost.map((item) => <PostCard item={item} key={item._id} />)
      ) : (
        <p>Aucun post trouvé.</p>
      )}
    </section>
  );
};

export default Post;
