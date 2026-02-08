import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Container from "./components/Container.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Staff from "./pages/Staff.jsx";
import News from "./pages/News.jsx";
import AdminBoard from "./pages/AdminBoard.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "ko";
    try {
      const stored = localStorage.getItem("ride_lang");
      return stored === "en" || stored === "ko" ? stored : "ko";
    } catch {
      return "ko";
    }
  });
  const toggleLang = () =>
    setLang((prev) => (prev === "ko" ? "en" : "ko"));

  useEffect(() => {
    try {
      localStorage.setItem("ride_lang", lang);
    } catch {}
  }, [lang]);

  return (
    <>
      <Header lang={lang} onToggleLang={toggleLang} />
      <Routes>
        <Route path="/" element={<Container lang={lang} />} />
        <Route path="/about" element={<About lang={lang} />} />
        <Route path="/staff" element={<Staff lang={lang} />} />
        <Route path="/news" element={<News lang={lang} />} />
        <Route path="/admin" element={<AdminBoard lang={lang} />} />
        <Route path="/contact" element={<Contact lang={lang} />} />
      </Routes>
      <Footer lang={lang} />
    </>
  );
}
