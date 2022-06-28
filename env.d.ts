declare module '@env' {
  export const ENV_VAR: string;
  export const API_KEY: string;
  export const STAGING_URL: string;
  export const DEV_URL: string;
}

declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}