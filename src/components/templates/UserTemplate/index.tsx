import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import Background from "@/components/organisms/Background";
import styles from "./UserTemplates.module.scss";
import UserForm from "@/components/organisms/UserForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Label from "@/components/atoms/Label";

const UsersPage = () => {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const { saveSession, verifySession } = useLocalStorage("mySecretKey");

  useEffect(() => {
    const userData = verifySession("mySecretKey");
    setUser(userData);
    console.log("Session Data:", userData);
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Data:", data);
    saveSession("mySecretKey", data);
  };

  return (
    <>
      <Background />
      <div className={styles.authTemplate}>
        <div className={styles.authTemplateContent}>
        <Label htmlFor={"User Update"} text={"User Update"} />
        <UserForm data={user} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
};
export default UsersPage;
