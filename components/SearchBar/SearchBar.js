import React from 'react' 
const SearchBar = ({handleInputChange, query}) => {
  
  return (
    <div> 
    <input onChange={handleInputChange}
    value={query} type="text"  placeholder='請輸入關鍵字' name="test" />
    </div>
  )
}

export default SearchBar
