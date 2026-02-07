import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Container from "./components/Container.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Staff from "./pages/Staff.jsx";
import News from "./pages/News.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const [lang, setLang] = useState("ko");
  const toggleLang = () =>
    setLang((prev) => (prev === "ko" ? "en" : "ko"));

  return (
    <>
      <Header lang={lang} onToggleLang={toggleLang} />
      <Routes>
        <Route path="/" element={<Container lang={lang} />} />
        <Route path="/about" element={<About lang={lang} />} />
        <Route path="/staff" element={<Staff lang={lang} />} />
        <Route path="/news" element={<News lang={lang} />} />
        <Route path="/contact" element={<Contact lang={lang} />} />
      </Routes>
      <Footer lang={lang} />
    </>
  );
}
