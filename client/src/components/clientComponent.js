import React from "react";
import axios from 'axios';
// import '../styles/userTerminal.css';


function clientComponent(props){
  const {authToken, money, setAmount, amount, transferEmail, setTransferEmail} = props
  const optionsTransfer = {
    method: 'post',
    url:`http://localhost:5000/api/transactions/transfer`,
    headers:{
      'x-auth-token':authToken,
      'Content-Type':'application/json',
    },
    data:{
      'amount':amount,
      'email':transferEmail,
    }
  }

  const optionsDeposit = {
    method: 'post',
    url:`http://localhost:5000/api/transactions/deposit`,
    headers:{
      'x-auth-token':authToken,
      'Content-Type':'application/json'
    },
    data:{
      'amount':amount,
    }
  }
  const optionsWithdraw = {
    method: 'post',
    url:`http://localhost:5000/api/transactions/withdraw`,
    headers:{
      'x-auth-token':authToken,
      'Content-Type':'application/json'
    },
    data:{
      'amount':amount,
    }
  }
  //transfer
  const transferMoney = async () =>{
    const response = await axios(optionsTransfer);
    const data = response.data;
    console.log(data);
  }

  //depo
  const depositMoney = async () =>{
    console.log(optionsDeposit);
    const response = await axios(optionsDeposit);
    const data = response.data;
    console.log(data);
  }
  //withdraw
  const withdrawMoney = async () =>{
    const response = await axios(optionsWithdraw);
    const data = response.data;
    console.log(data);
  }
  //wpierdolić z propsów user.money
  //setters
  // const setAmount = (val) =>{
  //   amountMoney = val;
  // }

    return(
        <>
        <div className="pricing-plan">       
              <h2 className="pricing-header">Ilość gotówki</h2>
              <div >
                {money}
            </div>
          </div>
          
          <div className="pricing-plan">
              
              <h2 className="pricing-header">Przelej pieniądze</h2>
              <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input type="email" placeholder="Email adresata" onInput={e => setTransferEmail(e.target.value)}/>
                </div>
                <div className="input-field">
                  <i className="fas fa-money-bill-wave-alt"></i>
                  <input type="number" placeholder="Ilość pieniędzy" onInput={e => setAmount(e.target.value)}/>
                </div>
              <a href="#/" className="pricing-button" onClick={transferMoney}>Wykonaj</a>
          </div>

          <div className="pricing-plan">
            
              <h2 className="pricing-header">Wypłać środki</h2>
              <div className="input-field">
                  <i className="fas fa-money-bill-wave-alt"></i>
                  <input type="number" placeholder="Ilość pieniędzy" onInput={e => setAmount(e.target.value)}/>
                </div>

              <a href="#/" className="pricing-button" onClick={withdrawMoney}>Wykonaj</a>
          </div>

          <div className="pricing-plan">
              <h2 className="pricing-header">Dokonaj wpłaty</h2>
              <div className="input-field">
                  <i className="fas fa-money-bill-wave-alt"></i>
                  <input type="number" placeholder="Ilość pieniędzy" onInput={e => setAmount(e.target.value)}/>
              </div>
              <a href="#/" className="pricing-button" onClick={depositMoney}>Wykonaj</a>
          </div>
        </>
    )
}

export default clientComponent;