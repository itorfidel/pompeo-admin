import StyledFooter from "../../components/styled/Footer";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <StyledFooter>
      <p>
        Copyright © Potterland 2023. All rights reserved. Website developed by{" "}
        <Link
          to="https://github.com/itorfidel?tab=repositories"
          target="_blank"
        >
          Itor Fidelis.
        </Link>
      </p>
    </StyledFooter>
  );
};

export default Footer;
