import React from "react";
import Logo from '../media/logo.svg';
import "../styles/main.scss";
import {Link, useHistory} from 'react-router-dom';

function loginPage(props) {
  const {email, password, onChangeEmail, onChangePassword, onSubmitLogin} = props;
  return (
    <>
    
      <div className="container"></div>

      <div className="forms-container">
        <img src={Logo} alt="jd" />
        <div className="signin-signup">
          <form action="" className="sign-in-form">
            <h2 className="title">Witamy w banku BinKow!</h2>
            <div className="input-field">
            <i className="fas fa-user"></i>
              <input type="email" placeholder="Email" value={email} onChange={onChangeEmail}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Hasło" value={password} onChange={onChangePassword}/>
            </div>
            <input type="submit" className="btn solid" value="Zaloguj" onClick={onSubmitLogin} />
            
          </form>
        </div>
      </div>

    </>
  );
}

export default loginPage;
