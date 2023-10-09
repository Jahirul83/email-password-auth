import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        // console.log(e);
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setSuccess('');
        setRegisterError('');


        // add validation
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User Logged in successful');
                if(result.user.emailVerified){
                    setSuccess("Logged In successful");
                }
                else
                {
                    alert("Please verify your email address")
                }
            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message);
            })


    }
    const handelForgetPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            
            console.log("please provide an email address",email);
            return;
        }
        else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
            console.log("Please write a valid email");
            return;

        }

        // send validation email
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert("please check your email")
        })
        .catch(error =>{
            console.log(error);
        })

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                 placeholder="email" 
                                 ref={emailRef}
                                 name="email" 
                                 className="input input-bordered" 
                                 required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                                <label className="label">
                                    <a onClick={handelForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            registerError && <p className="text-red-600">{registerError}</p>
                        }
                        {
                            success && <p className="text-green-600">{success}</p>
                        }
                        <p>Don`t have an account? <Link to="/register">Please Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;