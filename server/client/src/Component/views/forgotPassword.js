import React,{useState} from 'react';

const ForgotPassowrd = () => {

    const [email, setEmail] = useState("");

    const handleInputs = (e) =>{

        setEmail(e.target.value);
    }

    const PostData = async (e) =>{
        e.preventDefault();
        console.log(email);
        const res = await fetch('http://localhost:5000/forgotPassword',{
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body:JSON.stringify({
            email
          })
        });
    }

    return (
        <>
    <h1>Forgot password</h1>
    <form>
        <label for="email">Email/Username</label>
        <input type="email" name="email" id="email" value={email} onChange={handleInputs}/>
        <br/>
        <input type="submit" value="submit" onClick={PostData}/>
    </form>
    </>
    )
}

export default ForgotPassowrd;
