import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import { Button, ImageAsset } from "@components";
import { Drawer } from "@mui/material";
import { useState } from "react";

// const headerLinks: any = [
//   { label: "Travel Insurance", target: "travel-insurance" },
//   { label: "Working Holiday Visa", target: "working-holiday-visa" },
//   { label: "PPVV", target: "ppvv" },
//   { label: "Companies", target: "companies" },
//   { label: "Affiliates", target: "affiliates" },
//   { label: "Blog", target: "blog" },
//   { label: "About Us", target: "about-us" },
// ];

interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (toggleOpen: boolean) => {
    setOpen(toggleOpen);
  };

  return (
    <header className="flex justify-between items-center px-8 bg-white text-primary shadow-md">
      <div className="lg:hidden">
        <MenuIcon onClick={() => toggleDrawer(!open)} />
      </div>
      <ImageAsset className="w-20 ml-auto lg:ml-0 mr-auto lg:w-20" src="logo" />
      <div className="hidden lg:flex items-start space-x-4">
        <Link to="/login">
          <Button variant="outlined" color="secondary" className="normal-case">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button color="secondary" className="normal-case">
            Sign Up
          </Button>
        </Link>
      </div>
      <Drawer anchor={"left"} open={open} onClose={() => toggleDrawer(false)}>
        <div className="flex flex-col px-10 py-10 space-y-4">
          <ImageAsset
            className="w-20 ml-auto lg:ml-0 mr-auto lg:w-20 border-b"
            src="logo"
          />
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
        </div>
      </Drawer>
    </header>
  );
};

export default Header;