import type { Post, Author, Category } from "~@/types/blog";

export const authors: Author[] = [
  {
    id: "1",
    name: "Tracey Wilson",
    username: "tracey-wilson",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Tracey is a tech enthusiast and writer with over 5 years of experience in the industry.",
    socialLinks: {
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "2",
    name: "Jason Francisco",
    username: "jason-francisco",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Jason is a software engineer and blogger who loves to write about new technologies.",
    socialLinks: {
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "3",
    name: "Elizabeth Slavin",
    username: "elizabeth-slavin",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Elizabeth is a digital marketer and content creator specializing in tech trends.",
    socialLinks: {
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "4",
    name: "Ernie Smith",
    username: "ernie-smith",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Ernie is a travel blogger and photographer with a passion for technology.",
    socialLinks: {
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "5",
    name: "Eric Smith",
    username: "eric-smith",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Eric is a tech reviewer and gadget enthusiast who loves to share his insights.",
    socialLinks: {
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Technology",
    slug: "technology",
    description: "Latest news and trends in technology",
    postCount: 15,
  },
  {
    id: "2",
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Tips and advice for a better lifestyle",
    postCount: 8,
  },
  {
    id: "3",
    name: "Travel",
    slug: "travel",
    description: "Explore the world with our travel guides",
    postCount: 12,
  },
  {
    id: "4",
    name: "Business",
    slug: "business",
    description: "Business insights and entrepreneurship",
    postCount: 10,
  },
  {
    id: "5",
    name: "Health",
    slug: "health",
    description: "Health tips and wellness advice",
    postCount: 7,
  },
];

export const posts: Post[] = [
  {
    id: "1",
    title:
      "The Impact of Technology on the Workplace: How Technology is Changing",
    slug: "impact-technology-workplace",
    excerpt:
      "Explore how modern technology is transforming the way we work and collaborate in the digital age.",
    content: `
      <p>Technology has revolutionized the workplace in countless ways. From remote work capabilities to automation and artificial intelligence, the modern office looks nothing like it did just a decade ago.</p>
      
      <h2>Remote Work Revolution</h2>
      <p>One of the most significant changes has been the shift to remote work. Cloud computing, video conferencing, and project management tools have made it possible for teams to collaborate effectively from anywhere in the world.</p>
      
      <h2>Automation and AI</h2>
      <p>Automation is handling repetitive tasks, freeing up human workers to focus on more creative and strategic work. AI is beginning to transform decision-making processes and provide insights that were previously impossible to obtain.</p>
      
      <h2>The Future of Work</h2>
      <p>As technology continues to evolve, we can expect even more dramatic changes in how we work. Virtual reality meetings, advanced AI assistants, and new collaboration tools will further transform the workplace landscape.</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "August 20, 2023",
    category: "Technology",
    author: authors[0] as Author,
  },
  {
    id: "2",
    title: "Sustainable Travel: Exploring the World Responsibly",
    slug: "sustainable-travel-exploring-world-responsibly",
    excerpt:
      "Learn how to minimize your environmental impact while still enjoying amazing travel experiences.",
    content: `
      <p>Sustainable travel is becoming increasingly important as we become more aware of our environmental impact. This article explores ways to travel responsibly while still having amazing experiences.</p>
      
      <h2>Eco-Friendly Accommodations</h2>
      <p>Many hotels and resorts are now implementing sustainable practices, from energy conservation to waste reduction. Choosing these accommodations can significantly reduce your travel footprint.</p>
      
      <h2>Responsible Tourism</h2>
      <p>Supporting local communities, respecting cultural heritage, and protecting natural environments are all key aspects of responsible tourism. Learn how your travel choices can make a positive impact.</p>
      
      <h2>Carbon Offsetting</h2>
      <p>While reducing emissions is ideal, carbon offsetting programs allow travelers to compensate for the environmental impact of their journeys, particularly air travel.</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "August 18, 2023",
    category: "Travel",
    author: authors[1] as Author,
  },
  {
    id: "3",
    title: "The Rise of Electric Vehicles: A Sustainable Future",
    slug: "rise-electric-vehicles-sustainable-future",
    excerpt:
      "Discover how electric vehicles are transforming the automotive industry and helping combat climate change.",
    content: `
      <p>Electric vehicles (EVs) are rapidly gaining popularity as concerns about climate change and air pollution grow. This article explores the rise of EVs and their impact on our future.</p>
      
      <h2>Environmental Benefits</h2>
      <p>EVs produce zero direct emissions, which helps improve air quality and reduce greenhouse gas emissions. As electricity generation becomes cleaner, the environmental benefits of EVs will continue to grow.</p>
      
      <h2>Technological Advancements</h2>
      <p>Battery technology is advancing rapidly, increasing the range of EVs and reducing charging times. These improvements are making EVs more practical for everyday use.</p>
      
      <h2>Economic Impact</h2>
      <p>The shift to EVs is creating new jobs in manufacturing, charging infrastructure, and related services. It's also reducing dependence on imported oil in many countries.</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "August 15, 2023",
    category: "Technology",
    author: authors[2] as Author,
  },
  {
    id: "4",
    title: "Mindfulness in the Digital Age: Finding Balance",
    slug: "mindfulness-digital-age-finding-balance",
    excerpt:
      "Learn strategies for maintaining mental well-being in our constantly connected world.",
    content: `
      <p>In our hyper-connected digital world, finding moments of peace and mindfulness can be challenging. This article explores strategies for maintaining mental well-being while still enjoying the benefits of technology.</p>
      
      <h2>Digital Detox</h2>
      <p>Regular breaks from screens and social media can help reduce stress and improve focus. Learn how to implement effective digital detox practices into your routine.</p>
      
      <h2>Mindfulness Apps</h2>
      <p>Ironically, technology itself can help us become more mindful. Explore apps designed to guide meditation, improve sleep, and enhance overall well-being.</p>
      
      <h2>Creating Boundaries</h2>
      <p>Setting clear boundaries between work and personal life is essential in the age of remote work and constant connectivity. Discover strategies for creating healthy digital boundaries.</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "August 12, 2023",
    category: "Lifestyle",
    author: authors[3] as Author,
  },
  {
    id: "5",
    title: "The Future of Artificial Intelligence in Healthcare",
    slug: "future-artificial-intelligence-healthcare",
    excerpt:
      "Explore how AI is revolutionizing medical diagnosis, treatment, and patient care.",
    content: `
      <p>Artificial intelligence is transforming healthcare in remarkable ways. From improving diagnostic accuracy to personalizing treatment plans, AI has the potential to revolutionize how we approach medicine.</p>
      
      <h2>Diagnostic Capabilities</h2>
      <p>AI algorithms can analyze medical images with incredible accuracy, often detecting issues that human doctors might miss. This is leading to earlier diagnosis and better outcomes for patients.</p>
      
      <h2>Personalized Medicine</h2>
      <p>By analyzing vast amounts of patient data, AI can help develop highly personalized treatment plans based on an individual's genetic makeup, lifestyle, and medical history.</p>
      
      <h2>Ethical Considerations</h2>
      <p>As AI becomes more integrated into healthcare, important ethical questions arise about privacy, decision-making authority, and the role of human doctors in an increasingly automated field.</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "August 10, 2023",
    category: "Technology",
    author: authors[4] as Author,
  },
  {
    id: "6",
    title: "Sustainable Architecture: Building for a Better Future",
    slug: "sustainable-architecture-building-better-future",
    excerpt:
      "Discover how eco-friendly building designs are shaping the cities of tomorrow.",
    content: `
      <p>Sustainable architecture is revolutionizing how we design and construct buildings. From energy-efficient materials to innovative design concepts, architects are finding ways to reduce environmental impact while creating beautiful spaces.</p>
      
      <h2>Green Building Materials</h2>
      <p>Sustainable materials like bamboo, recycled steel, and low-carbon concrete are reducing the environmental footprint of new construction projects.</p>
      
      <h2>Energy Efficiency</h2>
      <p>Passive solar design, advanced insulation, and smart energy systems are making buildings more energy-efficient than ever before.</p>
      
      <h2>Biophilic Design</h2>
      <p>Incorporating natural elements into building design not only reduces environmental impact but also improves the well-being of occupants.</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "August 5, 2023",
    category: "Lifestyle",
    author: authors[0] as Author,
  },
];
