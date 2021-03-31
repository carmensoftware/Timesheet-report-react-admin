import * as React from "react";
import { createElement } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@material-ui/core";
import { DashboardMenuItem, MenuItemLink, getResources } from "react-admin";
import SubMenu from "./MySubMenu";

const Menu = ({ onMenuClick, logout }) => {
  const [state, setState] = React.useState({});

  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  const resources = useSelector(getResources);
  const resourcesSubmenu = resources.filter((i) => i.options.IsSubmenu);
  const handleToggle = (menu) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <div>
      <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
      {resourcesSubmenu.map((subResource) => (
        <SubMenu
          key={subResource.name}
          handleToggle={() => handleToggle(subResource.name)}
          isOpen={state[subResource.name]}
          sidebarIsOpen={open}
          name={
            (subResource.options && subResource.options.label) ||
            subResource.name
          }
          icon={subResource.icon}
          
        >
          {resources.map((resource) =>
            resource.options &&
            subResource.name === resource.options.parentName ? (
              <MenuItemLink
                key={resource.name}
                to={`/${resource.name}`}
                primaryText={
                  (resource.options && resource.options.label) || resource.name
                }
                leftIcon={resource.icon ? createElement(resource.icon) : null}
                onClick={onMenuClick}
                sidebarIsOpen={open}
              />
            ) : (
              ""
            )
          )}
        </SubMenu>
      ))}
    </div>
  );
};

export default Menu;
