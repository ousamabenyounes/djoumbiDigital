# 100% AI Generated Website

[Live Demo](https://ssii-website-git-main-byoness-projects.vercel.app/fr/)

Welcome to the `djoumbiDigital` repository! This project is a modern web application primarily developed in TypeScript, with configurations for tools like Next.js, Tailwind CSS, and Vercel.

## About

This project is hosted on [ssii-website.vercel.app](https://ssii-website.vercel.app). It is a modern web application utilizing the following technologies:

- **TypeScript**: The primary language used for development.
- **Next.js**: A React framework for server-side rendering and static web applications.
- **Tailwind CSS**: A utility-first CSS framework for responsive and fast design.
- **Vercel**: A deployment platform for front-end applications.

## Features

- **Form handling with React Hook Form**: Efficient form management.
- **Email integration with Resend**: Seamless email functionality.
- **Static site generation**: For optimal performance.
- **Custom page loader with caching system**: Enhances user experience.
- **Optimized data fetching with SWR**: Efficient data retrieval.

## 🚄 Performance Features

### Page Loading System

The website implements a custom loading system that:
- Shows a smooth loading animation during page transitions.
- Caches loaded pages to prevent unnecessary reloads.
- Provides visual feedback for navigation state.

```typescript
// Custom hook for page loading
const usePageLoader = () => {
  useEffect(() => {
    // Show loading animation
    NProgress.start();

    // Cache the page content
    return () => {
      NProgress.done();
    };
  }, []);
};
```

### Caching Strategy

The project uses a multi-level caching approach:
- **Page Caching**: Previously visited pages are cached in memory.
- **Static Generation**: Pages are pre-rendered at build time.
- **Incremental Static Regeneration**: Dynamic content is revalidated periodically.
- **SWR**: Data fetching with stale-while-revalidate strategy.

### 🛠️ Tech Stack

- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Email**: [Resend](https://resend.com/)
- **Deployment**: [Netlify](https://www.netlify.com/)
- **Loading**: [NProgress](https://ricostacruz.com/nprogress/)
- **Caching**: Built-in Next.js caching + SWR

### Contributors

- **Cursor.ia**: Code development
- **Ousama Ben Younes**: Prompt engineering

### Project Structure

The project is organized into several folders and files:
- **config**: Configuration files.
- **public**: Publicly accessible static files.
- **src**: Application source code.
- **.gitignore**: Files and directories ignored by Git.
- **download-images.sh**: Script to download images.
- **netlify.toml**: Configuration for Netlify.
- **next-env.d.ts**: Type declarations for Next.js.
- **next.config.js**: Next.js configuration.
- **package-lock.json** and **package.json**: npm dependency management.
- **postcss.config.js**: PostCSS configuration.
- **tailwind.config.js**: Tailwind CSS configuration.
- **tsconfig.json**: TypeScript configuration.
- **vercel.json**: Vercel configuration.

### How to Contribute

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally.
3. **Create a branch** for your feature or bug fix.
4. **Commit your changes**.
5. **Push your changes** to your fork.
6. **Open a Pull Request** to this repository.

### License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Thank you for your interest in `djoumbiDigital`! Feel free to contribute and improve the project.
