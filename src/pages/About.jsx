import styled from "styled-components";
import { DemoCard, InViewBasic, CardHoverEffectDemo } from "../components/ui/demo";

export default function About({ lang = "ko" }) {
  return (
    <PageWrap>
      <PageInner>
        <DemoCard />
        <InViewBasic />
        <Title>라이드처치 예배 안내</Title>
        <CardHoverEffectDemo />
      </PageInner>
    </PageWrap>
  );
}

const PageWrap = styled.section`
  padding: 120px 24px 80px;
`;

const PageInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Title = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 700;
`;
