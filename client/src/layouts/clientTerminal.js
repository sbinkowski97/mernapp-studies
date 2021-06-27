import React, {useState} from "react";
import Logo from '../media/logo.svg';
import ClientComponent from '../components/clientComponent'
import '../styles/userTerminal.scss'
function clientTerminal(props) {
const { money, authToken } = props;
const [amount, setAmount] = useState(props?.amount || '');
const [transferEmail, setTransferEmail] = useState(props?.transferEmail || '');
  return (
    <>
    <img src={Logo} />
      <div className="panel">
        <ClientComponent money={money} authToken={authToken} amount={amount} transferEmail={transferEmail} setTransferEmail={setTransferEmail} setAmount={setAmount}/>
      </div>
    </>
  );
}

export default clientTerminal;
