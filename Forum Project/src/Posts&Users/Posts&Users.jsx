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
      <h2>Posts: {posts.length}</h2>
      <h2>Users: {users.length}</h2>
    </div>
  );
}