import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../features/user/userSlice";


const Header: React.FC = () => {
  
  const isLoggedin = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <div style={styles.logo}>Fake.Expense.app</div>

      {!isLoggedin&&
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <button style={styles.signInButton} onClick={() => navigate("/login")}>
          Log in
        </button>
        <button style={styles.signInButton} onClick={() => navigate("/signup")}>
          Sign up
        </button>
      </div>
      }
    </header>
  );
};
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  signInButton: {
    padding: "0.5rem 1rem",
    marginRight: '1.2rem',
    fontSize: "1rem",
    borderRadius: "5px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Header;
