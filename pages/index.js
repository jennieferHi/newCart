
import Link from 'next/link'
import Image from "next/image";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Product from "./Product/[sid].js";
import styles from "@/styles/Home.module.css";
import Slider from "@/components/Slider";
import Products from "../components/Products";
const inter = Inter({ subsets: ["latin"] });
import "./lang/i18.js";
import { useTranslation } from "react-i18next";
const Container1 = styled.div`overflow-x:hidden;width:100vw;padding:30px;
  @media (max-width: 600px) {
   padding:0px;
    }
`
const Container2 = styled.div`overflow-x:hidden;width:100vw;`
import { ScrollMotionContainer, ScrollMotionItem } from './scroll-motion'
import { motion, AnimatePresence } from "framer-motion"

export default function Index() {
  const { t, i18n } = useTranslation();
  const changeLang = () => {
    i18n.changeLanguage(i18n.language== 'en' ? "tw" : "en");
  }
  return (
    <>
      <ScrollMotionContainer
        element="div"
        className="main bg-dark text-secondary px-4 py-5 text-center">
        <div style={{"height":"80px"}}>
          <h5>{t("test")}</h5>
          <button style={{width:"50px",height:"50px"}} onClick={changeLang}>{i18n.language}</button>
        </div>
        <Container1>
          <ScrollMotionItem
            element="div"
            type="up"
            className="display-5 fw-bold text-white"
          >

            <AnimatePresence>
            </AnimatePresence>
          </ScrollMotionItem>
          <Slider />
          <ScrollMotionItem
            element="div"
            type="up"
            className="display-5 fw-bold text-white"
          >
            <Products />
          </ScrollMotionItem>
        </Container1>

      </ScrollMotionContainer >
    </>
  );
}
