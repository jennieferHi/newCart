import { useRef, useState, useEffect } from "react";
import { motion, useScroll ,useInView} from "framer-motion";
import { scroll } from "framer-motion/dom";

function Item() {
  const ref = useRef(null);
  // const progressWheel = document.querySelector(".progress");
  const isInView = useInView(ref)
// scroll((progress) => {
//  console.log(progress)
// });
useEffect(() => {
  console.log("Element is in view: ", isInView)
}, [isInView])

  // 狀態用於控制背景顏色
  const [backgroundColor, setBackgroundColor] = useState("transparent");
 

  return (
    <section>
      <div ref={ref} className="progress" style={{ minHeight: "200vh", backgroundColor }}>
      <img src="./a0.png"  alt="" />
        <figure className="progress">
 
          <svg id="progress" width="75" height="75" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              className="indicator"
            />
          </svg>
        </figure>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Item />
      <Item />
      <Item />
    </>
  );
}
