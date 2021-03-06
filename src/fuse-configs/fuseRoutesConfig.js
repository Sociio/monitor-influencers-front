import React from "react";
import { Redirect } from "react-router-dom";
import { FuseUtils } from "@fuse/index";
import { appsConfigs } from "main/content/apps/appsConfigs";
import { pagesConfigs } from "main/content/pages/pagesConfigs";
import { authRoleExamplesConfigs } from "main/content/auth/authRoleExamplesConfigs";
import { UserInterfaceConfig } from "main/content/user-interface/UserInterfaceConfig";
import { ComponentsConfig } from "main/content/components/ComponentsConfig";
import { ComponentsThirdPartyConfig } from "main/content/components-third-party/ComponentsThirdPartyConfig";
import { IndexConfig } from "main/content/index/IndexConfig";
import { LockedConfig } from "main/content/locked/LockedConfig";
import { LoginConfig } from "main/content/login/LoginConfig";
// import { RegisterConfig } from "main/content/register/RegisterConfig";
import { LogoutConfig } from "main/content/logout/LogoutConfig";
import Error404Page from "main/errors/404/Error404Page";

// import { authRoles } from "auth/auth";
// import _ from "lodash";

// function setLoginAuth(configs) {
//   return configs.map(config => _.merge({}, config, { auth: "login" }));
// }

// const routeConfigsOrigin = [
//   ...appsConfigs,
//   ...pagesConfigs,
//   ...authRoleExamplesConfigs,
//   ComponentsConfig,
//   ComponentsThirdPartyConfig,
//   UserInterfaceConfig,
//   GettingStartedConfig,
//   LoginConfig,
//   RegisterConfig,
//   LogoutConfig
// ];

const routeConfigs = [
  ...appsConfigs,
  ...pagesConfigs,
  ...authRoleExamplesConfigs,
  ComponentsConfig,
  ComponentsThirdPartyConfig,
  UserInterfaceConfig,
  IndexConfig,
  LoginConfig,
  LogoutConfig,
  LockedConfig
];

export const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    component: () => <Redirect to="/leaderboard" />
  },
  {
    path: "*",
    component: Error404Page
  }
];
