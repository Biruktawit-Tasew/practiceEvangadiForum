import React, { useContext } from "react";
import EvangadiLogo from "../../assets/black-logo.png";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { AppState } from "../../App";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { user, setUser } = useContext(AppState);
  const navigate = useNavigate();
  function handleSignOut() {
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_logo}>
          <Link to="/home">
            <img src={EvangadiLogo} alt="img" />
          </Link>
        </div>
        <div className={styles.header_right}>
          <nav className="right">
            <ul>
              <li className={styles.home}>
                <Link to={user.username ? "/home" : "/"}>Home</Link>
              </li>
              <li className={styles.work}>
                <Link to="/howItWorks">How it Works</Link>
              </li>
              {user.username ? (
                <Link to="/" className={styles.button} onClick={handleSignOut}>
                  SIGN OUT
                </Link>
              ) : (
                <Link
                  to="https://www.evangadi.com/"
                  className={styles.join}
                  target="_blank"
                >
                  JOIN THE COMMUNITY
                </Link>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
