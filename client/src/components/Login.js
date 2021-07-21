import React, {useState, useContext} from 'react'
import { NavLink , useHistory} from 'react-router-dom'
import {UserContext} from '../App'

function Login() {

    const {state,dispatch} = useContext(UserContext);

    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();


        const res = await fetch('/signin' , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await res.json();

        if(data.status === 400 || !data){
            window.alert("Incorrect credentials");
        }else{
            dispatch({type:"USER" , payload:true});

            window.alert("Login successful");

            history.push('/');
        }
    }


    return (
        <>
       <div class="login-form">
    <form method="POST">
        <h2 class="text-center">Log in</h2>   
        <div class="form-group">
        	<div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <span class="fa fa-user"></span>
                    </span>                    
                </div>
                <input type="text" class="form-control" name="username" 
                value={email}
                onChange={(e) => setEmail(e.target.value) }
                placeholder="Username" required="required"/>				
            </div>
        </div>
		<div class="form-group">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="fa fa-lock"></i>
                    </span>                    
                </div>
                <input type="password" class="form-control" name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value) }
                placeholder="Password" required="required"/>				
            </div>
        </div>        
        <div class="form-group">
            <input type="submit" class="btn btn-primary login-btn btn-block" value="Login"
            onClick={loginUser}
            />
        </div>
        <div class="clearfix">
            <label class="float-left form-check-label"><input type="checkbox"/> Remember me</label>
            <NavLink to="#" class="float-right">Forgot Password?</NavLink>
        </div>
		<div class="or-seperator"><i>or</i></div>
        <p class="text-center">Login with your social media account</p>
        <div class="text-center social-btn">
            <NavLink to="/" class="btn btn-secondary"><i class="fa fa-facebook"></i>&nbsp; Facebook</NavLink>
            <NavLink to="/" class="btn btn-info"><i class="fa fa-twitter"></i>&nbsp; Twitter</NavLink>
			<NavLink to="/" class="btn btn-danger"><i class="fa fa-google"></i>&nbsp; Google</NavLink>
        </div>
    </form>
    <p class="text-center text-muted small">Don't have an account? <NavLink to="/signup">Sign up here!</NavLink></p>
</div>
        </>
    )
}

export default Login
