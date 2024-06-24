import { FiHeart } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { useBuy } from "@/hooks/use-buy";
import { useAuth } from "@/hooks/use-auth";
import Link from 'next/link'
import { useRouter } from "next/router";
const Nav = ({ handleInputChange, query }) => {
  const { productCount } = useBuy();
  const { logOut } = useAuth();
  const router = useRouter();
  return (
    <>
      <div className="right navLogin md-close">
        <span className="iconPostion">
          <Link href="/Cart" className="Nav-link">
            <FaShoppingCart className="icon carticon" />
            <span className="iconT">{productCount}</span>
          </Link>
        </span>
        <span onClick={() => {
           logOut();
          router.push("/");
        }}>
          <IoIosLogOut className="icon carticon" />
        </span>
      </div>
    </>
  );
};

export default Nav;