import React, {useState} from "react";
import Logo from '../media/logo.svg';
import AddComponent from '../components/addComponent';
import UpdateComponent from '../components/updateComponent';
import '../styles/adminTerminal.scss'
function adminTerminal(props) {
  const { authToken } = props;
  const [emailForm, setEmailForm] = useState(props?.emailForm || '');
  const [nameForm, setNameForm] = useState(props?.nameForm || '');
  const [lastNameForm, setLastNameForm] = useState(props?.lastNameForm || '');
  const [peselForm, setPeselForm] = useState(props?.peselForm || '');
  const [passwordForm, setPasswordForm] = useState(props?.passwordForm || '');
  //
  return (
    <>
    <img src={Logo} />
    <div className="panel">
     <UpdateComponent emailForm={emailForm} setEmailForm={setEmailForm} nameForm={nameForm} setNameForm={setNameForm} lastNameForm={lastNameForm} setLastNameForm={setLastNameForm} peselForm={peselForm} setPeselForm={setPeselForm} authToken={authToken}/>
     <AddComponent emailForm={emailForm} setEmailForm={setEmailForm} nameForm={nameForm} setNameForm={setNameForm} lastNameForm={lastNameForm} setLastNameForm={setLastNameForm} peselForm={peselForm} setPeselForm={setPeselForm} passwordForm={passwordForm} setPasswordForm={setPasswordForm}/>
    </div>
    </>
  );
}

export default adminTerminal;
