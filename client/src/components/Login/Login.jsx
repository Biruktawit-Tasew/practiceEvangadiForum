import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Api/axios";
import styles from "./login.module.css";
import { BiSolidHide, BiShow } from "react-icons/bi";

function LogIn({ toggleAuth }) {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      alert("Please provide all required information");
      return;
    }
    console.log(emailValue, passValue);
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      console.log(data.token);
      localStorage.setItem("token", data.token);

      navigate("/home");
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error?.response?.data.msg);
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <section className={styles.main_container}>
      <div className={styles.login__container}>
        <h1>Login to your account</h1>
        <div className={styles.signup}>
          Don’t have an account?
          <Link onClick={toggleAuth} className={styles.toggleButton}>
            Create a new account
          </Link>
        </div>
        <br />

        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <input
              className={styles.email}
              type="email"
              placeholder="Email address"
              id="email"
              ref={emailDom}
              required
            />
          </div>

          <div className={styles.form}>
            <input
              className={styles.parent}
              type={passwordVisible ? "text" : "password"}
              placeholder="********"
              id="password"
              ref={passwordDom}
              required
            />
            <div onClick={togglePasswordVisibility}>
              {passwordVisible ? (
                <BiShow size={34} className={styles.eye} />
              ) : (
                <BiSolidHide size={34} className={styles.eye} />
              )}
            </div>
          </div>
          <div className={styles.forget}>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <button type="submit" className={styles.login__button}>
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default LogIn;