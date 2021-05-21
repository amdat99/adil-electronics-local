import React,{useState} from 'react';

function Register({signUpPending}) {

    const[signUpData,setSignUpData] = useState({ userName:'', password:'',confirmPassword:''})
    
    const handleSubmit = async (event) => {
        event.preventDefault();
     
    const {password,confirmPassword}= signUpData

        if (
          password !== confirmPassword &&
          password.length &&
          confirmPassword.length < 6
        ) {
          alert("passwords error, make sure you password has 6 characters");
          return;
        }
        signUpPending(signUpData);
        // if (error !== null) {
        //   alert(error);
        // }
      };
    
      const handleChange = (event) => {
        const { value, name } = event.target;
    
        setSignUpData({ ...signUpData, [name]: value });
      };
    
     const {userName, password,confirmPassword} =signUpData
        return (
          <div className="register">
            <form className="sign-on-container" onSubmit={handleSubmit}>
    
    
              <input
                className="sign-on-input"
                type="text"
                name="userName"
                placeholder="enter a username:"
                value={userName}
                onChange={handleChange}
                label={userName}
                required
              />
    
    
              <input
                className="sign-on-input"
                type="password"
                name="password"
                placeholder="enter your password"
                value={password}
                onChange={handleChange}
                label="Password"
                required
              />
              <input
                className="sign-on-input"
                type="password"
                name="confirmPassword"
                placeholder="reenter your password "
                value={confirmPassword}
                onChange={handleChange}
                label="Confirm Password"
                required
              />
    
              <button type="submit">SIGN UP</button>
            </form>
          </div>
        );
      }
    

export default Register;