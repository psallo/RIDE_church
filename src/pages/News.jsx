import styled from "styled-components";

export default function News({ lang = "ko" }) {
  return (
    <PageWrap>
      <PageInner>
        <h1>{lang === "en" ? "News" : "교회 소식"}</h1>
        <p>
          {lang === "en"
            ? "Latest announcements and upcoming events."
            : "최신 소식과 예정된 행사를 안내합니다."}
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
