"use client";
import React, { useEffect } from "react";
import Slider from "rc-slider";
import { useState, FC } from "react";
import "rc-slider/assets/index.css";
import FlatIcon from "../flatIcon/flatIcon";
import listImg from "../../images/list 1.svg"
import gridImg from "../../images/grid 1.svg"
import Image from "next/image"
import { useAppSelector } from "../../redux/hooks";
import { Disclosure } from "@headlessui/react";


interface Props {
  filters: any,
  setFiters: any,
  minMax: any,
  setMinMax: any
  filterSelected: any
  setFilterSelected: any
  onhandleFiltersApply: any
  onClearFilter: any
}
import Modal from "../Modal/modal";
import { useQuery } from "@tanstack/react-query";
import { fetchFiltersData } from "../../utils/databaseService";
import { getOtherFilteredProducts } from "../../utils/utilities";
import FilterSidebar from "./FilterSidebar";

const FilterSection: FC<Props> = ({ filters, setFiters, minMax, setMinMax, filterSelected, setFilterSelected, onhandleFiltersApply, onClearFilter }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState([])
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: boolean }>({});
  const [modalPriceState, setModalPriceState] = useState(filters?.price);
  const [sliderValue, setSliderValue] = useState(filters?.price);
  const [isFilterByPrice, setIsFilterByPrice] = useState(false)
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const { data: filtersData } = useQuery({
    queryKey: ["filtersData"],
    queryFn: () => fetchFiltersData(),
  });

  // console.log("data", data);
  // console.log("filtersData", filtersData);

  const { currRate, currency } = useAppSelector((state: any) => state.appReducer)

  const handleSliderChange = (value: any) => {
    setFiters({ ...filters, price: value });
  };

  const handleModalSliderChange = (value: any) => {
    setModalPriceState(value);
  };

  const toggleFilterSection = (filterName: string) => {
    setIsFiltersOpen((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const toggleFilter = (filterType: string, value: string) => {
    console.log(filterType,value);
    
    setFilterSelected((prevFilterSelected) => ({
      ...prevFilterSelected,
      [filterType]: prevFilterSelected[filterType].includes(value)
        ? prevFilterSelected[filterType].filter((selectedValue) => selectedValue !== value)
        : [...prevFilterSelected[filterType], value],
    }));
    setSelectedSizes((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [value]: !prevSelectedSizes[value],
    }));
  };

  useEffect(() => {
    if (filtersData) {
      const data = filtersData && filtersData.length > 0 && filtersData.map((filter: any, idx: number) => {
        return { [filter.name]: false }
      })
      setIsFiltersOpen(data)
    }
  }, [filtersData])
  // console.log(filterSelected,"from filter section");

  return (
    <>
      <div className="w-full flex-[0.2] flex lg:hidden gap-4  ">
        <h1 className="  border-b w-full pb-2 flex items-center justify-between gap-5">
          <button onClick={() => {
            setIsFilterByPrice(true)
            document.body.classList.add("no-scroll");
          }}
            className=" font-semibold "
          >Filter By Price</button>

          <button
            onClick={() => {
              setIsMobileModalOpen(true)
              document.body.classList.add("no-scroll");
            }}
            className=" font-semibold "
          >
            Filter
          </button>
        </h1>
        {isMobileModalOpen &&
          <FilterSidebar
            setIsMobileModalOpen={setIsMobileModalOpen}
            setFilterSelected={setFilterSelected}
            setSelectedSizes={setSelectedSizes}
            selectedSizes={selectedSizes}
            onhandleFiltersApply={onhandleFiltersApply}
            filterSelected={filterSelected}
            onClearFilter={onClearFilter}
          />
        }
        <Modal isOpen={isFilterByPrice} setOpen={setIsFilterByPrice}>
          <div className="bg-white sm:w-[60%] w-[100%] absolute top-0 left-0  h-screen   flex-col">
            <div className='w-full text-center text-lg font-semibold border-b py-4 relative '>Filter
            </div>
            <div className="w-full px-5 p-body">
              <h4 className="font-semibold text-lg text-[#232738]">
                Filter by Price
              </h4>
              <div className=" my-3 ">
                <Slider
                  range
                  min={minMax[0]}
                  max={minMax[1]}
                  className="text-red"
                  defaultValue={filters?.price}
                  allowCross={false}
                  onChange={(e) => handleModalSliderChange(e)}
                />
              </div>
              <div className="flex justify-between">
                <h2 className="text-xs font-bold">
                  {currency}{" "}
                  {Math.floor(
                    parseFloat(modalPriceState[0].toString()) * currRate
                  )}
                </h2>
                <h2 className="text-xs font-bold">
                  {currency}{" "}
                  {Math.ceil(
                    parseFloat(modalPriceState[1].toString()) * currRate
                  )}
                </h2>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setIsFilterByPrice(false)
                    document.body.classList.remove("no-scroll");

                  }}
                  className="bg-gray-300  rounded-md px-3 py-2 w-[50%]"
                >
                  Cancel
                </button>
                <button
                  className="bg-primary text-white rounded-md px-3 py-2 w-[50%]"
                  onClick={() => {
                    setFiters({ ...filters, price: modalPriceState });
                    setIsFilterByPrice(false);
                    document.body.classList.remove("no-scroll");
                  }}
                >
                  {" "}
                  Apply
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div className="hidden lg:flex flex-col flex-[0.25] filter-border mt-2 pb-5 border ">
        <div className="px-3">
          <div className="flex justify-between items-center   py-5">
            <h4 className="font-semibold text-sm text-secondary ">FILTER BY PRICE</h4>
          </div>
        </div>
        <div className="px-3 border-t-[1px] border-t-[#EEF0F5] border-b-[1px] border-b-[#EEF0F5]  py-4">
          <div className=" my-3 px-1 ">
            <Slider
              range
              min={minMax[0]}
              max={minMax[1]}
              className="text-red"
              defaultValue={filters?.price}
              allowCross={false}
              onChange={(e) => handleSliderChange(e)}
            />
          </div>
          <div className="flex justify-between">
            <h2 className="text-xs font-semibold">{currency}{" "}{Math.floor(parseFloat(filters?.price[0].toString()) * currRate)}</h2>
            <h2 className="text-xs font-semibold">{currency}{" "}{Math.ceil(parseFloat(filters?.price[1].toString()) * currRate)}</h2>
          </div>
        </div>
        {filtersData &&
          filtersData.length > 0 &&
          filtersData.map((filter: any, idx: number) => (
            <div key={idx}>
              <div className={`px-3 border-b-[1px] border-b-[#EEF0F5] py-4 `}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm text-secondary">{filter?.name}</p>
                  <p
                    onClick={() => toggleFilterSection(filter.name)}
                    className="h-[30px] w-[30px] rounded-full text-secondary bg-[#F3F5F9] flex items-center justify-center"
                  >
                    <FlatIcon className={`${isFiltersOpen[filter.name] ? 'flaticon-minus' : "flaticon-plus"} text-secondary text-xs `} />
                  </p>
                </div>
              </div>
              {isFiltersOpen[filter.name] && (
                <div className={`${filter.name==="colour"?"flex flex-wrap":"grid"}  grid-cols-3 items-center gap-5  pt-4 px-3`}>
                  {filter.values.map((value: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        onClick={async () => {
                           toggleFilter(filter.name, value)
                          await onhandleFiltersApply(filterSelected)
                        }}
                        style={{
                          backgroundColor:
                            filter.name === "colour" ? value : "none",
                        }}
                        className={`h-[20px] w-[20px] flex items-center justify-center border p-1 ${filter.name==="colour"&&"rounded-full"} 
                        ${selectedSizes[value]&&filter.name==="colour"&&"border-black"} ${selectedSizes[value]&&filter.name==="colour"&&"h-[24px] w-[24px]" } cursor-pointer relative`
                      }
                      >
                        {selectedSizes[value] && (
                          <div className={`h-full w-full  ${selectedSizes[value]&&filter.name==="colour"?"bg-none":"bg-primary"}  `}
                          // style={{
                          //   backgroundColor:
                          //     filter.name === "colour" ? value : "#EB4897",
                          // }}
                          ></div>
                        )}
                      </div>
                      {
                       !(filter.name==="colour")&&
                      <p >{value}</p>

                      }
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

      </div>
    </>
  );
};

export default FilterSection;

