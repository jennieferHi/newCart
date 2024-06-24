import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import style from "@/styles/LogReg.module.scss"
import { sendEmail, checkEmail } from "@/api/member"
import Setpassword from "./setPassword.js";
import Swal from 'sweetalert2'
import { z } from "zod";
const Forget = () => {
    const [resend, setResend] = useState(0);
    const [step, setStep] = useState(1);
    const schemaEmail = z.string().email({ message: "請填寫正確的電郵" });
    const schemaOpt = z.string().length(6, { message: "請填寫正確的Opt" });
    //   存直
    const [myForm, setMyForm] = useState({
        email: ""
    });
    //   存錯誤
    const [errors, setErrors] = useState({
        hasErrors: false, // 判斷有沒有錯誤 
        email: "",
    });
    // 設定錯誤
    const changeHandler = (e) => {
        setMyForm({ ...myForm, [e.target.name]: e.target.value });
    };
    const changeHandler2 = (e) => {
        setMyForm2({ ...myForm, [e.target.name]: e.target.value });
    };
    // 
    const [myForm2, setMyForm2] = useState({
        email: "",
        opt: ""
    });
    const [errors2, setErrors2] = useState({
        hasErrors: false, // 判斷有沒有錯誤 
        opt: "",
    });

    const emailHandler = async (e) => {
        e.preventDefault();
        // 檢查欄位資料
        let initErrors = {
            hasErrors: false, // 判斷有沒有錯誤 
            email: "",
        };
        const r1 = schemaEmail.safeParse(myForm.email);
        if (!r1.success) {
            initErrors = {
                ...initErrors,
                hasErrors: true,
                email: r1.error.issues[0].message,
            };
        }
        if (initErrors.hasErrors) {
            setErrors(initErrors);
            return; // 欄位檢查時, 有錯誤的話, 就不發 AJAX
        } else {
            setErrors({
                hasErrors: false,
                email: "",
            })
        }
        console.log(myForm)
        const result = await sendEmail(myForm);
        if (result.success) {
            setStep(2)
        } else {
            Swal.fire({
                title: "錯誤",
                text: result.msg,
                icon: "error"
            });
        }
    }
    const checkoptHandler = async (e) => {
        e.preventDefault();
        // 檢查欄位資料
        let initErrors = {
            hasErrors: false, // 判斷有沒有錯誤 
            opt: "",
        };
        const r1 = schemaOpt.safeParse(myForm2.opt);
        if (!r1.success) {
            initErrors = {
                ...initErrors,
                hasErrors: true,
                opt: r1.error.issues[0].message,
            };
        }
        if (initErrors.hasErrors) {
            setErrors2(initErrors);
            return; // 欄位檢查時, 有錯誤的話, 就不發 AJAX
        } else {
            setErrors2({
                hasErrors: false,
                opt: "",
            })
        }
        setMyForm2({ ...myForm2, email: myForm.email })
        const result = await checkEmail(myForm2);
        if (result.success) {
            setStep(3)
        } else if (result.code) {
            setResend(1);
            Swal.fire({
                title: "錯誤",
                text: result.msg,
                icon: "error"
            });

        } else if (!result.succes) {
            Swal.fire({
                title: "錯誤",
                text: result.msg,
                icon: "error"
            });
        }
        else {
            Swal.fire({
                title: "錯誤",
                text: "資料沒有修改",
                icon: "error"
            });
        }
    }


 
    return (
        <div>
            <div className={style.forget}>
                <h2>忘記密碼</h2>
                {step == 1 && (
                    <form action="post" onSubmit={emailHandler}>
                        <h5>請輸入註冊email</h5>
                        <input className={errors.email ? "error" : "errorcancel"} value={myForm.email} onChange={changeHandler} type="text" name="email" id="email" text placeholder="email" />
                        <button className="maillbtn">點我驗證碼</button>
                        <h5>請檢查Email驗證碼</h5>
                        <span className="errorsmail"> {errors.email}</span>

                    </form>
                )}
                {step == 2 && (<form action="post" onSubmit={checkoptHandler}>
                    {myForm.email}
                    <input className={errors2.opt ? "error" : "errorcancel"} value={myForm2.opt} onChange={changeHandler2} type="text" name="opt" id="opt" placeholder="請檢查Email驗證碼" />
                    <span className="errorsmail"> {errors2.opt}</span>
                    {resend==0 ? <button className="maillbtn">檢查送出</button> : <button onClick={sendEmail} className="maillbtn">重新發送</button>}

                </form>)}
                {step == 3 && (<Setpassword email={myForm.email} />)}


                <div>
                    <Link href="/Register">回登入</Link> |&nbsp;
                    <Link href="/">首頁</Link> &nbsp;
                </div>
            </div>
        </div>
    )
}

export default Forget