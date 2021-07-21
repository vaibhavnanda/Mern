import React,{useState,useEffect} from 'react'

const Home = () => {

    const [userName,setUserName] = useState("");
    const [show, setShow] = useState(false);

	const userHomePage = async () => {
		try {
			const res = await fetch('/getdata', {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});
			
			const data = await res.json();

			setUserName(data.name);
            setShow(true);


		}catch(err){
			console.log(err);
		}
	}

	useEffect(() => {
		userHomePage();
		//  eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

    return (
        <>
        <div>
            <h2>Welcome!</h2>
            <h1>{show? userName + ", Happy to see you back" : "Hello Guest!"}</h1>
        </div>
        </>
    )
}

export default Home;