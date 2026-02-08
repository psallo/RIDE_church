import styled from "styled-components";
import { TestimonialsDemo } from "../components/ui/demo-staff"

export default function Staff({ lang = "ko" }) {
  return (
    <PageWrap>
      <PageInner>
        <TestimonialsDemo />
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
