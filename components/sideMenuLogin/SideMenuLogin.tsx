"use client";
import { toast } from "react-toastify";
import React, { useState, useEffect, Fragment, FC } from "react";
import { auth, db } from "../../config/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import logo from "../../images/Frame 34284.svg";
import { useRouter, usePathname } from "next/navigation";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { closeLoginModal } from "../../redux/slices/loginModalSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "../../utils/databaseService";
import FlatIcon from "../flatIcon/flatIcon";
import { useMediaQuery } from "@mui/material";
import { Menu } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import ReactCountryFlag from "react-country-flag";
import Loader from "../loader/Loader";

function SideMenuLogin({ isOpen, onClose, setShowLogin }) {
  const [email, setEmail] = useState<any>("");
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const queryClient = useQueryClient();
  const [time, setTime] = useState(60);
  const [OTP, setOTP] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);
  const [otpSent, setOTPSent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [showPhoneNumberInput, setShowPhoneNumberInput] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const pathName = usePathname();
  const matches = useMediaQuery("(max-width:767px)");
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),
  });

  const router = useRouter();

  const [allowedCountries, setAllowedCountries] = useState([
    {
      active: true,
      countryCode: "In",
      countryName: "India",
      currencyCode: "INR",
      dialCode: "+91",
    },
  ]);
  // const [dialcountry, setdialcountry] = useState<any>([{
  //   active : true,
  //   countryCode: "In",
  //   countryName: "India",
  //   currencyCode: "Rs",
  //   dialCode: "+91"
  // }
  // ]);

  const [dialcountry, setdialcountry] = useState<any>(
    allowedCountries?.filter((val) => val.currencyCode === "INR")[0]
  );
  // useEffect(() => {
  //     document.getElementById("otp1")?.focus();
  //   }, [OTPModal]);

  // const addUserToFirebase = async (user: any) => {
  //   // console.log(
  //   //   {phoneNo: "",createdAt: new Date(),active: true,lastAccessAt: new Date(),role: "user",name: name, email: email,dP: "assets/img/user-pic.gif",setFromUI: true, wallet: { "balance": 0, "cashback": 0, 'lastTransactions': {} }
  //   //   }
  //   // );
  //   try {
  //     await setDoc(
  //       doc(db, "users", user.uid),
  //       { phoneNo: phone, createdAt: new Date(), active: true, lastAccessAt: new Date(), role: "user", name: name, email: email, dP: "", setFromUI: true, wallet: { "balance": 0, "cashback": 0, 'lastTransactions': {} } }
  //     );
  //   } catch (error) {
  //     console.log(error, "error");
  //   }
  // };

  useEffect(() => {
    setTimeout(() => {
      if (timerStarted) {
        if (time === 1) {
          setTimerStarted(false);
          confirmOTP();
        }
        setTime((t) => t - 1);
      }
    }, 1000);
  }, [time]);
  const startTimer = () => {
    setTimerStarted(true);
    setTime((t) => t - 1);
  };
  const signInUserWithPhoneNumber = async () => {
    try {
      if (phoneNumber) {
        console.log("inside if");
        resendTimer();
        setLoading(true);
        const recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response: any) => {
              // console.log(response);
            },
          }
        );

        // console.log("after recaptchaVerifier ");
        // console.log(dialcountry,"dialcountry");

        const formattedPhoneNumber = `${dialcountry.dialCode}${phoneNumber}`;
        // console.log(formattedPhoneNumber);

        await signInWithPhoneNumber(
          auth,
          formattedPhoneNumber,
          recaptchaVerifier
        )
          .then((confirmationResult) => {
            console.log("inside then");
            // console.log("confirmationResult::::::::" ,confirmationResult );
            setOTPSent(confirmationResult);

            setLoading(false);
            startTimer();
            setShowOtp(true);
            // setShowPhoneNumberInput(false);
            toast.success("OTP sent successfully.");
            setDisableOtpSender(true);
            recaptchaVerifier.clear();
          })
          .catch((error) => {
            // if(error==="reCAPTCHA has already been rendered in this element"){
            //   console.log("fgfdh");

            // }
            let newErr = error;
            //  toast.error(error)
            // console.log(error + "...please reload");
            toast.error(`${error}`);
            setLoading(false);
          });
      } else {
        if (!phoneNumber) toast.error("Please enter phone number.");
        // console.log("Please enter both name and phone number");
        setLoading(false);
      }
    } catch (error) {
      console.log("CATCH ERROR ", error);
    }
  };

  const confirmOTP = () => {
    try {
      if (OTP === "") {
        setOTP("");
        setVerifying(false);
        toast.error("Please Enter OTP First !");
      } else {
        console.log("inside try");

        setTimerStarted(false);
        setVerifying(true);
        setLoading(true);
        otpSent
          .confirm(OTP)
          .then(async (res: any) => {
            // console.log(res, "User");
            localStorage.setItem("auth", JSON.stringify(res.user.uid));
            if (res._tokenResponse.isNewUser) {
              // console.log("new user");

              let newUser = {
                phoneNo: dialcountry.dialCode + phoneNumber,
                createdAt: new Date(),
                active: true,
                lastAccessAt: new Date(),
                role: "user",
                name: "",
                email: email,
                dP: "",
                setFromUI: true,
                wallet: { balance: 0, cashback: 0, lastTransactions: {} },
              };

              await setDoc(doc(db, `users/${res.user.uid}`), newUser, {
                merge: true,
              });
              toast.success("Login successfully.");
            } else {
              await setDoc(
                doc(db, `users/${res.user.uid}`),
                { lastAccessAt: new Date() },
                { merge: true }
              );
              toast.success("Login successfully.");
              // console.log("user already exist");
            }
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/login?uid=${res.user.uid}`
            );
            // await axios.get(`/api/login?uid=${res.user.uid}`);
            await queryClient.invalidateQueries({ queryKey: ["userData"] });
            await queryClient.refetchQueries({ queryKey: ["userData"] });
            dispatch(closeLoginModal());
            setVerifying(false);
            document.body.classList.remove("no-scroll");
            router.replace(pathName);
            setTime(60);
            setOTP("");
            setTimerStarted(false);
            setOTPSent(null);
            setLoading(false);
          })
          .catch((err: any) => {
            if (OTP === "") {
              setOTP("");
              setVerifying(false);
              toast.error("Please Enter OTP First !");
            } else {
              setOTP("");
              setVerifying(false);
              toast.error("Incorrect OTP! Sign In Failed!");
            }
            // console.log(err,"FROM CATCH");

            // console.log("Incorrect OTP! Sign in failed!");
          });
      }
    } catch (err) {
      console.log("error ", err);
    }
  };

  const [otpTimer, setOtpTimer] = useState(30);
  const [timerNotFunctional, setTimerFunctional] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [disableOptSender, setDisableOtpSender] = useState(false);

  const resendTimer = () => {
    setShowTimer(true);
    let num = 30;
    const myInterval = setInterval(function () {
      setOtpTimer(num--);
    }, 1000);
    setTimeout(() => {
      clearInterval(myInterval);
      setTimerFunctional(false);
    }, 31000);
  };

  return (
    <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm fixed top-0 left-0 z-50">
      <div
        className={`fixed  ${
          matches ? "left-0" : "right-0"
        } top-0 h-[100vh] z-30 md:w-[35vw] sm:w-[50vw]  w-full bg-white transform md:rounded-none rounded-tr-md${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform ease-in-out duration-700`}
      >
        <div className="flex items-center justify-end p-4">
          <div
            className="  bg-[#F6F3FA] rounded-full p-2 md:p-3"
            onClick={onClose}
          >
            <FlatIcon className="text-gray-600 cursor-pointer flaticon-close md:text-sm text-xs " />
          </div>
        </div>
        <div className="p-4 flex flex-col items-center justify-center h-[85%] ">
          <Image
            src={logo}
            alt=""
            width={1000}
            height={1000}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            className="md:w-[200px] sm:w-[175px] w-[150px] h-auto"
          />

          <div className="w-[90%] mobile-container tracking-widest text-center bg-primary md:py-[15px] py-2 md:text-base text-sm  text-[white] my-3 rounded-xl">
            Join us to get on EXTRA 10% OFF & more
          </div>

          <div className="text-xl font-semibold tracking-widest mb-4">
            LOGIN/SIGNUP
          </div>

          {/* <div className="font-bold sm:text-3xl text-xl mb-[30px]">Log In</div> */}
          <div></div>
          <div className="text-[#777777] w-[90%]  md:text-md lg:text-lg sm:text-base text-sm my-2">
            *Sign up/Login using Mobile Number
          </div>

          {/* code for login with phone number start  */}
          {showPhoneNumberInput && ( // Conditionally render phone number input and login button
            <div className="mb-[40px] w-[90%] mobile-container">
              <div className="flex w-full items-center ">
                <Menu
                  as="div"
                  className="w-[28%] relative text-left flex justify-center items-center  "
                >
                  <div className="flex justify-center items-center w-full">
                    <Menu.Button className="w-full px-[4px] sm:px-[6px] md:px-[8px] lg:px-[10px] py-[9px] sm:py-[11px] md:py-[13px] lg:py-[15px]   mb-[15px]  bg-gray-100 border  border-gray-100  ">
                      <div className="flex items-center gap-1 md:gap-2">
                        <ReactCountryFlag
                          countryCode={dialcountry?.countryCode}
                          svg
                        />
                        <h4 className="lg:text-base md:text-sm text-xs">
                          {dialcountry?.dialCode}
                        </h4>
                        <FlatIcon className="flaticon-arrow-down-2 text-xs md:text-sm" />
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="z-50 absolute left-0  top-full w-52 sm:w-48 lg:w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-[25vh] overflow-y-auto">
                      {allowedCountries?.map((country, id) => {
                        return (
                          <div className="px-1 py-1 " key={id}>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    setdialcountry(country);
                                  }}
                                  className={`${
                                    active
                                      ? "bg-primary text-white"
                                      : "text-gray-900"
                                  } group flex gap-4 w-full items-center rounded-md px-1 py-1 lg:px-2 lg:py-2 text-sm`}
                                >
                                  <ReactCountryFlag
                                    countryCode={country?.countryCode}
                                    svg
                                  />
                                  {/* {active ? "active" : "notActive"} */}
                                  {country?.dialCode}

                                  <h1 className=" line-clamp-1 text-left">
                                    {country?.countryName}
                                  </h1>

                                  {/* <ReactCountryFlag
                countryCode="US"
                svg
                style={{
                    width: '2em',
                    height: '2em',
                }}
                title="US"
            /> */}
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        );
                      })}
                    </Menu.Items>
                  </Transition>
                </Menu>

                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="w-full px-[5px] sm:px-[10px] md:px-[15px] lg:px-[20px] py-[9px] sm:py-[11px] md:py-[13px] lg:py-[15px] mb-[15px] outline-0 border border-gray-300 lg:text-base md:text-sm text-xs "
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    // console.log(e.target.value);
                  }}
                />
              </div>

              <div className="text-[#777777]  md:text-md lg:text-lg sm:text-base text-sm my-2">
                *Enter OTP
              </div>

              <div className=" w-full  flex justify-between">
                {showOtp ? (
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="rounded-xl w-[60%] px-[10px] md:px-[20px] md:py-[15px] py-2 md:text-base text-sm mb-[8px] md:mb-[15px] outline-0 border border-gray-300 "
                    id="otp"
                    value={OTP}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      setOTP(inputValue);
                    }}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="rounded-xl w-[60%] px-[10px] md:px-[20px] md:py-[15px] py-2 md:text-base text-sm mb-[8px] md:mb-[15px] outline-0 border border-gray-300 "
                    id="otp"
                    value={OTP}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      setOTP(inputValue);
                    }}
                    disabled
                  />
                )}
                {disableOptSender ? (
                  <>
                    <div className=" rounded-xl md:w-[35%]  lg:w-[30%] px-[10px] md:px-[10px] md:py-[15px] py-2 lg:text-base text-sm mb-[8px] md:mb-[15px] outline-0 border border-gray-300 bg-green-800 text-white text-center">
                      SENT
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      onClick={async () => {
                        await signInUserWithPhoneNumber();
                        // setPhoneNumber("");
                        // Hide phone number input and login button
                      }}
                      className="cursor-pointer rounded-xl md:w-[35%]  lg:w-[30%] px-[10px] md:px-[10px] md:py-[15px] py-2 lg:text-base text-sm mb-[8px] md:mb-[15px] outline-0 border border-gray-300 bg-black text-white text-center"
                    >
                      GET OTP
                    </div>
                  </>
                )}
                <div className="captcha-contain">
                  <div id="recaptcha-container"></div>
                </div>
              </div>
              {showTimer ? (
                timerNotFunctional ? (
                  <div className="text-sm mb-3 text-gray-400">
                    Did not get the OTP ?{" "}
                    <span className="text-blue-600">Resend</span> {otpTimer}s
                  </div>
                ) : (
                  <div className="text-sm mb-3 text-gray-400">
                    Did not get the OTP ?{" "}
                    <span
                      onClick={async () => {
                        await signInUserWithPhoneNumber();
                      }}
                      className="text-blue-600 cursor-pointer"
                    >
                      Resend
                    </span>{" "}
                  </div>
                )
              ) : (
                ""
              )}
              <div className="flex items-center">
                <input
                  style={{ accentColor: "black" }}
                  type="checkbox"
                  className=" mr-3 h-5 w-5 bg-black text-white text-xl"
                  value="1"
                />
                <div className="text-sm">
                  Agree to receive communication related to order and
                  promotional offers.
                </div>
              </div>

              <div
                onClick={() => confirmOTP()}
                className="text-center bg-primary my-2 mb-4 rounded-xl w-full md:py-[15px] py-2 md:text-base text-sm  text-[white] cursor-pointer"
              >
                {verifying ? "Verifying Otp" : "SIGN UP/LOGIN"}
              </div>
            </div>
          )}

          {/* {!showPhoneNumberInput && ( // Conditionally render OTP input and verify OTP button
            <div className="mb-[20px] w-[90%] otp-container">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full px-[10px] md:px-[20px] md:py-[15px] py-2 md:text-base text-sm mb-[8px] md:mb-[15px] outline-0 border border-gray-300 "
                id="otp"
                value={OTP}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setOTP(inputValue);
                }}
              />

              <div
                onClick={() => confirmOTP()}
                className="text-center bg-primary w-full md:py-[15px] py-2 md:text-base text-sm  text-[white] cursor-pointer"
              >
                {verifying ? "Verifying Otp" : "Proceed"}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default SideMenuLogin;
