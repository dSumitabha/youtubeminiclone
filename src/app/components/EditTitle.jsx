import { useState } from "react";

export default function EditTitle() {
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEditTitle = async () => {
    if (!newTitle.trim()) return alert("Enter a new title");
    setLoading(true);

    try {
      const res = await fetch("/api/edit-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTitle }),
      });
      if (res.ok) {
        alert("Title updated!");
        setNewTitle("");
      } else {
        alert("Failed to update title");
      }
    } catch (error) {
      console.error("Error updating title:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="w-full border p-2 rounded-md"
        placeholder="Enter new title..."
      />
      <button
        onClick={handleEditTitle}
        disabled={loading}
        className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-2"
      >
        {loading ? "Updating..." : "Update Title"}
      </button>
    </div>
  );
}
