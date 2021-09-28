import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {

  const newPasswordInputRef = useRef ();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    const enetredNewPassword = newPasswordInputRef.current.value;
  
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAcOXIDp0UnB1l9OGboU7mDupzr4KxnQ2s',{
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enetredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then(res => {
      history.replace("/");
    }).then()
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' ref={newPasswordInputRef} minLength="7" id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
