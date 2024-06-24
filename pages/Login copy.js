import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import { z } from "zod";
import style from "@/styles/LogReg.module.scss"
import { selectAccount } from "@/api/member";
 
export default function Login() { 
  const router = useRouter();
  const schemaPassword = z.string().min(3, { message: "密碼至少3個字" });
  const schemaEmail = z.string().email({ message: "請填寫正確的電郵" });
  const [myForm, setMyForm] = useState({
    email: "",
    password: "",
  });
  useEffect(()=>{
    setAuth("data");
  },"")
  const changeHandler = (e) => {
    setMyForm({ ...myForm, [e.target.name]: e.target.value });
  };
  const [errors, setErrors] = useState({
    hasErrors: false, // 判斷有沒有錯誤 
    email: "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    // 檢查欄位資料
    let initErrors = {
      hasErrors: false, // 判斷有沒有錯誤
      password: "",
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
    const r2 = schemaPassword.safeParse(myForm.password);
    if (!r2.success) {
      initErrors = {
        ...initErrors,
        hasErrors: true,
        password: r2.error.issues[0].message,
      };
    }
    if (initErrors.hasErrors) {
      setErrors(initErrors);
      return; // 欄位檢查時, 有錯誤的話, 就不發 AJAX
    }
    const result = await selectAccount(myForm);
    if (result.success) {
      // 
      console.log(result)
      router.push(`/`);
      localStorage.setItem("token", result.token);
    } else {

      alert("資料發生錯誤")
    }
  }

  return (
    <div>
      <div className={style.login}>
        <form onSubmit={onSubmit} method="POST">
          <h2>SIGN IN</h2>
          <input value={myForm.email} onChange={changeHandler} type="text" name="email" id="username" text placeholder="email" />
          <input value={myForm.password} onChange={changeHandler} type="text" name="password" id="password" placeholder="password" />
          <button >登入 </button>
          <div>
            <Link href="/forget">忘記密碼</Link> |&nbsp;
            <Link href="/Register">註冊</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
