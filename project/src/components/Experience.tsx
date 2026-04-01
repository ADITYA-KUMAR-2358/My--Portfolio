// ─── Experience.tsx ───────────────────────────────────────────────
import { Timeline } from "./ui/timeline";

const Experience = () => {
  const data = [
    {
      year: "2020",
      tag: "Secondary School",
      title: "ICSE Class X · St. Paul's School, Gorakhpur",
      bullets: [
        "Completed ICSE with distinction in Science & Computer Applications",
        "Developed early curiosity for coding, algorithms, and astrophysics",
        "First hands-on programs in BASIC and intro to web fundamentals",
      ],
    },
    {
      year: "2021–22",
      tag: "Higher Secondary",
      title: "ISC Class XII · St. Paul's School, Gorakhpur",
      bullets: [
        "Studied Physics, Chemistry, Mathematics & Computer Science (ISC board)",
        "Deepened programming knowledge — data structures, Python basics",
        "Began exploring AI concepts and decided to pursue CSE at university level",
      ],
    },
    {
      year: "2023",
      tag: "University · Year 1",
      title: "B.Tech CSE · Pimpri Chinchwad University, Pune",
      bullets: [
        "Enrolled in B.Tech Computer Science Engineering (CGPA: 8.65 / 10)",
        "Joined ACM Student Chapter — became Community Project Leader",
        "Kicked off competitive programming on Codeforces & LeetCode",
      ],
    },
    {
      year: "2024",
      tag: "University · Year 2",
      title: "Projects, Courses & Open Source",
      bullets: [
        "Built WaveBuzz — social media authenticity & proximity detection app",
        "Created an IoT gesture-controlled LED/motor system using ESP32",
        "Completed AWS Cloud Architect & Full-Stack Development (HTML/CSS/JS/Java) courses",
        "Explored AI/ML fundamentals and contributed to open-source hackathons",
      ],
    },
    {
      year: "2025",
      tag: "University · Year 3",
      title: "AI Projects, Leadership & Placements",
      bullets: [
        "Built ASK M.I.R.A.G.E — fully offline RAG chatbot using LangChain + LLaMA + FAISS",
        "Appointed Editor-in-Chief of the college magazine",
        "Leading open-source and freelancing projects in AI and full-stack web development",
        "Actively preparing for internships and placements — dream destination: Google",
      ],
    },
  ];

  return (
    <section id="experience" className="relative">
      <Timeline data={data} />
    </section>
  );
};

export default Experience;