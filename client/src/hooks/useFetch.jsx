// // useFetch.jsx
// import { useState } from "react";

// const useFetch = (url) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },      body: JSON.stringify({ credential: response.credential }),
//     }).then((res) => {
//         setLoading(false);
//         return res.json();
//       })
//       .then((data) => {
//         if (data?.user) {
//           localStorage.setItem("user", JSON.stringify(data?.user));
//           window.location.reload();
//         }
//         throw new Error(data?.message || data);
//       })
//       .catch((error) => {
//         setError(error?.message);
//       });

//   const handleGoogle = async (response) => {
//     console.log(response)
//   };
//   return { loading, error, handleGoogle };
// };

// export default useFetch;
