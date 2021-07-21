import React,{useState} from 'react'
import '../App.css'
import { NavLink , useHistory} from 'react-router-dom'
function Signup() {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });
    let name,value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

    const PostData = async (e) => {
        e.preventDefault();

        const {name,email,phone,work,password,cpassword} = user;
        // console.log(user);

        const res = await fetch('/register' , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,email,phone,work,password,cpassword
            })
        })

        const data = await res.json();

        if(data.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }else{
            window.alert("Registration done");
            console.log("Registration done");

            history.push('/login');
        }
    }

    return (
        <>
            <div class="signup-form">
                <form method="POST" >
                <h2>Sign Up</h2>
                <p>Please fill in this form to create an account!</p>
                <hr />
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <span class="fa fa-user"></span>
                            </span>
                        </div>
                        <input type="text" class="form-control" name="name" placeholder="Name" 
                        value={user.name}
                        onChange={handleInputs}
                        required="required" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fa fa-paper-plane"></i>
                            </span>
                        </div>
                        <input type="email" class="form-control" name="email" placeholder="Email Address" 
                        value={user.email}
                        onChange={handleInputs}
                        required="required" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                            <i class="fa fa-phone"></i>
                            </span>
                        </div>
                        <input type="number" class="form-control" name="phone" placeholder="Phone Number" 
                        value={user.phone}
                        onChange={handleInputs}
                        required="required" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                            <i class="fa fa-briefcase"></i>
                            </span>
                        </div>
                        <input type="text" class="form-control" name="work" placeholder="Your Profession" 
                        value={user.work}
                        onChange={handleInputs}
                        required="required" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fa fa-lock"></i>
                            </span>
                        </div>
                        <input type="password" class="form-control" name="password" placeholder="Password" 
                        value={user.password}
                        onChange={handleInputs}
                        required="required" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="fa fa-lock"></i>
                                <i class="fa fa-check"></i>
                            </span>
                        </div>
                        <input type="password" class="form-control" name="cpassword" placeholder="Confirm Password" 
                        value={user.cpassword}
                        onChange={handleInputs}
                        required="required" />
                    </div>
                </div>
                
                <div class="form-group">
                    <input type="submit" id="submit" class="btn btn-primary btn-lg" value="register"
                    onClick={PostData}/>
                </div>
                </form>

                <div class="text-center">Already have an account? <NavLink to="/login">Login here</NavLink></div>

            </div>

        </>
    )
}

export default Signup
