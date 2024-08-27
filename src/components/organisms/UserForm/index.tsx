import FormGroup from "@/components/molecules/FormGroup";
import styles from "./UserForm.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/components/atoms/Button";

interface UserFormProps {
    data: { email: string; password: string };
    onSubmit: (data: { email: string; password: string }) => void;
    }


const UserForm: React.FC<UserFormProps> = ({data, onSubmit}) => {
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .matches(/\d/, "Password must contain at least one number")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  return (
    <div className={styles.userForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup label={"Email"}>
          <div className={styles.inputContainer}>
            <input
              placeholder={data.email}
              className={
                errors.email ? styles.inputError : styles.inputContainer
              }
              {...register("email")}
            />
            {errors.email?.message && (
              <p role="alert" className={styles.error}>
                {errors.email?.message}
              </p>
            )}
          </div>
        </FormGroup>
        <FormGroup label={"Password"}>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="••••••••••"
              className={
                errors.password ? styles.inputError : styles.inputContainer
              }
              {...register("password")}
            />
            {errors.email?.message && (
              <p role="alert" className={styles.error}>
                {errors.password?.message}
              </p>
            )}
          </div>
        </FormGroup>
        <FormGroup label={"Confirm Password"}>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="••••••••••"
              className={
                errors.password ? styles.inputError : styles.inputContainer
              }
              {...register("confirmPassword")}
            />
            {errors.email?.message && (
              <p role="alert" className={styles.error}>
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
        </FormGroup>
        <Button type={"submit"}>Save</Button>
      </form>
    </div>
  );
};
export default UserForm;