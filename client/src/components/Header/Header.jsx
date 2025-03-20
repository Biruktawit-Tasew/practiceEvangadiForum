import React, { useContext } from "react";
import EvangadiLogo from "../../assets/black-logo.png";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { AppState } from "../../App";
const Header = () => {
  const { user } = useContext(AppState);

  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_logo}>
          <Link to="/">
            <img src={EvangadiLogo} alt="img" />
          </Link>
        </div>
        <div className={styles.header_right}>
          <nav className="right">
            <ul>
              <li className={styles.home}>
                <Link to="/">Home</Link>
              </li>
              <li className={styles.work}>
                <Link to="/howItWorks">How it Works</Link>
              </li>
              <Link
                to={user ? "/" : "https://www.evangadi.com/"}
                target="_blank"
                className={styles.button}
              >
                {user ? "SIGN OUT" : "JOIN THE COMMUNITY"}
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
