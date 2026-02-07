import styled from "styled-components";

export default function About({ lang = "ko" }) {
  return (
    <PageWrap>
      <PageInner>
        <h1>{lang === "en" ? "About" : "교회 소개"}</h1>
        <p>
          {lang === "en"
            ? "We are a church seeking restoration, intercession, discipleship, and evangelism."
            : "회복, 중보, 제자훈련, 전도를 추구하는 교회입니다."}
        </p>
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
