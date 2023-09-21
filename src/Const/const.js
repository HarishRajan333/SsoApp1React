export const keycloakBaseUrl = "http://localhost:6060";
export const loginDomain = "http://localhost:3000";

// export const tokenEndPoint =
//   keycloakBaseUrl + "/realms/bassure/protocol/openid-connect/token";


  export const tokenEndPoint = keycloakBaseUrl + "/auth/login";
  export const refreshTokenEndPoint = keycloakBaseUrl + "/auth/reload-token";