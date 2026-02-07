import styled from "styled-components";

export default function Staff({ lang = "ko" }) {
  return (
    <PageWrap>
      <PageInner>
        <h1>{lang === "en" ? "Staff" : "교역자 소개"}</h1>
        <p>
          {lang === "en"
            ? "Meet our pastors and ministry leaders."
            : "교역자와 사역 리더들을 소개합니다."}
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
