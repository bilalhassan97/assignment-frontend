import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Button, ImageAsset } from "@components";
import { logoutUser } from "@helpers/utils";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const toggleDrawer = (toggleOpen: boolean) => {
    setOpen(toggleOpen);
  };

  const navigateHome = () => {
    navigate("/");
  };

  const logoutHandler = () => {
    logoutUser(navigate);
  };

  const openMenu = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isAuthenticated =
    localStorage.getItem("userId") && localStorage.getItem("access_token");

  return (
    <header className="flex justify-between items-center px-8 bg-white text-primary shadow-md sticky top-0 z-10">
      <div className="lg:hidden">
        <MenuIcon onClick={() => toggleDrawer(!open)} />
      </div>
      <ImageAsset
        className="w-20 ml-auto lg:ml-0 mr-auto cursor-pointer"
        src="logo"
        onClick={navigateHome}
      />
      {!isAuthenticated ? (
        <div className="hidden lg:flex items-start space-x-4">
          <Link to="/login">
            <Button
              variant="outlined"
              color="secondary"
              className="normal-case"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button color="secondary" className="normal-case">
              Sign Up
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div onClick={handleClick}>
            <AccountCircleIcon className="text-4xl cursor-pointer" />
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/user");
                handleClose();
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                logoutHandler();
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
      <Drawer anchor={"left"} open={open} onClose={() => toggleDrawer(false)}>
        <div className="flex flex-col px-10 py-10 space-y-4">
          <ImageAsset
            className="w-20 ml-auto lg:ml-0 mr-auto border-b"
            src="logo"
            onClick={navigateHome}
          />
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button
                  variant="outlined"
                  className="w-full normal-case"
                  color="secondary"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button color="secondary" className="w-full normal-case">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <>
              {/* <Link to="/login"> */}
              <Button
                variant="outlined"
                className="w-full normal-case"
                color="secondary"
                onClick={logoutHandler}
              >
                Logout
              </Button>
              {/* </Link> */}
            </>
          )}
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
