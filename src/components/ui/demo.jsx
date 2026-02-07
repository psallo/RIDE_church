import { LayeredText } from "@/components/ui/layered-test";
import { Hero } from "@/components/ui/animated-hero";
import Component from "@/components/ui/text-marque";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicText } from "@/components/ui/magic-text";


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
        ・ Restoration ・ Intercession ・ Discipleship ・ Evangelism
      </Component>

      <Component
        delay={500}
        baseVelocity={3}
        className="font-bold tracking-[-0.07em] leading-[90%] text-white"
      >
        ・ Restoration ・ Intercession ・ Discipleship ・ Evangelism
      </Component>
    </div>
  );
}

function BlurFadeTextDemo() {
  return (
    <section id="header">
      <BlurFade delay={0.25} inView>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
            RIDE CHURCH
          </h2>
      </BlurFade>
      <BlurFade delay={0.25 * 2} inView>
        <span className="text-xl text-pretty tracking-tighter sm:text-3xl xl:text-4xl/none">
          라이드처치
        </span>
      </BlurFade>
    </section>
  )
}

const Demo = () => {
  return (
    <>
      <MagicText
        text="그 정사와 평강의 더함이 무궁하며 또 다윗의 왕좌와 그의 나라에 군림하여 그 나라를 굳게 세우고 지금 이후로 영원히 정의와 공의로 그것을 보존하실 것이라 만군의 여호와의 열심이 이를 이루시리라. (이사야 9:7)"
        containerClassName="min-h-[50vh] flex items-center justify-center pt-2 pb-4"
      />
      <MagicText
        text="왕이여 이것이 왕에게 징조가 되리니 올해는, 스스로 난 것을 먹을 것이요 둘째 해에는, 또 거기에서 난 것을 먹을 것이요 셋째 해에는, 심고 거두며 포도나무를 심고 그 열매를 먹을 것이니이다 유다 족속 중에 피하여 남은 자는 다시 아래로 뿌리를 박고 위로 열매를 맺으리니 이는 남은 자가 예루살렘에서 나오며 피하는 자가 시온 산에서 나올 것임이라 만군의 여호와의 열심이 이를 이루시리이다. (이사야 37:30~32)"
        containerClassName="min-h-[50vh] flex items-center justify-center pt-2 pb-4"
      />
      <MagicText
        text="네 장막터를 넓히며 네 처소의 휘장을 아끼지 말고 널리 펴되 너의 줄을 길게 하며 너의 말뚝을 견고히 할지어다 이는 네가 좌우로 퍼지며 네 자손은 열방을 얻으며 황폐한 성읍들을 사람 살 곳이 되게 할 것임이라. (이사야 54:2~3)"
        containerClassName="min-h-[50vh] flex items-center justify-center pt-2 pb-4"
      />
    </>
  );
};

export { DemoOne, HeroDemo, ComponentDemo, BlurFadeTextDemo, Demo };
