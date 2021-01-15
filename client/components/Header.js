import React, { useState,useEffect } from 'react';
import Link from "next/link";
import {APP_NAME} from "../config.js";
import NProgress from "nprogress";
import {logout,isAuthenticated} from "../actions/authentication.js";
import Router from "next/router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color="light" light expand="md">
      <Link href="/">
        <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
      </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
           {!isAuthenticated() && (
             <>
             <NavItem>
             <button className="btn btn-success">
                <Link href="/login">
              <NavLink>
             <VpnKeyIcon/>
             {`  `}
                Login
              </NavLink>
                </Link>
                </button>
            </NavItem>
              <div style={{ padding:"10px"}}></div>
                <button className="btn btn-info">
            <NavItem>
                <Link href="/signup">
              <NavLink>
              <PersonAddIcon/>
                Resgister
              </NavLink>
                </Link>
            </NavItem>

            </button>
             </>
           )}

           {isAuthenticated() && isAuthenticated().role === 0 &&( 
                <NavItem>
                <button className="btn btn-light">
              <NavLink>
              <Link href="/userDashboard">
              {`${isAuthenticated().name}'s Dashboard`}
              </Link>
              </NavLink>
              </button>
            </NavItem>

            )}

            {isAuthenticated() && isAuthenticated().role === 1 &&(
                <NavItem>
                <button className="btn btn-light">
              <NavLink>
              <DashboardIcon/>
              <Link href="/adminDashboard">
              {`  ${isAuthenticated().name}'s Dashboard `}
              </Link>
              </NavLink>
              </button>
            </NavItem>
            )}

            <div style={{ padding:"20px"}}></div>

            {/* {JSON.stringify(isAuthenticated())} */}
            {isAuthenticated() && (
                <NavItem>
                <button className="btn btn-danger">
              <NavLink onClick={()=>logout(()=>Router.push(`/login`))}>
              <ExitToAppIcon/>
              Logout
              </NavLink>
              </button>
            </NavItem>
            )}

          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}

export default Header;