import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import style from "@/styles/LogReg.module.scss"
import { updateMemberForm } from "@/api/member"
import { useRouter } from 'next/router';
import { z } from "zod";
const Setpassword = ({ email }) => {
    const router = useRouter();
    const schemaPass = z.string().min(2, { message: "請填寫正確的密碼" });
    //   出驗證碼 
    const [myForm, setMyForm] = useState({
        password: "",
        email: email
    });
    const [errors, setErrors] = useState({
        hasErrors: false, // 判斷有沒有錯誤 
        password: "",
    });
    // 

    const changeHandler = (e) => {
        setMyForm({ ...myForm, [e.target.name]: e.target.value });
    };

    const emailHandler = async (e) => {
        e.preventDefault();
        // 檢查欄位資料
        let initErrors = {
            hasErrors: false, // 判斷有沒有錯誤 
            password: "",
        };
        const r1 = schemaPass.safeParse(myForm.password);
        if (!r1.success) {
            initErrors = {
                ...initErrors,
                hasErrors: true,
                password: r1.error.issues[0].message,
            };
        }
        if (initErrors.hasErrors) {
            setErrors(initErrors);
            return; // 欄位檢查時, 有錯誤的話, 就不發 AJAX
        } else {
            setErrors({
                hasErrors: false,
                password: "",
            })
        }
        const result = await updateMemberForm(myForm);
        if (result.success) {
            router.push("/Login");
        } else if (!result.succes) {
            Swal.fire({
                title: "錯誤",
                text: result.msg,
                icon: "error"
            });
        } else {
            Swal.fire({
                title: "錯誤",
                text: "資料沒有修改",
                icon: "error"
            });
            alert("資料沒有修改!!!");
        }
    }


    return (
        <>

            <form action="post" onSubmit={emailHandler}>
            <h3>請重新設定密碼</h3>
            <h3> {email}</h3>
                <input className={errors.password ? "error" : "errorcancel"} value={myForm.password} onChange={changeHandler} type="password" name="password" id="password" text placeholder="password" />
                <input className={errors.repassword ? "error" : "errorcancel"} value={myForm.repassword} onChange={changeHandler} type="password" name="repassword" id="repassword" text placeholder="repassword" />
                <span className="errorsmail"> {errors.email}</span>
                <button className="maillbtn">確定</button>
            </form>


        </>

    )
}

export default Setpassword