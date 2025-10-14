import { Timeline } from "./ui/timeline";

const Experience = () => {
  const data = [
    {
      title: "2020",
      content: (
        <p className="text-neutral-600 dark:text-neutral-300">
          Completed <b>ICSE (Class 10)</b> from <b>St. Paul’s School, Gorakhpur</b> 🏫  
          Excelled in Science and Computer Applications 💻  
          Developed early curiosity for coding and astrophysics ✨
        </p>
      ),
    },
    {
      title: "2021",
      content: (
        <p className="text-neutral-600 dark:text-neutral-300">
          Continued senior secondary education at <b>St. Paul’s School (ISC)</b> 📚  
          Focused on <b>Physics, Chemistry, Mathematics, and Computer Science</b> ⚙️  
          Began exploring programming concepts and AI basics 🤖
        </p>
      ),
    },
    {
      title: "2022",
      content: (
        <p className="text-neutral-600 dark:text-neutral-300">
          Completed <b>ISC (Class 12)</b> from St. Paul’s School, Gorakhpur 🎓  
          Started preparing for engineering entrance exams 🧠  
          Decided to pursue a career in <b>Computer Science Engineering</b> 💻
        </p>
      ),
    },
    {
      title: "2023",
      content: (
        <p className="text-neutral-600 dark:text-neutral-300">
          Started Engineering Journey at <b>Pimpri Chinchwad University</b> 🎓  
          Pursuing <b>B.Tech in Computer Science Engineering</b> 💻  
          Joined <b>ACM Student Chapter</b> and became <b>Community Project Leader</b> 🚀  
          Began working on college-level AI and tech innovation projects 🤩
        </p>
      ),
    },
    {
      title: "2024",
      content: (
        <p className="text-neutral-600 dark:text-neutral-300">
          Built impactful projects like <b>WaveBuzz</b> – a social media authenticity and proximity detection app 🌐  
          Created an <b>IoT gesture-controlled LED and motor system</b> using ESP32 ⚡  
          Completed <b>AWS Cloud Architect</b> and <b>Full-Stack Development (HTML, CSS, Java, JavaScript)</b> courses ✅  
          Explored <b>AI & ML fundamentals</b> and contributed to open-source projects 🧠  
          Participated in community hackathons and college-level innovation challenges 🚀
        </p>
      ),
    },
    {
      title: "2025",
      content: (
        <p className="text-neutral-600 dark:text-neutral-300">
          Developing an <b>AI-powered PDF Chatbot</b> using LangChain and LLMs 🤖  
          Appointed as <b>Editor-in-Chief</b> of the college magazine to showcase student achievements 📝  
          Leading <b>open-source and freelancing projects</b> in AI and web development 🌍  
          Enhancing <b>WaveBuzz</b> with fake account detection and real-time proximity analysis 🔍  
          Preparing for <b>internships and MNC placements</b> with Google as the dream destination 💫
        </p>
      ),
    },
  ];

  return (
    <section id="experience" className="relative">
      <Timeline data={data} />
    </section>
  );
};

export default Experience;
