import React from "react";
import axios from 'axios';

function updateComponent(props){
//state hooks 
    const {emailForm, setEmailForm, nameForm, setNameForm, lastNameForm, setLastNameForm, peselForm, setPeselForm, passwordForm, setPasswordForm, authToken} = props;
//options
const optionsUpdate = {
    method: 'post',
    url:`http://localhost:5000/api/users/update`,
    headers:{
      'x-auth-token':authToken,
      'Content-Type':'application/json',
    },
    data:{
        "name": nameForm,
        "lastName":lastNameForm,
        "pesel":peselForm,
        "email":emailForm,
    }
  }
//request
const updateUser = async () =>{
    const response = await axios(optionsUpdate);
    const data = response.data;
    console.log(data);
  }
// 
    return(
        <>
        <div className="pricing-plan">
            
            <h2 className="pricing-header">Edytuj klienta</h2>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="email" placeholder="Email Klienta" onInput={e => setEmailForm(e.target.value)}/>
            </div>
            <div className="input-field">
                <i className="fas fa-address-book"></i>
                <input type="text" placeholder="Imie" onInput={e => setNameForm(e.target.value)}/>
            </div>
            <div className="input-field">
                <i className="fas fa-address-book"></i>
                <input type="text" placeholder="Nazwisko" onInput={e => setLastNameForm(e.target.value)}/>
            </div>
            <div className="input-field">
                <i className="fas fa-address-card"></i>
                <input type="number" minlength="9" placeholder="PESEL" onInput={e => setPeselForm(e.target.value)}/>
            </div>
            <a href="#/" className="pricing-button" onClick={updateUser}>Wykonaj</a>
        </div>
        </>
    )
}

export default updateComponent;