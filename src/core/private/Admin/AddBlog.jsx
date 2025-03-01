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
  const [sidebarVisible, setSidebarVisible] = useState(false); // State to toggle sidebar visibility
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
      {/* Sidebar */}
      <div
        className={`${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        } fixed inset-0 z-40 bg-gray-800 p-4 w-64 transition-transform duration-300 ease-in-out md:z-10 md:block`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div
        className={`flex-1 p-6 bg-gray-100 overflow-auto ${sidebarVisible ? "ml-64" : ""} transition-all duration-300 ease-in-out`}
      >
        {/* Hamburger Menu for mobile */}
        <button
          className="md:hidden block text-white bg-blue-500 p-3 rounded-md focus:outline-none"
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
          {/* Hamburger Icon (3 lines) */}
          <span className="block w-6 h-1 bg-white mb-2"></span>
          <span className="block w-6 h-1 bg-white mb-2"></span>
          <span className="block w-6 h-1 bg-white"></span>
        </button>

        <h2 className="text-2xl font-bold mb-4">Add Blog</h2>

        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
                className="input input-bordered w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Content</label>
              <textarea
                name="content"
                value={blog.content}
                onChange={handleChange}
                className="input input-bordered w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
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
                className="input input-bordered w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="input input-bordered w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
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
                className="input input-bordered w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
