import Image from "next/image";
import Link from "next/link";
import { constant } from "../../utils/constants";
const CategoryCard = ({ cat, heading, slug, path = null }) => {
  return (
    <Link
      key={cat?.id}
      href={
        path
          ? path
          : cat?.isSubcategories
          ? `/category/${cat?.slug?.name}`
          : `#`
      }
    >
      <div className="flex flex-col  relative  ">
        <div className=" relative  mb-2   flex  ">
          {/* <div className="h-[190px] w-[220px] border-[10px] border-[yellow]"> */}
          {/* <div className=" h-[190px] w-[190px]  relative z-30 ">
            <div className="h-[100%] w-[100%]   p-1 "> */}
          <div className=" sm:h-[220px] h-[150px] w-full  relative z-20 ">
            <div className="h-[100%] w-[100%]   p-1 ">
              <Image
                src={cat?.image?.url || cat?.image?.mob || constant?.errImage}
                alt=""
                width={1000}
                height={1000}
                className="w-full h-full object-fit  "
              />
            </div>
            {/* <div className="absolute left-0 border-[10px] border-[green] w-full h-full"></div> */}
            {/* <div className="absolute  bottom-0 left-1/2 transform -translate-x-1/2 half-circle z-10  h-fit  flex justify-center items-center">
              <div className="absolute bottom-0 second-half w-full h-[47%] "></div>
            </div> */}
          </div>
          {/* </div> */}
        </div>
        <div className=" overflow-hidden truncate text-center w-full text-base font-bold  mb-1">
          <h2 className="">{heading}</h2>
        </div>
      </div>
    </Link>
  );
};
export default CategoryCard;
