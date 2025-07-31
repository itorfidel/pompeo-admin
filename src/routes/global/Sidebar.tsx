import React, { useState } from "react";
import Logo from "./Logo";
import Container from "../../components/styled/Container";
import SidebarLinks from "./SidebarLinks";
import {
  AccountTree,
  Assessment,
  Clear,
  ContactSupport,
  Group,
  Inventory,
  KeyboardArrowRight,
  Logout,
  Person,
  Settings,
  ShoppingBasket,
  TrendingUp,
} from "@mui/icons-material";
import StyledSidebar from "../../components/styled/Sidebar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser, removeUser } from "../../features/userSlice";
import UserImage from "../../components/UserImage";
import Flex from "../../components/styled/Flex";
import { useLogoutMutation } from "../../services/api";
import {
  selectMobileMenu,
  setisMenuOpen,
} from "../../features/mobileMenuSlice";

const Sidebar = () => {
  const user = useAppSelector(selectUser);
  const [logout] = useLogoutMutation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isMenuOpen = useAppSelector(selectMobileMenu);
  const dispatch = useAppDispatch();

  const handleCloseMenu = () => {
    dispatch(setisMenuOpen(false));
  };

  const handleCloseSidebar = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).closest("li")) {
      handleCloseMenu();
    }
  };

  const handleToggleProfile = () => {
    setIsProfileOpen((state) => !state);
  };

  const handleLogout = () => {
    if (user) {
      logout();
      dispatch(removeUser());
    }

    handleToggleProfile();
  };

  return (
    <StyledSidebar className={isMenuOpen ? "show" : ""}>
      <Container className="container">
        <Flex $justify="space-between">
          <Logo />
          <Clear className="mobileMenuExit" onClick={handleCloseMenu} />
        </Flex>
        <ul
          className="sidebarList"
          style={{ marginTop: "5em" }}
          onClick={handleCloseSidebar}
        >
          <h4>Dashboard</h4>
          <SidebarLinks to="/">
            <Assessment />
            <Flex className="linkRight">
              <span>Reports</span>
              <KeyboardArrowRight />
            </Flex>
          </SidebarLinks>
          <SidebarLinks to="/orders">
            <ShoppingBasket />
            <Flex className="linkRight">
              <span>Orders</span>
              <KeyboardArrowRight />
            </Flex>
          </SidebarLinks>
          <SidebarLinks to="/products">
            <Inventory />
            <Flex className="linkRight">
              <span>Products</span>
              <KeyboardArrowRight />
            </Flex>
          </SidebarLinks>
          <SidebarLinks to="/users">
            <Group />
            <Flex className="linkRight">
              <span>Users</span>
              <KeyboardArrowRight />
            </Flex>
          </SidebarLinks>
        </ul>
        <ul
          className="sidebarList"
          style={{ marginTop: "3em" }}
          onClick={handleCloseSidebar}
        >
          <h4>Utilities</h4>
          <SidebarLinks to="/analytics">
            <TrendingUp />
            <Flex className="linkRight">
              <span>Analytics</span>
              <KeyboardArrowRight />
            </Flex>
          </SidebarLinks>
          <SidebarLinks to="/projects">
            <AccountTree />
            <Flex className="linkRight">
              <span>Projects</span>
              <KeyboardArrowRight />
            </Flex>
          </SidebarLinks>
          <SidebarLinks to="/faq">
            <ContactSupport />
            <Flex className="linkRight">
              <span>FAQ</span>
              <KeyboardArrowRight />
            </Flex>
          </SidebarLinks>
          <SidebarLinks to="/settings">
            <Settings />
            <Flex className="linkRight">
              <span>Settings</span>
              <KeyboardArrowRight />
            </Flex>
          </SidebarLinks>
        </ul>

        <div className="profile" onClick={handleToggleProfile}>
          <Flex className="profileOuter">
            <UserImage src={user.profileImg} className="image" />
            <div>
              <h3>{user.username}</h3>
              <h4>Account Settings</h4>
            </div>
          </Flex>

          <ul
            className={`profileInner ${isProfileOpen ? "show" : ""}`}
            onClick={handleCloseSidebar}
          >
            <SidebarLinks to="/profile" state={user._id}>
              <Person className="icon" />
              <span>Profile</span>
            </SidebarLinks>
            <SidebarLinks to="/setting">
              <Settings className="icon" />
              <span>Settings</span>
            </SidebarLinks>
            <SidebarLinks to="#" onClick={handleLogout}>
              <Logout className="icon" />
              <span>Logout</span>
            </SidebarLinks>
          </ul>
        </div>
      </Container>
    </StyledSidebar>
  );
};

export default Sidebar;
