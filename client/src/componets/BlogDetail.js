import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const styles = {
    container: {
      width: "80%",
      margin: "0 auto",
      backgroundColor: "#fff",
      padding: "20px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
      padding: "20px",
      backgroundColor: "#f4f4f4",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    content: {
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
    },
    blogDetails: {
      width: "65%",
    },
    comments: {
      width: "35%",
    },
    heading: {
      color: "#333",
      fontSize: "24px",
    },
    paragraph: {
      color: "#666",
      lineHeight: "1.6",
    },
    comment: {
      marginBottom: "20px",
      padding: "15px",
      backgroundColor: "#f9f9f9",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    commentBody: {
      marginBottom: "10px",
      color: "#555",
    },
    commentAuthor: {
      fontWeight: "bold",
      color: "#333",
    },
    commentEmail: {
      fontSize: "12px",
      color: "#888",
    },
  };

  const [blog, setBlog] = useState(null);
  const [blogComments, setBlogComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchBlogComments = async () => {
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        setBlogComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogDetails();
    fetchBlogComments();
  }, [id]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Blog Detail</h1>
      </header>
      <div style={styles.content}>
        <div style={styles.blogDetails}>
          {blog ? (
            <>
              <h2 style={styles.heading}>{blog.title}</h2>
              <p style={styles.paragraph}>{blog.body}</p>
            </>
          ) : (
            <p>Loading blog details...</p>
          )}
        </div>
        <div style={styles.comments}>
          <h2 style={styles.heading}>Comments</h2>
          {blogComments.length > 0 ? (
            blogComments.map((comment) => (
              <div key={comment.id} style={styles.comment}>
                <p style={styles.commentBody}>{comment.body}</p>
                <p style={styles.commentAuthor}>{comment.name}</p>
                <p style={styles.commentEmail}>{comment.email}</p>
              </div>
            ))
          ) : (
            <p>Loading comments...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
