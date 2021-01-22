import React, { useState,useEffect } from 'react';
import Link from "next/link";
import {APP_NAME} from "../config.js";
import NProgress from "nprogress";
import {logout,isAuthenticated} from "../actions/authentication.js";
import Router from "next/router";
import {useLoaded} from "../Hooks/useLoaded";
import BookIcon from '@material-ui/icons/Book';
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
import ComputerIcon from '@material-ui/icons/Computer';
import Typical from 'react-typical'


Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const loaded = useLoaded();

  return (
    <>
      <Navbar style={{boxShadow:"inset 0 0 2000px rgba(204, 255, 204, 0.4)",filter:"blur(0.4px)"}} light expand="md">
      {/* <ComputerIcon style={{color:"teal"}}/> */}
        <NavLink href="/" className="font-weight-bold">
          <Typical steps={['TECH', 1000,'BLOG', 500,'SITE', 500,'TECHBLOGSITE', 500]} loop={Infinity} wrapper="p"/>
        </NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>

          <>
             <NavItem>
             <button className="btn btn-warning">
              <NavLink href="/blogs">
             <BookIcon/>
             {` `}
                Blogs
              </NavLink>
                </button>
                {`  `}
            </NavItem>
             </>

              
           {!isAuthenticated() && loaded && (
             <>
             <div style={{ padding:"10px"}}></div>
             <NavItem>
             <button className="btn btn-success">
              <NavLink href="/login">
             <VpnKeyIcon/>
             {`  `}
                Login
              </NavLink>
                </button>
            </NavItem>
              <div style={{ padding:"10px"}}></div>
                <button className="btn btn-info">
            <NavItem>
              <NavLink href="/signup">
              <PersonAddIcon/>
                Resgister
              </NavLink>
            </NavItem>

            </button>
             </>
           )}


          

           {isAuthenticated() && loaded && isAuthenticated().role === 0 &&( 
                <>
             <div style={{ padding:"10px"}}></div>
                <NavItem>
                <button className="btn btn-light">
              <NavLink href="/userDashboard">
              {`${isAuthenticated().name}'s Dashboard`}
              </NavLink>
              </button>
            </NavItem>
            </>
            )}

            {isAuthenticated() && loaded && isAuthenticated().role === 1 &&(
              <>
             <div style={{ padding:"10px"}}></div>
                <NavItem>
                <button className="btn btn-outline-primary">
              <NavLink href="/adminDashboard">
              <DashboardIcon/>
              {`  ${isAuthenticated().name}'s Dashboard `}
              </NavLink>
              </button>
            </NavItem>
            </>
            )}

            <div style={{ padding:"20px"}}></div>

            {/* {JSON.stringify(isAuthenticated())} */}
            {isAuthenticated() && loaded && (
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