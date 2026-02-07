import styled from "styled-components";

export default function Footer({ lang = "ko" }) {
  const copy = {
    ko: {
      copyright: "© 2026 RIDE CHURCH. All rights reserved.",
      youtube: "유튜브",
      facebook: "페이스북",
    },
    en: {
      copyright: "© 2026 RIDE CHURCH. All rights reserved.",
      youtube: "YouTube",
      facebook: "Facebook",
    },
  }[lang];
  return (
    <FooterWrap>
      <FooterInner>
        <div>
          <strong>RIDE CHURCH</strong>
        </div>
        <div>
          {copy.copyright}
        </div>
        <FooterLinks>
          <a
            href="https://www.youtube.com/@ridechurch3967"
            target="_blank"
            rel="noreferrer"
            aria-label={copy.youtube}
            title={copy.youtube}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M23 12c0-2.5-.2-4-.6-5.1a3 3 0 0 0-2.1-2.1C18.9 4.3 12 4.3 12 4.3s-6.9 0-8.3.5a3 3 0 0 0-2.1 2.1C1.2 8 1 9.5 1 12s.2 4 .6 5.1a3 3 0 0 0 2.1 2.1c1.4.5 8.3.5 8.3.5s6.9 0 8.3-.5a3 3 0 0 0 2.1-2.1c.4-1.1.6-2.6.6-5.1Zm-13 3V9l5.2 3-5.2 3Z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/RIDEMission"
            target="_blank"
            rel="noreferrer"
            aria-label={copy.facebook}
            title={copy.facebook}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V12H8v3h2v5h3v-5h2.6l.4-3H13v-2.5c0-.4.4-.5.5-.5Z" />
            </svg>
          </a>
        </FooterLinks>
      </FooterInner>
    </FooterWrap>
  );
}


const FooterWrap = styled.footer`
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  background: #1f1f1f;
  color: #fefaf6;
`;

const FooterInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  align-items: center;

  a {
    color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
  }

  svg {
    width: 18px;
    height: 18px;
    display: block;
    fill: currentColor;
  }
`;
