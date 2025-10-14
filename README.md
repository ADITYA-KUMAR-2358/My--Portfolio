# Project Name
A brief description of your project. Describe what it does, its purpose, or the problem it solves.
Example:
> A personal portfolio website deployed using GitHub Pages.

## 🚀 Live Demo
Check the live website here:
https://aditya-kumar-2358-portfolio.vercel.app/

## 🛠️ Technologies Used
- HTML, CSS, JavaScript (for static site)
- React (for SPA / dynamic site)
- Git & GitHub Pages for deployment

## 📦 Getting Started
### 1. Clone the repository
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>

### 2. Install dependencies (if React)
npm install

### 3. Run locally

# For React app
npm run dev

## 📤 Deployment
### Static Site
1. Push your changes to the main branch.
2. Go to Settings → Pages → Branch → main / root.
3. Visit: https://<username>.github.io/<repo-name>/

### React App
1. Install gh-pages if not already:
npm install gh-pages --save-dev

2. Add these scripts in package.json:
"homepage": "https://<username>.github.io/<repo-name>",
"scripts": {
  "predeploy": "npm run dev",
  "deploy": "gh-pages -d build"
}

3. Deploy:
npm run dev

## 📖 Contributing
Feel free to fork this repo, make improvements, and submit pull requests!

## 📝 License
This project is licensed under the MIT License – see the LICENSE file for details.
