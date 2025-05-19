import Post from "./post.model.js";

export const getPosts = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.course) filter.course = req.query.course;
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, content, course, link, createdAt } = req.body;
    const postData = { title, content, course };
    if (link) postData.link = link;
    if (createdAt) {
      const [dd, mm, yyyy] = createdAt.split("/");
      postData.createdAt = new Date(yyyy, mm - 1, dd);
    }
    const newPost = new Post(postData);
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};