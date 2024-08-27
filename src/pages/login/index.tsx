import React, { useEffect } from "react";
import AuthTemplate from "@/components/templates/AuthTemplate";
import useSession from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { FieldValues, SubmitHandler } from "react-hook-form";

const Login = () => {
  const Swal = require("sweetalert2");
  const initSessionData = {
    email: "admin@example.com",
    password: "admin",
  };
  const { sessionData, saveSession, verifySession, removeSession } =
    useSession("mySecretKey");
  const router = useRouter();

  console.log("Session Data:", sessionData);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Data:", data);
    if (
      data.email === initSessionData.email &&
      data.password === initSessionData.password
    ) {
      saveSession("mySecretKey", data);
      data.email = "";
      data.password = "";
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid credentials',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
  };

  useEffect(() => {
    if (sessionData) {
      router.push("/products");
    }
  }, [router, sessionData]);

  useEffect(() => {
    if (verifySession("mySecretKey")) {
      router.push("/products");
    }
  }, []);

  return (
    <div>
      <AuthTemplate onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
