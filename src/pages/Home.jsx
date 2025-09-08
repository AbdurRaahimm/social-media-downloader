import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Download, Link, Loader, Share2 } from "lucide-react";
import "../components/placeholder-animation.css";
import FeedbackButton from "../components/FeedbackButton";

const socialMediaSites = [
  "https://www.youtube.com/watch?v=...",
  "https://www.facebook.com/watch?v=...",
  "https://www.instagram.com/p/...",
  "https://www.tiktok.com/@user/video/...",
];

export default function Home() {
  const [mediaData, setMediaData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");
  const [placeholder, setPlaceholder] = useState(socialMediaSites[0]);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (placeholderRef.current) {
        placeholderRef.current.classList.add("placeholder-slide-out");
      }

      setTimeout(() => {
        setPlaceholder((prevPlaceholder) => {
          const currentIndex = socialMediaSites.indexOf(prevPlaceholder);
          const nextIndex = (currentIndex + 1) % socialMediaSites.length;
          return socialMediaSites[nextIndex];
        });
        if (placeholderRef.current) {
          placeholderRef.current.classList.remove("placeholder-slide-out");
          placeholderRef.current.classList.add("placeholder-slide-in");
        }
      }, 500); // Half of the interval time

      setTimeout(() => {
        if (placeholderRef.current) {
          placeholderRef.current.classList.remove("placeholder-slide-in");
        }
      }, 1000); // A bit less than the full interval
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const downloadMedia = async (e) => {
    e.preventDefault();
    // console.log(mediaUrl)
    // verify if the url is empty
    if (!url) {
      toast.error("Please enter a valid url");
      return;
    }
    // verify if the url is valid for facebook video, youtube video, instagram video, tiktok video
    if (
      !url.includes("facebook") &&
      !url.includes("youtube") &&
      !url.includes("instagram") &&
      !url.includes("tiktok")
    ) {
      toast.error(
        "Please enter a valid url for facebook, youtube, instagram, tiktok"
      );
      return;
    }

    const options = {
      method: "GET",
      url: "https://social-media-video-downloader.p.rapidapi.com/smvd/get/all",
      params: {
        url: url,
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "social-media-video-downloader.p.rapidapi.com",
      },
    };

    setLoading(true);
    try {
      const response = await axios.request(options);
      console.log(response);
      setMediaData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response.status === 429) {
        toast.error("Too many requests, please try again later");
        setError("Too many requests, please try again later");
      }
      if (error.response.status === 401) {
        toast.error("Unauthorized Invalid API Key, please check your API key");
        setError("Unauthorized Invalid API Key, please check your API key");
      }
      setLoading(false);
      return; // Ensure the function exits after handling the error
    }
  };
  return (
    <Layout>
      <main className="bg-slate-900 flex flex-col items-center justify-center min-h-screen p-4 pt-16 font-sans text-white">
        <div className="w-full max-w-2xl mx-auto">
          <header className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <Share2 className="w-12 h-12 text-red-500" />
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-100">
                Social Media Downloader
              </h1>
            </div>
            <p className="text-lg text-slate-400">
              Quickly download videos from Facebook, Youtube,
              Instagram, Tiktok as high-quality MP4 files.
            </p>
          </header>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-sm">
            <form onSubmit={downloadMedia}>
              <label
                htmlFor="youtube-url"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Video URL
              </label>
              <div className="relative flex items-center placeholder-container">
                <Link className="absolute left-4 w-5 h-5 text-slate-500 pointer-events-none z-10" />
                <input
                  type="text"
                  id="youtube-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={url ? "" : placeholder}
                  className="w-full bg-slate-900/70 border border-slate-700 text-slate-100 rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors duration-300"
                  disabled={loading}
                />
                {!url && (
                  <div ref={placeholderRef} className="placeholder-text">
                    {placeholder}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
                disabled={loading}
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                {loading ? "Downloading..." : "Download"}
              </button>
            </form>
          </div>

          {/* show loading 100% with loading indicator */}
          {loading && (
            <div className="flex justify-center mt-8">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}
          {/* video output */}
          <div className="flex justify-center mt-8">
            {mediaData && (
              <video controls className="w-full md:w-6/12 max-h-80 rounded-md">
                {/* if i enter new url change the src */}
                <source src={mediaData.links[0].link} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {error && (
              <div className="text-red-500 text-center">
                <p>{error}</p>
              </div>
            )}
          </div>
          {/* title */}
          <div className="flex justify-center mt-4">
            {mediaData && (
              <h2 className="text-2xl md:text-4xl capitalize text-center text-bold text-slate-100">
                {mediaData.title}
              </h2>
            )}
          </div>

          {/* download button */}
          <div className="flex justify-center space-x-3 mt-4">
            {mediaData &&
              mediaData.links.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  download
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Download {link.quality}
                </a>
              ))}
          </div>
        </div>
        <FeedbackButton />
        <div className="text-center mt-12 text-slate-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Social Media Downloader. All
            rights reserved.
          </p>
        </div>
      </main>
    </Layout>
  );
}
