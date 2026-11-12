export const config = {
  developer: {
    name: "Samarth",
    fullName: "Samarth Bhandegaonkar",
    title: "AIML Lead & Computer Science Student",
    description:
      "Computer Science Engineering student specializing in AIML at IIIT Nagpur. I lead student AI/ML initiatives, explore applied machine learning, and build full-stack systems that solve practical problems.",
  },
  social: {
    github: "Samarth101",
    email: "bhandegaonkarsamarth2@gmail.com",
    location: "Nagpur, India",
  },
  about: {
    title: "About Me",
    description:
      "I’m Samarth, a Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning at IIIT Nagpur. I lead AIML initiatives at the Elevate Development Club, mentor student members, and have researched cloud auto-scaling. My projects span multimodal search, low-light image enhancement, and AI-assisted lost-and-found matching.",
  },
  experiences: [
    {
      position: "AIML Lead",
      company: "Elevate Development Club, IIIT Nagpur",
      period: "July 2025 - Present",
      location: "Nagpur, India",
      description:
        "Lead AI and machine learning initiatives for a 20+ member technical club, mentor 10+ students on deep learning, computer vision, and NLP projects, and coordinate hands-on workshops.",
      responsibilities: [
        "Lead AI/ML initiatives for a technical club of 20+ members",
        "Mentor 10+ student members on deep learning, computer vision, and NLP",
        "Coordinate and deliver two hands-on technical workshops",
      ],
      technologies: ["Deep Learning", "Computer Vision", "NLP", "Mentoring"],
    },
    {
      position: "Undergraduate Researcher",
      company: "Indian Institute of Information Technology, Nagpur",
      period: "January 2026 - May 2026",
      location: "Nagpur, India",
      description:
        "Researched auto-scaling techniques in cloud computing by analyzing five primary research papers, synthesizing resource-allocation strategies, and presenting findings in an IEEE-formatted technical document.",
      responsibilities: [
        "Reviewed and synthesized five primary research papers",
        "Authored an IEEE-formatted technical document",
        "Presented conceptual findings and system reasoning to an academic panel",
      ],
      technologies: ["Cloud Computing", "Auto-Scaling", "Research", "IEEE Writing"],
    },
    {
      position: "B.Tech, Computer Science Engineering (AIML)",
      company: "Indian Institute of Information Technology, Nagpur",
      period: "August 2024 - June 2028",
      location: "Nagpur, India",
      description:
        "Pursuing a Bachelor of Technology in Computer Science Engineering with a specialization in Artificial Intelligence and Machine Learning.",
      responsibilities: [],
      technologies: ["Computer Science", "Artificial Intelligence", "Machine Learning"],
    },
  ],
  achievements: [
    {
      title: "Hackathon Runner-Up",
      event: "GHRCOE Nagpur",
      description:
        "Won second place with FindHUB, an AI-driven microservices platform that matches lost campus items using language models and vector embeddings.",
    },
    {
      title: "Hackathon Runner-Up",
      event: "Analytica, IIIT Nagpur",
      description:
        "Won second place after designing and training a custom PyTorch CNN from scratch, achieving 85% validation accuracy on medical imaging.",
    },
    {
      title: "Competitive Programming",
      event: "LeetCode · CodeChef · Codeforces",
      description:
        "LeetCode rating: 1743 · CodeChef: 3-star (1648) · Codeforces: Pupil.",
    },
  ],
  projects: [
    {
      id: 1,
      title: "Multimodal Semantic Search Engine",
      category: "AI / Semantic Search",
      technologies: "Python, FastAPI, FAISS, CLIP, React, MongoDB, SentenceTransformers",
      image: "/images/MultimodalSearch.svg",
      description:
        "Built a text- and image-based semantic search system over 1.4M+ e-commerce products using CLIP and SentenceTransformers embeddings. The resume reports sub-100 ms query latency, with a FastAPI backend and React/Vite frontend.",
      link: "",
    },
    {
      id: 2,
      title: "Night OWL",
      category: "Computer Vision / Image Enhancement",
      technologies: "Python, YOLO, GANs, Computer Vision",
      image: "/images/NightOwl.svg",
      description:
        "Engineered a low-light image enhancement pipeline that uses a GAN to denoise, reconstruct, and illuminate images before YOLO object detection, improving downstream feature extraction and detection in low-visibility conditions.",
      link: "https://github.com/Samarth101/Night_Owl_Project",
    },
    {
      id: 3,
      title: "FindHUB",
      category: "AI / Lost-and-Found Matching",
      technologies: "React, Node.js, Python, PyTorch, Gemini API, MongoDB, CLIP, SpaCy, Socket.io",
      image: "/images/FindHUB.svg",
      description:
        "Built a distributed lost-and-found matching platform that compares text and image submissions with CLIP embeddings and NLP. Added LLM-generated verification challenges and event-driven notifications.",
      link: "https://github.com/Samarth101/FindHUB",
    },
  ],
  contact: {
    email: "bhandegaonkarsamarth2@gmail.com",
    phone: "+91 75586 21265",
    phoneLink: "+917558621265",
    github: "https://github.com/Samarth101",
    linkedin: "https://www.linkedin.com/in/samarth-bhandegaonkar-aba116317/",
  },
  skills: {
    develop: {
      title: "AI / ML",
      description: "Applied machine learning and computer vision",
      details:
        "Working with deep learning, image enhancement, object detection, and semantic search. My project experience includes PyTorch, YOLO, GANs, CLIP, and vector retrieval.",
      tools: ["PyTorch", "YOLO", "GANs", "OpenCV", "FAISS", "CLIP", "Pandas", "NumPy", "Scikit-learn"],
    },
    design: {
      title: "FULL-STACK",
      description: "Web applications and distributed systems",
      details:
        "Building complete applications across React interfaces, Node.js and FastAPI services, databases, and cloud tooling.",
      tools: ["React", "Node.js", "Python", "FastAPI", "Flask", "MongoDB", "BigQuery", "GCP", "Vertex AI", "Git"],
    },
  },
};
