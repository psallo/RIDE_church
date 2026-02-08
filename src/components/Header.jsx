import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

export default function Header({ lang = "ko", onToggleLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const labels = {
    ko: {
      about: "교회 소개",
      ministries: "교역자 소개",
      news: "교회 소식",
      contact: "오시는 길",
      menu: "메뉴 열기",
      lang: "EN",
    },
    en: {
      about: "About",
      ministries: "Staff",
      news: "News",
      contact: "Contact",
      menu: "Open menu",
      lang: "KO",
    },
  };
  const copy = labels[lang] ?? labels.ko;
  return (
    <HeaderWrap>
      <HeaderInner>
        <Brand>
          <BrandText to="/">RIDE</BrandText>
        </Brand>
        <MenuButton
          type="button"
          aria-label={copy.menu}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </MenuButton>
        <Nav data-open={isOpen}>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setIsOpen(false)}
          >
            {copy.about}
          </NavLink>
          <NavLink
            to="/staff"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setIsOpen(false)}
          >
            {copy.ministries}
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setIsOpen(false)}
          >
            {copy.news}
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setIsOpen(false)}
          >
            {copy.contact}
          </NavLink>
          <LangButton
            type="button"
            onClick={() => {
              onToggleLang?.();
              setIsOpen(false);
            }}
            aria-label="Toggle language"
          >
            {copy.lang}
          </LangButton>
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


const BrandText = styled(Link)`
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

  a,
  button {
    color: inherit;
    text-decoration: none;
    font: inherit;
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    position: relative;
  }

  a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 2px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease;
  }

  a.active::after {
    transform: scaleX(1);
  }

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

const LangButton = styled.button``;
