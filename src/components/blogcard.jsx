import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function BlogCard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/blogs/allBlog"); // Adjust your API URL
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen py-10">
      <ul className="flex flex-wrap justify-center gap-6">
        {blogs.map((blog) => (
          <li
            key={blog._id}
            className="bg-gray-100 rounded-lg shadow-lg overflow-hidden w-80"
          >
            <div className="relative">
              <img
                src={`http://localhost:4000/uploads/${blog.image}`} // Correct image path
                alt={blog.title}
                className="w-full h-52 object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-black text-2xl font-bold mb-2">
                {blog.title}
              </h2>
              <p className="text-black-300 text-sm mb-2">{blog.content}</p>
              <p className="text-black-400 text-xs">
                Author: {blog.author} | Published:{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogCard;
