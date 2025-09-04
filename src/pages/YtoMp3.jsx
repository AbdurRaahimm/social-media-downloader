import { useState } from "react";
import {
  Youtube,
  Link,
  Download,
  Loader,
  AlertTriangle,
  Music,
  X,
  Pause,
} from "lucide-react";
import Layout from "../components/Layout";
import StatusCard from "../components/StatusCard";
import axios from "axios";
import { toast } from "react-toastify";


const YToMP3 = () => {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  


  const isValidYouTubeUrl = (url) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setStatus("error");
      setErrorMessage("Please enter a YouTube URL to begin.");
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      setStatus("error");
      setErrorMessage(
        "The URL you entered does not appear to be a valid YouTube link."
      );
      return;
    }

    // id extract
    const id = url.split("v=")[1]?.split("&")[0];
    if (!id) {
      setStatus("error");
      setErrorMessage("Invalid YouTube URL format. Please check the link.");
      return;
    }
    console.log("Extracted Video ID:", id);

    setStatus("loading");
    setErrorMessage("");
    const ApiUrl = import.meta.env.VITE_MP3_API_URL;
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "youtube-mp3-2025.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: { id: id },
    };
    try {
      const response = await axios.post(ApiUrl, { url }, options);
      console.log(response);
      const data = response.data;
      const headers = response.headers;

      const limit = headers["x-ratelimit-requests-limit"];
      const remaining = headers["x-ratelimit-requests-remaining"];
      const reset = headers["x-ratelimit-requests-reset"];

      const rateInfo = {
        rateLimit: limit || "Unknown",
        remainingRequests: remaining || "Unknown",
        resetTime: reset || "Unknown",
      };

      localStorage.setItem("rateInfo", JSON.stringify(rateInfo));

      // setVideoInfo((prev) => ({
      //   ...prev,
      //   ...rateInfo,
      // }));

      if (data.status === "error") {
        setStatus("error");
        setErrorMessage(data.message || "Failed to fetch video information.");
        return;
      }
      setVideoInfo({
        title: data.title || "Unknown Title",
        duration: data.lengthSeconds || "0.00",
        linkDownload: data.linkDownload || "",
        ...rateInfo,
      });

      setStatus("success");
      toast.success(
        "Video converted successfully! You can now download the MP3 file."
      );
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while processing your request. Please try again later."
      );
      toast.error(
        error.response?.data?.message ||
          "An error occurred while processing your request. Please try again later."
      );
    }
    // setTimeout(() => {
    //   setVideoInfo({
    //     title: "Journey - Don't Stop Believin' (Official Audio)",
    //     duration: "4:10",
    //   });
    //   setStatus("success");
    // }, 3000); // Simulate a 3-second conversion time
  };

  const handleReset = () => {
    setUrl("");
    setStatus("idle");
    setErrorMessage("");
    setVideoInfo(null);
  };

  const handleDownload = () => {
    if (videoInfo?.linkDownload) {
      const link = document.createElement("a");
      link.href = videoInfo.linkDownload;
      link.download = `${videoInfo.title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast.error("No download link available. Please try converting again.");
    }
  };

  const handlePlayPause = () => {
    if (videoInfo?.linkDownload) {
      const audio = new Audio(videoInfo?.linkDownload);
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const renderStatusContent = () => {
    switch (status) {
      case "loading":
        return (
          <StatusCard
            icon={<Loader className="w-8 h-8 text-indigo-300 animate-spin" />}
            title="Converting Video..."
            message="Please wait while we process your request. This may take a moment."
            color="bg-indigo-500/20"
          />
        );
      case "success":
        return (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-slate-700 border-2 border-dashed border-slate-600 rounded-lg w-24 h-24 flex-shrink-0 flex items-center justify-center">
                  <Music className="w-12 h-12 text-slate-300 cursor-pointer hover:text-slate-100 transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-100 leading-tight">
                    {videoInfo?.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Duration:{" "}
                    {videoInfo?.duration
                      ? new Date(videoInfo.duration * 1000)
                          .toISOString()
                          .substr(11, 8)
                      : "Unknown"}
                  </p>

                  {/* audio play/pause */}

                  {isPlaying ? (
                    <button
                      onClick={handlePlayPause}
                      className="mt-2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      <Pause className="w-5 h-5" />
                    </button>
                  ) : (
                    <>
                      <audio controls controlsList="nodownload">
                        <source
                          src={videoInfo?.linkDownload}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element
                      </audio>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={handleReset}
                className="text-slate-500 hover:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleDownload}
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
            >
              <Download className="w-5 h-5" />
              Download MP3
            </button>
          </div>
        );
      case "error":
        return (
          <StatusCard
            icon={<AlertTriangle className="w-8 h-8 text-red-400" />}
            title="Conversion Failed"
            message={errorMessage}
            color="bg-red-500/20"
          />
        );
      case "idle":
      default:
        return (
          <StatusCard
            icon={<Music className="w-8 h-8 text-slate-400" />}
            title="Ready to Convert"
            message="Paste a YouTube video link above to get started."
            color="bg-slate-700/50"
          />
        );
    }
  };

  return (
    <Layout>
      <div className="bg-slate-900 flex flex-col items-center justify-center min-h-screen p-4 pt-20 font-sans text-white">
        <div className="w-full max-w-2xl mx-auto">
          <header className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <Youtube className="w-12 h-12 text-red-500" />
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-100">
                YT to MP3
              </h1>
            </div>
            <p className="text-lg text-slate-400">
              Quickly convert and download YouTube videos as high-quality MP3
              files.
            </p>
          </header>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="youtube-url"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                YouTube Video URL
              </label>
              <div className="relative flex items-center">
                <Link className="absolute left-4 w-5 h-5 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  id="youtube-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-slate-900/70 border border-slate-700 text-slate-100 rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-300"
                  disabled={status === "loading"}
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                {status === "loading" ? "Converting..." : "Convert"}
              </button>
            </form>

            {/* Download Limit */}
         
        {
           videoInfo && (
            <>
            <div className="space-y-2 mt-6 bg-slate-700/50 border border-slate-600 rounded-lg p-4">
              <div className="flex items-center justify-between text-sm">
                <span>Download Limit</span>
                <div>
                  {videoInfo?.remainingRequests ||
                    videoInfo?.remainingRequests ||
                    "Unknown"}
                  /
                  {videoInfo?.rateLimit ||
                    videoInfo?.rateLimit ||
                    "Unknown"}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-indigo-500"
                  style={{
                    width: `${
                      (videoInfo?.remainingRequests /
                        videoInfo?.rateLimit) *
                      100
                    }%`,
                  }}
                />
              </div>

             
              <p className="text-xs">
                Your current API rate limit status is displayed. This helps you
                track your usage and avoid hitting the limits.
              </p>
            </div>
            </>
           )
        }
             

          </div>

          <div className="mt-8 min-h-[150px]">{renderStatusContent()}</div>
        </div>
        <div className="text-center mt-12 text-slate-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} YT to MP3. All rights reserved.
          </p>
          
        </div>
      </div>
    </Layout>
  );
};

export default YToMP3;
