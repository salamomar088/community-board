import { v4 as uuid } from "uuid";

export const tagsAll = [
  "React",
  "JavaScript",
  "CSS",
  "Databases",
  "DevOps",
  "UX",
];

export const postsSeed = [
  {
    id: uuid(),
    title: "How to structure a React app cleanly?",
    content:
      "I’m building a mid-size app… **What folder structure** works well?",
    author: {
      id: "u1",
      name: "Lina",
      avatar: "https://i.pravatar.cc/50?img=12",
    },
    tags: ["React", "UX"],
    votes: 12,
    commentsCount: 3,
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
  },
  {
    id: uuid(),
    title: "Best ways to optimize images?",
    content: "What are your tips: lazy loading, responsive sizes, CDN…",
    author: { id: "u2", name: "Sam", avatar: "https://i.pravatar.cc/50?img=5" },
    tags: ["JavaScript", "CSS"],
    votes: 5,
    commentsCount: 2,
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
];
