import React from "react";
import axios from 'axios';
function addComponent(props){
    //state hooks
    const {emailForm, setEmailForm, nameForm, setNameForm, lastNameForm, setLastNameForm, peselForm, setPeselForm, passwordForm, setPasswordForm} = props;
    //add options
    const optionsAdd = {
        method: 'post',
        url:`http://localhost:5000/api/users`,
        headers:{
          'Content-Type':'application/json',
        },
        data:{
            "name": nameForm,
            "lastName":lastNameForm,
            "pesel":peselForm,
            "email":emailForm,
            "password": passwordForm
        }
      }

    //request
    const addUser = async () =>{
        const response = await axios(optionsAdd);
        const data = response.data;
        console.log(data);
      }
    //setters
    return(
        <>
        <div className="pricing-plan">
        <h2 className="pricing-header">Dodaj Klienta</h2>
        <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="email" placeholder="Email Klienta" onInput={e => setEmailForm(e.target.value)} />
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
            <input type="number" minlength="8" placeholder="Pesel" onInput={e => setPeselForm(e.target.value)}/>
        </div>
        <div className="input-field">
            <i className="fas fa-address-card"></i>
            <input type="password" minlength="8" placeholder="Hasło" onInput={e => setPasswordForm(e.target.value)}/>
        </div>
        <a href="#/" className="pricing-button" onClick={addUser}>Wykonaj</a>
        </div>
        </>
    )
}

export default addComponent;