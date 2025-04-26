
// Mock Data for Portfolio Website

// Experience Data
export const experienceData = [
  {
    id: 'exp1',
    title: 'Senior Software Engineer',
    organization: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    startDate: 'Jan 2021',
    endDate: 'Present',
    description: [
      'Lead developer for the company\'s flagship product, improving performance by 40%',
      'Managed a team of 4 junior developers and mentored new hires',
      'Implemented CI/CD pipelines that reduced deployment time by 60%',
      'Developed microservices architecture using Node.js and Docker'
    ],
    type: 'work',
  },
  {
    id: 'exp2',
    title: 'Software Developer',
    organization: 'Data Solutions LLC',
    location: 'Austin, TX',
    startDate: 'Mar 2018',
    endDate: 'Dec 2020',
    description: [
      'Built RESTful APIs using Express.js and MongoDB',
      'Developed frontend components with React and Redux',
      'Collaborated with UX/UI designers to implement responsive designs',
      'Participated in agile development process with bi-weekly sprints'
    ],
    type: 'work',
  },
  {
    id: 'edu1',
    title: 'MSc in Computer Science',
    organization: 'Stanford University',
    location: 'Stanford, CA',
    startDate: 'Sep 2016',
    endDate: 'May 2018',
    description: [
      'Specialized in Machine Learning and Artificial Intelligence',
      'Published two research papers on Neural Networks',
      'Teaching Assistant for Data Structures and Algorithms course',
      'Graduated with honors (GPA: 3.9/4.0)'
    ],
    type: 'education',
  },
  {
    id: 'edu2',
    title: 'BSc in Computer Science',
    organization: 'MIT',
    location: 'Cambridge, MA',
    startDate: 'Sep 2012',
    endDate: 'May 2016',
    description: [
      'Major in Computer Science with minor in Mathematics',
      'Dean\'s List for all semesters',
      'President of the Programming Club',
      'Completed senior thesis on Distributed Systems'
    ],
    type: 'education',
  },
];

// Project Data
export const projectsData = [
  {
    id: 'project1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce application with product management, shopping cart, and payment processing.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1374',
    featured: true,
  },
  {
    id: 'project2',
    title: 'AI Chatbot Assistant',
    description: 'An intelligent chatbot built using natural language processing to provide customer support.',
    technologies: ['Python', 'TensorFlow', 'Flask', 'React', 'Docker'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    image: 'https://images.unsplash.com/photo-1677694273696-67e8d77a4e14?q=80&w=1632',
    featured: true,
  },
  {
    id: 'project3',
    title: 'Task Management App',
    description: 'A task management application with drag-and-drop interface and team collaboration features.',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1374',
    featured: false,
  },
  {
    id: 'project4',
    title: 'Weather Forecast App',
    description: 'A mobile-responsive weather application that provides real-time forecasts using geolocation.',
    technologies: ['React', 'OpenWeather API', 'CSS Modules'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    image: 'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?q=80&w=1470',
    featured: false,
  },
  {
    id: 'project5',
    title: 'Blogging Platform',
    description: 'A full-featured blogging platform with markdown support and user authentication.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth.js'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1472',
    featured: true,
  },
  {
    id: 'project6',
    title: 'Cryptocurrency Dashboard',
    description: 'An interactive dashboard to track cryptocurrency prices, market cap, and historical data.',
    technologies: ['React', 'Chart.js', 'CoinGecko API', 'CSS Grid'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=1586',
    featured: false,
  },
];

// Blog Data
export const blogsData = [
  {
    id: 'blog1',
    title: 'Understanding Big O Notation: A Comprehensive Guide',
    excerpt: 'Big O notation is fundamental to analyzing algorithm efficiency. Learn how to analyze time and space complexity with practical examples.',
    content: `
      # Understanding Big O Notation: A Comprehensive Guide

      Big O notation is one of the most fundamental concepts in computer science, yet it can be intimidating for beginners. In this article, we'll break down what Big O notation is, why it matters, and how to use it to analyze algorithms.

      ## What is Big O Notation?

      Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, it's used to classify algorithms according to how their run time or space requirements grow as the input size grows.

      For example, if we say an algorithm has a time complexity of O(n), it means the time the algorithm takes to complete grows linearly with the size of the input.

      ## Common Time Complexities

      Here are some common time complexities you'll encounter:

      - **O(1)** - Constant Time: The algorithm takes the same amount of time regardless of the input size.
      - **O(log n)** - Logarithmic Time: The algorithm's time requirement grows logarithmically as the input size increases.
      - **O(n)** - Linear Time: The time grows linearly with the input size.
      - **O(n log n)** - Linearithmic Time: Common in efficient sorting algorithms like merge sort.
      - **O(n²)** - Quadratic Time: Often seen in algorithms with nested loops.
      - **O(2^n)** - Exponential Time: The time doubles with each addition to the input.

      ## Practical Examples

      Let's look at some code examples to understand these complexities better.
    `,
    date: 'April 10, 2023',
    tags: ['Algorithms', 'Computer Science', 'Performance'],
    featuredImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470',
    readTime: '10 min read',
  },
  {
    id: 'blog2',
    title: 'Building Scalable React Applications with Redux',
    excerpt: 'Learn how to structure large React applications using Redux for state management and best practices for scalability.',
    content: `
      # Building Scalable React Applications with Redux

      As React applications grow in size and complexity, managing state becomes increasingly challenging. Redux provides a predictable state container that helps manage application state in a consistent and scalable way.
    `,
    date: 'March 22, 2023',
    tags: ['React', 'Redux', 'JavaScript', 'Web Development'],
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1470',
    readTime: '12 min read',
  },
  {
    id: 'blog3',
    title: 'Mastering Python\'s List Comprehensions',
    excerpt: 'Explore Python\'s powerful list comprehensions and how they can make your code more concise and readable.',
    content: `
      # Mastering Python's List Comprehensions

      List comprehensions are one of Python's most distinctive and powerful features. They provide a concise way to create lists based on existing lists or other iterable objects.
    `,
    date: 'February 15, 2023',
    tags: ['Python', 'Programming', 'Data Structures'],
    featuredImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1470',
    readTime: '8 min read',
  },
  {
    id: 'blog4',
    title: 'Essential Data Structures Every Programmer Should Know',
    excerpt: 'A comprehensive guide to the most important data structures and their applications in software development.',
    content: 'Full content of the blog post...',
    date: 'January 5, 2023',
    tags: ['Data Structures', 'Algorithms', 'Programming'],
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1534',
    readTime: '15 min read',
  },
  {
    id: 'blog5',
    title: 'Docker for Beginners: A Step-by-Step Guide',
    excerpt: 'Learn how to containerize your applications with Docker and streamline your development workflow.',
    content: 'Full content of the blog post...',
    date: 'December 12, 2022',
    tags: ['Docker', 'DevOps', 'Containers'],
    featuredImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=1471',
    readTime: '10 min read',
  },
  {
    id: 'blog6',
    title: 'Acing Technical Interviews: Tips and Strategies',
    excerpt: 'Prepare for technical interviews with practical advice on solving coding challenges and communicating effectively.',
    content: 'Full content of the blog post...',
    date: 'November 28, 2022',
    tags: ['Career', 'Interviews', 'Job Search'],
    featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470',
    readTime: '9 min read',
  },
];

// Study Materials Data
export const studyMaterialsData = [
  {
    id: 'material1',
    title: 'Data Structures & Algorithms Cheat Sheet',
    description: 'A comprehensive reference guide covering essential data structures and algorithms with time/space complexity analysis.',
    type: 'pdf',
    category: 'DSA',
    date: 'April 5, 2023',
    url: '#',
  },
  {
    id: 'material2',
    title: 'Complete Python Programming Course',
    description: 'A full video course covering Python fundamentals to advanced concepts like decorators, generators, and metaclasses.',
    type: 'video',
    category: 'Python',
    date: 'March 15, 2023',
    url: 'https://youtube.com',
  },
  {
    id: 'material3',
    title: 'Database Management Systems Notes',
    description: 'Detailed lecture notes on DBMS concepts including normalization, transactions, and query optimization.',
    type: 'pdf',
    category: 'DBMS',
    date: 'February 22, 2023',
    url: '#',
  },
  {
    id: 'material4',
    title: 'Operating Systems Lecture Series',
    description: 'Video lectures on operating system concepts including process management, memory management, and file systems.',
    type: 'video',
    category: 'OS',
    date: 'January 30, 2023',
    url: 'https://youtube.com',
  },
  {
    id: 'material5',
    title: 'LeetCode Problems Repository',
    description: 'A collection of 200+ LeetCode problems with solutions and explanations organized by difficulty and topic.',
    type: 'link',
    category: 'Placement Prep',
    date: 'January 15, 2023',
    url: 'https://github.com',
  },
  {
    id: 'material6',
    title: 'System Design Interview Guide',
    description: 'A comprehensive guide to tackling system design interview questions with real-world examples and case studies.',
    type: 'pdf',
    category: 'Placement Prep',
    date: 'December 10, 2022',
    url: '#',
  },
  {
    id: 'material7',
    title: 'Computer Networks Simplified',
    description: 'A simplified explanation of computer networking concepts from OSI model to TCP/IP protocols and security.',
    type: 'pdf',
    category: 'CN',
    date: 'November 25, 2022',
    url: '#',
  },
  {
    id: 'material8',
    title: 'Previous Year Placement Questions',
    description: 'A compilation of technical interview questions from top tech companies with detailed solutions.',
    type: 'pdf',
    category: 'Placement Prep',
    date: 'October 18, 2022',
    url: '#',
  },
];

// Personal Info
export const personalInfo = {
  name: "Gaurav Kumar",
  title: "Software Engineer & Computer Science Educator",
  email: "gauravkumar.byte@gmail.com",
  phone: "+91 7999617868",
  location: "India",
  bio: "I am a passionate software engineer in the making with hands-on experience in full-stack development using React, Django, and SQL. I enjoy learning modern technologies, building real-world projects, and sharing my knowledge through blogs, educational content, and helping fellow students grow.",
  resumeUrl: "#",
  profileImage:
    "https://whnwzoxwuipgmwkqcops.supabase.co/storage/v1/object/public/project_images//1732425738630.jpg",
  socialLinks: {
    github: "https://github.com/gauravkumarsony",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
  },
};
