import React, { useState, useContext, createContext, useEffect } from 'react';
import { useRouter } from 'next/router';

const BuyContext = createContext(null);

export const BuyProvider = ({ children }) => {
    const [product, setProduct] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [productTotal, setProductTotal] = useState(0);

    const addProductHandler = async (myForm) => {
        if (product.length === 0) {
            const total = myForm.add * myForm.price;
            setProduct([myForm])
            setProductTotal(total);
            setProductCount(myForm.add);

            localStorage.setItem("count", myForm.add);
            localStorage.setItem("total", total);
            localStorage.setItem("buy", JSON.stringify([myForm]));
            return;
        }
        const index = product.findIndex((v) => v.id === myForm.id);

        if (product.length > 0 && index >= 0) {
            setProduct((prevProduct) => {
                const nextData = [...prevProduct];
                nextData[index].add = myForm.add + nextData[index].add;
                localStorage.setItem("buy", JSON.stringify(nextData));
                return nextData;
            });
            setProductCount((prevCount) => {
                const newCount = prevCount + myForm.add;
                localStorage.setItem("count", newCount);
                return newCount;
            });
            setProductTotal((prevCount) => {
                console.log(prevCount)
                const newTotal = prevCount + (myForm.add * myForm.price);
                localStorage.setItem("total", newTotal);
                return newTotal;
            });
        } else {

            setProduct((prevProduct) => {
                const nextData = [...prevProduct];
                nextData.push(myForm);
                localStorage.setItem("buy", JSON.stringify(nextData));
                return nextData;
            });
            setProductCount((prevCount) => {
                const newCount = prevCount + myForm.add;
                localStorage.setItem("count", newCount);
                return newCount;
            });
            setProductTotal((prevCount) => {
                const newTotal = parseInt(prevCount) + parseInt(myForm.add * myForm.price);
                localStorage.setItem("total", newTotal);
                return newTotal;
            });
        }
    };
    const clearBuyStorm = () => {
        localStorage.setItem("buy", JSON.stringify([]));
        localStorage.setItem("count", 0);
        localStorage.setItem("total", 0);
    }
    const removeProductHandler = async (id) => {
        const index = product.findIndex((v) => v.id === id);
        const indexfilter = product.filter((v) => v.id != id);
        if (product.length > 0 && index >= 0) {
            setProduct(() => { 
                localStorage.setItem("buy", JSON.stringify(indexfilter));
                return indexfilter;
            });
            setProductCount((prevCount) => {
                const newCount = prevCount - product[index].add;
                localStorage.setItem("count", newCount);
                return newCount;
            });
            setProductTotal((prevCount) => {
                console.log(prevCount)
                const newTotal = prevCount - ( product[index].add *  product[index].price);
                localStorage.setItem("total", newTotal);
                return newTotal;
            });
        }

    }

    useEffect(() => {
        if (!localStorage.getItem("buy") || !localStorage.getItem("count") || !localStorage.getItem("total")) {
            localStorage.setItem("buy", JSON.stringify([]));
            localStorage.setItem("count", 0);
            localStorage.setItem("total", 0);
        } else {
            setProduct(JSON.parse(localStorage.getItem("buy") || ""))
            setProductCount(JSON.parse(localStorage.getItem("count") || 0));
            setProductTotal(localStorage.getItem("total") || 0);
            console.log(product)
            console.log(productCount)
        }
    }, []);

    return (
        <BuyContext.Provider
            value={{ productTotal, removeProductHandler, clearBuyStorm, setProductTotal, addProductHandler, product, setProductCount, productCount, setProduct }}
        >
            {children}
        </BuyContext.Provider>
    )
}

export const useBuy = () => useContext(BuyContext);
