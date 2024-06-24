


const keyValue = (e) => {
    return Object.keys(e);
}
const dealData = (Product, selected, e) => {  
    let filteredProducts = Product;
    const searchPrice = !selected.includes("price")
    // 價錢另外處理
    if (!selected) {
        filteredProducts = Product;
    }
    else if (searchPrice) {

        // filteredProducts = filteredProducts.filter(
        //     ({ category, color, price, name }) => {
        //         return category === selected || color === selected
        //             || price.toString() === selected || name === selected;
        //     }
        // );
        filteredProducts = filteredProducts.filter((v) => {  
            return v[e] === selected;
        });
        // 如果是預設值
    }
    else {
        selected = (selected.toString()).split("price")[1];
        if (selected < 4) {
            filteredProducts = filteredProducts.filter(
                ({ price }) => { 
                    return price > ((+selected - 1) * 50) + 1 && price < (+selected * 50)
                }
            );
        } else {
            filteredProducts = filteredProducts.filter(
                ({ price }) => {
                    return price > 150
                }
            );
        }
    } 
    return filteredProducts;
}
const filteredData = (Product, selects="") => {
    if (selects) { 
        let key = keyValue(selects);
        
        key.forEach(e => { 
            if(!selects[e])     return; 
            Product = dealData(Product, selects[e], e);
        });
    }
    return Product;
};
export { filteredData }