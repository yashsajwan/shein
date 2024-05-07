import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../../utils/databaseService";
import AddressEditModal from "../addressEditModal/AddressEditModal";
import { useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { toast } from "react-toastify";

const AddressCard = ({ singleaddress, setIsDeleting }) => {
  // console.log(singleaddress,"");

  const queryClient = useQueryClient();
  const [isAddressEdit, setIsAddressEdit] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),
  });

  const handleOpenEditModal = () => {
    setIsAddressEdit(true);
  };

  async function deleteUserAddress({ docId }) {
    setIsLoading(true);
    const userId = userData && userData?.id;
    try {
      if (userId && docId) {
        setIsDeleting(true);
        document.body.classList.add("no-scroll");
        await deleteDoc(doc(db, "users", userId, "addresses", docId));
        await queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
        await queryClient.refetchQueries({ queryKey: ["userAddresses"] });
        document.body.classList.remove("no-scroll");
        setIsDeleting(false);
        toast.success("Address deleted successfully.");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("inside else");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  return (
    <>
      <div className=" border border-primary ">
        <div className="lg:px-5 px-2 lg:py-5 py-3">
          <div className="text-secondary text-lg font-semibold flex justify-between">
            <h2>
              {singleaddress.name}{" "}
              {singleaddress?.lastName && singleaddress?.lastName}
            </h2>
            {userData &&
              userData?.defaultAddress?.address === singleaddress?.address && (
                <div className=" lg:text-sm text-xs lg:px-5 px-3 py-1.5 rounded-2xl font-medium bg-secondary text-white flex justify-center items-center">
                  <h2>DEFAULT</h2>
                </div>
              )}
          </div>
          <div className="my-2 flex flex-col gap-1">
            <div className="text-gray-500 text-sm font-semibold ">
              {singleaddress.address}
            </div>
            <div className="text-gray-500 text-sm font-semibold  ">
              {singleaddress.city} - {singleaddress.pincode}
            </div>
          </div>
          <div className="text-secondary text-sm font-semibold">
            <span className="text-gray-500 font-semibold ">Mobile</span> :{" "}
            {singleaddress.phoneNo}
          </div>
        </div>
        <div className="flex w-full bg-[#FFEEF4]  border-t border-t-primary  md:text-base text-sm font-semibold">
          <div
            onClick={() => deleteUserAddress({ docId: singleaddress?.id })}
            className="w-[50%] flex justify-center text-primary border-r border-r-primary py-3 cursor-pointer"
          >
            <button>Remove</button>
          </div>
          <div
            onClick={() => {
              handleOpenEditModal();
              setUserAddress(singleaddress);
            }}
            className="w-[50%] flex justify-center py-3 cursor-pointer"
          >
            <button>Edit</button>
          </div>
        </div>
        {isAddressEdit && (
          <AddressEditModal
            setIsAddressEdit={setIsAddressEdit}
            item={userAddress}
          />
        )}
      </div>
    </>
  );
};

export default AddressCard;
