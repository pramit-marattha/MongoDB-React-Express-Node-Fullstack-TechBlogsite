import React, { useState } from 'react';
import Link from "next/link";
import {APP_NAME} from "../config.js";
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

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
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
                Login
              </NavLink>
                </Link>
                </button>
            </NavItem>

                <button className="btn btn-info">
            <NavItem>
                <Link href="/signup">
              <NavLink>
                Resgister
              </NavLink>
                </Link>
            </NavItem>

            </button>
             </>
           )}
            {/* {JSON.stringify(isAuthenticated())} */}
            {isAuthenticated() && (
                <NavItem>
                <button className="btn btn-danger">
              <NavLink onClick={()=>logout(()=>Router.push(`/login`))}>
                Logout
              </NavLink>
              </button>
            </NavItem>
            )}

          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;