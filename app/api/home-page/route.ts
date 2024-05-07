import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import { NextResponse } from "next/server";

export const POST = async (request) => {

    const fetchHomeSections = async () => {
        const docRef = doc(db, "pages", 'homepage');

        
        const docSnap = await getDoc(docRef);
        let homeSections: any = [];
        if (docSnap.exists()) {
            
            homeSections = JSON.parse(JSON.stringify({ ...docSnap.data() }));
        } else {
            homeSections = null;
        }
        if (homeSections) {

            let promiseArr = [];


            for (const section of homeSections?.sections) {
                if (section?.location === "all" || section?.location === "web") {
                    switch (section?.widgetType) {
                        case "banner-slider":
                            if (section?.widgetID) {
                                promiseArr.push(fetchBannerSliders(section))
                            }
                            // fetchBannerSliders(section);
                            break;
                        case "image-banner":
                            if (section?.widgetID) {
                                promiseArr.push(fetchImageBanner(section))
                            }
                            break;
                        case "product-carousel":
                            if (section?.widgetID) {

                                promiseArr.push(fetchProductCarousel(section))
                            }


                            // fetchProductCarousel(section, regionId);
                            break;
                        case "categories":
                            if (section?.widgetID) {


                                promiseArr.push(fetchCategoriesWidget(section))
                            }


                            // fetchCategories(section, regionId);
                            break;
                        case "vendors":
                            if (section?.widgetID) {

                                promiseArr.push(fetchVendors(section))
                            }

                            // fetchVendors(section, regionId);
                            break;
                        case "text-block":
                            if (section?.widgetID) {

                                promiseArr.push(fetchTextBlock(section))
                            }

                            // fetchTextBlock(section, regionId);
                            break;
                        case "product-list":
                            if (section?.widgetID) {

                                promiseArr.push(fetchProductList(section))
                            }

                            // fetchProductList(section, regionId);
                            break;
                        case "image-block":
                            if (section?.widgetID) {

                                promiseArr.push(fetchImageBlock(section))
                            }

                            // fetchImageBlock(section, regionId);
                            break;
                        case "video-block":
                            if (section?.widgetID) {

                                promiseArr.push(fetchVideoBlock(section))
                            }

                            break;

                        case "brands":
                            if (section?.widgetID) {

                                promiseArr.push(fetchBrands(section))
                            }

                            break;

                        case "services":
                            if (section?.widgetID) {

                                promiseArr.push(fetchServices(section))
                            }
                            break;



                        // fetchVideoBlock(section, regionId);
                        default:
                    }
                }
            }

            
            
            
            try {

const res = await Promise.allSettled(promiseArr).then((values: any) => {
    
    let arr = [];
    values.forEach(val => {
        arr.push(val?.value);
    })
    return arr;
})

                return JSON.parse(JSON.stringify({ homeSections, data: res }))
            } catch (error) {
                console.log("ERRORRRRRRR", error);

            }

        } else {
            console.log("ELSEEE");

            return null;
        }

    }

    async function fetchBannerSliders(section) {
        return new Promise(async (resolve) => {

            const querySnapshot = query(collection(db, `widgets/${section?.widgetID}/webSlides`), where('active', '==', true));
            const res = await getDocs(querySnapshot);
            if (res.docs) {
                let arr = [];
                for (const slid of res.docs) {
                    arr.push({ ...slid?.data(), id: slid?.id })
                }

                resolve({ status: true, arr, id: section?.widgetID });
            }
            return resolve({
                status: false
            });
        })
    }

    // async function fetchImageBanner(section) {
    //     return new Promise(async (resolve) => {

    //         const querySnapshot = query(collection(db, `widgets/${section?.widgetID}/webSlides`), where('active', '==', true));
    //         const res = await getDocs(querySnapshot);
    //         if (res.docs) {
    //             let arr = [];
    //             for (const slid of res.docs) {
    //                 arr.push({ ...slid?.data(), id: slid?.id })
    //             }

    //             resolve({ status: true, arr, id: section?.widgetID });
    //         }
    //         return resolve({
    //             status: false
    //         });
    //     })
    // }

    async function fetchImageBanner(section) {
        return new Promise(async (resolve) => {

            const querySnapshot = query(collection(db, `widgets/${section?.widgetID}/webSlides`), where('active', '==', true), orderBy('createdAt', 'desc'));
            const res = await getDocs(querySnapshot);
            if (res.docs) {
                let arr = [];
                for (const slid of res.docs) {
                    arr.push({ ...slid?.data(), id: slid?.id })
                }

                resolve({ status: true, arr, id: section?.widgetID });
            }
            return resolve({
                status: false
            });
        })
    }

    async function fetchProductCarousel(section) {
        return new Promise(async (resolve) => {

            const querySnapshot = query(collection(db, `widgets/${section?.widgetID}/products`), where('data.status', '==', true), orderBy('sortedAt', 'desc'));
            const res = await getDocs(querySnapshot);
            if (res.docs) {
                let arr = [];
                for (const product of res.docs) {
                    arr.push({ ...product?.data(), id: product?.id })
                }
                resolve({ status: true, arr, id: section?.widgetID });
            }
            return resolve({
                status: false
            });
        })
    }

    async function fetchCategoriesWidget(section) {
        return new Promise(async (resolve) => {
            const docRef = doc(db, "widgets", section?.widgetID);
            const docSnap = (await getDoc(docRef)).data();
            if (docSnap) {
                let categoryIdList = docSnap?.categoryList;
                if (categoryIdList) {
                    let arr = [];

                    for (const category of categoryIdList) {
                        const categoryData: any = await getDoc(doc(db, 'categories', category)).then(val => {
                            return { ...val.data(), id: val.id }
                        })
                        if (categoryData?.status) {
                            arr.push(categoryData);
                        }
                    }
                    resolve({ status: true, arr, id: section?.widgetID });
                }
                return {
                    status: false
                };
            }
            return resolve({
                status: false
            });
        })
    }

    async function fetchVendors(section) {
        return new Promise(async (resolve) => {

            const docRef = doc(db, "widgets", section?.widgetID);
            const docSnap = (await getDoc(docRef)).data();
            if (docSnap) {
                let vendorsIdList = docSnap?.vendorsList;

                if (vendorsIdList) {
                    let arr = [];

                    for (const vendor of vendorsIdList) {
                        const vendorData = await getDoc(doc(db, `features/multiVendor/vendors`, vendor)).then(val => {
                            return { ...val.data(), id: val.id }
                        })
                        arr.push(vendorData);
                    }
                    resolve({ status: true, arr, id: section?.widgetID });
                }
                return {
                    status: false
                };
            }
            return resolve({
                status: false
            });

        })
    }

    async function fetchBrands(section) {
        return new Promise(async (resolve) => {

            const docRef = doc(db, "widgets", section?.widgetID);
            const docSnap = (await getDoc(docRef)).data();
            if (docSnap) {
                let brandList = docSnap?.brandList;

                if (brandList) {
                    let arr = [];

                    for (const brand of brandList) {
                        const brandData = await getDoc(doc(db, `brands`, brand)).then(val => {
                            return { ...val.data(), id: val.id }
                        })
                        arr.push(brandData);
                    }
                    resolve({ status: true, arr, id: section?.widgetID });
                }
                return {
                    status: false
                };
            }
            return resolve({
                status: false
            });

        })
    }

    async function fetchServices(section) {
        return new Promise(async (resolve) => {

            const docRef = doc(db, "widgets", section?.widgetID);
            const docSnap = (await getDoc(docRef)).data();
            if (docSnap) {
                let serviceList = docSnap?.serviceList;

                if (serviceList) {
                    let arr = [];

                    for (const service of serviceList) {
                        const serviceData = await getDoc(doc(db, `services`, service)).then(val => {
                            return { ...val.data(), id: val.id }
                        })
                        arr.push(serviceData);
                    }

                    resolve({ status: true, arr, id: section?.widgetID });
                }

                return resolve({ status: false, arr: [], id: section?.widgetID })
            }
            return resolve({
                status: false
            });

        })
    }

    async function fetchTextBlock(section) {
        return new Promise(async (resolve) => {

            const docRef = doc(db, "widgets", section?.widgetID);
            const docSnap = (await getDoc(docRef)).data();
            if (docSnap) {
                resolve({ status: true, docSnap, id: section?.widgetID });
            }
            return resolve({
                status: false
            });
        })
    }

    async function fetchProductList(section) {
        return new Promise(async (resolve) => {

            const querySnapshot = query(collection(db, `widgets/${section?.widgetID}/products`), where('data.status', '==', true), orderBy('sortedAt', 'desc'));
            const res = await getDocs(querySnapshot);
            if (res.docs) {
                let arr = [];
                for (const product of res.docs) {
                    const data: any = product.data();
                    arr.push({ ...data, id: product?.id })
                }
                resolve({ status: true, arr, id: section?.widgetID });
            }
            return resolve({
                status: false
            });
        })
    }

    async function fetchImageBlock(section) {
        return new Promise(async (resolve) => {

            const docRef = doc(db, "widgets", section?.widgetID);
            const docSnap = (await getDoc(docRef)).data();
            if (docSnap) {
                resolve({ status: true, docSnap, id: section?.widgetID });
            }
            return resolve({
                status: false
            });
        })
    }

    async function fetchVideoBlock(section) {
        return new Promise(async (resolve) => {

            const docRef = doc(db, "widgets", section?.widgetID);
            const docSnap = (await getDoc(docRef)).data();
            if (docSnap) {

                resolve({ status: true, docSnap, id: section?.widgetID });

                return
            }

            return resolve({
                status: true, docSnap: null, id: section?.widgetID
            });
        })
    }

    const response = await fetchHomeSections();
    return NextResponse.json(response);
} 