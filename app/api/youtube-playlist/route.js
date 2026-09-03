// // يجيب لستة الفيديوهات جوا بلاي ليست يوتيوب معينة
// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const playlistId = searchParams.get("playlistId");

//   if (!playlistId) {
//     return Response.json({ error: "لم يتم تحديد بلاي ليست" }, { status: 400 });
//   }

//   try {
//     const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`;
//     const res = await fetch(url);
//     const data = await res.json();

//     if (data.error) {
//       console.error(data.error);
//       return Response.json({ error: "تعذر جلب الفيديوهات من يوتيوب" }, { status: 500 });
//     }

//     const videos = (data.items || []).map((item) => ({
//       videoId: item.snippet.resourceId.videoId,
//       title: item.snippet.title,
//       thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
//       position: item.snippet.position,
//     }));

//     return Response.json({ videos });
//   } catch (err) {
//     console.error(err);
//     return Response.json({ error: "حدث خطأ أثناء جلب البلاي ليست" }, { status: 500 });
//   }
// }

// يجيب لستة الفيديوهات جوا بلاي ليست يوتيوب معينة (كل الفيديوهات حتى لو تجاوزت 50)
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const playlistId = searchParams.get("playlistId");

  if (!playlistId) {
    return Response.json({ error: "لم يتم تحديد بلاي ليست" }, { status: 400 });
  }

  try {
    let allVideos = [];
    let nextPageToken = "";

    do {
      let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`;
      
      if (nextPageToken) {
        url += `&pageToken=${nextPageToken}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        console.error(data.error);
        return Response.json({ error: "تعذر جلب الفيديوهات من يوتيوب" }, { status: 500 });
      }

      const formattedVideos = (data.items || []).map((item) => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
        position: item.snippet.position,
      }));

      allVideos.push(...formattedVideos);
      nextPageToken = data.nextPageToken || "";

    } while (nextPageToken); // يستمر بالطلب طالما هناك صفحة أخرى حتى يجلب الـ 91 فيديو كاملاً

    return Response.json({ videos: allVideos });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "حدث خطأ أثناء جلب البلاي ليست" }, { status: 500 });
  }
}
