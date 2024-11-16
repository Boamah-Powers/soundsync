import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import apiRequest from "../lib/apiRequest";
import MusicCard from "../components/MusicCard";
import CollaborationCard from "../components/CollaborationCard";

function ProfilePage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser, updateUser } = useContext(AuthContext);

  // Navigate to profile update page
  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  // Navigate to add snippet page
  const handleAddSnippet = () => {
    navigate("/add-snippet");
  };

  // Handle logout
  const handleLogout = () => {
    apiRequest
      .post("/auth/logout")
      .then(() => {
        updateUser(null);
        navigate("/");
        enqueueSnackbar("User logged out successfully!", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Log out failed!", { variant: "error" });
      });
  };

  return (
    <div className="p-4 h-full">
      <div className="profile-header flex flex-col items-center space-y-4">
        <img
          src={currentUser.profilePicture || "/noavatar.png"}
          alt={`${currentUser.username}'s avatar`}
          className="rounded-full w-32 h-32"
        />
        <h1 className="text-2xl font-semibold">{currentUser.username}</h1>
        <p className="text-gray-600">{currentUser.email}</p>

        {/* Instruments */}
        <div className="flex flex-col items-center mt-4">
          <h3 className="text-lg font-medium">Instruments</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {currentUser.instruments.length > 0 ? (
              currentUser.instruments.map((instrument, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {instrument}
                </span>
              ))
            ) : (
              <p className="text-gray-600">No instruments listed</p>
            )}
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-col items-center mt-4">
          <h3 className="text-lg font-medium">Genres</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {currentUser.genres.length > 0 ? (
              currentUser.genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))
            ) : (
              <p className="text-gray-600">No genres listed</p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="update-button mt-6 flex justify-center space-x-4">
        <button
          onClick={handleUpdateProfile}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update Profile
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="profile-content mt-6 flex space-x-4 overflow-hidden">
        {/* Snippets Section */}
        <div className="w-1/2 max-h-[80vh] overflow-y-auto border rounded-md">
          <div className="sticky top-0 bg-white p-2 z-20 shadow-md flex items-center justify-between">
            <h2 className="text-lg font-medium">Snippets</h2>
            <button
              onClick={handleAddSnippet}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Add Snippet
            </button>
          </div>
          <div className="flex flex-col items-center space-y-4 p-2">
            {currentUser.snippets.map((snippet) => (
              <MusicCard
                key={snippet._id}
                index={snippet._id}
                musicList={{
                  name: currentUser.username,
                  tags: snippet.tags,
                  description: snippet.description,
                  url: snippet.audioUrl,
                  created_at: snippet.createdAt,
                }}
              />
            ))}
          </div>
        </div>

        {/* Collaborations Section */}
        <div className="w-1/2 max-h-[80vh] overflow-y-auto border rounded-md">
          <div className="sticky top-0 bg-white p-2 z-20 shadow-md">
            <h2 className="text-lg font-medium">Collaborations</h2>
          </div>
          <div className="flex flex-col items-center space-y-4 p-2">
            {currentUser.collaborations.map((collab) => (
              <CollaborationCard key={collab._id} collab={collab} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
