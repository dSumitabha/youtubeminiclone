import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { comment } = await req.json();

  const youtube = google.youtube({
    version: "v3",
    auth: session.accessToken,
  });

  try {
    const response = await youtube.commentThreads.insert({
      part: "snippet",
      requestBody: {
        snippet: {
          videoId: process.env.YOUTUBE_VIDEO_ID,
          topLevelComment: {
            snippet: { textOriginal: comment },
          },
        },
      },
    });

    return Response.json(response.data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
