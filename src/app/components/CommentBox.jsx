import { useState } from "react";

export default function CommentBox() {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleComment = async () => {
    if (!comment.trim()) return alert("Enter a comment");
    setLoading(true);

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });
      if (res.ok) {
        alert("Comment added!");
        setComment("");
      } else {
        alert("Failed to add comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border p-2 rounded-md"
        placeholder="Add a comment..."
      ></textarea>
      <button
        onClick={handleComment}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </div>
  );
}
