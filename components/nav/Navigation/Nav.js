import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import { FaIdBadge } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import Link from 'next/link'
import { useBuy } from "@/hooks/use-buy"; 

const Nav = ({ handleInputChange, query }) => {
  const { productCount } = useBuy(); 
  return (
    <>
      <div className="right ">  
        <Link href="/Login"  className="md-close menuItem">SIGN IN</Link>
        </div>
    </>
  );
};

export default Nav;