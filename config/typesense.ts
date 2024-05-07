
import { doc, getDoc } from "firebase/firestore";
import { app, db, firebaseConfig } from "./firebase-config";

export function typesense_initClient() {
    return new Promise(async (resolve, reject) => {
        try {
            const env = (await getDoc(doc(db, 'settings', 'environment'))).data();
            const Typesense = require('typesense');
            let typesenseClient = new Typesense.Client({
                'nodes': [{
                    'host': env?.typesense?.host,
                    'port': env?.typesense?.port,
                    'protocol': env?.typesense?.protocol
                }],
                'apiKey': env?.typesense?.searchOnlyKey,
                'connectionTimeoutSeconds': 2
            });
            resolve(typesenseClient);
        } catch (error) {
            console.log('error in initialising typesense client');
            resolve(null);
        }
    })
}

export async function handleTypesenseSearch(query) {
    const client: any = await typesense_initClient();
    if (client) {
        const searchParameters = {
            q: query,
            query_by: 'prodName, searchKeywords',
        };
        let projectId = firebaseConfig?.projectId;
        try {
            const data = await client
                .collections(`${projectId}-products`)
                .documents()
                .search(searchParameters);

            if (data && data?.hits) {
                let arr = [];
                for (const prod of data?.hits) {
                    if (prod.document.isPriceList) {
                        const value = JSON.parse(prod?.document?.priceList);
                        let newProd = { ...prod?.document, priceList: value }
                        arr.push(newProd)
                    } else {
                        arr.push(prod?.document)
                    }
                }
                return arr;
            }
            return data;
        } catch (error) {
            console.log(error, "error ISIDE CATCH");
            return [];
        }
    }

}

function parseArrayOfObjects(object) {
    for (const key in object) {
        try {
            const value = JSON.parse(object[key]);
            if ((Array.isArray(value) && value.length && typeof value[0] == 'object') || (Array.isArray(value) && !value.length)) {
                object[key] = value;
            }
        } catch (error) {

        }
    }
    return object;
}


export async function fetchSimilarProductsForCart({ cart = null, searchKeywords = null }) {
    let keyWords = [];
    if (searchKeywords === null) {
        if (cart && cart.length > 0) {
            for (const cartItem of cart) {
                if (cartItem?.keywords) {
                    cartItem.keywords.forEach((keyword) => {
                        if (!keyWords.includes(keyword)) {

                            keyWords.push(keyword)
                        }
                    });
                }
            }
        }
    } else {
        keyWords = searchKeywords;
    }
    const client: any = await typesense_initClient();
    if (client) {
        const searchParameters = {
            q: '*',
            query_by: 'prodName, searchKeywords',
            filter_by: `searchKeywords:=[${keyWords}]`
        };
        let projectId = firebaseConfig?.projectId;
        try {
            const data = await client
                .collections(`${projectId}-products`)
                .documents()
                .search(searchParameters);
            if (data && data?.hits) {
                let arr = [];
                for (const prod of data?.hits) {
                    let priceList = [];
                    if (prod?.document?.priceList && prod?.document?.priceList?.length > 2) {
                        priceList = JSON.parse(prod?.document?.priceList)
                    }
                    arr.push({ ...prod?.document, priceList })
                }
                return arr;
            }
            return data;
        } catch (error) {
            console.log(error, "error ISIDE CATCH");
            return [];
        }
    }
    return []
}


export async function fetchProductsForShopPage({ catId, filters }) {
    const client: any = await typesense_initClient();
    if (client) {
        let searchParameters = {
            q: '*',
            query_by: 'prodName, categories',
            filter_by: `categories:=[${catId}}]`
        };

        if (filters?.price) {
            searchParameters.filter_by += ` && discountedPrice:>${filters?.price[0]} && discountedPrice:<${filters?.price[1]}`
        }

        // console.log("SEARCH PARAMS", searchParameters, filters);


        let projectId = firebaseConfig?.projectId;
        try {
            const data = await client
                .collections(`${projectId}-products`)
                .documents()
                .search(searchParameters);

            if (data && data?.hits) {
                let arr = [];
                for (const prod of data?.hits) {
                    let priceList = [];
                    if (prod?.document?.priceList && prod?.document?.priceList?.length > 2) {
                        priceList = JSON.parse(prod?.document?.priceList)
                    }
                    if (prod?.document?.status) {
                        arr.push({ ...prod?.document, priceList })
                    }
                }

                return arr;
            }
            return data;
        } catch (error) {
            console.log(error, "error ISIDE CATCH");
            return [];
        }
    }

    return []
}


// new code end 

