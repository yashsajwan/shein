"use client";
import React, { useState, FC } from "react";
// import React from "react";
// import {u}
import whiteLogo from "../../images/Group 3.svg";
import Link from "next/link";
import logo from "../../images/Frame 34284.svg"
import Image from "next/image";
import smallLeaf from "../../images/Group 34147.svg";
import check from "../../images/Vector 28.svg";
import girlsImg from "../../images/beautiful-young-women-summer-fashion-concept 1.svg"
import { db, auth } from "../../config/firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import FlatIcon from "../flatIcon/flatIcon";
import googleImg from "../../images/google 1.svg"
import { toast } from "react-toastify";

interface Props {
  redirectToLogin?: any;
}
const Signup: FC<Props> = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [phone, setPhone] = useState("")
  const provider = new GoogleAuthProvider();
  const [googlePhone, setGooglePhone] = useState("")
  const [phoneNumModal, setPhoneNumModal] = useState(false)

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const addUserToFirebase = async (user: any) => {
    // console.log(
    //   {phoneNo: "",createdAt: new Date(),active: true,lastAccessAt: new Date(),role: "user",name: name, email: email,dP: "assets/img/user-pic.gif",setFromUI: true, wallet: { "balance": 0, "cashback": 0, 'lastTransactions': {} }
    //   }
    // );
    try {
      await setDoc(
        doc(db, "users", user.uid),
        { phoneNo: phone, createdAt: new Date(), active: true, lastAccessAt: new Date(), role: "user", name: name, email: email, dP: "", setFromUI: true, wallet: { "balance": 0, "cashback": 0, 'lastTransactions': {} } }
      );
    } catch (error) {
      console.log(error, "error");
    }
  };

  const signupHandler = () => {
    if(isChecked){
      if (email && password.length > 5 && name&&phone) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            await addUserToFirebase(user);
            await signInWithEmailAndPassword(auth, email, password)
              .then(async (val: any) => {
                await axios.get(`/api/login?uid=${user.uid}`);
                router.push("/");
                toast.success("Signed up successfully")
              })
              .catch((e) => {
                router.push("/login");
              });
            // ...
          })
          .catch((error) => {
            console.log("User already exists. Please login 9999999");
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
            // ..
          });
      } else {
        toast.error("plase fill details ")
        console.log("plase fill details ");
      }
    }else{
         console.log("plz agree first")
                  toast.error("Agree to terms and conditions first.")
    }
    
  };

  const handleSignUpWithGoogle = async (result) => {
    const user = result.user;
    console.log(user, "user from result-");
    console.log(result, "result");
    if (getAdditionalUserInfo(result).isNewUser) {
      console.log("sign up with google successfully");
      console.log(user, "user");
      await setDoc(
        doc(db, "users", user.uid),
        {
          phoneNo: googlePhone, createdAt: new Date(), active: true, lastAccessAt: new Date(), role: "user", name: user?.displayName,
          email: user?.email, dP: "", setFromUI: true, wallet: { "balance": 0, "cashback": 0, 'lastTransactions': {} }
        }
      );
      await axios.get(`/api/login?uid=${user.uid}`);
      router.push("/");
      toast.success("Signed up successfully.")

    } else {
      console.log("insile else");
      console.log("user already exist plz log in");
      router.push("/login");
    }
  }

  
  const signUpWithGoogle = async () => {
    if(isChecked){
      signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result, "result-------");
        handleSignUpWithGoogle(result)
        setPhoneNumModal((prev) => !prev);
      }).catch((error) => {
        console.log(error, "error");
        setPhoneNumModal((prev) => !prev);
      });
    }else{
      console.log("fdhgfdh");
      toast.error("Agree to terms and conditions first.")
      setPhoneNumModal((prev) => !prev);
      
    }
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     console.log(result, "result-------");
    //     handleSignUpWithGoogle(result)
    //   }).catch((error) => {
    //     console.log(error, "error");
    //   });
  }
  return (
    <>
      <div className=" flex w-full lg:my-0 my-6 ">
        <div className="lg:block hidden w-[50%]  "><Image src={girlsImg} alt="" width={1000} height={1000} className="w-full h-full object-cover" /></div>
        <div className="flex justify-center   md:w-[70%] lg:w-[50%] w-full mx-auto ">
          <div className="bg-white  lg:px-[15%] px-[7%] lg:py-[30px] py-[15px]  relative   w-[100%] log-in container   ">
            <div className="flex justify-center items-center lg:mt-[30px]  lg:mb-[20px] mb-[20px] "><Image src={logo} alt=""
              width={1000}
              height={1000}
              style={{
                aspectRatio: "auto",
                width: "150px",
                height: "auto",
              }}
            /></div>
            <h3 className="font-bold sm:text-lg text-base text-center">Elevate Your Look: Embrace the Latest Trends</h3>
            <div className="font-bold sm:text-2xl text-lg sm:mt-[50px] mt-[25px]">Create an account</div>
            <div className="text-[#3F3F3F] font-semibold text-sm mt-[20px]">
              Let&apos;s get started!
            </div>
            {/* code for login with email and password  */}
            <div className=" mt-[30px]">
              <input
                type="text"
                placeholder="Name"
                className=" w-full  px-[20px] py-[5px] outline-0"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className=" mt-[30px]">
              <input
                type="number"
                placeholder="Phone number"
                className=" w-full  px-[20px] py-[5px] outline-0"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className=" mt-[30px] email-container ">
              <input
                type="email"
                placeholder="Email"
                className=" w-full  px-[20px] py-[5px] outline-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="   mt-[30px] password-container ">
              <input
                type="password"
                placeholder="Password"
                className="  w-full px-[20px] py-[5px] outline-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Remember me code start  */}
            <div className="flex mt-[30px]  flex-grow sm:flex-row flex-col sm:gap-0 gap-5  justify-between  lg:mb-[50px] mb-[25px] md:items-center font-bold sm:text-sm text-sm">
              <div className="flex start gap-2">
                <div
                  className={`w-5 h-5 border-2 rounded-sm cursor-pointer flex justify-center items-center ${isChecked
                    ? "bg-primary border-primary"
                    : "bg-white border-gray-400"
                    }`}
                  onClick={() => toggleCheckbox()}
                >
                  {isChecked && (
                    <Image
                      src={check}
                      alt=""
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  )}
                </div>
                <div className="sm:text-sm text-xs w-fit">By signing in, You agree to our <span className=" text-primary">Terms and Conditions</span> and <span className=" text-primary">Privacy Policy.</span></div>
              </div>
            </div>
            <div
              onClick={() => {
                console.log(isChecked,"check");
                
                 signupHandler() 
                  // console.log("plz agree first")
                  // toast.error("Agree to terms and conditions first.")
                // setPhoneNumModal((prev)=>!prev);

              }}
              className=" text-center sm:text-lg text-base font-semibold bg-secondary py-[12px] text-[white] cursor-pointer"
            >Create an account</div>
            <div className="flex items-center justify-center gap-10 lg:my-[30px] my-[20px]">
              <div className="w-[25%] h-[0.2px] bg-[#dfdfdf]"></div>
              <span className="text-gray-600 sm:text-sm text-sm">OR</span>
              <div className="w-[25%] h-px bg-[#dfdfdf]"></div>
            </div>
            <div className="flex border-[1px] border-text-[#777777] items-center justify-center gap-3  py-[12px] lg:mb-[90px] mb-[45px] cursor-pointer"
              onClick={() => {
                // if(googlePhone&&isChecked){

                // }
                // (isChecked&&googlePhone)?signUpWithGoogle():
                setPhoneNumModal((prev) => !prev);
                console.log(isChecked,"check");
              }}>
            <div><Image src={googleImg} alt=""/></div>

              <div className="font-semibold sm:text-lg text-sm">
                Sign Up with Google
              </div>
            </div>
            <div className="flex justify-center items-center gap-1 font-bold sm:text-base text-sm">
              <div>Already have an account ?</div>
              <Link
                href={"/login"}
                className="text-primary cursor-pointer">Log In</Link>
            </div>
          </div>
        </div>
      </div>
      {phoneNumModal && <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-30 flex justify-center items-center">
        <div className="xl:w-[30%] md:w-[50%] w-[90%] sm:w-[70%] h-auto   px-5 py-5 flex flex-col justify-end gap-y-3">
          <div className="w-full flex justify-end items-center" onClick={() => {
            setPhoneNumModal((prev) => !prev);
          }}><button className="bg-white w-[20px] h-[20px] rounded-full flex justify-center items-center"><FlatIcon icon={"flaticon-close text-secondary font-bold text-[10px]"} /></button></div>
          <div className="flex flex-col gap-y-5 w-full h-auto  bg-white  px-5 py-5" >
            <h3 className="sm:text-lg text-base font-semibold text-center ">Please Enter Phone Number</h3>
            <input type="text" value={googlePhone} onChange={(e) => setGooglePhone(e.target.value)} className="border border-[#838383] w-full px-3 py-2 outline-0" placeholder="Phone number" />
            <div className="flex justify-center items-center bg-primary text-white sm:text-base text-sm font-medium py-2 cursor-pointer" onClick={async () => {
              signUpWithGoogle()
            }}><button>Ok</button></div>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default Signup;
