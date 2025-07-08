import Blog from "../models/blogModel.js";
import mongoose from "mongoose";



const createBlog = async (req, res) => {
  try {
    const { title, content, ingredients } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const parsedIngredients = ingredients ? JSON.parse(ingredients) : [];

    const blog = new Blog({
      title,
      content,
      imageUrl,
      ingredients: parsedIngredients,
      author: req.user.id,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Blog yaradılarkən xəta baş verdi" });
  }
};



const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Bloglar yüklənmədi' });
  }
};


const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username');
    if (!blog) return res.status(404).json({ message: 'Blog tapılmadı' });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Blog tapılmadı' });
  }
};

 const toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog tapılmadı' });

    const userId = req.user.id;
    if (blog.likes.includes(userId)) {
      
      blog.likes = blog.likes.filter(id => id.toString() !== userId);
    } else {
      
      blog.likes.push(userId);
    }

    await blog.save();
    res.json({ likes: blog.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Like əlavə edilərkən xəta baş verdi' });
  }
};

const getLikedBlogsByUser = async (req, res) => {
  console.log("GELDİM BURAYA");
  try {
    const userId =new mongoose.Types.ObjectId(req.user.id);

    const likedBlogs = await Blog.find({
      likes: { $elemMatch: { $eq: userId } }
    }).select("_id content imageUrl author");

    if (likedBlogs.length === 0) {
      return res.status(404).json({ message: "Blog tapılmadı" });
    }

    res.json(likedBlogs);
  } catch (error) {
    console.error("getLikedBlogsByUser error:", error);
    res.status(500).json({ message: "Serverdə xəta baş verdi" });
  }
};









const addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    .populate("comments.user","username")
    if (!blog) return res.status(404).json({ message: 'Blog tapılmadı' });
        console.log("req.user:", req.user);
    console.log("req.body:", req.body);

    const newComment = {
      user: req.user.id,                   // DƏYİŞDİM BURANI
      username: req.user.username,
      text: req.body.text
    };

    blog.comments.push(newComment);
    await blog.save();

    res.status(201).json(blog.comments[blog.comments.length - 1]);
  } catch (error) {
    res.status(500).json({ message: 'Şərh əlavə edilərkən xəta baş verdi' });
  }
};



const deleteComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) return res.status(404).json({ message: 'Blog tapılmadı' });

    const userId = req.user.id;
    const commentId = req.params.commentId;

    const comment = blog.comments.find(c => c._id.toString() === commentId);
    if (!comment) return res.status(404).json({ message: 'Şərh tapılmadı' });

    if (
        (!comment.user || comment.user.toString() !== userId) &&
        blog.author.toString() !== userId &&
        req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Bu şərhi silmək üçün icazən yoxdur" });
    }

    blog.comments = blog.comments.filter(c => c._id.toString() !== commentId);

    await blog.save();
    res.json({ message: 'Şərh uğurla silindi' });
  } catch (error) {
    console.error("Şərh silinərkən xəta:", error);
    res.status(500).json({ message: 'Şərh silinərkən xəta baş verdi' });
  }
};

 const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog tapılmadı" });

   if (blog.author.toString() !== req.user.id && req.user.role !== "admin")
     return res.status(403).json({ message: "İcazən yoxdur" });


   await blog.deleteOne();
  res.json({ message: "Blog silindi" });
};

export {createBlog,getAllBlogs,getBlogById,toggleLike,addComment,deleteComment,deleteBlog,getLikedBlogsByUser}




