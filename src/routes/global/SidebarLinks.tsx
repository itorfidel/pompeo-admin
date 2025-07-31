import React from "react";
import StyledSidebarLinks from "../../components/styled/SidebarLinks";
import { Link, useLocation } from "react-router-dom";
import handleScrollToTop from "../../helpers/scrollToTop";

interface Props {
  to: string;
  children: React.ReactNode;
  state?: string;
  onClick?: () => void;
}

const SidebarLinks = ({ to, children, state, onClick }: Props) => {
  const path = useLocation().pathname;

  const handleClick = () => {
    handleScrollToTop();

    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledSidebarLinks className={path === to ? "active" : ""}>
      <Link to={to} onClick={handleClick} state={state}>
        {children}
      </Link>
    </StyledSidebarLinks>
  );
};

export default SidebarLinks;
