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

export const snippetLoader = ({ params }) => {
  const { id } = params; // Extract 'id' parameter from the URL
  if (!id) {
    throw new Error("Snippet ID is required.");
  }

  const snippetPromise = apiRequest
    .get(`/snippets/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching snippet:", err);
    });

  return defer({
    snippetResponse: snippetPromise,
  });
};

export const collaborationsLoader = () => {
  const collaborationsPromise = apiRequest
    .get(`/collaborations/`)
    .then((res) => res.data.collaborations)
    .catch((err) => {
      console.error("Error fetching snippet:", err);
    });

  return defer({
    collaborationsResponse: collaborationsPromise,
  });
};