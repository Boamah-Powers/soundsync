import PropTypes from "prop-types";
import { MdOutlinePerson } from "react-icons/md";
import ReactAudioPlayer from "react-audio-player";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import moment from "moment";
import apiRequest from "../lib/apiRequest";

function CollaborationCard({ collab, currentUser }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const isRecipient = collab.recipient.username === currentUser.username;
  const isRequester = collab.requester.username === currentUser.username;

  const handleCollabAction = (flag) => {
    const data = { collaborationId: collab._id, accepted: flag };
    apiRequest
      .post("/collaborations/update-status", data)
      .then(() => {
        enqueueSnackbar("Collaboration request updated successfully!", {
          variant: "success",
        });
        navigate(location.pathname, { replace: true });
      })
      .catch((err) => {
        console.error("Error updating collaboration request", err);
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
        });
      });
  };

  return (
    <div
      className={`flex flex-col w-full h-full rounded-lg shadow-lg ${
        isRecipient ? "bg-blue-100" : isRequester ? "bg-gray-100" : "bg-white"
      }`}
    >
      <div className="px-5 py-6 flex-grow">
        {/* Requester */}
        <div className="flex items-center space-x-2 mb-2">
          <MdOutlinePerson className="text-gray-500" />
          <span className="text-xl font-semibold text-black truncate">
            Requested by: {collab.requester.username}
          </span>
        </div>

        {/* Recipient */}
        <div className="flex items-center space-x-2 mb-2">
          <MdOutlinePerson className="text-gray-500" />
          <span className="text-xl font-semibold text-black truncate">
            Recipient: {collab.recipient.username}
          </span>
        </div>

        {/* Display Recipient's Email */}
        {collab.status === "accepted" && isRequester && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">{`Recipient's Email`}</h3>
            <p className="text-gray-800">{collab.recipient.email}</p>
          </div>
        )}

        {/* Snippet Audio */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Snippet</h3>
          <ReactAudioPlayer src={collab.snippet.audioUrl} controls />
        </div>

        {/* Collaboration Status and Timestamp */}
        <div className="flex justify-between items-center mt-4">
          <span
            className={`text-sm font-medium px-2 py-1 rounded ${
              collab.status === "accepted"
                ? "bg-green-100 text-green-600"
                : collab.status === "declined"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            Status: {collab.status}
          </span>
          <span className="text-gray-500 text-sm">
            {moment(collab.createdAt).format("MMMM Do YYYY")}
          </span>
        </div>

        {/* Accept/Decline Buttons (for Recipient) */}
        {isRecipient && (
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => handleCollabAction(true)}
              disabled={collab.status === "accepted"}
              className={`px-4 py-2 rounded text-white ${
                collab.status === "accepted"
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Accept
            </button>
            {collab.status === "pending" && (
              <button
                onClick={() => handleCollabAction(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Decline
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

CollaborationCard.propTypes = {
  collab: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    requester: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    recipient: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    snippet: PropTypes.shape({
      audioUrl: PropTypes.string.isRequired,
    }).isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default CollaborationCard;