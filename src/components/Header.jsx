import { useState } from "react";
import styled from "styled-components";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HeaderWrap>
      <HeaderInner>
        <Brand>
          <BrandText href="/">RIDE</BrandText>
        </Brand>
        <MenuButton
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </MenuButton>
        <Nav data-open={isOpen}>
          <a href="#about" onClick={() => setIsOpen(false)}>교회 소개</a>
          <a href="#ministries" onClick={() => setIsOpen(false)}>교역자 소개</a>
          <a href="#news" onClick={() => setIsOpen(false)}>교회 소식</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>오시는 길</a>
        </Nav>
      </HeaderInner>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0.5em 1em 0.5em 1em;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Brand = styled.div`

`;


const BrandText = styled.a`
  color: inherit;
  text-decoration: none;
`;

const MenuButton = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;

  span {
    display: block;
    width: 24px;
    height: 2px;
    background: #000;
    margin: 5px auto;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2em;

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    right: 0;
    flex-direction: column;
    gap: 1em;
    background: #fff;
    padding: 1em;
    border: 1px solid #e5e5e5;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;

    &[data-open="true"] {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  }
`;
