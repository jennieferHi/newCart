import React from 'react'
import { ScrollMotionContainer, ScrollMotionItem } from './scroll-motion'
const KeyWay = () => {
  return (
    <div>
    <ScrollMotionContainer
    element="div"
    className="bg-dark text-secondary px-4 py-5 text-center"
  >
    <div className="py-5">
      <ScrollMotionItem
        element="h1"
        type="up"
        className="display-5 fw-bold text-white"
      >
        Dark mode hero
      </ScrollMotionItem>
      <div className="col-lg-6 mx-auto">
        <ScrollMotionItem element="p" type="up" className="fs-5 mb-4">
          Quickly design and customize responsive mobile-first sites.
        </ScrollMotionItem>
      </div>
    </div>
  </ScrollMotionContainer>
    </div>
  )
}

export default KeyWay
