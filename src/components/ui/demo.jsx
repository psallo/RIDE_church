import { LayeredText } from "@/components/ui/layered-test";
import { Hero } from "@/components/ui/animated-hero";
import Component from "@/components/ui/text-marque";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicText } from "@/components/ui/magic-text";
import ColorChangeCards from "@/components/ui/color-change-card";
import { InView } from "@/components/ui/in-view";
import { motion } from "framer-motion";
import { HoverEffect } from "@/components/ui/hover-effect";


function DemoOne() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <LayeredText />
    </div>
  );
}

function HeroDemo() {
  return (
    <div className="block">
      <Hero />
    </div>
  );
}

function ComponentDemo() {
  return (
    <div className="h-[300px] grid place-content-center bg-[#1f1f1f]">
      <Component
        delay={500}
        baseVelocity={-3}
        className="font-bold tracking-[-0.07em] leading-[90%] text-white"
      >
        Restoration Intercession Discipleship Evangelism
      </Component>

      <Component
        delay={500}
        baseVelocity={3}
        className="font-bold tracking-[-0.07em] leading-[90%] text-white"
      >
        Restoration Intercession Discipleship Evangelism
      </Component>
    </div>
  );
}

function BlurFadeTextDemo({ lang = "ko" }) {
  const subtitle = lang === "en" ? "Ride Church" : "라이드처치";
  return (
    <section id="header">
      <BlurFade delay={0.25} inView>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
            RIDE CHURCH
          </h2>
      </BlurFade>
      <BlurFade delay={0.25 * 2} inView>
        <span className="text-xl text-pretty tracking-tighter sm:text-3xl xl:text-4xl/none">
          {subtitle}
        </span>
      </BlurFade>
    </section>
  )
}

const Demo = ({ lang = "ko" }) => {
  const verses = {
    ko: [
      "그 정사와 평강의 더함이 무궁하며 또 다윗의 왕좌와 그의 나라에 군림하여 그 나라를 굳게 세우고 지금 이후로 영원히 정의와 공의로 그것을 보존하실 것이라 만군의 여호와의 열심이 이를 이루시리라.\n(이사야 9:7)",
      "왕이여 이것이 왕에게 징조가 되리니 올해는, 스스로 난 것을 먹을 것이요 둘째 해에는, 또 거기에서 난 것을 먹을 것이요 셋째 해에는, 심고 거두며 포도나무를 심고 그 열매를 먹을 것이니이다 유다 족속 중에 피하여 남은 자는 다시 아래로 뿌리를 박고 위로 열매를 맺으리니 이는 남은 자가 예루살렘에서 나오며 피하는 자가 시온 산에서 나올 것임이라 만군의 여호와의 열심이 이를 이루시리이다.\n(이사야 37:30~32)",
      "네 장막터를 넓히며 네 처소의 휘장을 아끼지 말고 널리 펴되 너의 줄을 길게 하며 너의 말뚝을 견고히 할지어다 이는 네가 좌우로 퍼지며 네 자손은 열방을 얻으며 황폐한 성읍들을 사람 살 곳이 되게 할 것임이라.\n(이사야 54:2~3)",
    ],
    en: [
      "The increase of His government and peace will have no end. He will reign on David's throne and over his kingdom, establishing and upholding it with justice and righteousness from that time on and forever. The zeal of the LORD Almighty will accomplish this.\n(Isaiah 9:7)",
      "This will be the sign for you: This year you will eat what grows by itself, and in the second year what springs from that. But in the third year sow and reap, plant vineyards and eat their fruit. Once more a remnant of the kingdom of Judah will take root below and bear fruit above. For out of Jerusalem will come a remnant, and out of Mount Zion a band of survivors. The zeal of the LORD Almighty will accomplish this.\n(Isaiah 37:30–32)",
      "Enlarge the place of your tent, stretch your tent curtains wide, do not hold back; lengthen your cords, strengthen your stakes. For you will spread out to the right and to the left; your descendants will dispossess nations and settle in their desolate cities.\n(Isaiah 54:2–3)",
    ],
  };
  const texts = verses[lang] ?? verses.ko;
  return (
    <>
      <MagicText
        text={texts[0]}
        containerClassName="min-h-[50vh] flex items-center justify-center pt-2 pb-4"
      />
      <MagicText
        text={texts[1]}
        containerClassName="min-h-[50vh] flex items-center justify-center pt-2 pb-4"
      />
      <MagicText
        text={texts[2]}
        containerClassName="min-h-[50vh] flex items-center justify-center pt-2 pb-4"
      />
    </>
  );
};

function DemoCard({ lang = "ko" }) {
  return <ColorChangeCards lang={lang} />;
}

function InViewBasic({ lang = "ko" }) {
  const copy =
    lang === "en"
      ? {
          lead:
            "Ride Church is a community of worship, prayer and the Word, the Holy Spirit, and mission.",
          body:
            "We hope all believers live as disciples of Jesus, and we dream of worshiping and growing together across generations. Through intimacy with Jesus, we seek to become His disciples and a church that embraces the nations, with Jesus as Lord. Through worship and Bible study, we strive to be disciples and stay awake, preparing for the return of Jesus Christ.",
        }
      : {
          lead: "라이드처치는 예배, 기도와 말씀, 성령, 선교 공동체입니다.",
          body:
            "모든 성도들이 예수님의 제자로 살아가기를 기대하며, 다양한 세대가 함께 예배하며, 함께 성장하기를 꿈꿔 봅니다. 예수님과의 친밀함을 통해서 예수님의 제자가 되는 교회, 열방을 품는 교회로 예수님이 주인 되시는 교회가 되고자합니다. 예배와 성경공부를 통해 제자 되기를 힘쓰며 예수 그리스도의 다시 오심을 깨어서 준비하고, 기다리는 교회가 되고자 합니다.",
        };

  return (
    <section className="w-full">
      <div className="py-12 text-center text-sm">Scroll down</div>

      <div className="flex min-h-[60vh] items-end justify-center px-4 pb-24">
        <InView
          variants={{
            hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          viewOptions={{ margin: "0px 0px -200px 0px" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="max-w-[36rem] text-left">
            <div className="flex justify-center pb-4">
              <img src="/ride.png" alt="Ride" className="w-[150px] h-auto" />
            </div>
            <p className="text-lg">
              <strong className="font-medium">{copy.lead}</strong>{" "}
              {copy.body}
            </p>
          </div>
        </InView>
      </div>
      <div className="h-[20vh]" aria-hidden="true" />
    </section>
  );
}


function CardHoverEffectDemo({ lang = "ko" }) {
  const projects =
    lang === "en"
      ? [
          {
            title: "Sunday Morning Worship",
            description: "Sundays 11:00 AM",
          },
          {
            title: "Sunday Children's Worship",
            description: "Sundays 11:00 AM",
          },
          {
            title: "Sunday Youth Worship",
            description: "Sundays 11:00 AM",
          },
          {
            title: "Wednesday Online Worship",
            description: "Wednesdays 8:00 PM",
          },
          {
            title: "Friday Evening Worship",
            description: "Fridays 8:00 PM",
          },
        ]
      : [
          {
            title: "주일 오전 예배",
            description: "주일 오전 11시",
          },
          {
            title: "주일 어린이 예배",
            description: "주일 오전 11시",
          },
          {
            title: "주일 청소년 예배",
            description: "주일 오전 11시",
          },
          {
            title: "수요 온라인 예배",
            description: "수요일 저녁 8시",
          },
          {
            title: "금요 저녁 예배",
            description: "금요일 저녁 8시",
          },
        ];

  return (
    <div className="mx-auto max-w-5xl px-8 bg-[#1f1f1f]">
      <HoverEffect items={projects} />
    </div>
  );
}



export { DemoOne, HeroDemo, ComponentDemo, BlurFadeTextDemo, Demo, DemoCard, InViewBasic, CardHoverEffectDemo };
