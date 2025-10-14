import { motion } from "framer-motion";
import { Code, Download, Gamepad2, Github, Mail, Zap } from "lucide-react";
import { Button } from "./ui/button";


const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Aditya_resume.pdf";
    link.download = "Aditya_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const floatingElements = [
    { icon: Code, delay: 0, x: -20, y: -30 },
    { icon: Zap, delay: 0.5, x: 30, y: -20 },
    { icon: Gamepad2, delay: 1, x: 220, y: -1 },
    { icon: Github, delay: 1.5, x: -910, y: -40 },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* --- Background gradients --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-slate-900 to-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-purple-400/10 to-pink-400/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      {/* --- Floating Blobs --- */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-sky-400/20 to-indigo-600/20 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ x: [0, -150, 0], y: [0, 100, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-pink-500/20 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -80, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-300/20 to-sky-500/20 rounded-full blur-3xl"
        ></motion.div>
      </div>

      {/* --- Floating Icons --- */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
            x: [element.x, element.x + 10, element.x],
            y: [element.y, element.y - 10, element.y],
          }}
          transition={{
            delay: element.delay,
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute hidden lg:block"
          style={{ left: `${20 + index * 20}%`, top: `${30 + index * 15}%` }}
        >
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <element.icon className="text-white/70" size={24} />
          </div>
        </motion.div>
      ))}

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100, damping: 10 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-sky-400 via-purple-500 to-pink-400 p-1"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-neutral-900 flex items-center justify-center relative overflow-hidden">
                  <motion.img
                    src="/aditya.jpg"
                    alt="Aditya"
                    className="w-full h-full object-cover rounded-full"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                  />
                  <motion.div
                    animate={{ x: [-100, 200] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-block text-lg text-sky-400 font-medium mb-4"
          >
            Hello, I'm
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400 bg-[length:200%_auto] bg-clip-text text-transparent"
              style={{ backgroundSize: "200% auto" }}
            >
              Aditya Kumar
            </motion.span>
          </motion.h1>

          {/* Subtitles */}
          <div className="mb-8">
            {["Aspiring Software Engineer", "Web Developer", "Tech Enthusiast"].map(
              (text, index) => (
                <motion.span
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.2 }}
                  className="inline-block text-xl md:text-2xl text-gray-300 mx-2"
                >
                  {text}
                  {index < 2 && <span className="text-sky-400 mx-2">|</span>}
                </motion.span>
              )
            )}
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Passionate about creating innovative solutions and building the
            future through code. Let's turn ideas into reality together.
          </motion.p>

          {/* Buttons */}
            {/* Animated Resume Button */}
            <Button onClick={downloadResume}>
              <Download size={20} />
              Download Resume
            </Button>

         {/* Contact Button */}
          <Button onClick={scrollToContact}>
            <Mail size={20} />
            Contact Me
          </Button>
      </div>
      </div>
    </section>
  );
};

export default Hero;
