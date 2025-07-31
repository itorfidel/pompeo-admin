import StyledHeader, { HeaderButton } from "../../components/styled/Header";
import Container from "../../components/styled/Container";
import {
  Search,
  EmailOutlined,
  NotificationsOutlined,
  Menu,
} from "@mui/icons-material";
import Input from "../../components/Input";
import Flex from "../../components/styled/Flex";
import { selectUser } from "../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Logo from "./Logo";
import useWindowWidth from "../../hooks/getWindowWidth";
import {
  selectMobileMenu,
  setisMenuOpen,
} from "../../features/mobileMenuSlice";

const Header = () => {
  const user = useAppSelector(selectUser);
  const { width } = useWindowWidth();
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector(selectMobileMenu);

  const handleToggleSidebar = () => {
    dispatch(setisMenuOpen(!isMenuOpen));
  };

  return (
    <StyledHeader>
      <Container className="container">
        {user.email ? (
          width <= 1280 ? (
            <Logo />
          ) : (
            <Input
              type="text"
              placeholder="Search"
              svg={<Search sx={{ cursor: "pointer" }} />}
              style={{ width: width <= 540 ? "55%" : "auto" }}
            />
          )
        ) : (
          <Logo />
        )}
        <Flex>
          <HeaderButton name="notifications">
            <NotificationsOutlined />
          </HeaderButton>
          <HeaderButton name="emails">
            <EmailOutlined />
          </HeaderButton>
          <Menu className="mobileMenu" onClick={handleToggleSidebar} />
        </Flex>
      </Container>
    </StyledHeader>
  );
};

export default Header;
