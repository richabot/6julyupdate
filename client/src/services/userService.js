import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.username,
    firstName:user.firstName,
    lastName:user.lastName,
    email: user.email,
    password: user.password,

  });
}

export function resetPassword(email) {
  return http.post(`${apiEndpoint}/reset_password/${email}`, {});
}
export function resetUpdatePassword(id, token, password) {
  console.log(id,token,password,"isnide service")
  return http.post(`${apiEndpoint}/receive_new_password/${id}/${token}`, {
    password: password
  });
}

