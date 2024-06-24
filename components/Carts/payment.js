import React, { useState } from 'react'
import { useBuy } from '../../hooks/use-buy';
import { getLineApi } from "@/api/lineApi";
import { v4 as uuidv4 } from 'uuid';
const Payment = ({ count }) => {
    const { clearBuyStorm } = useBuy();
    const [pay, setPay] = useState({ returnCode: "9999" });
    const goLinepay = async () => {
        const linePay =
        {
            "amount": count,
            "currency": "TWD",
            "orderId": uuidv4(),
            "packages": [
                {
                    "id": "1",
                    "amount": count,
                    "products": [
                        {
                            "id": "data123",
                            "name": "product",
                            "price": count
                        }
                    ]
                }
            ],
            "redirectUrls": {
                "confirmUrl": "http://localhost:3000/Cart2",
                "cancelUrl": "http://localhost:3000/"
            }
        }
        const data = await getLineApi(linePay);
        if (data.returnCode == "0000") { 
            clearBuyStorm();
            window.location.href = data.info.paymentUrl.web;
        }
    }
    return (
        <div><button onClick={goLinepay}>結帳</button></div>


    )
}

export default Payment