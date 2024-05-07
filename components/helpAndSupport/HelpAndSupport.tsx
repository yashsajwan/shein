import React,{useState,useEffect} from 'react'

const HelpAndSupport = () => {
  const [isClient, setIsClient] = useState(false);

    const [state, setState] = useState({
       
        address:  "",
        email: "",
        phone: "",
        about:  "",
        // currPassword: "",
        // newPassword: "",
      });
      const onContactUsHandler=()=>{
        
      }
  return (
    <div className="w-full ">
    <div className="flex md:flex-row flex-col gap-4 w-full mb-5">
      {/* <div className="md:w-[50%] w-full flex flex-col gap-3 ">
        <label className="text-[#555555] font-medium text-sm">
          First Name*
        </label>
        <input className="py-3 border-[1px] border-[#838383] outline-0 px-3 "
          value={state.firstName} onChange={(e) => setState({ ...state, firstName: e.target.value })} />
      </div> */}
   
    </div>
    <div className="flex md:flex-row flex-col gap-4 w-full mb-5">
      <div className="md:w-[50%] w-full flex flex-col gap-3 ">
        <label className="text-[#555555] font-medium text-sm">
          Email Address*
        </label>
        <input className="py-3 border-[1px] border-[#838383] outline-0 px-3"
          value={state?.email} onChange={(e) => setState({ ...state, email: e.target.value })} />
      </div>
      <div className="md:w-[50%] w-full flex flex-col gap-3 ">
        <label className="text-[#555555] font-medium text-sm">
          Phone No.
        </label>
        <input className="py-3 border-[1px] border-[#838383] outline-0 px-3"
          value={state?.phone} onChange={(e) => setState({ ...state, phone: e.target.value })} />
      </div>
    </div>
    <div className="md:w-[100%] w-full flex flex-col gap-3 ">
        <label className="text-[#555555] font-medium text-sm">
          Address
        </label>
        <input className="py-3 border-[1px] border-[#838383] outline-0 px-3"
          value={state.address} onChange={(e) => setState({ ...state, address: e.target.value })} />
      </div>
    {/* <div className="w-full  flex flex-col gap-3 mb-5">
      <label htmlFor="" className="text-[#555555] font-medium">
        About Me
      </label>
      <textarea
        value={state.about} onChange={(e) => setState({ ...state, about: e.target.value })}
        name=""
        id=""
        className=" border-[1px] border-[#838383] w-full outline-0 px-3 py-2"
        rows={4}
      ></textarea>
    </div> */}
  
    <div className="bg-secondary text-white text-center  py-3  text-sm font-medium cursor-pointer mt-10"
      onClick={() => onContactUsHandler()}>
      <button>Contact Us</button>
    </div>
  </div>
  )
}

export default HelpAndSupport