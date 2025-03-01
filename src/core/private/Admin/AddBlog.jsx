import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/sidebar";

function AddBlog() {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    createdAt: new Date().toISOString().split("T")[0], // Default to today's date
    author: "",
    image: "",
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
        // Prepare blog data for creation
        const blogData = {
            title: blog.title,
            content: blog.content,
            createdAt: blog.createdAt,
            author: blog.author,
            image: "", // Set to empty string initially, as the image will be uploaded separately
        };

        // Create the blog first
        const blogRes = await fetch("http://localhost:4000/blogs/addBlog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(blogData),
        });

        const blogResponseData = await blogRes.json();
        if (!blogRes.ok) throw new Error(blogResponseData.message);

        const blogId = blogResponseData.blog._id; // Get the blog ID from the response

        let imageUrl = blogData.image; // Default to empty image value

        if (image) {
            const imageFormData = new FormData();
            imageFormData.append("blogImage", image);
            imageFormData.append("blogId", blogId); // Use the blog's actual ID

            // Upload Image
            const imageUploadRes = await fetch("http://localhost:4000/blogs/uploadImage", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: imageFormData,
            });

            const imageUploadData = await imageUploadRes.json();
            if (!imageUploadRes.ok) throw new Error(imageUploadData.message);

            imageUrl = imageUploadData.imageUrl; // Get the uploaded image URL
        }

        // Update blog with the image URL if it's uploaded
        if (imageUrl) {
            const updateBlogData = { image: imageUrl };
            const updateBlogRes = await fetch(`http://localhost:4000/blogs/updateBlog/${blogId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updateBlogData),
            });

            const updateBlogDataResponse = await updateBlogRes.json();
            if (!updateBlogRes.ok) throw new Error(updateBlogDataResponse.message);
        }

        Swal.fire({
            icon: "success",
            title: "Blog Added Successfully",
        });
        navigate("/blogpage"); // Redirect to viewDoctor

        

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
        });
    }
};



  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Add Blog</h2>

        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Content</label>
              <textarea
                name="content"
                value={blog.content}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Created At</label>
              <input
                type="date"
                name="createdAt"
                value={blog.createdAt}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="input input-bordered w-full"
                accept="image/*"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Author</label>
              <input
                type="text"
                name="author"
                value={blog.author}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
