import { Request, Response } from "express";
import { Blog } from "../models/Blog";
import { blogSchema } from "../utils/validation";
import multer from "multer";
import path from "path";

// Set up storage for image uploads
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: Function) {
    cb(null, "uploads/");
  },
  filename: function (req: Request, file: any, cb: Function) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

export const createBlog = async (req: Request, res: Response) => {
  try {
    upload.single("image")(req, res, async function (err: any) {
      if (err) {
        return res.status(400).json({ message: "Error uploading image" });
      }

      const { error } = blogSchema.validate(req.body);
      if (error) {
        console.log(error);
        return res.status(400).json({ message: error.details[0].message });
      }

      const { title, description } = req.body;
      // console.log(title);
      const file: any = req.file;
      const newBlog = new Blog({
        title: title,
        description: description,
        image: file.path, // Save the image path in the Blog object
      });
      await newBlog.save();

     
      res
        .status(201)
        .json({ message: "Blog post created successfully", blog: newBlog });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single blog post by ID

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single blog post by ID

export const getSingleBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};



// Update a blog post by ID
export const updateBlog = async (req: Request, res: Response) => {
    try {
        upload.single("image")(req, res, async function (err: any) {
            if (err) {
                return res.status(400).json({ message: "Error uploading image" });
            }
            const { title, description } = req.body;
            const file: any = req.file;
            const updatedFields: any = {
                title: title,
                description: description,
            };

            // Check if there's a file to update
            if (file) {
                updatedFields.image = file.path;
            }

            const updatedBlog = await Blog.findByIdAndUpdate(
                req.params.id,
                updatedFields,
                { new: true }
            );
            if (!updatedBlog) {
                return res.status(404).json({ message: "Blog post not found" });
            }

            res.json({
                message: "Blog post updated successfully",
                blog: updatedBlog,
            });
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};




// Delete a blog post by ID
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json({ message: "Blog post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
