import { Testimonials } from "@/components/ui/testimonials";

const testimonialsByLang = {
  ko: [
    {
      image:
        "/osh.png",
      text:
        "예배와 말씀을 통해 공동체가 함께 성장하는 모습을 보는 것이 큰 기쁨입니다.",
      name: "오승현 담임목사",
      username: "@alicejohnson",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text:
        "함께 예배하고 섬기며, 다음 세대를 세워가는 일에 마음을 모읍니다.",
      name: "최영례 목사",
      username: "@davidsmith",
    },
    {
      image: "https://i.imgur.com/kaDy9hV.jpeg",
      text:
        "사랑 안에서 서로를 격려하며, 주님의 마음을 배워가는 공동체입니다.",
      name: "최은진 사모",
      username: "@emmabrown",
    },
    {
      image: "https://i.imgur.com/cRwFxtE.png",
      text:
        "말씀과 기도로 세상을 섬기며, 그리스도의 향기를 전합니다.",
      name: "서지웅 목사",
      username: "@jameswilson",
    },
    {
      image: "https://i.imgur.com/TQIqsob.png",
      text:
        "청년들이 예수님을 닮아가도록 함께 걷는 시간이 감사합니다.",
      name: "오영민 전도사",
      username: "@sophialee",
    },
    {
      image: "https://i.imgur.com/3ROmJ0S.png",
      text:
        "작은 섬김이 모여 큰 은혜로 이어지는 공동체를 꿈꿉니다.",
      name: "신승연 간사",
      username: "@michaeldavis",
    },
  ],
  en: [
    {
      image:
        "/osh.png",
      text:
        "It is a great joy to see our community grow together through worship and the Word.",
      name: "오승현 담임목사",
      username: "@alicejohnson",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text:
        "As we worship and serve together, we unite our hearts in raising up the next generation.",
      name: "최영례 목사",
      username: "@davidsmith",
    },
    {
      image: "https://i.imgur.com/kaDy9hV.jpeg",
      text:
        "We are a community that encourages one another in love as we learn the heart of the Lord together.",
      name: "최은진 사모",
      username: "@emmabrown",
    },
    {
      image: "https://i.imgur.com/cRwFxtE.png",
      text:
        "We serve the world through the Word and prayer, spreading the fragrance of Christ.",
      name: "서지웅 목사",
      username: "@jameswilson",
    },
    {
      image: "https://i.imgur.com/TQIqsob.png",
      text:
        "I am grateful for this journey we walk together, as our young adults grow to be more like Jesus.",
      name: "오영민 전도사",
      username: "@sophialee",
    },
    {
      image: "https://i.imgur.com/3ROmJ0S.png",
      text:
        "We dream of a community where small acts of service come together and overflow into great grace.",
      name: "신승연 간사",
      username: "@michaeldavis",
    },
  ],
};

function TestimonialsDemo({ lang = "ko" }) {
  const testimonials = testimonialsByLang[lang] ?? testimonialsByLang.ko;
  const title =
    lang === "en" ? "Meet Our Team" : "교역자 소개";
  const description =
    lang === "en"
      ? "A brief introduction to the people serving our community."
      : "함께 섬기는 교역자와 사역자를 소개합니다.";
  return (
    <div className="container py-10">
      <Testimonials
        testimonials={testimonials}
        title={title}
        description={description}
      />
    </div>
  );
}

export { TestimonialsDemo }
