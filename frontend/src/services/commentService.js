import axios from "axios";

const extractVideoId = (url) => {
  if (!url) return null;

  const cleanUrl = url.trim();

  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = cleanUrl.match(regExp);

  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }

  try {
    if (cleanUrl.includes("watch")) {
      const urlObj = new URL(cleanUrl);
      const searchId = urlObj.searchParams.get("v");
      if (searchId) return searchId;
    }
  } catch (e) {}

  if (cleanUrl.length === 11) {
    return cleanUrl;
  }

  return null;
};

export const searchCommentsApi = async (youtubeUrl, query) => {
  const videoId = extractVideoId(youtubeUrl);

  if (!videoId) {
    throw new Error(
      "Could not parse a valid 11-character YouTube Video ID from the link provided.",
    );
  }

  try {
    const localStateString = localStorage.getItem("application_state");
    let accessToken = null;

    if (localStateString) {
      const parsedData = JSON.parse(localStateString);
      accessToken = parsedData?.state?.accessToken;
    }

    const response = await axios.post(
      "http://localhost:8080/api/youtube/comments/search-comments",
      { videoId, query }, // This will now cleanly be: "Gz-LzeUDzg"
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("API error during comment search:", error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Failed to connect to backend server.");
  }
};
