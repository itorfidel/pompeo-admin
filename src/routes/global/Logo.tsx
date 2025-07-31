import React from "react";
import { Link } from "react-router-dom";
import StyledLogo from "../../components/styled/Logo";
import handleScrollToTop from "../../helpers/scrollToTop";

interface Props {
  style?: React.CSSProperties;
  className?: string;
}

const Logo = ({ style, className }: Props) => {
  return (
    <StyledLogo
      onClick={handleScrollToTop}
      className={className}
      style={{ ...style }}
    >
      <Link to="/">
        Pompeo <span style={{ color: "#7088de" }}>Admin</span>
      </Link>
    </StyledLogo>
  );
};

export default Logo;
