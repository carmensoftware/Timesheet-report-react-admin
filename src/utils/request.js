import config from "./config";
import { setup } from "axios-cache-adapter";

const { listOfCompany } = config;
var apiUrl;

let url = new URL(window.location.href);
let callFromDesktopApp = url.searchParams.get("ShowOnlyDashboard") === "true";
let desktopUrlApi = url.searchParams.get("urlApi");
let tkFromDesktopApp = url.searchParams.get("tk");
//for switch Regedit
let aToken = url.searchParams.get("adminToken");
if (aToken) {
  const obj = listOfCompany.find((i) => i.adminToken === aToken);
  apiUrl = obj.apiUrl;
} else {
  apiUrl = config.apiUrl;
}

const axiosAuth = setup({
  baseURL: !callFromDesktopApp ? apiUrl : desktopUrlApi,
  cache: {
    //maxAge: !callFromDesktopApp ? 60 * 60 * 1000 : 0,
    ignoreCache: true,
  },
});

if (!callFromDesktopApp) {
  axiosAuth.defaults.headers.common["Authorization"] = localStorage.getItem(
    "AccessToken"
  );
} else {
  axiosAuth.defaults.headers.common["Authorization"] = tkFromDesktopApp;
}

function errorResponseHandler(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.error(`No response from ${error.config.url}`);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  return Promise.reject(error.response);
}

// Add a response interceptor
axiosAuth.interceptors.response.use(
  (response) => response,
  errorResponseHandler
);

export default axiosAuth;
