import PropTypes from "prop-types";
import ReactAudioPlayer from "react-audio-player";
import { MdOutlineMessage } from "react-icons/md";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDeleteSnippet } from "../utils/deleteSnippet";
import apiRequest from "../lib/apiRequest";

function MusicCard({ musicList, index, username }) {
  const navigate = useNavigate();
  const deleteSnippet = useDeleteSnippet();
  const { enqueueSnackbar } = useSnackbar();

  // Handler to navigate to the snippet page
  const handleNavigateToComments = () => {
    navigate(`/snippet/${index}`);
  };

  // Handler for delete operation
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      apiRequest
        .delete(`/snippets/${index}`, { public_id: musicList.public_id })
        .then(() => {
          deleteSnippet(index);
          enqueueSnackbar("Snippet deleted successfully!", {
            variant: "success",
          });
        })
        .catch((err) => {
          console.log(err.response.data.error);
          enqueueSnackbar("Failed to delete snippet: " + err.response.data.error, {
            variant: "error",
          });
        });
    }
  };

  return (
    <div className="w-full flex flex-col rounded-lg shadow-lg bg-white">
      <div className="px-5 py-6">
        {/* Username */}
        <h1 className="text-3xl text-black truncate text-left">{musicList.name}</h1>
        <span className="text-gray-500 text-sm">
          {moment(musicList.created_at).format("MMMM Do YYYY")}
        </span>

        {/* Tags Aligned Left */}
        <div className="flex flex-wrap gap-2 mt-4">
          {musicList.tags.map((tag, index) => (
            <div
              className="bg-blue-600 text-white rounded-md px-2 py-1 text-sm"
              key={index}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Description Section with Label */}
        <div className="py-5">
          <h2 className="text-lg font-semibold text-gray-700 mb-2 text-left">
            Description
          </h2>
          <div className="relative max-h-[100px] overflow-y-auto p-3 border rounded bg-gray-50">
            <pre className="whitespace-pre-wrap break-words text-gray-800">
              {musicList.description}
            </pre>
          </div>
        </div>

        {/* Audio Player and Buttons Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full space-y-4 md:space-y-0 px-5 py-3">
          {/* Audio Player */}
          <div className="flex-1 px-4">
            <ReactAudioPlayer src={`${musicList.url}`} controls className="w-full" />
          </div>

          {/* Buttons */}
          <div className="flex space-x-2">
            {/* Comments Button */}
            <button
              onClick={handleNavigateToComments}
              className="flex items-center space-x-1 px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <MdOutlineMessage className="h-5 w-5" />
              <span>Comments</span>
            </button>

            {/* Delete Button (conditionally rendered) */}
            {username === musicList.name && (
              <button
                onClick={handleDelete}
                className="flex items-center space-x-1 px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

MusicCard.propTypes = {
  musicList: PropTypes.shape({
    name: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    public_id: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  username: PropTypes.string.isRequired,
};

export default MusicCard;