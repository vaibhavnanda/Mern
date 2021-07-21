import React, {useEffect, useState} from 'react'
import {useHistory, NavLink} from 'react-router-dom'
import profilePic from '../images/profilePic.jpg';
import aboutPic from '../images/aboutPic.png';
function About() {
	const history = useHistory();
	const [userData,setUserData] = useState({});

	const callAboutPage = async () => {
		try {
			const res = await fetch('/about', {
				method: "GET",
				headers: {
					Accept: "applicaton/json",
					"Content-Type": "application/json"
				},
				credentials: "include"
			});
			
			const data = await res.json();
			console.log(data);

			setUserData(data);

			if(!res.status === 200) {
				const error = new Error(res.error);
				throw error;
			}


		}catch(err){
			console.log(err);
			history.push('/login');
		}
	}

	useEffect(() => {
		callAboutPage();
		//  eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

    return (
		<>
        <div>
			<form method="GET">
          <h2>About Me</h2>
<div id="myCarousel" className="carousel slide" data-ride="carousel">
	
	<ol className="carousel-indicators">
		<li data-target="#myCarousel" data-slide-to="0" className="active"></li>
		<li data-target="#myCarousel" data-slide-to="1"></li>
	</ol>   

	<div className="carousel-inner" id="myCarousel0">		
		<div className="carousel-item active">
			<div className="img-box"><img src={userData.name === "vaibhav" ? profilePic : aboutPic} alt=""/></div><br></br>
			<p className="overview"><b>{userData.name}</b>{userData.email}</p>
		</div>
		<div className="carousel-item" id="myCarousel1">
			<div className="img-box"><img src={userData.name === "vaibhav" ? profilePic : aboutPic} alt=""/></div>
			<p className="overview"><b>{userData.name}</b>{userData.work}<br/>{userData.phone}</p>
		</div>		
	</div>

	<NavLink className="carousel-control-prev" to="#myCarousel0" data-slide="prev">
		<i className="fa fa-angle-left"></i>
	</NavLink>
	<NavLink className="carousel-control-next" to="#myCarousel1" data-slide="next">
		<i className="fa fa-angle-right"></i>
	</NavLink>
</div>
</form>
        </div>
		</>
    )
}

export default About
