import Url from "../models/Url.js";
import generateShortId from "../utils/generateShortId.js";

export const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  try {
    const shortId = generateShortId();
    const newUrl = await Url.create({
      originalUrl,
      shortId,
      createdBy: req.user._id
    });
    res.json(newUrl);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortId: req.params.shortId });
    if (!url) return res.status(404).json({ message: "URL not found" });

    url.clicks++;
    await url.save();
    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find({ createdBy: req.user._id });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
