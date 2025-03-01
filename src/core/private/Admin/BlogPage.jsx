import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../components/sidebar";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null);
  const [deleteBlogId, setDeleteBlogId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/blogs/allBlog");
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Open the edit modal with the selected blog
  const handleEdit = (blog) => setEditBlog({ ...blog });

  // Handle input changes inside the edit modal
  const handleChange = (e) => {
    setEditBlog({ ...editBlog, [e.target.name]: e.target.value });
  };

  // Update the blog
  const handleUpdateBlog = async () => {
    if (!editBlog) return;

    try {
      const response = await axios.put(
        `http://localhost:4000/blogs/updateBlog/${editBlog._id}`,
        editBlog,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBlogs(blogs.map((blog) => (blog._id === response.data._id ? response.data : blog)));
      setEditBlog(null);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  // Open delete confirmation modal
  const handleDeleteConfirm = (id) => setDeleteBlogId(id);

  // Delete blog
  const handleDelete = async () => {
    if (!deleteBlogId) return;

    try {
      await axios.delete(`http://localhost:4000/blogs/deleteBlog/${deleteBlogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlogs(blogs.filter((blog) => blog._id !== deleteBlogId));
      setDeleteBlogId(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 min-w-[250px]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 relative">
        {/* Add Blog Button */}
        <button
          onClick={() => navigate("/addblog")}
          className="absolute top-6 right-6 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700"
        >
          Add Blog
        </button>

        {/* Blog Cards */}
        <div className="flex justify-center mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-lg shadow-lg overflow-hidden w-full p-4">
                <img
                  src={`http://localhost:4000/uploads/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-52 object-cover rounded-md"
                />
                <div className="p-4">
                  <h2 className="text-black text-2xl font-bold mb-2">{blog.title}</h2>
                  <p className="text-gray-600 text-sm mb-2">{blog.content}</p>
                  <p className="text-gray-500 text-xs">
                    Author: {blog.author} | Published: {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteConfirm(blog._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteBlogId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">Are you sure you want to delete this blog?</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded" onClick={() => setDeleteBlogId(null)}>
                No
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={handleDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Blog Modal */}
      {editBlog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={editBlog.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mb-3"
            />

            <label className="block text-sm font-medium">Content</label>
            <textarea
              name="content"
              value={editBlog.content}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mb-3 h-24"
            />

            <div className="flex justify-between mt-4">
              <button onClick={() => setEditBlog(null)} className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={handleUpdateBlog} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPage;
