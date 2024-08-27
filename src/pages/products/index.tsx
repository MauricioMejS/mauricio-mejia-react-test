import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSession from "@/hooks/useLocalStorage";
import ProductList from "@/components/organisms/ProductList";
import Loader from "@/components/atoms/Loader";

const Login: React.FC = () => {
  const { sessionData, verifySession } = useSession("mySecretKey");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!verifySession("mySecretKey")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <>
      {loading && <Loader />}
      {!loading && <ProductList />}
    </>
  );
};

export default Login;
