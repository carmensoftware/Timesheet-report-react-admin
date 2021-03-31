import React from "react";
import { Admin, Resource, Layout } from "react-admin";
import { Avatar } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";

import authProvider from "./providers/auth";
import LoginPage from "./pages/LoginPage";
import Menu from "./MyMenu";
import Report from "./pages/Report";

//import jsonServerProvider from "ra-data-json-server";
//const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
const dataProvider = "simpleRestProvider('http://path.to.my.api')";

const avatarWidth = {
  width: 30,
  height: 30,
  backgroundColor: "#2196f3",
};

const avatarText = {
  fontSize: 14,
};

const resources = [
  <Resource
    key="reports"
    name="reports"
    options={{ label: "Reports", IsSubmenu: true }}
    icon={
      <Avatar style={avatarWidth}>
        <span style={avatarText}>RP</span>
      </Avatar>
    }
  />,
  <Resource
    key="reportgl"
    name="gl"
    options={{ label: "General Ledger", parentName: "reports", groupName:"GL" }}
    icon={DescriptionIcon}    
    {...Report}
  />,
  <Resource
    key="ap"
    name="ap"
    options={{ label: "Account Payable", parentName: "reports", groupName:"AP" }}
    icon={DescriptionIcon}    
    {...Report}
  />,
  <Resource
    key="ar"
    name="ar"
    options={{ label: "Account Receivable", parentName: "reports", groupName:"AR" }}
    icon={DescriptionIcon}    
    {...Report}
  />,
  <Resource
    key="as"
    name="as"
    options={{ label: "Fixed Asset", parentName: "reports", groupName: "ASSET" }}
    icon={DescriptionIcon}    
    {...Report}
  />,
];


const App = () => (
  <Admin
    title="Report-Carmen4"
    loginPage={LoginPage}
    authProvider={authProvider}
    dataProvider={dataProvider}
    //layout={MyLayout}
    menu={Menu}
  >
    {resources}
  </Admin>
);

export default App;
