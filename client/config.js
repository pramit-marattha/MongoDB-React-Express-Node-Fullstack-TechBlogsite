import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();

export const API = publicRuntimeConfig.PRODUCTION ? "https://techblog-mern-stack.netlify.app" : "http://localhost:4000";
export const APP_NAME = publicRuntimeConfig.APP_NAME;
