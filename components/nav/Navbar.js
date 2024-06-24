import { FaIdBadge } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import React from "react";
import styled from "styled-components";
import { mobile } from "../../pages/responsive";
import { BsCartFill } from "react-icons/bs";
import Link from 'next/link'
import Nav from './Navigation/Nav'
import NavLogin from './Navigation/Nav-login'
import { useAuth } from "@/hooks/use-auth";
import { useBuy } from "@/hooks/use-buy";
const renderNavbar = () => {
  const { auth } = useAuth();
  if (!auth) {
    return <Nav />
  } else {
    return <NavLogin />
  }
}

const Navbar = ({ }) => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left"></div>
        <div className="center">
          <Link href="/" style={{ textAlign: "center", fontSize: "30px", fontWeight: "600" }}>ChicBoutique</Link>
        </div>
        <div className="right">

        {renderNavbar()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
