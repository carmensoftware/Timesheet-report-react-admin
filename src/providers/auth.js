import axios from "axios";
import decodeJwt from "jwt-decode";

const url = "http://app.blueledgers.com:88/carmen.dev.api";
const tokenId = "602380b9f449404d7d6f6aaffcee4bd5";
const adminToken = `?adminToken=${tokenId}`;
const loginUrl = `${url}/api/login${adminToken}`;

const authProvider = {
  login: async ({ username, password, tenant }) => {
    try {
      const { data, status } = await axios.post(
        `${loginUrl}`,
        JSON.stringify({ username, password, tenant }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (status < 200 || status === 204 || status >= 300) {
        throw new Error(data.UserMessage);
      }

      //console.log("Login >> ", data);

      localStorage.setItem("AccessToken", data.AccessToken);

      return data;
    } catch (e) {
      throw new Error(e.response.data.UserMessage);
    }
  },
  checkAuth: () => {
    const token = localStorage.getItem("AccessToken");
    if (token && token !== null) {
      const { exp } = decodeJwt(token);
      return new Date().getTime() <= exp * 1000
        ? Promise.resolve()
        : Promise.reject({ redirectTo: "/login" });
    } else {
      return Promise.reject();
    }
  },
  getPermissions: () => {
    const p = JSON.parse(localStorage.getItem("Permissions"));
    return p ? Promise.resolve(p) : Promise.reject();
  },
  logout: ()=>{
    localStorage.clear();
    return Promise.resolve("/login");
  }
};

export default authProvider;
