import React, { useState } from 'react';
import style from "@/styles/LogReg.module.scss";
import { useRouter } from 'next/router';
import { insertMemberForm } from "@/api/member";
import Link from 'next/link';
import { z } from "zod";
import Swal from 'sweetalert2'

const Rigister = () => {
  const router = useRouter();
  const [myForm, setMyForm] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
    address: "",
    birthday: "",
  });
// 記錄錯誤
  const [errors, setErrors] = useState({
    hasErrors: false,
    username: "",
    email: "",
    password: "",
    repassword: "",
    address: "",
    birthday: "",
  });

  const changeHandler = (e) => {
    setMyForm({ ...myForm, [e.target.name]: e.target.value });
  };
// 判斷驗證與提示
  const schemausername = z.string().min(2, { message: "姓名至少兩個字" });
  const schemaEmail = z.string().email({ message: "請填寫正確的電郵" });
  const schemaPassword = z.string().min(2, { message: "密碼至少2個字" });
  const schemaRepassword = z.string().min(2, { message: "密碼至少2個字" });
  const schemaAddress = z.string().min(8, { message: "地址至少8個字" });
  const schemaBirthday = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "請填寫正確的日期格式" });
// 送出
  const onSubmit = async (e) => {
    e.preventDefault();
    let initErrors = {
      hasErrors: false,
      username: "",
      email: "",
      password: "",
      repassword: "",
      address: "",
      birthday: "",
    };
// 把所有提示與input連結起來，判斷並送出錯誤
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
    }else{ 

      if (myForm.password!=myForm.repassword) { 
        initErrors = {
          ...initErrors,
          hasErrors: true,
          password:"密碼不一致"
        };
      }
    }
    const r3 = schemausername.safeParse(myForm.username);
    if (!r3.success) {
      initErrors = {
        ...initErrors,
        hasErrors: true,
        username: r3.error.issues[0].message,
      };
    }
    const r4 = schemaRepassword.safeParse(myForm.repassword);
    if (!r4.success) {
      initErrors = {
        ...initErrors,
        hasErrors: true,
        repassword: r4.error.issues[0].message,
      };
    }

    const r5 = schemaAddress.safeParse(myForm.address);
    if (!r5.success) {
      initErrors = {
        ...initErrors,
        hasErrors: true,
        address: r5.error.issues[0].message,
      };
    }
    const r6 = schemaBirthday.safeParse(myForm.birthday);
    if (!r6.success) {
      initErrors = {
        ...initErrors,
        hasErrors: true,
        birthday: r6.error.issues[0].message,
      };
    }
   
    if (initErrors.hasErrors) {
      setErrors(initErrors);
      return;
    }else{
      setErrors({
        hasErrors: false,
        username: "",
        email: "",
        password: "",
        repassword: "",
        address: "",
        birthday: "",
    })
    }
    console.log(myForm)
 
    const result = await insertMemberForm(myForm);
    if (result.status) { 
      localStorage.setItem("token", result.token);
      router.push(`/`);

    } else {
      Swal.fire({
        title: "錯誤",
        text: "資料發生錯誤",
        icon: "error"
      });
    }
  };

  return (
    <div className={style.rigister}>
      <h2>註冊會員</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input
          className={errors.username ? "error" : "errorcancel"} 
  
            value={myForm.username}
            onChange={changeHandler}
            type="text"
            name="username"
            id="username"
            placeholder="請輸入姓名"
          />
          <input
          className={errors.email ? "error" : "errorcancel"}
            value={myForm.email}
            onChange={changeHandler}
            type="text"
            name="email"
            id="email"
            placeholder="請輸入郵件"
          />
          <span className="errorsmail">{errors.username}</span>

          <span className="errorsmail">{errors.email}</span>
          <input
          className={errors.password ? "error" : "errorcancel"}
            value={myForm.password}
            onChange={changeHandler}
            type="password"
            name="password"
            id="password"
            placeholder="請輸入密碼"
          />
          <input
          className={errors.repassword ? "error" : "errorcancel"}
            value={myForm.repassword}
            onChange={changeHandler}
            type="password"
            name="repassword"
            id="repassword"
            placeholder="請確認密碼"
          />
          <span className="errorsmail">{errors.password}</span>

          <span className="errorsmail">{errors.repassword}</span>
          <input
          className={errors.address ? "error" : "errorcancel"}
            value={myForm.address}
            onChange={changeHandler}
            type="text"
            name="address"
            id="address"
            placeholder="請輸入地址"
          />
          <input
          className={errors.birthday ? "error" : "errorcancel"}
            value={myForm.birthday}
            onChange={changeHandler}
            type="date"
            name="birthday"
            id="birthday"
            placeholder="請輸入生日"
          />
          <span className="errorsmail">{errors.address}</span>

          <span className="errorsmail">{errors.birthday}</span>
        </div>
        <button type="submit">確定</button>
      </form>
      <div className={style.back}>
        <Link href="/forget">忘記密碼</Link> |&nbsp;
        <Link href="/Login">登入</Link>
      </div>
    </div>
  );
};

export default Rigister;
