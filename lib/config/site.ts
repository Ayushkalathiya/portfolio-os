export const CONFIG = {
    name: "Ayush Kalathiya",
    role: "Full Stack Developer",
    status: "ONLINE",
    uptime: "99.99%",
    location: "Surat, Gujarat, India",
    email: "ayushkalathiya50@gmail.com",
    phone: "+91-9924122947",
    education: {
        degree: "BTech in Computer Engineering",
        institution: "Charotar University of Science and Technology, Anand",
        period: "2022 - Present",
        cgpa: "9.42/10.0"
    },
    avatar: "/profile.jpg",
    socials: {
        github: "https://github.com/ayushkalathiya",
        linkedin: "https://www.linkedin.com/in/ayush-kalathiya/",
        twitter: "https://twitter.com/ayush_k",
        resume: "/Resume_AyushKalathiya .pdf",
    },
    projects: [
        {
            id: "spendwise",
            title: "Spendwise",
            description: "Financial tracking app for 200+ users. Features expense categorization, budgeting, AI-generated financial advice, OCR bill photo upload, and multilingual chatbot.",
            tech: ["Next.js", "PostgreSQL", "TailwindCSS", "TypeScript", "Prisma"],
            live: "https://trackwithspendwise.vercel.app/",
            repo: "#",
            status: "DEPLOYED",
        },
        {
            id: "studywise",
            title: "Studywise",
            description: "Student collaboration platform with AI-powered diagram tool, session scheduler, document sharing, whiteboard, and WebRTC calls with <150ms latency for 100+ users.",
            tech: ["Next.js", "PostgreSQL", "TailwindCSS", "TypeScript", "Prisma"],
            live: "#",
            repo: "#",
            status: "PRODUCTION",
        }
    ],
    experience: [
        {
            id: 1,
            role: "Full Stack Development Intern",
            company: "Laugh Logic Labs",
            period: "May 2025 - Jun 2025",
            logs: [
                "Configured Cloudinary integration for secure storage, optimized delivery, and automated management of images/PDFs.",
                "Built an automated web scraper for real-time NSE/BSE stock data collection and brokerage analysis."
            ]
        },
        {
            id: 2,
            role: "Full Stack Development Intern",
            company: "Codify Infotech",
            period: "May 2024 - Jun 2024",
            logs: [
                "Orchestrated and maintained full-stack web applications using React.js, Next.js, and Node.js.",
                "Developed RESTful APIs, implemented authentication, and managed databases using Prisma ORM with PostgreSQL."
            ]
        }
    ],
    skills: [
        { category: "LANGUAGES", items: ["TypeScript", "JavaScript", "Java"] },
        { category: "FRONTEND", items: ["React.js", "Next.js", "Redux", "Zustand", "TailwindCSS"] },
        { category: "BACKEND", items: ["Node.js", "Express.js", "Prisma", "WebSockets", "Redis"] },
        { category: "DATABASE", items: ["PostgreSQL", "MongoDB"] },
        { category: "TOOLS", items: ["Docker", "Git", "GitHub"] }
    ],
    achievements: [
        "Winner, InnoTech 1.0 Hackathon (1st among 100+ participants)",
        "1st Runner-up, Breach 2025 - The Fintech Hackathon (PDEU)",
        "Winner, Solution Challenge 2024 (Spendwise)",
        "Top 7, OdooxCHARUSAT Hackathon (out of 75 teams, 250+ participants)"
    ]
};
