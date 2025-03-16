"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import VideoCard from "./components/VideoCard.";
import CommentBox from "./components/CommentBox";
import EditTitle from "./components/EditTitle";

export default function Home() {
  const { data: session } = useSession();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/video");
        const data = await res.json();
        setVideo(data);
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md">
        {/* Authentication */}
        {!session ? (
          <button onClick={() => signIn("google")} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Sign in with Google
          </button>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Signed in as {session.user.email}</p>
            <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded-md">
              Sign Out
            </button>
          </div>
        )}

        {/* Video Details */}
        {loading ? <p className="text-gray-500 mt-4">Loading video...</p> : video && <VideoCard video={video} />}

        {/* Actions */}
        {session && (
          <>
            <CommentBox />
            <EditTitle />
          </>
        )}
      </div>
    </div>
  );
}
