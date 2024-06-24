import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import { z } from "zod";
import style from "@/styles/LogReg.module.scss"
import {useAuth} from "@/hooks/use-auth";
import Swal from 'sweetalert2'
 
export default function Login() { 
  const router = useRouter();
  const {login}=useAuth();
  const schemaPassword = z.string().min(3, { message: "密碼至少3個字" });
  const schemaEmail = z.string().email({ message: "請填寫正確的電郵" });
  const [myForm, setMyForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    hasErrors: false, // 判斷有沒有錯誤 
    email: "",
    password: "",

});
  const changeHandler = (e) => {
    setMyForm({ ...myForm, [e.target.name]: e.target.value });
  }; 
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
    const data=await login(myForm);
    if(data){
      Swal.fire({
        title: "成功",
        text: "歡迎光臨",
        icon: "success"
      }); 
      router.push("/")
    }else{
      Swal.fire({
        title: "錯誤",
        text: "請檢查帳號密碼",
        icon: "error"
      });
    }
   
  }

  return (
    <div>
      <div className={style.login}>
        <form onSubmit={onSubmit} method="POST">
          <h2>登入</h2>
          <input   className={errors.email ? "error" : "errorcancel"} value={myForm.email} onChange={changeHandler} type="text" name="email" id="username"  placeholder="email" />
          <span className="errorsmail"> {errors.email}</span>
          <input className={errors.password ? "error" : "errorcancel"} value={myForm.password} onChange={changeHandler} type="password" name="password" id="password" placeholder="password" />
          <span className="errorsmail"> {errors.password}</span>
          <button >登入</button>
          <div>
            <Link href="/forget">忘記密碼</Link> |&nbsp;
            <Link href="/Register">註冊</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
