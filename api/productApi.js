import { handleResponse, handleError } from "./apiUtils";

const API_URL = "http://api.test/";
export function getProducts() {
  console.log("Getting products from API");
  return fetch(API_URL + "/products/page/2")
    .then(handleResponse)
    .catch(handleError);
}
