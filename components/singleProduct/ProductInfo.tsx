"use client";
import { Disclosure } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../config/firebase-config";
import { fetchSimilarProductsForCart } from "../../config/typesense";
import masterCardImg from "../../images/MasterCard_Logo 1.svg";
import discoverImg from "../../images/discover 1.svg";
import paypalImg from "../../images/paypal 1.svg";
import americanExpImg from "../../images/pngwing 1.svg";
import visaImg from "../../images/visa 3.svg";
import cod from "../../images/cod2.png";
import prepaid from "../../images/prepaid.png";
import delivery from "../../images/standard.png";
import { useAppSelector } from "../../redux/hooks";
import {
  addToCart,
  getCartObj,
  getPriceListCartObj,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { constant } from "../../utils/constants";
import {
  addCartObjToUser,
  fetchSingleProduct,
  getUserData,
  getUserWishlist,
  moveToWishListHandler,
  removeFromWishListHandler,
} from "../../utils/databaseService";
import useOnScreen from "../../utils/visibleElement";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import FlatIcon from "../flatIcon/flatIcon";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import {
  checkIfItemExistInCart,
  checkIfPriceDiscounted,
  getProductPriceDetails,
  getDiscountedPercentage,
} from "../../utils/utilities";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import Slider from "react-slick";

const features = [
  " 10 in stock",
  " Easy Return Policy",
  " Quality Assured Products",
];

const pyamentModeImages = [
  { image: visaImg },
  { image: masterCardImg },
  { image: americanExpImg },
  { image: paypalImg },
  { image: discoverImg },
];

const ProductInfo = ({ params }: any) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const cart = useAppSelector((state) => state.cartReducer.cart);
  const dispatch: any = useDispatch();
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
  const { data: product } = useQuery({
    queryKey: ["product", params?.slug],
    queryFn: () => fetchSingleProduct(params?.slug),
  });
  const [prodTab, setProdTab] = useState(product?.variants?.option1[0]);
  const [colorTab, setColorTab] = useState(
    product?.variants?.option2 && product?.variants?.option2[0]
  );
  const [newProduct, setNewProduct] = useState("");

  const { data: similarData } = useQuery({
    queryKey: ["product", params?.slug, "similar-product"],
    queryFn: () =>
      fetchSimilarProductsForCart({ searchKeywords: product?.searchKeywords }),
  });

  const ref = useRef<HTMLDivElement>(null);
  const isVisible = product ? useOnScreen(ref) : false;
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [quantity, setQuantity] = useState((product && product?.minQty) || 1);
  const [variant, setVariant] = useState(0);
  const [option1, setOption1] = useState(
    product.priceList[0]?.weight.split("/")[0]?.trim()
  );
  const [option2, setOption2] = useState(
    product.priceList[0]?.weight.split("/")[1]?.trim()
  );

  // console.log({ quantity });

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(null),

    // keepPreviousData: true,
    // enabled: isClient,
  });

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlistData"],
    queryFn: () => getUserWishlist(userData?.id),
  });
  const [tabImage, setTabImage] = useState(getImage(product, 0));

  function getImage(product: any, idx: number) {
    // console.log(product)
    // console.log("gggggggggg")
    if (product?.images && product?.images[idx]?.url) {
      return product?.images[idx]?.url;
    }

    if (product?.coverPic?.url) {
      return product?.coverPic?.url;
    }

    return constant?.errImage;
  }
  // useEffect(()=>{
  //   console.log(prodTab,"prodTab");

  //   },[])

  //   useEffect(()=>{
  //     console.log(prodTab,"prodTab changes");

  //     },[prodTab])

  function getSelectedVariant() {
    if (!option1 && !option2) {
      setVariant(0);
      setOption1(product.priceList[0]?.weight.split("/")[0]?.trim());
      setOption2(product.priceList[0]?.weight.split("/")[1]?.trim());
      return;
    } else {
      let weight = `${option1} / ${option2}`;
      // console.log("weight",weight);

      let index = product?.priceList?.findIndex((x) => x.weight === weight);
      // console.log(index,"index");

      if (index !== -1) {
        setVariant(index);
      } else {
        setVariant(0);
      }
    }
  }

  useEffect(() => {
    if (product && product.isPriceList) {
      getSelectedVariant();
    }
  }, [option1, option2]);
  async function addItemToCart() {
    // console.log("START");
    let data: any = {
      product,
      productID: product?.id,
      quantity: quantity,
      index: variant,
      isPriceList: product?.isPriceList,
    };
    const cartObject = data.isPriceList
      ? getPriceListCartObj({
          product: product,
          quantity: quantity,
          index: data.index,
        })
      : getCartObj({
          product: product,
          productID: data?.productID,
          quantity: data?.quantity,
        });
    if (auth.currentUser) {
      const docId = await addCartObjToUser(cartObject);
      cartObject["id"] = docId;
    }
    dispatch(addToCart(cartObject));
  }

  function handleRemoveFromCart() {
    let data: any = {
      product,
      productID: product?.id,
      quantity: quantity,
      index: variant,
      isPriceList: product?.isPriceList,
    };
    // console.log(data);

    dispatch(removeFromCart(data));
  }

  const [selectedTab, setSelectedTab] = useState("description");

  const similarProductData = [
    "Free Standard Shipping On Orders Over Rs.5040",
    "Free Express Shipping On Orders Rs.13330",
  ];

  const slider = useRef<any>(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 1.5,
    slidesToScroll: 1.5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1242,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1515,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
          infinite: false,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
          initialSlide: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
          initialSlide: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  const [pinCode, setPinCode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("initial");
  const CheckPinCode = async () => {
    try {
      if (pinCode == "") {
        toast.error("Enter Pin Code First!");
        setDeliveryStatus("false");
      } else {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pinCode}`
        );
        const data = await response.json();
        console.log(data[0].PostOffice.length);
        if (data[0].PostOffice.length > 0) {
          setDeliveryStatus("true");
        } else {
          setDeliveryStatus("false");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Some Error Occurred!");
      setDeliveryStatus("false");
    }
  };

  return (
    <>
      {!product && (
        <div className="grid place-items-center h-[70vh]">
          <h2 className="font-bold text-xl">Page Not Found</h2>
        </div>
      )}
      {product && (
        <div className="sm:pb-10 ">
          {/* <Headersection heading={product?.prodName} /> */}
          <div className="flex flex-col px-body 2xl:px-[10%] ">
            <div className="flex flex-col md:flex-row gap-3 md:gap-6 sm:mt-10 mt-5">
              <div className=" md:flex md:flex-col flex-row   gap-4   hidden ">
                {product.images.map((item: any, idx: number) => {
                  // console.log(idx);

                  return (
                    <div
                      onClick={() => setTabImage(getImage(product, idx))}
                      className="   cursor-pointer"
                    >
                      <Image
                        src={getImage(product, idx)}
                        // src={item.url}
                        alt=""
                        className=" w-[139px] h-[135px] aspect-auto object-cover"
                        width={1000}
                        height={1000}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex md:flex-row flex-col w-full sm:gap-8 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-16 gap-6 ">
                <div className=" h-fit lg:w-[60%] w-[100%] flex lg:flex-col sm:flex-row flex-col sm:gap-7 gap-7  justify-center">
                  <div className=" md:w-[100%] lg:w-[500px] xl:w-[600px] xl:h-[750px]  sm:w-[280px] w-[100%] lg:h-[650px] md:h-[400px] sm:h-[350px] h-auto ">
                    <Image
                      src={tabImage}
                      alt={product?.prodName || ""}
                      width={1000}
                      height={1000}
                      className="w-full lg:w-[500px] xl:w-[600px] xl:h-[750px]  object-fill md:h-[500px] lg:h-[750px] h-[350px] "
                    />
                  </div>
                </div>
                <div className="flex flex-col md:w-[50%] w-[100%]   ">
                  <div className="flex items-center  sm:mb-2 md:mb-3 mb-1">
                    <h2 className="md:text-xl text-lg   font-semibold  text-[#555555] ">
                      {product?.prodName}
                    </h2>
                  </div>
                  <div className="flex md:flex-col md:items-start md:justify-start xl:items-center xl:flex-row sm:flex-row flex-col gap-y-2  gap-x-4 sm:items-center ">
                    <div className="flex">
                      <h2 className=" lg:text-2xl md:text-xl sm:text-lg text-base sm:text-center text-start text-[#eb4897] font-bold  ">
                        {constant?.currency}{" "}
                        {isClient &&
                          getProductPriceDetails({
                            isDiscounted: true,
                            product: product,
                            index: variant,
                          })}
                      </h2>
                      {checkIfPriceDiscounted({
                        discountedPrice: product?.isPriceList
                          ? product?.priceList[variant]?.discountedPrice
                          : product?.discountedPrice,
                        price: product?.isPriceList
                          ? product?.priceList[variant]?.price
                          : product?.prodPrice,
                      }) && (
                        <div className="text-ellipsis overflow-hidden ... truncate flex items-center px-2">
                          <p className="text-ellipsis overflow-hidden ... truncate   line-through text-xs md:text-sm text-[#ADADAD]">
                            {isClient && constant?.currency}{" "}
                            {isClient &&
                              getProductPriceDetails({
                                isDiscounted: false,
                                product: product,
                                index: variant,
                              })}
                          </p>
                          {isClient && (
                            <div className="bg-[#eb4897] text-white py-1 px-3 mx-2">
                              -
                              {getDiscountedPercentage({
                                price: getProductPriceDetails({
                                  isDiscounted: false,
                                  product: product,
                                  index: variant,
                                }),
                                discountedPrice: getProductPriceDetails({
                                  isDiscounted: true,
                                  product: product,
                                  index: variant,
                                }),
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="font-semibold ">Inclusive of all taxes</div>

                    {/* reviews code start  */}
                    {/* <div className="flex items-center gap-2 text-start ">
                      <div className="text-primary text-xl flex ">
                        {" "}
                        <FlatIcon icon={"flaticon-star text-[#FFBA07] font-normal text-xl"}
                        />
                        <FlatIcon icon={ "flaticon-star text-[#FFBA07] font-normal text-xl"}
                        />
                        <FlatIcon icon={"flaticon-star text-[#FFBA07] font-normal text-xl"}
                        />
                        <FlatIcon icon={"flaticon-star text-[#FFBA07] font-normal text-xl"}
                        />
                        <FlatIcon icon={ "flaticon-star text-[#FFBA07] font-normal text-xl" }
                        />
                        <span className="text-sm font-medium text-zinc-400">
                          (27)
                        </span>{" "}
                      </div>
                      <h4 className="text-[#777777] text-xs font-medium">
                        1.2k reviews
                      </h4>
                    </div> */}
                    {/* reviews code end  */}
                  </div>

                  {/* <div className="text-xs text-[#777777] font-semibold  sm:my-6 my-4 ">
                   
                    Strapless bustier. Front pocket. Frayed trims. Asymmetric
                    hem. Side metal zip fastening. Asymmetrical Beige frayed
                    Bustier.
                  </div> */}
                  {/* <div
                    dangerouslySetInnerHTML={{ __html: product?.prodDesc }}
                    className="text-xs text-[#777777] font-semibold  sm:my-6 my-4 " /> */}

                  {product?.variants?.option2 &&
                    product?.variants?.option2.length > 0 && (
                      <div className=" mt-4">
                        <h4 className="text-secondary md:text-sm sm:text-xs text-[10px] font-semibold mb-3 ">
                          COLOR : {colorTab}
                        </h4>
                        {product?.variants?.option2 &&
                          product?.variants?.option2?.length > 0 && (
                            <div className="flex gap-2 md:gap-3 ">
                              {product?.variants?.option2.map(
                                (item: any, idx: number) => {
                                  // console.log(item,"cocloe");

                                  return (
                                    <div
                                      onClick={() => {
                                        setColorTab(item);
                                        setOption2(item);
                                      }}
                                      key={idx}
                                      className={`border border-[#E6DBD7] sm:px-3 px-4 sm:py-2 py-2 text-white bg-black  text-sm font-semibold rounded-md flex justify-center items-center cursor-pointer ${
                                        item === colorTab &&
                                        "bg-primary text-white"
                                      }`}
                                    >
                                      <div
                                      // className={`h-[25px] w-[25px] rounded-full `}
                                      // style={{
                                      //   backgroundColor: `${item}`,
                                      // }}
                                      >
                                        {item}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          )}
                      </div>
                    )}
                  <div className="flex flex-col ">
                    {/* {product?.variants?.option1&&product?.variants?.option1.length > 0 &&

} */}

                    {product?.variants?.option1 &&
                      product?.variants?.option1.length > 0 && (
                        <div className="flex items-center gap-6 sm:text-sm text-xs  font-semibold mb-3 sm:mt-4 mt-4 ">
                          <div className="flex gap-1 items-center">
                            <h4 className="    ">SIZE : </h4>
                            <h4>{prodTab}</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <div>
                              <FlatIcon
                                icon={
                                  "flaticon-measure text-[#777777]  font-normal text-3xl"
                                }
                              />
                            </div>
                            <h4 className="underline ">Size Chart</h4>
                          </div>
                        </div>
                      )}
                    {product?.variants?.option1 &&
                      product?.variants?.option1.length > 0 && (
                        <div className="flex gap-3 text-[#555555] text-sm font-semibold ">
                          {product.variants.option1 &&
                            product.variants.option1.map(
                              (item: any, idx: number) => {
                                // console.log(item,"item");

                                return (
                                  <div
                                    onClick={() => {
                                      setVariant(idx);
                                      setOption1(item);
                                      setProdTab(item);
                                    }}
                                    className={`sm:px-3  text-white bg-black px-4 sm:py-2 py-2 border rounded-md  cursor-pointer
                                
                                ${
                                  prodTab === item
                                    ? "border-white bg-primary text-white "
                                    : "border-[#C6C6C6]"
                                }`}
                                  >
                                    <h2 className="sm:text-sm text-xs font-normal">
                                      {item}
                                    </h2>
                                  </div>
                                );
                              }
                            )}
                        </div>
                      )}

                    <h3 className="text-secondary sm:text-sm text-xs font-semibold mb-3 mt-6 ">
                      DELIVERY TO DELHI ?
                    </h3>

                    <div className="flex flex-col">
                      <div
                        className={`rounded-3xl relative flex border-[3px] border-black w-[70%] justify-between  ${
                          pinCode
                            ? deliveryStatus == "initial"
                              ? ""
                              : deliveryStatus == "true"
                              ? "border-green-700"
                              : "border-red-700"
                            : ""
                        }`}
                      >
                        <input
                          value={pinCode}
                          onChange={(e) => {
                            setPinCode(e.target.value);
                            setDeliveryStatus("initial");
                          }}
                          className="py-1 px-3 rounded-2xl w-full"
                          type="number"
                          placeholder="Enter a pincode to check"
                        />

                        <button
                          onClick={CheckPinCode}
                          className={`absolute top-0 right-0 bg-black text-white rounded-xl py-1 px-3 ${
                            pinCode
                              ? deliveryStatus == "initial"
                                ? ""
                                : deliveryStatus == "true"
                                ? "bg-green-700"
                                : "bg-red-700"
                              : ""
                          }`}
                        >
                          Check
                        </button>
                      </div>
                      {pinCode ? (
                        <>
                          {deliveryStatus == "initial" ? (
                            ""
                          ) : deliveryStatus == "true" ? (
                            <div className="my-2">
                              Deliverable to Pin Code: {pinCode}✅
                            </div>
                          ) : (
                            <div className="my-2">
                              Undeliverable to Pin Code {pinCode}❌
                            </div>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="py-3">
                      <div className="flex items-center">
                        <Image src={cod} alt="cod" height={100} width={100} />
                        <div className="mx-2 text-base text-gray-400">
                          Cash on delivery available
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Image
                          src={prepaid}
                          alt="prepaid"
                          height={100}
                          width={100}
                        />
                        <div className="mx-2 text-base text-gray-400">
                          <div>Prepaid Delivery Only ?</div>
                          <div>
                            Make prepaid payment get{" "}
                            <span className="text-[#eb4897]">5 %</span>
                          </div>
                          <div>Instant Discounts</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Image
                          src={delivery}
                          alt="delivery"
                          height={100}
                          width={100}
                        />
                        <div className="mx-2 text-base text-gray-400 flex flex-col">
                          <div>
                            Standard Delivery:{" "}
                            <span className="text-[#eb4897]">15 Days</span>
                          </div>
                          <div>
                            Estimated Delivery:{" "}
                            <span className="text-[#eb4897]">7 to 15 Days</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-secondary sm:text-sm text-xs font-semibold mb-3 mt-3 ">
                      QUANTITY :
                    </h3>
                    <div className="flex sm:items-center sm:flex-row   flex-col gap-y-4 justify-between   sm:mb-10 mb-5 ">
                      <div className=" flex border border-[#C6C6C6]    ">
                        <button
                          className=" text-[#CCCCCC] flex-1 flex justify-center items-center text-base md:text-lg font-bold cursor-pointer select-none px-1 sm:px-2 md:px-3 py-0.5 md:py-1 "
                          onClick={() => {
                            let updatedQty = quantity;
                            let prodMin = product?.minQty || 1;

                            setQuantity(updatedQty - prodMin || 1);
                            // setQuantity(
                            //   (quantity - product?.minQty) || product?.minQty || 1
                            // );
                            // setQuantity((val) =>  - product?.minQty || 1);
                          }}
                        >
                          -
                        </button>

                        <div className="flex-1 flex justify-center items-center px-5 md:px-10 py-1 bg-gray-200 border-r-[1px] border-r-[#C6C6C6] border-l-[1px] border-l-[#C6C6C6]">
                          <p className="text-base md:text-lg">{quantity}</p>
                        </div>
                        <button
                          className="flex-1  text-[#CCCCCC]  flex justify-center items-center text-base md:text-lg font-bold cursor-pointer select-none px-1 sm:px-2 md:px-3 py-0.5 md:py-1 "
                          onClick={() => {
                            setQuantity(quantity + (product?.minQty || 1));
                            // setQuantity((val) => val + product?.minQty || 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* <div className="flex items-center gap-2 text-sm font-bold  mb-3">
                      <div className="">
                        <FlatIcon icon={"flaticon-express-delivery text-2xl"} />
                      </div>
                      <h3 className="text-secondary sm:text-sm text-xs font-semibold  ">
                        WHEN WILL I RECIVE MY ORDER ?
                      </h3>
                    </div> */}
                    {/* <div className="border border-[#E1E1E1] flex items-center justify-between p-2 gap-4  mb-6">
                      <input
                        type="text"
                        className=" py-1 w-full outline-0"
                        placeholder="Enter your pincode"
                      />
                      <button className="bg-primary text-white sm:px-10 px-6 sm:py-3 py-2 sm:text-sm text-xs font-semibold">
                        Check
                      </button>
                    </div> */}
                  </div>
                  <div className="flex flex-col gap-2">
                    {/* <div className="flex-1 lg:flex-none  flex border border-black p-px lg:w-[25%]">
                  <div
                    className="bg-gray-100 flex-[0.4] flex justify-center items-center text-lg font-bold cursor-pointer select-none"
                    onClick={() => {
                      setQuantity((val) => val - product?.minQty || 1);
                    }}
                  >
                    -
                  </div>

                  <div className="flex-1 flex justify-center items-center">
                    <p className="">{quantity}</p>
                  </div>
                  <div
                    className="bg-gray-100 flex-[0.4]  flex justify-center items-center text-lg font-bold cursor-pointer select-none"
                    onClick={() => {
                      setQuantity((val) => val + product?.minQty || 1);
                    }}
                  >
                    +
                  </div>
                </div> */}
                    <div className="flex justify-between">
                      {/* <h2 className="hidden lg:block text-2xl  text-center text-red-600 text-[22px] font-medium ">
                    {constant?.currency}{" "}
                    {parseFloat(product?.prodPrice).toFixed(2)}
                  </h2>
                  {product?.isPriceList && (
                    <div className=" hidden gap-2 lg:flex ">
                      {product?.priceList?.map((variant: any, idx: any) => {
                        return (
                          <div className="px-2 py-1 bg-gray-200" key={idx}>
                            <p>{variant?.weight} "PRICELIST CHECKS"</p>
                          </div>
                        );
                      })}
                    </div>
                  )} */}
                      {/* old code start  */}
                      {/* <div className="flex gap-2 align-items-center">
                    <Image
                    src={diamond}
                    alt=""
                    className=""
                    width={20}
                    height={20}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                    <h2 className=" text-neutral-950 text-lg font-medium leading-normal tracking-tight ">20 Calories Per Serving </h2></div> */}
                      {/* old code end  */}
                    </div>
                  </div>

                  <div
                    className="flex justify-between lg:flex w-full "
                    ref={ref}
                  >
                    <div className="w-full flex gap-3">
                      <div
                        className="flex-1 lg:flex-none w-[40%]  lg:h-10 md:h-12 sm:h-10 bg-black h-8  flex justify-center items-center py-1  cursor-pointer"
                        onClick={
                          checkIfItemExistInCart(cart, product, variant)
                            ? () => {
                                handleRemoveFromCart();
                              }
                            : addItemToCart
                        }
                      >
                        <button className=" text-white font-semibold sm:text-sm md:text-base text-xs">
                          {checkIfItemExistInCart(cart, product, variant)
                            ? "REMOVE FROM CART"
                            : "ADD TO CART"}
                        </button>
                      </div>

                      <div
                        onClick={async () => {
                          let data: any = {
                            product,
                            productID: product?.id,
                            quantity: quantity,
                            index: variant,
                            isPriceList: product?.isPriceList,
                          };
                          const cartObject = data.isPriceList
                            ? getPriceListCartObj({
                                product: product,
                                quantity: quantity,
                                index: data.index,
                              })
                            : getCartObj({
                                product: product,
                                productID: data?.productID,
                                quantity: data?.quantity,
                              });
                          const urlData = encodeURIComponent(
                            JSON.stringify(cartObject)
                          );
                          router.push(`/checkout?source=${urlData}`);

                          // if (checkIfItemExistInCart(cart, product, variant)) {
                          //   router.push("/checkout");
                          // } else {
                          //   setIsBuyNowLoading(true);
                          //   await addItemToCart();
                          //   setIsBuyNowLoading(false);
                          //   router.push("/checkout");
                          // }
                        }}
                        className="flex-1 lg:flex-none w-[40%]  lg:h-10 md:h-12 sm:h-10 bg-[#eb4897] h-8  flex justify-center items-center py-1  cursor-pointer"

                        // onClick={handleRemoveFromCart}
                      >
                        <Link
                          href={"/checkout"}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <button className="text-white font-bold sm:text-sm md:text-base text-xs">
                            {isBuyNowLoading ? (
                              <CircularProgress
                                className="!text-white"
                                size={25}
                              ></CircularProgress>
                            ) : (
                              "SHOP NOW"
                            )}
                          </button>
                        </Link>
                      </div>

                      {isClient &&
                      wishlistData &&
                      wishlistData.length > 0 &&
                      wishlistData.includes(`${product?.id}`) ? (
                        <div
                          onClick={async () => {
                            await removeFromWishListHandler({
                              userId: userData?.id,
                              productId: product?.id,
                            });
                            await queryClient.invalidateQueries({
                              queryKey: ["wishlistData"],
                            });
                            await queryClient.refetchQueries({
                              queryKey: ["wishlistData"],
                            });
                            toast.success("Product removed from wishlist.");
                          }}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <div className="cursor-pointer">
                            <IoIosHeart className=" text-3xl " />
                          </div>
                          {/* <h3 className="text-secondary font-semibold sm:text-sm text-xs">
                            Remove from Wishlist
                          </h3> */}
                        </div>
                      ) : (
                        <div
                          onClick={async () => {
                            await moveToWishListHandler({
                              userId: userData?.id,
                              productId: product?.id,
                            });
                            await queryClient.invalidateQueries({
                              queryKey: ["wishlistData"],
                            });
                            await queryClient.refetchQueries({
                              queryKey: ["wishlistData"],
                            });
                            toast.success("Product added to wishlist.");
                          }}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <div className="cursor-pointer">
                            <IoIosHeartEmpty className=" text-3xl " />
                          </div>
                          {/* <h3 className="text-secondary font-semibold sm:text-sm text-xs">
                            Add to Wishlist
                          </h3> */}
                        </div>
                      )}
                    </div>
                    {/* previous button with functionality end*/}
                  </div>

                  <h3 className="text-secondary sm:text-sm md:text-lg text-sm font-semibold mt-6 ">
                    EARN <span className="text-[#eb4897]">50</span> Points ?
                  </h3>
                  {/* <h3 className="font-semibold sm:text-sm text-xs my-5">
                    GUARANTEED SAFE CHECKOUT:
                  </h3>
                  <div className="flex items-center sm:flex-nowrap flex-wrap gap-2 md:gap-4 lg:gap-6">
                    {pyamentModeImages.map((item: any, idx: number) => {
                      return (
                        <div
                          key={idx}
                          className=" bg-[#f5f5f5ff] flex justify-center items-center w-[30px] h-auto  md:w-[50px] md:h-auto md:px-3 md:py-2"
                        >
                          <Image
                            src={item.image}
                            alt=""
                            width={1000}
                            height={1000}
                            // style={{
                            //   aspectRatio: "auto",
                            //   width: "40px",
                            //   height: "20px",
                            // }}
                            className="w-full h-full"
                          />
                        </div>
                      );
                    })}
                  </div> */}
                  <div className="flex items-center gap-3 my-5">
                    <div className="flex items-center gap-2">
                      <div>
                        <FlatIcon icon={"flaticon-share text-xl"} />
                      </div>
                      <p>Share :</p>
                    </div>
                    <div className="flex items-center gap-x-6">
                      <div>
                        <FlatIcon icon={"flaticon-facebook text-xl"} />
                      </div>
                      <div>
                        <FlatIcon icon={"flaticon-twitter text-2xl"} />
                      </div>
                      <div>
                        <FlatIcon icon={"flaticon-instagram text-xl"} />
                      </div>
                      <div>
                        <FlatIcon icon={"flaticon-pinterest text-xl"} />
                      </div>
                    </div>
                    <div className="font-semibold">REFER A FRIEND EARN</div>
                  </div>
                  {/* <div className="w-full bg-[#CCCCCC] h-[1px]"></div> */}
                  {/* <div className=" ">
                    <div className="my-3 flex items-center justify-between">
                      <h2 className="font-medium sm:text-base  text-sm ">
                        Product Info
                      </h2>
                      <FlatIcon icon={"flaticon-plus text-secondary text-xs"} />
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: product?.prodDesc }}
                      className="sm:text-sm text-xs  mb-7 mt-4" />
                  </div> */}

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={` flex py-4 items-center sm:text-base font-semibold text-xs  justify-between text-black ${
                            open ? "font-semibold" : ""
                          } `}
                        >
                          <h2 className=" sm:text-base  text-sm ">
                            Return Policy
                          </h2>
                          <FlatIcon icon={"flaticon-plus text-black text-xs"} />
                        </Disclosure.Button>
                        <Disclosure.Panel className="  pt-0 pb-2 text-base text-gray-500">
                          <div className="bg-[#f7f7f7]">
                            <div className="flex justify-between">
                              <div className="text-black text-lg p-2">
                                Shipping to India
                              </div>
                              <div className="flex">
                                <div className="p-2">
                                  <button
                                    onClick={() => slider.current?.slickPrev()}
                                  >
                                    <FlatIcon className="flaticon-left-arrow text-black sm:text-xl text-lg font-bold" />
                                  </button>
                                </div>
                                <div className="p-2">
                                  <button
                                    onClick={() => slider.current?.slickNext()}
                                  >
                                    <FlatIcon className="flaticon-left-arrow -rotate-180 text-black sm:text-xl text-lg font-bold" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <Slider
                              ref={slider}
                              {...settings}
                              className=""
                              dotsClass={`slick-dots `}
                              nextArrow={<></>}
                              prevArrow={<></>}
                              draggable={true}
                            >
                              {similarProductData &&
                                similarProductData.length > 0 &&
                                similarProductData.map(
                                  (item: any, idx: number) => {
                                    return (
                                      <div key={idx} className=" p-2 m-2  ">
                                        <div className="m-2 bg-white p-2">
                                          {item}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                            </Slider>

                            <div>
                              <div className="text-black text-lg p-2">
                                14 Days Return
                              </div>
                              <div className="p-2">
                                Items Can Be Returned To Us In 14 Days.The
                                Following Items Cannot Be Returned Or Exchanged:
                                Beauty, Bodysuits, Lingerie, Swimwear,
                                Jewelry,Mask And Accessories.
                              </div>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`flex border-t border-b border-[#CCCCCC] py-4 items-center sm:text-base font-semibold text-xs  justify-between text-black ${
                            open ? "font-semibold" : ""
                          } `}
                        >
                          <h2 className="font-semibold sm:text-base  text-sm ">
                            Product Info
                          </h2>
                          <FlatIcon icon={"flaticon-plus text-black text-xs"} />
                        </Disclosure.Button>
                        <Disclosure.Panel className="  pt-0 pb-2 text-base text-gray-500">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: product?.prodDesc,
                            }}
                            className="sm:text-sm text-xs  mb-7 mt-4"
                          />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  {/* <div className="w-full bg-[#CCCCCC] h-[1px]"></div> */}
                  {/* <div className="flex items-center justify-between sm:text-base font-medium text-xs  my-5 text-gray-400">
                    <h3>Reviews & Ratings</h3>
                    <FlatIcon icon={"flaticon-plus text-[#999999] text-xs"} />
                  </div> */}

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`flex border-b border-[#CCCCCC] py-4 items-center sm:text-base font-medium text-xs justify-between text-black ${
                            open ? "font-semibold" : ""
                          } `}
                        >
                          <span className="text-black font-semibold">
                            Reviews & Ratings
                          </span>
                          <FlatIcon icon={"flaticon-plus text-black text-xs"} />
                        </Disclosure.Button>
                        <Disclosure.Panel className=" mt-3 pt-0 pb-2 text-base text-gray-500">
                          No Reviews Yet
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  {/* <div className="w-full bg-[#CCCCCC] h-[1px]"></div> */}

                  {/* old code start  */}
                  {/* <div className="flex gap-2 flex-col">
                {features.map((feature, index) => (
                  <div className='text-black text-sm font-semibold leading-normal tracking-tight' key={index}> icon {feature}</div>
                ))}
              </div> */}

                  {/* <div className=" h-2 relative w-full ">
                <div className="absolute top-0 left-0 w-1/3 h-full border-t-[4px] border-[#EA1F27]"></div>
                <div className="absolute top-0 right-0 w-2/3 h-full border-t-[4px] border-[#ebebeb]"></div>
              </div> */}
                  {/* old code end  */}
                </div>
              </div>
            </div>

            <div className=" w-full h-[1px] border-b border-b-[#CCCCCC] border-dashed md:my-20 my-10"></div>
          </div>
          <div>
            <SimilarProducts
              heading={"SIMILAR PRODUCTS"}
              similarProductData={similarData}
              from="info"
            />
          </div>
          <div>
            <SimilarProducts
              heading={"RECENTLY VIEWED"}
              similarProductData={similarData}
              from="info"
            />
          </div>
        </div>
      )}
    </>
  );
};
export default ProductInfo;
