"use client"
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react'
import { fetchFiltersData } from '../../utils/databaseService';
import FlatIcon from "../flatIcon/flatIcon";

interface Props {
  setIsMobileModalOpen: any
  setFilterSelected: any
  setSelectedSizes: any
  selectedSizes: any
  onhandleFiltersApply: any
  filterSelected: any
  onClearFilter: any
}

const FilterSidebar: FC<Props> = ({ setIsMobileModalOpen, setFilterSelected, setSelectedSizes, selectedSizes, onhandleFiltersApply, filterSelected, onClearFilter }) => {
  const { data: filtersData } = useQuery({
    queryKey: ["filtersData"],
    queryFn: () => fetchFiltersData(),
  });

  const clearFilterHandler = () => {
    if (filtersData) {
      const initialFilterState = Object.fromEntries(filtersData.map(filter => [filter.name, []]));
      return initialFilterState
    }
  }

  const toggleFilter = (filterType: string, value: string) => {
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

  return (
    <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-50">
      <div className="bg-[white]  sm:w-[60%] w-[100%] absolute top-0 left-0 max-h-screen z-50 h-[2000px] overflow-y-scroll ">
        <div className='w-full text-center text-lg font-semibold border-b py-4 relative '>Filter
          <div onClick={() => {
            setIsMobileModalOpen(false)
            document.body.classList.remove("no-scroll");
          }
          }>
            <FlatIcon className="flaticon-close absolute top-2 right-2 text-base  text-gray-500" />
          </div>
        </div>
        {filtersData &&
          filtersData.length > 0 &&
          filtersData.map((filter: any, idx: number) => (
            <div key={idx} className=' px-5'>
              <div className={`  py-4 `}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm text-secondary">{filter?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-5  flex-wrap  ">
                {filter.values.map((value: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 ">
                    <p
                      onClick={() => toggleFilter(filter.name, value)}
                      className={`bg-gray-100 px-3 py-1  text-sm ${selectedSizes[value] ? "text-black font-semibold" : "text-gray-500"}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        <div className='flex items-center mt-5 gap-5 px-3 fixed bottom-0 left-0 w-full  bg-white'>
          <button onClick={() => {
            setIsMobileModalOpen(false)
            setSelectedSizes({})
            const filters = clearFilterHandler()
            onClearFilter(filters)
            document.body.classList.remove("no-scroll");
          }}
            className="bg-black text-white px-5 py-2  w-[50%]"
          >Clear</button>
          <button
            onClick={async () => {
              await onhandleFiltersApply(filterSelected)
              setIsMobileModalOpen(false)
              document.body.classList.remove("no-scroll");
            }}
            className='bg-primary text-white py-2 w-[50%]'>Apply</button>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar