import { google } from "googleapis";

export async function GET(req) {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
  });

  try {
    const response = await youtube.videos.list({
      part: "snippet,statistics",
      id: process.env.YOUTUBE_VIDEO_ID,
    });

    return Response.json(response.data.items[0]);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
