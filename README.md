# Forum Project

## Project Description

A modern forum system built with React and Firebase where users can create posts, add comments, and interact through likes. Features include user authentication, post management, commenting system, and administrative capabilities for content moderation.

Key features:

- User authentication and profile management
- Post creation, editing, and deletion
- Comment system with likes
- Admin panel for user and content moderation
- Real-time updates using Firebase
- Responsive design using Chakra UI

## Hosted Project Link

[Visit the Forum in GitHub](https://github.com/Plamen536/Forum2)

## Local Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Steps

1. Clone the repository

```sh
git clone https://github.com/Plamen536/Forum2.git
cd "Forum Project"
```

2. Install dependencies

```sh
npm install
```

3. Start development server

```sh
npm run dev
```

4. Open browser and visit `http://localhost:5173`

## Database Structure

```json
{
  "users": {
    "{userHandle}": {
      "handle": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "uid": "string",
      "role": "string", // "user" | "admin" | "blocked"
      "avatarUrl": "string",
      "createdOn": "timestamp",
      "posts": {
        "{postId}": {
          // Post reference
        }
      }
    }
  },
  "posts": {
    "{postId}": {
      "title": "string",
      "content": "string",
      "author": "string", // userHandle
      "createdOn": "timestamp",
      "uid": "string",
      "likes": {
        "{userId}": boolean
      },
      "comments": {
        "{commentId}": {
          "text": "string",
          "author": "string",
          "avatar": "string",
          "timestamp": "number",
          "likes": {
            "{userId}": boolean
          }
        }
      }
    }
  }
}
```
