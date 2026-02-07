import styled from "styled-components";

export default function Contact({ lang = "ko" }) {
  return (
    <PageWrap>
      <PageInner>
        <h1>{lang === "en" ? "Contact" : "오시는 길"}</h1>
        <p>
          {lang === "en"
            ? "Service times and location details will go here."
            : "예배 시간과 위치 정보를 여기에 안내합니다."}
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
