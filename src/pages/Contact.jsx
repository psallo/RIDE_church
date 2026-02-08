import styled from "styled-components";
import BlurTextPreview from "../components/ui/demo-contact"

export default function Contact({ lang = "ko" }) {
  const copy =
    lang === "en"
      ? {
          addressImageAlt: "Address",
          infoImageAlt: "Contact Information",
        }
      : {
          addressImageAlt: "주소",
          infoImageAlt: "연락처 안내",
        };
  return (
    <PageWrap>
      <PageInner>
        <BlurTextPreview lang={lang} />
        <img src="/add.png" alt={copy.addressImageAlt} />
        <img src="/info.png" alt={copy.infoImageAlt} />
        <Map>
          <iframe
            title="RIDE Church Location"
            src="https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8%20%EC%84%9C%EB%8C%80%EB%AC%B8%EA%B5%AC%20%EC%9D%B4%ED%99%94%EC%97%AC%EB%8C%80%EA%B8%B8%2081%20(%EB%8C%80%ED%98%84%EB%8F%99%2037-71)%20%EC%A5%AC%EB%9D%BC%EA%B8%B0%ED%83%80%EC%9B%8C%2C%20%EC%A7%80%ED%95%98%202%EC%B8%B5&output=embed"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Map>
      </PageInner>
    </PageWrap>
  );
}

const PageWrap = styled.section`
  padding: 120px 24px 80px;
`;

const PageInner = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Map = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  width: 90%;
  height: min(40vh, 560px);
  margin-left: auto;
  margin-right: auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
`
