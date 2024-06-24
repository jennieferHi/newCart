import { animate, motion } from 'framer-motion'; // 從 framer-motion 庫中引入 animate 和 motion
import React from 'react'; // 引入 React

// 定義容器元素的變體
const containerVariants = {
  show: { // 顯示時的狀態變體
    transition: {
      staggerChildren: 0.2, // 控制每個子項目的開始動作時間間隔
      delayChildren: 0.05, // 控制整個子項目的開始動作時間延遲
    },
  },
  hide: { // 隱藏時的狀態變體
    transition: { staggerChildren: 0.05, staggerDirection: -1 }, // 控制子項目的隱藏動作時間間隔和方向
  },
};

// 定義元素的變體
const itemVariants = {
  fadeIn: { // 淡入效果的變體
    hide: { opacity: 0 }, // 隱藏時的樣式
    show: { opacity: 1, transition: { duration: 0.5, ease: 'easeIn' } }, // 顯示時的樣式和過渡效果
  },
  fadeInUp: { // 從下方淡入效果的變體
    hide: { opacity: 0, y: 20 }, // 隱藏時的樣式
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeIn' } }, // 顯示時的樣式和過渡效果
  },
  fadeInRight: { // 從右側淡入效果的變體
    hide: { opacity: 0, x: -50 }, // 隱藏時的樣式
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeIn' } }, // 顯示時的樣式和過渡效果
  },
  fadeInLeft: { // 從左側淡入效果的變體
    hide: { opacity: 0, x: 50 }, // 隱藏時的樣式
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeIn' } }, // 顯示時的樣式和過渡效果
  },
};

// 計算元素的變體
const calcItemVariants = (
  type = '', // 變體類型，如 'up', 'left', 'right'
  duration = 0.5, // 過渡效果的持續時間
  ease = 'easeIn', // 過渡效果的緩動函數
  x = [0, 0], // x 軸的位移範圍
  y = [0, 0], // y 軸的位移範圍
) => {
  const typesMap = { up: 'fadeInUp', left: 'fadeInLeft', right: 'fadeInRight' }; // 變體類型的映射表

  const vType = Object.keys(typesMap).includes(type) ? typesMap[type] : ''; // 根據變體類型取得對應的變體

  const newVariant = vType ? itemVariants[vType] : itemVariants['fadeIn']; // 根據變體類型取得對應的變體，預設為 'fadeIn'

  if (Number(duration) !== 0.5 && Number(duration) > 0) { // 如果持續時間不是預設值且大於0，則設定新的持續時間
    newVariant.show.transition.duration = Number(duration);
  }

  const easeList = ['linear', 'easeOut', 'easeInOut', 'circIn', 'circOut', 'circInOut', 'backIn', 'backOut', 'backInOut', 'anticipate']; // 緩動函數的列表

  if (easeList.includes(ease)) { // 如果指定的緩動函數在列表中，則設定新的緩動函數
    newVariant.show.transition.ease = ease;
  }

  if (vType === 'fadeInUp' && y[0] !== y[1]) { // 如果是向上淡入效果且 y 軸位移範圍不相等，則設定 y 軸的位移範圍
    newVariant.hide.y = y[0];
    newVariant.show.y = y[1];
  }

  if ((vType === 'fadeInRight' || vType === 'fadeInLeft') && x[0] !== x[1]) { // 如果是向右或向左淡入效果且 x 軸位移範圍不相等，則設定 x 軸的位移範圍
    newVariant.hide.x = x[0];
    newVariant.show.x = x[1];
  }

  return newVariant; // 返回新的變體
};

// 捲動動畫容器元件
export const ScrollMotionContainer = ({
  element = 'div', // 元素類型
  once = false, // 是否僅播放一次
  amount = 'some', // 捲動觸發的量
  children, // 子元件
  ...otherProps // 其他屬性
}) => {
  const myComponent = (element) => { // 根據元素類型返回相應的 motion 元件
    switch (element) {
      case 'ul':
        return motion.ul;
      case 'p':
        return motion.p;
      case 'section':
        return motion.section;
      case 'span':
        return motion.span;
      case 'div':
      default:
        return motion.div;
    }
  };

  const myProps = { // 要傳遞給動態組件的屬性
    ...otherProps,
    variants: containerVariants,
    initial: 'hide', // 初始狀態為隱藏
    whileInView: 'show', // 捲動至視窗中時顯示
    viewport: { once, amount }, // 捲動觸發的設置
  };

  return React.createElement(myComponent(element), myProps, children); // 返回動態組件
};

// 捲動動畫元素
export function ScrollMotionItem({
  element = 'div', // 元素類型
  type = '', // 變體類型，如 'up', 'left', 'right'
  duration = 0.5, // 過渡效果的持續時間
  ease = 'linear', // 過渡效果的緩動函數
  x = [20, 0], // x 軸的位移範圍
  y = [-100, 0], // y 軸的位移範圍
  children, // 子元件
  ...otherProps // 其他屬性
}) {
  const myComponent = (element) => { // 根據元素類型返回相應的 motion 元件
    switch (element) {
      case 'span':
        return motion.span;
      case 'li':
        return motion.li;
      case 'img':
        return motion.img;
      case 'p':
        return motion.p;
      case 'a':
        return motion.a;
      case 'h1':
        return motion.h1;
      case 'h2':
        return motion.h2;
      case 'div':
      default:
        return motion.div;
    }
  }

  const myProps = { // 要傳遞給動態組件的屬性
    ...otherProps,
    variants: calcItemVariants(type, duration, ease, x, y), // 計算變體並傳遞給組件
  };

  return React.createElement(myComponent(element), myProps, children); // 返回動態組件
}

// 空的捲動動畫元素（未實現功能）
export function ScrollNullMotionItem({ children }) {
  return React.createElement(myComponent(element), myProps, children); // 返回動態組件
}
