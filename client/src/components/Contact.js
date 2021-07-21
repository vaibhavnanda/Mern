import React, {useState, useEffect,NavLink} from 'react'

const Contact = () => {

	const [userData,setUserData] = useState({name:"",email:"",phone:"",message:""});

	const userContact = async () => {
		try {
			const res = await fetch('/getdata', {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});
			
			const data = await res.json();

			setUserData({...userData,name:data.name, email:data.email, phone:data.phone, message: data.message});

			if(!res.status === 200) {
				const error = new Error(res.error);
				throw error;
			}


		}catch(err){
			console.log(err);
		}
	}

	useEffect(() => {
		userContact();
		//  eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

    const handleInputs = (e) => {
        const name = e.target.name;
        const  value = e.target.value;

        setUserData({...userData,[name]:value});

    }

    const contactForm = async (e) => {
        e.preventDefault();

        const {name,email,phone,message} = userData;

        const res = await fetch('/contact',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,email,phone,message
            })
        })

        const data = await res.json();

        if(!data){
            console.log("Message not sent");
        }else{
            alert("Message sent");
            setUserData({...userData, message:""});
        }
    }


    return (
        <>
       <div class="login-form">
    <form method="POST">
        <h2 class="text-center">Contact Us</h2>   
        <div class="form-group">
        	<div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        Name:
                    </span>                    
                </div>
                <input type="text" class="form-control" name="name" 
                onChange={handleInputs}
                value={userData.name}
                placeholder="Name" required="required"/>				
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        Email: 
                    </span>                    
                </div>
                <input type="text" class="form-control" name="email" 
                onChange={handleInputs}
                value={userData.email}
                placeholder="Email" required="required"/>				
            </div>
        </div>  
		<div class="form-group">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        Phone:
                    </span>                    
                </div>
                <input type="text" class="form-control" name="phone" 
                onChange={handleInputs}
                value={userData.phone}
                placeholder="Phone" required="required"/>				
            </div>
        </div>  
        <div class="form-group">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        Message:
                    </span>                    
                </div>
                <input type="text" class="form-control" name="message" 
                onChange={handleInputs}
                value={userData.message}
                placeholder="Message" required="required"/>				
            </div>
        </div>       
        <div class="form-group">
            <input type="submit" class="btn btn-primary login-btn btn-block" value="Send message"
            onClick={contactForm}
            />
        </div>
        
    </form>
</div>
        </>
    )
}

export default Contact;