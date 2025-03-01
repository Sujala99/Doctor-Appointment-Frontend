import BlogCard from "../../../components/blogcard";
import React from "react";
import Nav from "../../../components/navbar";
import Footer from "../../../components/footer"; // Corrected path

function  Blog(){
    return(
        <div>
        <div>
            <Nav/>
        </div>
        <div>
            <BlogCard/>
        </div>
        <Footer />

        </div>

    );
}

export default Blog;