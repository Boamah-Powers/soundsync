import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AuthContext } from "../context/AuthContext";
import UploadWidget from "../components/UploadWidget";
import apiRequest from "../lib/apiRequest";

function UpdateProfilePage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser, updateUser } = useContext(AuthContext);

  const [profilePicture, setProfilePicture] = useState(currentUser.profilePicture || "");
  const [instruments, setInstruments] = useState(currentUser.instruments.join(", "));
  const [genres, setGenres] = useState(currentUser.genres.join(", "));

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const updatedInstruments = instruments.split(",").map((item) => item.trim());
    const updatedGenres = genres.split(",").map((item) => item.trim());

    const updatedProfile = {
      profilePicture,
      instruments: updatedInstruments,
      genres: updatedGenres,
    };

    apiRequest
      .put("/users/update-profile", updatedProfile)
      .then((res) => {
        updateUser(res.data.user);
        enqueueSnackbar("Profile updated successfully!", { variant: "success" });
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar("Failed to update profile!", { variant: "error" });
      });
  };

  return (
    <div className="p-4 h-full flex flex-col items-center">
      <div className="max-w-xl w-full bg-white rounded shadow p-6">
        <h1 className="text-2xl font-semibold mb-6">Update Profile</h1>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          {/* Upload Avatar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            {profilePicture && (
              <img
                src={profilePicture}
                alt="New Avatar"
                className="w-24 h-24 rounded-full mt-4 mb-4 mx-auto"
              />
            )}
            <UploadWidget
              uwConfig={{
                cloudName: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
                uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOADPRESET,
                multiple: false,
                maxImageFileSize: 2000000,
                folder: import.meta.env.VITE_CLOUDINARY_USERAVATARFOLDER,
              }}
              setState={setProfilePicture}
              flag={false}
            />
          </div>

          {/* Instruments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instruments (comma-separated)
            </label>
            <input
              type="text"
              value={instruments}
              onChange={(e) => setInstruments(e.target.value)}
              placeholder="e.g., Guitar, Piano, Violin"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Genres */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Genres (comma-separated)
            </label>
            <input
              type="text"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
              placeholder="e.g., Jazz, Classical, Rock"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>

        {/* Cancel Button */}
        <button
          onClick={() => navigate("/profile")}
          className="mt-4 w-full py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UpdateProfilePage;