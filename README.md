# 🚀 MetaBlog: Your Next.js Blogging Platform 🖋️

Welcome to MetaBlog, a modern and feature-rich blogging platform built with Next.js! Share your thoughts, stories, and ideas with the world using our intuitive and powerful platform.

## ✨ Features

- **✍️ Rich Text Editor:** Create stunning content with our integrated rich text editor.
- **🎨 Theme Toggle:** Switch between light and dark modes for a comfortable reading experience.
- **📱 Mobile Responsive:** Enjoy a seamless experience on any device.
- **🔒 User Authentication:** Secure user authentication with Clerk.
- **🏷️ Tagging System:** Organize your posts with a flexible tagging system.
- **📊 Categories:** Easily categorize your blogs for better navigation.
- **🖼️ Image Uploads:** Upload images directly to your posts.
- **🔖 Bookmarking:** Save your favorite posts for later.
- **🔄 Social Sharing:** Share your posts on social media with ease.

## 🛠️ Installation

Get MetaBlog up and running on your local machine with these simple steps:

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/amnesia2k/blog.git
    cd blog
    ```

2.  **Install Dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up your .env file**
    Duplicate `.env.example` to `.env` and fill the required variables:

    ```bash
    cp .env.example .env
    ```

4.  **Database Setup:**

    ```bash
    pnpm db:push
    pnpm db:generate
    pnpm prisma db seed
    ```

5.  **Run the Development Server:**

    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💻 Usage

<details>
<summary><b>Creating a New Post</b></summary>

1.  **Sign In:** Ensure you have an author role to create new posts.
2.  **Navigate to Create:** Click on the "New Post" button in the user menu.
3.  **Fill the Form:** Enter the title, slug, excerpt, category, and tags.
4.  **Write Content:** Use the rich text editor to create engaging content.
5.  **Publish:** Click the "Publish Post" button to share your masterpiece.

</details>

<details>
<summary><b>Becoming an Author</b></summary>

1.  **Sign In:** Ensure you have an account to start.
2.  **Click "Become an Author":** Button is located in the footer.
3.  **Fill the Form:** Enter display name, bio, and socials links.
4.  **Submit:** Click "Submit Application".
</details>

## 🚀 Technologies Used

| Technology                                    | Description                                                                                                            |
| :-------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| [Next.js](https://nextjs.org/)                | The React Framework for Production                                                                                     |
| [TypeScript](https://www.typescriptlang.org/) | TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. |
| [Prisma](https://www.prisma.io/)              | Next-generation ORM for Node.js & TypeScript                                                                           |
| [Tailwind CSS](https://tailwindcss.com/)      | A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.   |
| [Clerk](https://clerk.com/)                   | Complete user management, authentication, and authorization, purpose-built for React and Next.js                       |
| [Radix UI](https://www.radix-ui.com/)         | Unstyled, accessible components for building high-quality design systems and web apps.                                 |
| [Lucide React](https://lucide.dev/)           | Beautifully simple, pixel-perfect icons                                                                                |
| [Tiptap](https://tiptap.dev/)                 | A renderless and extendable rich text editor for Vue.js                                                                |
| [Cloudinary](https://cloudinary.com/)         | End-to-end media management solution for websites and apps.                                                            |
| [Biome](https://biomejs.dev/)                 | A tool for high-performance formatting, linting, and more for JavaScript, TypeScript, JSON, and CSS.                   |
| [Inngest](https://www.inngest.com/)           | Event-driven background jobs for Next.js                                                                               |
| [Sonner](https://sonner.emilkowalski.com/)    | An opinionated toast component for React.                                                                              |

## 🤝 Contributing

Contributions are always welcome! Here’s how you can help:

- 🐛 **Report Bugs:** Submit detailed bug reports to help us improve.
- ✨ **Suggest Features:** Share your ideas for new features and enhancements.
- 💻 **Submit Pull Requests:** Contribute code changes to fix issues or add new features.

Please follow these guidelines when contributing:

- Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
- Write clear, maintainable code with appropriate comments.
- Test your changes thoroughly before submitting a pull request.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 🧑‍💻 Author Info

- **Author:** amnesia2k
  - [Social Media](https://x.com/@ola_the_dev)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
