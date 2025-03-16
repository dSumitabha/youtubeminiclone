import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { commentId } = await req.json();

  const youtube = google.youtube({
    version: "v3",
    auth: session.accessToken,
  });

  try {
    await youtube.comments.delete({
      id: commentId,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
