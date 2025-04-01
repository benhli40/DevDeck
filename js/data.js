// data.js

export const cards = [
  {
    id: "card-001",
    title: "git stash",
    category: "Git",
    description: "Temporarily saves changes that are not ready to commit.",
    code: "git stash",
    tags: ["git", "version control", "temporary"],
    favorite: false
  },
  {
    id: "card-002",
    title: "fetch() - Basic GET",
    category: "API",
    description: "Fetches data from a URL and returns a Promise.",
    code: `fetch('https://api.example.com/data')
  .then(res => res.json())
  .then(data => console.log(data));`,
    tags: ["api", "fetch", "javascript", "http"],
    favorite: false
  },
  {
    id: "card-003",
    title: "ls -la",
    category: "Terminal",
    description: "Lists all files in the current directory, including hidden ones.",
    code: "ls -la",
    tags: ["terminal", "linux", "bash"],
    favorite: false
  },
  {
    id: "card-004",
    title: "npm start",
    category: "Node",
    description: "Runs the start script defined in package.json.",
    code: "npm start",
    tags: ["npm", "node", "scripts"],
    favorite: false
  },
  {
    id: "card-005",
    title: "VS Code Multi-Cursor",
    category: "Shortcut",
    description: "Place multiple cursors to edit all at once.",
    code: "Alt + Click (Windows) / Option + Click (Mac)",
    tags: ["vscode", "shortcuts", "multicursor"],
    favorite: false
  },
  {
    id: "card-006",
    title: "console.table()",
    category: "Debug",
    description: "Logs data in table format for better visualization.",
    code: "console.table(arrayOrObject);",
    tags: ["debugging", "console", "js"],
    favorite: false
  }
];