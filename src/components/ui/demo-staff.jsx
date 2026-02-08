import { Testimonials } from "@/components/ui/testimonials";

const testimonials = [
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text:
      "I'm blown away by the versatility of the components in this library. They make UI development a breeze!",
    name: "오승현 담임목사",
    username: "@alicejohnson",
    // social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text:
      "Using this component library has significantly sped up our development process. The quality and ease of integration are remarkable!",
    name: "최영례 목사",
    username: "@davidsmith",
    // social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "https://i.imgur.com/kaDy9hV.jpeg",
    text:
      "The components in this library are not just well-designed but also highly customizable. It's a developer's dream!",
    name: "최은진 사모",
    username: "@emmabrown",
    // social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "https://i.imgur.com/cRwFxtE.png",
    text:
      "I love how intuitive and well-documented this component library is. It has significantly improved our UI consistency across projects.",
    name: "서지웅 목사",
    username: "@jameswilson",
    // social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "https://i.imgur.com/TQIqsob.png",
    text:
      "Implementing this component library was a game-changer for our team. It has elevated our product's UI to a whole new level!",
    name: "오영민 전도사",
    username: "@sophialee",
    // social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image: "https://i.imgur.com/3ROmJ0S.png",
    text:
      "Using this library has been a game-changer for our product development.",
    name: "신승연 간사",
    username: "@michaeldavis",
    // social: "https://i.imgur.com/VRtqhGC.png",
  },
];

function TestimonialsDemo() {
  return (
    <div className="container py-10">
      <Testimonials testimonials={testimonials} />
    </div>
  );
}

export { TestimonialsDemo }