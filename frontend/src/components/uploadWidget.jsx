import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function useCloudinaryScript(scriptUrl) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById("cloudinary-script");
    if (!existingScript) {
      // Create and append the script if not already present
      const script = document.createElement("script");
      script.id = "cloudinary-script";
      script.src = scriptUrl;
      script.async = true;
      script.onload = () => setLoaded(true);
      script.onerror = () => console.error("Failed to load Cloudinary script.");
      document.body.appendChild(script);
    } else if (window.cloudinary) {
      setLoaded(true); // Script is already loaded
    }
  }, [scriptUrl]);

  return loaded;
}

function UploadWidget({ uwConfig, setState, flag=true }) {
  const scriptUrl = import.meta.env.VITE_CLOUDINARY_URL;
  const loaded = useCloudinaryScript(scriptUrl);

  const handleUploadClick = () => {
    if (loaded && window.cloudinary) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result.event === "success") {
            if (setState && flag) {
              setState([result.info.secure_url, result.info.public_id]);
            }
            else if (setState) {
              setState(result.info.secure_url);
            }
          } else if (error) {
            console.error("Upload failed:", error);
          }
        }
      );

      myWidget.open();
    } else {
      console.error("Cloudinary script is not loaded yet.");
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        type="button"
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleUploadClick}
        disabled={!loaded}
      >
        {loaded ? "Upload" : "Loading..."}
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

UploadWidget.propTypes = {
  uwConfig: PropTypes.object.isRequired, 
  setState: PropTypes.func, 
  flag: PropTypes.bool, 
};

export default UploadWidget;
export { CloudinaryScriptContext };