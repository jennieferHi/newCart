import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import style from "@/styles/LogReg.module.scss"
import { sendEmail, updateMemberForm, checkEmail } from "@/api/member"
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
    // 存直
    const [myForm2, setMyForm2] = useState({
        email: "",
        opt: ""
    });
    //   存錯誤
    const [errors, setErrors] = useState({
        hasErrors: false, // 判斷有沒有錯誤 
        email: "",
    });
    const [errors2, setErrors2] = useState({
        hasErrors: false, // 判斷有沒有錯誤 
        opt: "",
    });
    // 設定錯誤
    const changeHandler = (e) => {
        setMyForm({ ...myForm, [e.target.name]: e.target.value });
    };
    const changeHandler2 = (e) => {
        setMyForm2({ ...myForm, [e.target.name]: e.target.value });
    };


    // 檢查欄位主程式01
    function checkEmail01() {
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
    }
    // 檢查欄位主程式02
    function checkEmail02() {
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
    }
    // 寄送email
    async function sendEmailFn (){
        const result = await sendEmail(myForm);
        if (result) {
            setStep(2)
        } else {
            Swal.fire({
                title: "錯誤",
                text: "資料沒有修改",
                icon: "error"
            });
        }
    }
    const emailHandler = async (e) => {
        e.preventDefault();
        // 檢查欄位資料
        checkEmail01();
        await sendEmailFn();
    }

    // 檢查opt 
    const checkoptHandler = async (e) => {
        e.preventDefault();
        // 檢查欄位資料
        checkEmail02();
        const result = await checkEmail(myForm2);
        if (result.success) {
            setStep(3)
        } else if (result.code == "401") {
            setResend(1);
            Swal.fire({
                title: "驗證碼重發",
                text: result.msg,
                icon: "error"
            });

        } else if (!result.succes) {
            setResend(1);
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
    
    const StepOne = () => {
        return (

            <form action="post" onSubmit={emailHandler}>
                <h5>請輸入註冊email</h5>
                <input className={errors.email ? "error" : "errorcancel"} value={myForm.email} onChange={changeHandler} type="text" name="email" id="email" text placeholder="email" />
                <span className="errorsmail"> {errors.email}</span>
                <button className="maillbtn">驗證碼</button>

            </form>
        )
    }
    const StepTwo = () => {
        return (
            <form action="post" onSubmit={checkoptHandler}>
                {myForm.email}
                <input className={errors2.opt ? "error" : "errorcancel"} value={myForm2.opt} onChange={changeHandler2} type="text" name="opt" id="opt" placeholder="請檢查Email驗證碼" />
                <span className="errorsmail"> {errors2.opt}</span>
                {resend == 0 ? <button className="maillbtn">檢查送出</button> : <button onClick={sendEmailFn} className="maillbtn">重新發送</button>}

            </form>
        )
    }
    const StepThree = () => {
        return (
            <Setpassword email={myForm.email} />
        )
    }
    const SelectPage = () => {
       switch (step) {
        case 1:
            return <StepOne />;
        case 2:
            return <StepTwo />;
        case 3:
            return <StepThree />;
        default:
            return null;
    }
    }

    return (
        <div>
            <div className={style.forget}>
                <h2>忘記密碼</h2>
                <SelectPage />
                <div>
                    <Link href="/Register">回登入</Link> |&nbsp;
                    <Link href="/">首頁</Link> &nbsp;
                </div>
            </div>
        </div>
    )
}

export default Forget