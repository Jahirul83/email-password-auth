import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";




const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [show, setShow] = useState(false)
    const handleSubmit = e => {
        e.preventDefault();
        // console.log("clicked");
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name,email,password,accepted)

        setRegisterError('');
        setSuccess('')

        // console.log(email, password);
        if (password.length < 6) {
            setRegisterError("Password should be at least 6 characters.");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError("Password should have minimum one uppercase character.");
            return;
        }
        else if(!accepted){
            setRegisterError("Please accept our terms and conditions.");
            return;

        }

        // clear error message

        // create user

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User Registration successful');

                // update profile
                updateProfile(result.user,{
                    displayName: name, 
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(()=>console.log("Profile updated"))
                .catch()

                // email verification

                sendEmailVerification(result.user)
                .then(()=>{
                    alert("Please check your email")
                })
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            })

    }
    // const handlePasswordShow =()=>{
    //    setShow(!show);
    // }
    return (
        <div className="">
            <div className="mx-auto w-3/4 md:w-3/6 lg:w-3/12">
                <h2 className="text-3xl mb-8">register now</h2>
                <form onSubmit={handleSubmit}>
                    <input className="mb-4 w-full py-2 px-4" type="text" placeholder="Your Name" name="name" id="" required />
                    <input className="mb-4 w-full py-2 px-4" type="email" placeholder="Email address" name="email" id="" required />
                    <br />

                    <div className="mb-4 relative border">
                        <input className=" w-full py-2 px-4"
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            id=""
                            required />
                        <span className="absolute top-3 right-2" onClick={() => setShow(!show)}>
                            {
                                show ? <AiFillEye /> : <AiFillEyeInvisible />
                            }
                        </span>
                    </div>
                    {/* <br /> */}
                    <div className="mb-4">
                        <input type="checkbox" name="terms" id="" />
                        <label className="ml-2" htmlFor="terms">Accept our <a href="">terms and conditions</a></label>
                        <br />
                    </div>
                    <input className="btn btn-secondary mb-4 w-full" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-600">{registerError}</p>
                }
                {
                    success && <p className="text-green-600">{success}</p>
                }
                <p>Already have an account? <Link to="/login">Please Login</Link></p>
            </div>
        </div>
    );
};

export default Register;