import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "./Posts&Users.css";

export default function PostsAndUsers() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const db = getDatabase();

    // Fetch posts
    const postsRef = ref(db, "posts");
    onValue(postsRef, (snapshot) => {
      const postsData = snapshot.val();
      if (postsData) {
        const postList = Object.entries(postsData).map(([id, post]) => ({
          id,
          ...post,
        }));
        setPosts(postList);
      } else {
        setPosts([]);
      }
    });

    // Fetch users
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        const userList = Object.entries(usersData).map(([id, user]) => ({
          id,
          ...user,
        }));
        setUsers(userList);
      } else {
        setUsers([]);
      }
    });
  }, []);

  return (
    <div>
      <h1
        style={{
            position: "fixed",    // Stays fixed at the bottom right
            bottom: "20px",       // 20px from the bottom
            right: "20px",        // 20px from the right
            backgroundColor: "#2c3e50",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "20px",
            fontWeight: "bold",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
            display: "inline-block"
        }}
      >
        📢 Posts: {posts.length} | 👥 Users: {users.length}
      </h1>
    </div>
  );
}
