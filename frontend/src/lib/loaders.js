import apiRequest from "./apiRequest";
import { defer } from "react-router-dom";

export const snippetsLoader = ({request }) => {
  const query = request.url.split("?")[1];
  const snippetPromise = apiRequest
    .get("/snippets?" + query)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return defer({
    snippetResponse: snippetPromise,
  });
}