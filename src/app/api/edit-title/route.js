import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { newTitle } = await req.json();

  const youtube = google.youtube({
    version: "v3",
    auth: session.accessToken,
  });

  try {
    const response = await youtube.videos.update({
      part: "snippet",
      requestBody: {
        id: process.env.YOUTUBE_VIDEO_ID,
        snippet: {
          title: newTitle,
        },
      },
    });

    return Response.json(response.data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
