import { getCookie } from "cookies-next";
import { auth, db } from "../config/firebase-config";
import { constant } from '../utils/constants';
import {
    QuerySnapshot,
    addDoc,
    collection,
    deleteDoc,
    doc,
    setDoc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
    FieldPath,
} from "firebase/firestore";

import axios from "axios";
import { fetchProductsForShopPage } from "../config/typesense";
// import { addDoc, collection, doc, setDoc,deleteDoc } from "firebase/firestore";


export const fetchFarmGallery = async () => {
    const docRef = doc(db, "settings", "gallery");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { status: true, res: { ...docSnap.data(), id: docSnap.id } };
    } else {
        // docSnap.data() will be undefined in this case
        return { status: false };
    }
};

export const fetchCategories = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_DOMAIN + '/api/categories',
        { method: "POST", cache: "no-cache" }

        // { cache: 'no-cache' }
    );
    const data = await res.json();
    return JSON.parse(JSON.stringify(data));
};

export const checkUserLogin = (cookie: any) => {
    const uid = auth.currentUser?.uid;
    if (uid) {
        return true;
    }

    if (cookie?.value) {
        return true;
    }

    return false;
    // if (uid && cookie?.value) {
    //   return true;
    // } else {
    //   return false;
    // }
};

export const getUserData = async (cookieData: any) => {
    // console.log(cookieData,"ghdhfdh-------");

    let cookie;

    if (cookieData) {
        cookie = cookieData;
    } else {
        cookie = { value: getCookie('uid') }
    }
    // console.log(cookie,"cookie");

    let uid;
    // console.log(auth,"auth");

    if (auth.currentUser?.uid) {
        uid = auth.currentUser?.uid;
    }
    if (cookie?.value) {
        uid = cookie?.value;
    }
    // console.log("UID", uid);


    if (uid) {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return JSON.parse(JSON.stringify({ ...docSnap.data(), id: docSnap.id }));
        } else {
            return false;
        }
    } else {
        return null;
    }
};
export const getUserPoints=async(cookieData)=>{
    let cookie;

    if (cookieData) {
        cookie = cookieData;
    } else {
        cookie = { value: getCookie('uid') }
    }
    let uid;
    if (auth.currentUser?.uid) {
        uid = auth.currentUser?.uid;
        // console.log(uid,"uid");

    }
    if (cookie?.value) {
        uid = cookie?.value;
    }

    if (uid) {
        console.log("inside uid if");
        // const querySnapshot = await getDocs(collection(db, "users", uid, "pointTransactions"));
        // const arr = []
        // querySnapshot.forEach((doc) => {
        //     const couponData = doc.data();
        //     const couponWithId = { id: doc.id, ...couponData };
        //     arr.push(couponWithId);
        // });
        // return arr

        
        const pointTransactions = await getDocs(collection(db, `users/${uid}/pointTransactions`)).then((res: QuerySnapshot) => {
            if (res.docs.length === 0) {
        console.log("inside uid if res---");
        // console.log();
                
                return [];
            }
            let arr = [];
            for (const point of res.docs) {
        console.log("inside uid for");

                const data = point.data();
                arr.push({ ...data, id: point.id })
            }
            console.log("arr",arr);
            
            return arr;
        })
        return pointTransactions;
    } else {
        return [];
    }

}
export const getUserAddresses = async (cookieData) => {
    let cookie;

    if (cookieData) {
        cookie = cookieData;
    } else {
        cookie = { value: getCookie('uid') }
    }
    let uid;
    if (auth.currentUser?.uid) {
        uid = auth.currentUser?.uid;
        // console.log(uid,"uid");

    }
    if (cookie?.value) {
        uid = cookie?.value;
    }

    if (uid) {
        const addresses = await getDocs(collection(db, `users/${uid}/addresses`)).then((res: QuerySnapshot) => {
            if (res.docs.length === 0) {
                return [];
            }
            let arr = [];
            for (const address of res.docs) {
                const data = address.data();
                arr.push({ ...data, id: address.id })
            }
            return arr;
        })
        return addresses;
    } else {
        return [];
    }
}

export const handleContactUsSubmit = async (data: any) => {
    const docRef = await addDoc(collection(db, "enquiries"), data);
    if (docRef.id) {
        return true;
    }
    return false;
};
export const handleLeadSubmit = async (data: any) => {
    const docRef = await addDoc(collection(db, "leads"), data);
    if (docRef.id) {
        return true;
    }
    return false;
};
export const handleBuyNowRequestSubmit = async (data: any) => {
    const docRef = await addDoc(collection(db, "buyNowRequest"), data);
    if (docRef.id) {
        return true;
    }
    return false;
};


export const fetchHomeSections = async () => {
    // console.log(process.env.NEXT_PUBLIC_API_DOMAIN + '/api/home-page');
    // console.log("hii");

    const res = await fetch(process.env.NEXT_PUBLIC_API_DOMAIN + '/api/home-page',

        //  { next: { revalidate: 60 * 60 * 24 } }

        { cache: 'no-store', method: "POST" }

    );
    const data = await res.json();
    // console.log(data,"from fetchHomeSections ");

    return data;
}



async function fetchBannerSliders(section) {
    return new Promise(async (resolve) => {

        const querySnapshot = query(collection(db, `widgets/${section?.widgetID}/slides`), where('active', '==', true));
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

async function fetchImageBanner(section) {
    return new Promise(async (resolve) => {

        const querySnapshot = query(collection(db, `widgets/${section?.widgetID}/slides`), where('active', '==', true));
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
                    const categoryData = await getDoc(doc(db, 'categories', category)).then(val => {
                        return { ...val.data(), id: val.id }
                    })
                    arr.push(categoryData);
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
                arr.push({ ...product?.data(), id: product?.id })
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
        }
        return resolve({
            status: false
        });
    })
}


export const fetchCategoryProducts = async ({ slug, subCatSlug = null, subSubCatSlug = null, filters = null }) => {
    // console.log("INSIDE CHECK ", filters);

    let categoryId;
    let subCategoryId;
    let subSubCategoryId;

    let catId = await getDocs(query(collection(db, "categories"), where('slug.name', '==', slug))).then((val: QuerySnapshot) => {
        if (val.docs.length != 0) {
            return val.docs[0].id;
        } else {
            return "";
        }
    })
    categoryId = catId;
    let subCatId = null;


    if (subCatSlug) {
        subCatId = await getDocs(query(collection(db, `categories/${catId}/subcategories`), where('slug.name', '==', subCatSlug))).then((val: QuerySnapshot) => {
            if (val.docs.length != 0) {
                return val.docs[0].id;
            } else {
                return "";
            }
        })
        catId = subCatId;
        subCategoryId = subCatId
    }



    let subsubcatId = null;

    if (subSubCatSlug) {
        if (subCatId) {
            subsubcatId = await getDocs(query(collection(db, `categories/${categoryId}/subcategories/${subCategoryId}/subcategories`), where('slug.name', '==', subSubCatSlug))).then((val: QuerySnapshot) => {
                if (val.docs.length != 0) {
                    return val.docs[0].id;
                } else {
                    return "";
                }
            })

            catId = subsubcatId;
            subSubCategoryId = subsubcatId
        }
    }

    if (catId) {
        const products = await fetchProductsForShopPage({ catId, filters: filters })
        if (!products || products.length === 0) {
            if (subSubCatSlug) {
                return await fetchCategoryProducts({ slug: slug, subCatSlug: subCatSlug, subSubCatSlug: null })
            }
            if (subCatId && !subSubCatSlug) {
                return await fetchCategoryProducts({ slug: slug, subCatSlug: null, subSubCatSlug: null })
            }
        }

        let minMax = null;

        if (products.length !== 0) {
            minMax = getMaxAndMinPriceForFilters(products);
        }

        return JSON.parse(JSON.stringify({ products, minMax }));
    }

    return [];
}




export function getMaxAndMinPriceForFilters(arr) {
    let min = Number.MAX_VALUE;


    let max = 0;




    arr.forEach(element => {
        if (element?.discountedPrice > max) {
            max = element?.discountedPrice
        }

        if (element.discountedPrice < min) {
            min = element?.discountedPrice
        }
    });

    let res = [Math.ceil(min), Math.ceil(max)];
    return res

}

export const fetchSingleProduct = async (slug) => {

    const product = await getDocs(query(collection(db, "products"), where('slug.name', '==', slug))).then((val: QuerySnapshot) => {
        if (val.docs.length != 0) {
            return { ...val?.docs[0].data(), id: val.docs[0].id };
        } else {
            return null;
        }
    })

    return JSON.parse(JSON.stringify(product));
}


export const fetchSectionData = async (secId) => {
    return (await getDoc(doc(db, 'widgets', secId))).data();
}


export const addCartObjToUser = async (cartObj) => {
    return await addDoc(collection(db, `users/${auth.currentUser?.uid}/cart`), cartObj).then(val => {
        return val.id
    });
}
export const removeCartObjFromUser = async (docId) => {
    return await deleteDoc(doc(db, `users/${auth.currentUser?.uid}/cart`, docId))

}

export const fetchStates = async () => {
    return await getDoc(doc(db, 'settings', 'states')).then((val) => {
        const data = val.data();
        return data?.codes;
    })
}


export const addressFromPinCode = async (pincode) => {
    try {

        const res = await axios.get(`http://www.postalpincode.in/api/pincode/${pincode}`)
        const data = res.data;
        if (data) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        return null
    }
}

export const updateDefaultAddress = async (address) => {
    return await updateDoc(doc(db, `users`, auth.currentUser?.uid), {
        defaultAddress: address
    })

}
export const addAddressToUser = async (address) => {
    // console.log(address, "adres");
    return await addDoc(collection(db, `users/${auth.currentUser?.uid}/addresses`), address)
    // return await updateDoc(doc(db, `users`, auth.currentUser?.uid), {
    //     defaultAddress: address
    // })

}

export const moveToWishListHandler = async ({ userId, productId }) => {
    try {
        if (userId && productId) {
            // console.log(userId);
            const collectionRef = collection(db, "users")
            const docRef = doc(collectionRef, userId)
            const refDoc = doc(db, "users", userId, "wishlist", productId);
            await setDoc(refDoc, { createdAt: new Date(), id: productId }, { merge: true });
        } else {
            console.log("inside else");
        }
    } catch (error) {
        console.log(error, "error");
    }
}

export const removeFromWishListHandler = async ({ userId, productId }) => {
    try {
        if (userId && productId) {
            await deleteDoc(doc(db, "users", userId, "wishlist", productId));
        } else {
            console.log("inside else");
        }
    } catch (error) {
        console.log(error);
    }
}

export const getUserWishlist = async (userId = "") => {
    if (userId) {
        // console.log(userId);
        const querySnapshot = await getDocs(collection(db, "users", userId, "wishlist"));
        const arr = []
        querySnapshot.forEach((doc) => {
            const result = doc.id
            arr.push(result)
        });
        return arr
    }
    else {
        return []
    }

}

export const getUserWishlistData = async (userId = "") => {
    // console.log(userId,"userId");
    if (userId) {
        // console.log("inside if");
        const querySnapshot = await getDocs(collection(db, "users", userId, "wishlist"));
        const arr = [];
        querySnapshot.forEach((doc) => {
            const result = doc.data();
            arr.push(result);
        });
        let products = [];
        const prodPromises = arr.map(async (item, idx) => {
            const docRef = doc(db, "products", item.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const docData = docSnap.data();
                products.push(docData);
            } else {
                console.log("No such document!");
            }
        });
        // console.log(prodPromises,"prodPromises");

        await Promise.all(prodPromises);
        // console.log(prodPromises,"prodPromises");
        return products;
    } else {
        // console.log("inside if");
        console.log("else");
        return [];
    }
}


// export const getUserWishlistData2 = async (cookieData) => {
//     let cookie;
//     if (cookieData) {
//         cookie = cookieData;
//     } else {
//         cookie = { value: getCookie('uid') }
//     }
//     let uid;
//     if (auth.currentUser?.uid) {
//         uid = auth.currentUser?.uid;
//         console.log(uid,"uid");

//     }
//     if (cookie?.value) {
//         uid = cookie?.value;
//     }

//     if (uid) {
//         console.log("inside if");
//         const wishlists = await getDocs(collection(db, `users/${uid}/wishlist`)).then((res: QuerySnapshot) => {
//             if (res.docs.length === 0) {
//                 return [];
//             }
//             let arr = [];
//             for (const wishlist of res.docs) {
//                 const data = wishlist.data();
//                 arr.push({ ...data, id: wishlist.id })
//             }
//             return arr;
//         })
// console.log(wishlists,"wishlists");

//         let products = [];
//         const prodPromises = wishlists.map(async (item, idx) => {
//             const docRef = doc(db, "products", item.id);
//             const docSnap = await getDoc(docRef);
//             if (docSnap.exists()) {
//                 const docData = docSnap.data();
//                 products.push(docData);
//             } else {
//                 console.log("No such document!");
//             }
//         });
//         console.log(products,"prodPromises before");

//         await Promise.all(prodPromises);
//         console.log(products,"prodPromises");
//         return products;
//     } else {
//         return [];
//     }
// }
export const getUserWishlistData2 = async (cookieData) => {
    let cookie;
    if (cookieData) {
        cookie = cookieData;
    } else {
        cookie = { value: getCookie('uid') }
    }
    let uid;
    if (auth.currentUser?.uid) {
        uid = auth.currentUser?.uid;
        console.log(uid, "uid");

    }
    if (cookie?.value) {
        uid = cookie?.value;
    }
    try {

        // const orderedQuery = query(collection(db, "orders"), orderBy('createdAt', 'desc'));
        // const querySnapshot = await getDocs(orderedQuery);


        const orderedQuery = query(collection(db, `users/${uid}/wishlist`), orderBy('createdAt', 'asc'));
        // const wishlistCollRef = collection(db, `users/${uid}/wishlist`);
        const querySnapshot = await getDocs(orderedQuery);
        const wishlists = [];
        querySnapshot.forEach((doc) => {
            wishlists.push(doc.id);
        });
        const productsCollRef = collection(db, 'products');
        const productPromises = wishlists.map(async (wishlistId) => {
            const productDocRef = doc(productsCollRef, wishlistId);
            const productDocSnapshot = await getDoc(productDocRef);

            if (productDocSnapshot.exists()) {
                return { ...productDocSnapshot.data(), id: productDocSnapshot?.id };
            }
            return null;
        });
        const productsData = await Promise.all(productPromises);
        // console.log('products', productsData);
        return productsData
    } catch (error) {
        console.error('Error occurred while retrieving products:', error);
    }
}

export async function fetchInstagramVideosData() {
    console.log("hii");
    
    const response = (await getDoc(doc(db, "platformMedia", "instagram"))).data();

    if (response && response?.list && response?.list?.length !== 0) {
        console.log("insdie if fetchInstagramVideosData");
        
        return response?.list
    }
    console.log("after if");
    
    return []
    // let arr = []
    // const responseData = await getDocs(query(collection(db, "products"), where("video.active", "==", true), where('status', "==", true))).then((val) => {
    //     if (val.docs.length === 0) return [];

    //     for (const doc of val.docs) {
    //         console.log("insdie for");
            
    //         arr.push({ ...doc.data(), id: doc.id })
    //     }
    //     return;
    // });
    // return arr;
}


export async function fetchVideoProducts() {
    let arr = []
    const responseData = await getDocs(query(collection(db, "products"), where("video.active", "==", true), where('status', "==", true))).then((val) => {
        if (val.docs.length === 0) return [];

        for (const doc of val.docs) {
            arr.push({ ...doc.data(), id: doc.id })
        }
        return;
    });
    return arr;
}


export const getDocFromWidget = async (docId) => {
    const docRef = doc(db, "widgets", docId);
    const docSnap = await getDoc(docRef);
    let arr = []
    if (docSnap.exists()) {

        return { ...docSnap.data(), id: docSnap.id }
    } else {
        console.log("No such document!");
        return null
    }
}


export const couponsAvailable = async () => {
    const docRef = doc(db, "features", "coupons")
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        const data = docSnap.data()
        //   console.log("Document data:", data.showAllCoupons);
        if (data.showAllCoupons) {
            return true
        } else {
            return false
        }
    } else {
        console.log("No such document!");
        return false
    }
}

export const fetchCouponList = async () => {
    const querySnapshot = await getDocs(collection(db, "features", "coupons", "codes"));
    const arr = []
    querySnapshot.forEach((doc) => {
        const couponData = doc.data();
        const couponWithId = { id: doc.id, ...couponData };
        arr.push(couponWithId);
    });
    return arr

}



export const fetchUsersOrdersList = async (userId = "") => {
    // console.log(userId);
    if (userId) {
        const orderedQuery = query(collection(db, "orders"), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(orderedQuery);
        // const querySnapshot = await getDocs(collection(db, "orders"));
        const arr = [];
        querySnapshot.forEach((doc) => {
            const result = doc.data();
            arr.push(result);
        });
        // console.log(arr,"ordr ");
        // return arr
        let products = [];
        const prodPromises = arr.map(async (item, idx) => {
            // const docRef = doc(db, "products", item.id);
            // const docSnap = await getDoc(docRef);
            if (item.userId === userId) {
                // const docData = docSnap.data();
                products.push(item);
            } else {
                console.log("No such document!");
            }
        });
        await Promise.all(prodPromises);
        return products;
    } else {
        // console.log("else");
        return [];
    }
}

export async function getStoreDetails() {
    return (await getDoc(doc(db, 'settings', 'store'))).data();
}

export async function deleteUserAddress({ userId, docId }) {
    console.log(userId, docId);
    try {
        if (userId && docId) {
            await deleteDoc(doc(db, "users", userId, "addresses", docId));
        } else {
            console.log("inside else");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function fetchPrivacyData() {
    const docRef = doc(db, "settings", "policies");
    const docSnap = await getDoc(docRef);
    // console.log(docSnap,"docSnap");

    try {
        if (docSnap.exists()) {
            const data = docSnap.data()
            //  console.log("privacydata" ,data);

            return data
        } else {
            console.log("No such document!");
            // return false
        }
    } catch (error) {
        console.log(error);

    }
}

export async function fetchAboutData() {
    const docRef = doc(db, "pages", "about");
    const docSnap = await getDoc(docRef);
    // console.log(docSnap,"docSnap");

    try {
        if (docSnap.exists()) {
            const data = docSnap.data()
            //  console.log("privacydata" ,data);

            return data
        } else {
            console.log("No such document!");
            // return false
        }
    } catch (error) {
        console.log(error);
    }
}

export const fetchStorLocations = async () => {
    const res = await getDocs(collection(db, "branches")).then((snaoShot) => {
        if (snaoShot.docs.length === 0) return [];

        let arr = [];
        for (const location of snaoShot.docs) {
            let data = location.data();
            arr.push({ ...data, id: location.id })
        }

        return arr
    })

    return JSON.parse(JSON.stringify(res))
    // return (await getDoc(doc(db, "storeLocations", 'locations'))).data();
}

export const fetchPointsDetails=async()=>{
    const docRef = doc(db, "features", "points");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data=docSnap.data()
      return {...data}
    } else {
      return null
    }
}



export const fetchFiltersData=async()=>{

const res = await getDocs(collection(db, "features","filters","list")).then((snaoShot) => {
    if (snaoShot.docs.length === 0) return [];

    let arr = [];
    for (const location of snaoShot.docs) {
        // console.log("inside for loop");
        
        let data = location.data();
        // console.log("data",data);
        
        arr.push({ ...data, id: location.id })
    }

    return arr
})

return JSON.parse(JSON.stringify(res))
}
