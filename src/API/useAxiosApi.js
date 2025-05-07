// import axios from "axios";
// import { useContext } from "react";
// import { UserContext } from "../Context/UserContext";

// const useAXiosApi = () => {
//   const { user } = useContext(UserContext);

//   const username = user?.username;
//   const password = user?.password;

//   const token = btoa(`${username}:${password}`);

//   const API = axios.create({
//     baseURL: "http://localhost:8080",
//     headers: {
//       Authorization: `Basic ${token}`,
//     },
//   });

//   return API;
// };

// export default useAXiosApi;
