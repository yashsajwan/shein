"use client";
import React, { useState, useEffect, FC } from "react";
import whiteLogo from "../../images/Group 3.svg";
import Image from "next/image";
import smallLeaf from "../../images/Group 34147.svg";
import check from "../../images/Vector 28.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import girlsImg from "../../images/beautiful-young-women-summer-fashion-concept 1.svg";
import logo from "../../images/Frame 34284.svg";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useQueryClient } from "@tanstack/react-query";
// import {  signInWithPopup,  } from "firebase/auth";
import googleImg from "../../images/google 1.svg"

interface Props {
  createAccountClickHandler?: any;
}
const LoginPage: FC<Props> = () => {
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [OTPModal, setOTPModal] = useState(false);
  const [loginModal, setLoginModal] = useState(true);
  const [time, setTime] = useState(60);
  const [OTP, setOTP] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);
  const [otpSent, setOTPSent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();
  const [privacyCheck, setPrivacyCheck] = useState<any>(false);
  const provider = new GoogleAuthProvider();

  const handleCreateAccountClick = () => {
    router.push("/signup"); // Replace 'signup' with your actual signup page route
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const loginHandler = () => {
    console.log("hii");

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          await setDoc(
            doc(db, "users", user.uid),
            { lastAccessAt: new Date() },
            { merge: true }
          );
          await axios.get(`/api/login?uid=${user.uid}`);
          await queryClient.invalidateQueries({ queryKey: ["userData"] });
          await queryClient.refetchQueries({ queryKey: ["userData"] });
          router.replace("/");
          console.log("login successfully");
          // toast.success("Login successfully !")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (error.code === "auth/wrong-password") {
            console.log("wrong password");
          } else if (error.code === "auth/user-not-found") {
            console.log("New user please signup.");
          } else {
            console.log(errorMessage);
          }
        });
    } else {
      if (email === "" || password === "") {
        console.log("fill details");
        // toast.success("Please fill details")
      }
    }
  };
  const handleLoginWithGoogle = async (result: any) => {
    const user = result.user;
    console.log(user, "user from result-");
    console.log(result, "result");
    if (getAdditionalUserInfo(result).isNewUser) {
      console.log("new user plz signup first");
      // router.push("/signup");
    } else {
      console.log("insile else");
      await setDoc(
        doc(db, "users", user.uid),
        { lastAccessAt: new Date() },
        { merge: true }
      );
      await axios.get(`/api/login?uid=${user.uid}`);
      console.log("sign successfukllly with google");
      toast.success("Logged in successfully.")
      router.push("/");
    }
  };
  const loginWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result, "result-------");
        handleLoginWithGoogle(result);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  // co
  return (
    <div className=" flex w-full lg:my-0 my-6 ">
      <div className="lg:block hidden w-[50%]  ">
        <Image
          src={girlsImg}
          alt=""
          width={1000}
          loading="eager"
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center   md:w-[70%] lg:w-[50%] w-full mx-auto ">
        <div className="bg-white  lg:px-[15%] px-[7%] lg:py-[30px] py-[15px]  relative   w-[100%] log-in container   ">
          <div className="flex justify-center items-center lg:mt-[30px]  lg:mb-[20px] mb-[20px] ">
            <Image
              src={logo}
              alt=""
              width={1000}
              height={1000}
              style={{
                aspectRatio: "auto",
                width: "150px",
                height: "auto",
              }}
            />
          </div>
          <h3 className="font-bold sm:text-lg text-base text-center">
            Elevate Your Look: Embrace the Latest Trends
          </h3>
          <div className="font-bold sm:text-2xl text-lg sm:mt-[50px] mt-[25px]">
            Log In
          </div>
          <div className="text-[#3F3F3F] font-semibold text-sm mt-[20px]">
            Please Enter Details.
          </div>
          {/* code for login with email and password  */}
          <div className=" mt-[30px] email-container ">
            <input
              type="email"
              placeholder="Email"
              className=" w-full  px-[20px] py-[5px] outline-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="   mt-[30px] password-container lg:mb-[50px] mb-[25px] ">
            <input
              type="password"
              placeholder="Password"
              className="  w-full px-[20px] py-[5px] outline-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Remember me code start  */}
          {/* <div className="flex mt-[30px]  flex-grow sm:flex-row flex-col sm:gap-0 gap-5  justify-between  lg:mb-[50px] mb-[25px] md:items-center font-bold sm:text-sm text-sm">
            <div className="flex items-center gap-2">
              <div
                className={`w-5 h-5 border-2 rounded-sm cursor-pointer flex justify-center items-center ${isChecked
                    ? "bg-primary border-primary"
                    : "bg-white border-gray-400"
                  }`}
                onClick={toggleCheckbox}
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
              <div className="sm:text-sm text-xs">Remember Me</div>
            </div>
          </div> */}
          {/* Remember me code  end*/}

          <div
            // onClick={loginHandler}
            onClick={async () => {
              loginHandler();
            }}
            className=" text-center sm:text-lg text-base font-semibold bg-secondary py-[12px] text-[white] cursor-pointer"
          >
            Login
          </div>
          {/* code for login with email and password start  */}
          <div className="flex items-center justify-center gap-10 lg:my-[30px] my-[20px]">
            <div className="w-[25%] h-[0.2px] bg-[#dfdfdf]"></div>
            <span className="text-gray-600 sm:text-sm text-sm">OR</span>
            <div className="w-[25%] h-px bg-[#dfdfdf]"></div>
          </div>
          <div
            className="flex border-[1px] border-text-[#777777] items-center justify-center gap-3  py-[12px] lg:mb-[30px] mb-[20px] cursor-pointer"
            onClick={() => loginWithGoogle()}
          >
            <div><Image src={googleImg} alt=""/></div>
            <div className="font-semibold sm:text-lg text-sm">
              Log In with Google
            </div>
          </div>
          <div className="flex items-start gap-3 lg:mb-[90px] mb-[45px]  w-full h-auto">
            {/* <div
              className={`w-5 h-5 border-2 rounded-sm cursor-pointer flex justify-center items-center ${isChecked
                  ? "bg-primary border-primary"
                  : "bg-white border-gray-400"
                }`}
              onClick={toggleCheckbox}
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
            </div> */}
            {/* <div className="sm:text-sm text-xs w-fit font-bold">By signing in, You agree to our <span className=" text-primary">Terms and Conditions</span> and <span className="text-primary">Privacy Policy.</span></div> */}
          </div>
          <div className="flex justify-center items-center gap-1 font-bold sm:text-base text-sm">
            <div>Don&apos;t have an account ?</div>
            <Link href={"/signup"} className="text-primary cursor-pointer">
              Sign Up
            </Link>
          </div>
          {/* code for login with email and password end  */}

          {/* code for otp modal start  */}
          {/* {OTPModal && (
            <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 flex flex-col justify-center items-center z-30">
              <div
                className={` p-[30px] rounded-md bg-white w-[550px] max-w-[93%] md:px-[100px] border-box relative modalAnimation`}
              >
                <div
                  onClick={() => setOTPModal(false)}
                  className="bg-white cursor-pointer right-0 top-[-35px] rounded-full p-[2px] absolute"
                >
                  cross icon
                </div>
                <h1 className="text-2xl md:text-3xl font-semibold text-center min-w-fit">
                  Enter Verification Code
                </h1>
                <div className="text-[#ababab] text-sm mb-[20px] font-medium text-center">
                  We have sent you a 6 digit OTP on ghgf{" "}
                </div>
                <div>{phoneNumber} gfdg</div>
                <div className="w-full flex justify-center items-center mb-[10px]">
                  {[1, 2, 3, 4, 5, 6].map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      pattern="\d*"
                      maxLength={1}
                      className="m-[5px] md:m-[10px] p-[5px] md:p-[10px] caret-[#fb5353] outline-none border-2 rounded-md focus:border-[#21c93c] w-[35px] md:w-[50px] flex justify-center items-center text-center"
                      id={`${"otp" + digit}`}
                      onChange={(e) => {
                        if (e.target.value) {
                          document
                            .getElementById(`${"otp" + (digit + 1)}`)
                            ?.focus();
                          let otp = OTP;
                          setOTP(
                            otp.substring(0, digit - 1) +
                              e.target.value +
                              otp.substring(digit)
                          );
                        } else {
                          let otp = OTP;
                          setOTP(
                            otp.substring(0, digit - 1) +
                              " " +
                              otp.substring(digit)
                          );
                        }
                      }}
                    />
                  ))}
                </div>
                <div className="text-[#21c93c] font-semibold mb-[30px] text-center">
                  00:{time > 9 ? time : "0" + time}
                </div>
                <div
                  onClick={() => confirmOTP()}
                  className="bg-[#21c93c] w-full text-center  py-2 px-4 rounded-md text-white"
                >
                  {verifying ? "Verifying Otp" : "Proceed"}
                </div>
              </div>
            </div>
          )} */}
          {/* code for otp modal end  */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
