import styled from "styled-components";
import { LayeredText } from "../components/ui/layered-test"
import { Hero } from "../components/ui/animated-hero"
import { BlurFadeTextDemo, ComponentDemo, Demo } from "../components/ui/demo"

export default function Container({ lang = "ko" }) {
  return (
    <Mainwrapper>
      <MainWrap>
        <LeftWrap>
          <LayeredText
            fontSize="clamp(40px, 6vw, 72px)"
            fontSizeMd="clamp(32px, 10vw, 44px)"
            lineHeight="clamp(46px, 6.5vw, 60px)"
            lineHeightMd="clamp(36px, 11vw, 48px)"
          />
        </LeftWrap>
        <RightWrap>
          <Hero lang={lang} />
        </RightWrap>
      </MainWrap>
      <VideoWrap>
        <iframe
          src="https://www.youtube.com/embed/VTV4G77_FO0?autoplay=1&mute=1&playsinline=1&loop=1&playlist=VTV4G77_FO0"
          title={lang === "en" ? "RIDE Video" : "RIDE 영상"}
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </VideoWrap>
      <Title>
        <BlurFadeTextDemo lang={lang} />
      </Title>
      <Banner>
        <ComponentDemo lang={lang} />
      </Banner>
      <Content>
        <Demo lang={lang} />
      </Content>
    </Mainwrapper>
  );
}

const Mainwrapper = styled.div``

const MainWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 3em;
  padding: clamp(16px, 4vw, 48px);
  align-items: stretch;
  margin-bottom: 3em;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftWrap = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 1em 1em 1em 1em;
`;

const RightWrap = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 3vw, 28px);
  min-width: 0;
`;

const VideoWrap = styled.div`
  max-width: 1200px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);
  margin: auto;

  iframe {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8em;
`

const Banner = styled.div`
  margin-top: 3em;
`

const Content = styled.div``
