import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import imgAboutMe from "../imports/about_me-1.jpg";
import imgStratpoint from "../imports/starpoint_pic.jpg";
import imgStarSchema from "../imports/starschema.png";
import imgStarsChema from "../imports/stars_chema.png";
import imgOJTPicture from "../imports/OJT_picture.png";
import imgOJTPic from "../imports/OJT_pic.jpg";
import imgReflectionGroup from "../imports/reflection_group_photo.jpg";

export default function App() {
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const stratpointRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const deliverablesRef = useRef<HTMLDivElement>(null);
  const growthRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const csPracticeRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState("aboutme");

  const { scrollYProgress } = useScroll();

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 0.7, 0.4, 0.2]);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["#0f172a", "#1e1b4b", "#312e81", "#4c1d95", "#581c87", "#701a75"]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Pure black for Deliverables section and below
    let value;
    if (latest < 0.35) {
      value = 255;
    } else {
      value = 0;
    }
    document.documentElement.style.setProperty("--page-text-color", `rgb(${value}, ${value}, ${value})`);
  });

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>, section: string) => {
    setActiveSection(section);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const navItems = [
    { label: "About Me", ref: aboutMeRef, id: "aboutme" },
    { label: "Stratpoint", ref: stratpointRef, id: "stratpoint" },
    { label: "The Work", ref: workRef, id: "work" },
    { label: "Deliverables", ref: deliverablesRef, id: "deliverables" },
    { label: "Growth", ref: growthRef, id: "growth" },
    { label: "Tech Stack", ref: techStackRef, id: "techstack" },
    { label: "CS in Practice", ref: csPracticeRef, id: "cspractice" },
    { label: "Reflection", ref: reflectionRef, id: "reflection" },
  ];

  return (
    <div className="relative">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-xl">MCVA</h3>
            <div className="flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.ref, item.id)}
                  className={`text-sm transition-colors ${
                    activeSection === item.id
                      ? "text-white font-semibold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.div
        style={{ backgroundColor, opacity: backgroundOpacity }}
        className="fixed inset-0 -z-10"
      />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 300]) }}
          className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
          className="absolute top-1/3 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 400]) }}
          className="absolute bottom-20 left-1/4 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Add data-scroll-text to wrap all scroll-sensitive text */}
      <div data-scroll-text>
      <div ref={aboutMeRef} className="min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1 className="text-6xl font-bold text-white mb-6">About Me</h1>
            <h3 className="text-2xl font-semibold text-white/90 mb-2">Maria Consuelo Abalos Jr</h3>
            <p className="text-lg text-white/80 mb-4">Bachelor of Science in Computer Science</p>
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              I am a BS Computer Science student with a deep interest in data engineering and analytics.
              My academic journey has given me a strong foundation in programming, database systems, algorithms,
              and software development, which are competencies I carried into and actively expanded during my
              on-the-job training at Stratpoint Technologies, Inc.
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              Looking forward, I aspire to build a career in data engineering, with a focus on designing
              scalable data infrastructure that helps organizations make smarter and more reliable decisions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aspect-[4/3] bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20"
          >
            <ImageWithFallback
              src={imgAboutMe}
              alt="Maria Consuelo Abalos Jr"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      <div ref={stratpointRef} className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">Stratpoint Technologies</h2>
            <p className="text-lg text-white/80 mb-3">
              <strong>Industry:</strong> IT — Software Development, Cloud, Data & AI<br />
              <strong>Founded:</strong> 2005<br />
              <strong>My Role:</strong> Data Intern (Data Engineering & Analytics)
            </p>
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              Stratpoint Technologies was founded in 2005 as a venue to showcase Filipino engineering talent
              on the world stage. It has grown into one of the Philippines' most recognized technology companies,
              delivering enterprise-grade solutions globally and specializing in agile software development, cloud, data, and AI.
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              I was assigned to the Data Engineering and Analytics department as part of a cohort of eight interns,
              working on projects that covered the full data lifecycle from ingestion to transformation and business intelligence.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aspect-[4/3] bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20"
          >
            <ImageWithFallback
              src={imgStratpoint}
              alt="Stratpoint Technologies"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      <div ref={workRef} className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aspect-[4/3] bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 order-2 md:order-1"
          >
            <ImageWithFallback
              src={imgStarSchema}
              alt="The Work"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h2 className="text-5xl font-bold text-white mb-6">The Work</h2>
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              My OJT training was built around two core projects: the <strong>Movie Analytics Pipeline</strong> and
              the <strong>E-Commerce Mini-Pipeline</strong>. Both were designed to give me practical, end-to-end
              experience in how professional data teams design and operate real pipelines.
            </p>
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              The Movie Analytics Pipeline required me to ingest raw, messy movie data from multiple sources, clean
              and transform it through a three-layer medallion architecture (Bronze, Silver, and Gold), and deliver
              it as an interactive Power BI dashboard.
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              My responsibilities spanned the full lifecycle: designing the architecture, writing ingestion and
              transformation code, setting up orchestration, running automated tests, and documenting everything.
            </p>
          </motion.div>
        </div>
      </div>

      <div ref={deliverablesRef} className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center text-justify" style={{ color: '#231226' }}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">Deliverables</h2>
            <ul className="text-lg text-white/90 leading-relaxed space-y-3">
              <li><strong>End-to-End Movie Analytics Data Pipeline</strong> — A fully functional, Dockerized pipeline
              built on medallion architecture with 35 passing automated dbt tests.</li>
              <li><strong>Power BI Analytics Dashboard</strong> — An interactive dashboard with dynamic slicers,
              genre performance metrics, and custom reliability scoring.</li>
              <li><strong>E-Commerce Mini-Pipeline</strong> — A secondary ETL pipeline covering extraction,
              transformation, loading, and Airflow orchestration.</li>
              <li><strong>Technical Documentation</strong> — Complete documentation for every tool and component,
              hosted on GitHub.</li>
              <li><strong>Capstone Presentation</strong> — Formal presentation delivered to evaluators and supervisor
              with live Q&A.</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aspect-[4/3] bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20"
          >
            <ImageWithFallback
              src={imgStarsChema}
              alt="Deliverables"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      <div ref={growthRef} className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center text-justify" style={{ color: '#231226' }}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aspect-[4/3] bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 order-2 md:order-1"
          >
            <ImageWithFallback
              src={imgOJTPicture}
              alt="Growth"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h2 className="text-5xl font-bold text-white mb-6">Growth</h2>
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              My OJT at Stratpoint was the most technically demanding and professionally formative experience of my
              time as a student. It pushed me well past the edge of what coursework had prepared me for.
            </p>
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              I gained hands-on experience with the full data engineering lifecycle and developed a much stronger
              understanding of data quality: how bad data enters a system and how to design systems that catch and
              handle it before it causes damage downstream.
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              The growth I'm most proud of: developing a rhythm for tackling unfamiliar problems. That mindset shift,
              from feeling stopped by difficulty to feeling challenged by it, is something I'll carry through my entire career.
            </p>
          </motion.div>
        </div>
      </div>

      <div ref={techStackRef} className="min-h-screen flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl w-full text-justify"
          style={{ color: '#231226' }}
        >
          <h2 className="text-5xl font-bold text-white mb-8 text-center">Tech Stack</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-white mb-4">Data Pipeline & Orchestration</h3>
              <ul className="text-lg text-white/90 space-y-2">
                <li>• Apache Airflow</li>
                <li>• Docker</li>
                <li>• WSL2 / Ubuntu</li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-white mb-4">Data Storage & Querying</h3>
              <ul className="text-lg text-white/90 space-y-2">
                <li>• PostgreSQL</li>
                <li>• SQL</li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-white mb-4">Data Processing</h3>
              <ul className="text-lg text-white/90 space-y-2">
                <li>• Python</li>
                <li>• pandas</li>
                <li>• PySpark</li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-white mb-4">Transformation & Analytics</h3>
              <ul className="text-lg text-white/90 space-y-2">
                <li>• dbt (data build tool)</li>
                <li>• Power BI</li>
                <li>• GitHub</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <div ref={csPracticeRef} className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center text-justify" style={{ color: '#231226' }}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aspect-[4/3] bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 order-2 md:order-1"
          >
            <ImageWithFallback
              src={imgOJTPic}
              alt="CS in Practice"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h2 className="text-5xl font-bold text-white mb-6">CS in Practice</h2>
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              My Computer Science background was actively applied throughout this OJT to make better technical decisions.
            </p>
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              My coursework in database management gave me the judgment to design the Gold layer as a proper star schema,
              with correct handling of many-to-many relationships. Making the wrong design choice would have meant
              incorrect joins and misleading analytics.
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              I applied software engineering principles using dataclasses with built-in validation, and built defensive
              guards against malformed data using deduplication logic and quarantine mechanisms — features that came
              from understanding why data systems fail.
            </p>
          </motion.div>
        </div>
      </div>

      <div ref={reflectionRef} className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center text-justify" style={{ color: '#231226' }}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aspect-[4/3] bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 order-2 md:order-1"
          >
            <ImageWithFallback
              src={imgReflectionGroup}
              alt="Reflection Group Photo"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 text-justify"
          >
            <h2 className="text-6xl font-bold text-white mb-6">Reflection</h2>
            <p className="text-xl text-white/90 leading-relaxed mb-6">
              Before my OJT, I understood data engineering conceptually. I had never actually built a system that moved
              real, messy data through structured transformations and surfaced it as something a decision-maker could act on.
              That is what this OJT gave me.
            </p>
            <p className="text-xl text-white/90 leading-relaxed mb-6">
              The most technically valuable thing I learned was the difference between writing code that works and engineering
              a pipeline that holds. Data engineering is fundamentally about defense — building systems that fail gracefully,
              catch problems early, and give people downstream confidence that what they're looking at is actually true.
            </p>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              The Medallion Architecture became more than a pattern I followed. It became a way of thinking that I expect
              to carry into every project going forward.
            </p>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/70 text-xl font-semibold"
            >
              Data engineering is the career I want to build.<br />
            </motion.div>
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  );
}