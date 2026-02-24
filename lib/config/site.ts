export const CONFIG = {
    name: "Ayush Kalathiya",
    role: "Systems Architect / Full Stack Developer",
    status: "ONLINE",
    uptime: "99.99%",
    location: "Surat, India",
    email: "ayushkalathiya50@gmail.com",
    socials: {
        github: "https://github.com/ayushkalathiya",
        linkedin: "https://www.linkedin.com/in/ayush-kalathiya/",
        twitter: "https://twitter.com/ayush_k",
    },
    projects: [
        {
            id: "studywise",
            title: "StudyWise",
            description: "AI-powered educational platform designed to streamline student learning workflows through intelligent resource management.",
            tech: ["Next.js", "PostgreSQL", "OpenAI", "Tailwind"],
            live: "#",
            repo: "#",
            status: "DEPLOYED",
        },
        {
            id: "spendwise",
            title: "Spendwise",
            description: "Financial tracking system with automated expense categorization and predictive budget analysis for personal wealth management.",
            tech: ["React Native", "Firebase", "D3.js", "Node.js"],
            live: "#",
            repo: "#",
            status: "STABLE",
        },
        {
            id: "graphiq",
            title: "GraphIQ",
            description: "Vector-based visualization engine for complex data structures, providing architectural insights into large-scale system clusters.",
            tech: ["TypeScript", "Three.js", "WebAssembly", "Rust"],
            live: "#",
            repo: "#",
            status: "PRODUCTION",
        }
    ],
    experience: [
        {
            id: 1,
            role: "Lead Systems Architect",
            company: "TechNexus Solutions",
            period: "2023 - PRESENT",
            logs: [
                "Architected scalable microservices architecture using Go and Kubernetes.",
                "Reduced system latency by 45% through aggressive caching and DB optimization.",
                "Implemented end-to-end encryption for sensitive data clusters."
            ]
        },
        {
            id: 2,
            role: "Full Stack Developer",
            company: "InnovaSoft",
            period: "2021 - 2023",
            logs: [
                "Developed core UI components using Next.js and Framer Motion.",
                "Integrated third-party APIs for real-time data synchronization.",
                "Mentored junior developers on best practices in system design."
            ]
        }
    ],
    skills: [
        { category: "CORE_SYSTEMS", items: ["React", "Next.js", "TypeScript", "Node.js"] },
        { category: "CLOUD_INFRA", items: ["AWS", "Docker", "Kubernetes", "Terraform"] },
        { category: "DATABASES", items: ["PostgreSQL", "Redis", "MongoDB", "Elasticsearch"] },
        { category: "TOOLS_PROTOCOLS", items: ["Git", "gRPC", "GraphQL", "WebSockets"] }
    ]
};
