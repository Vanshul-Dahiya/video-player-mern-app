const videoSchema = require("../models/VideoModel");

exports.addVideo = async (req, res) => {
  const { title, description } = req.body;

  //   we need to send videoPath to database
  const videoPath = req.file.path;

  //   title and description are coming from body
  const video = new videoSchema({
    title,
    description,
    filename: req.file.filename,
    videoUrl: videoPath,
  });
  console.log(video);
  try {
    // save video in DB
    await video.save();
    res.status(200).json({
      message: "Video uploaded successfully",
      video,
    });
  } catch (error) {
    res.status(400).json({
      message: "Video upload failed",
      error,
    });
  }
};

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await videoSchema.find({});
    res.status(200).json({
      videos,
    });
    console.log(videos)
  } catch (error) {
    res.status(400).json({
      message: "Videos fetch failed",
      error,
    });
  }
};
