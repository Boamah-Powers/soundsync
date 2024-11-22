import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useDeleteSnippet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, updateUser } = useContext(AuthContext);

  return (index) => {
    // Filter out the snippet with the matching _id
    currentUser.snippets = currentUser.snippets.filter(
      (snippet) => snippet._id !== index
    );

    updateUser({
      ... currentUser,
      snippets: currentUser.snippets
    }); // Update user context with modified data

    // Refresh the current page
    navigate(location.pathname, { replace: true });
  };
};
