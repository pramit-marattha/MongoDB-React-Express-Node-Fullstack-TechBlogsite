import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();
export const API = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.PRODUCTION_SITE : publicRuntimeConfig.DEVELOPMENT_SITE ;
export const APP_NAME = publicRuntimeConfig.APP_NAME;


export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN_PRODUCTION : publicRuntimeConfig.DOMAIN_DEVELOPMENT ;
