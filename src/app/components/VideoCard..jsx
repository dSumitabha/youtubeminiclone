export default function VideoCard({ video }) {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-800">{video.snippet.title}</h2>
        <img src={video.snippet.thumbnails.medium.url} alt="Video Thumbnail" className="w-full rounded-md mt-2" />
        <p className="text-gray-600 mt-1">{video.statistics.viewCount} views</p>
      </div>
    );
  }
  