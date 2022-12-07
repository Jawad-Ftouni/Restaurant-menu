import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import icon from "../images/admin-icon.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const iconStyle = {
    width: "150px",
    height: "150px",
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(userName, password);
    axios
      .post("http://localhost:3400/api/admin/login", {
        userName: userName,
        password: password,
      })
      .then((res) => {
        navigate("/admin");
      });
  };

  return (
    <div className="login-img">
      <div className="login1">
        <div className="login2">
          <div className="center">
            <img src={icon} alt="" style={iconStyle} />
          </div>
          <form className="login" onSubmit={handlesubmit}>
            <div>
              <label htmlFor="">Username</label>
              <input
                type="text"
                id="user-username"
                className="form_login"
                value={userName}
                required
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input
                className="form_login"
                type="password"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <i className="bi bi-eye-slash" id="togglePassword"></i>
            </div>
            <div className="btns">
              <button type="submit" className="btn-style">
                sign in
              </button>
              <button
                className="btn-style"
                onClick={() => {
                  navigate("/");
                }}
              >
                cancle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
