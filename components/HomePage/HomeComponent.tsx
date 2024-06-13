"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchHomeSections } from "../../utils/databaseService";
import BannerSlider from "./widgets/BannerSlider";
import CategoriesSlider from "./widgets/CategoriesSlider";
import ImageBanner from "./widgets/ImageBanner";
import ImageBlock from "./widgets/ImageBlock";
import ProductCarousel from "./widgets/ProductCarousel";
import ProductList from "./widgets/ProductList";
import Services from "./widgets/Services";
import Vendors from "./widgets/Vendors";
// import BrandSlider from "./widgets/BrandSlider";
import Advertisement from "../advertisement/Advertisement";
import InstaFamilySlider from "../instaFamily/InstaFamilySlider";
import ReviewSlider from "../reviews/ReviewSlider";
import WatchShopSlider from "../watchAndShop/WatchShopSlider";
import CategoryGrid from "./widgets/CategoryGrid";
import StoreLinks from "./widgets/StoreLinks";
// import CategoryGrid from "./widgets/CategoryGrid";

const HomeComponent = ({ cookie }) => {
  const { data: homeData } = useQuery({
    queryKey: ["homeSections"],
    queryFn: fetchHomeSections,
    cacheTime: 180,
  });
  // console.log("homeData");

  function renderWidgets(section, idx) {
    // console.log("CHCOG", section?.widgetType);lo

    switch (section?.widgetType) {
      case "banner-slider":
        return <BannerSlider myKey={idx} section={section} />;
      case "image-banner":  //new arrivals 30% off
        return <ImageBanner myKey={idx} section={section} />;
      case "product-carousel": //bestseller
        return (
          <ProductCarousel myKey={idx} section={section} cookie={cookie} />
        );
      // fetchProductCarousel(section, regionId);
      case "categories":
        if (section?.designType === "combo") {
          return <CategoryGrid section={section}></CategoryGrid>; //shein style combo sale
        }

        return <CategoriesSlider myKey={idx} section={section} />; //shop by category
      // fetchCategories(section, regionId);
      case "vendors":
        return <Vendors myKey={idx} section={section} />;
      // fetchVendors(section, regionId);
      // case "text-block":
      //   return <TextBlock myKey={idx} section={section} />;
      // fetchTextBlock(section, regionId);
      case "product-list":
        return <ProductList myKey={idx} section={section} />;
      // fetchProductList(section, regionId);
      case "image-block":
        return <ImageBlock myKey={idx} section={section} />;
      // fetchImageBlock(section, regionId);
      case "video-block":
        return <ImageBlock myKey={idx} section={section} isVideo={true} />;
      // case "brands":
      //   // <CategoriesSlider myKey={idx} section={section}/>
      //   // return <BrandSlider myKey={idx} section={section} isBrand={true} />;
      //   return <Brands myKey={idx} section={section} isBrand={true} />;
      case "services":
        return <Services section={section} myKey={idx} />;
      case "testimonials":
        return <ReviewSlider />; //what they are saying
      case "advertise":
        return <Advertisement />; //refer and earn
      case "video-products":
        return <WatchShopSlider />; //watch and shop
      case "instagram-family":
        return <InstaFamilySlider />;
      case "playStore":
        return <StoreLinks />;
      default:
    }
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col">
        {homeData &&
          homeData?.homeSections?.sections?.map((section: any, idx: any) => {
            // console.log(section,"section", "idx" , idx);

            if (section?.location == "all" || section?.location === "web") {
              return (
                <div
                  className={`   ${
                    section?.widgetType == "image-banner" && idx == 1
                      ? ""
                      : ""
                  }`}
                >
                  {renderWidgets(section, idx)}
                </div>
              );
            }
          })}
        {/* <StoreLinks/> */}
      </div>
    </div>
  );
};

export default HomeComponent;
