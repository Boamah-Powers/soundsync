import { useState, useContext } from "react";
import UploadWidget from "../components/uploadWidget";
import ReactAudioPlayer from "react-audio-player";
import { useSnackbar } from "notistack";
import apiRequest from "../lib/apiRequest";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AddSnippetPage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [genre, setGenre] = useState("");
  const [audioUrl, setAudioUrl] = useState([""]);
  const { currentUser, updateUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim() || !tags.trim() || !genre.trim() || !audioUrl) {
      enqueueSnackbar("All fields are required, including an audio snippet.", {
        variant: "error",
      });
      return;
    }

    const formattedTags = tags.split(",").map((tag) => tag.trim());
    const snippetData = {
      description,
      tags: formattedTags,
      genre,
      audioUrl: audioUrl[0],
      public_id: audioUrl[1]
    };

    apiRequest
      .post("/snippets", snippetData)
      .then((res) => {
        // Update currentUser's snippets array
        const updatedSnippets = [...(currentUser.snippets || []), res.data.snippet];
        updateUser({
          ...currentUser,
          snippets: updatedSnippets,
        });
        navigate("/profile");
        enqueueSnackbar("Snippet added successfully!", { variant: "success" });

      })
      .catch((error) => {
        console.error("Error adding snippet:", error);
        enqueueSnackbar(
          error.response?.data?.message || "Failed to add snippet.",
          { variant: "error" }
        );
      });
  };

  return (
    <div className="p-4 h-full flex flex-col items-center">
      <div className="max-w-xl w-full bg-white rounded shadow p-6">
        <h1 className="text-2xl font-semibold mb-6">Add New Snippet</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Snippet */}
          <div>
            <label
              htmlFor="snippet"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Audio Snippet
            </label>
            <div className="space-y-4">
              {/* Audio Preview */}
              {audioUrl[0] ? (
                <ReactAudioPlayer
                  src={audioUrl[0]}
                  controls
                  className="w-full border rounded"
                />
              ) : (
                <p className="text-gray-500 italic">No audio uploaded yet.</p>
              )}

              {/* Upload Widget */}
              <UploadWidget
                uwConfig={{
                  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
                  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOADPRESET,
                  multiple: false,
                  maxImageFileSize: 2000000,
                  folder: import.meta.env.VITE_CLOUDINARY_SNIPPETFOLDER,
                }}
                setState={setAudioUrl}
              />
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the snippet description..."
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Tags Field */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., ambient, dreamy, atmosphere"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Genre Field */}
          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700"
            >
              Genre
            </label>
            <input
              id="genre"
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Enter the genre..."
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Snippet
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSnippetPage;
