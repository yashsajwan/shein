export const checkIfPriceDiscounted = ({ discountedPrice, price }) => {
    if (discountedPrice < price) {
        return true
    }
    return false
}

export const getDiscountedPercentage = ({ price, discountedPrice }: any) => {
    return `${Math.ceil(((price - discountedPrice) / price) * 100)}%`
};


export const initialAddress = {
    address: "",
    city: "",
    lat: 0,
    lng: 0,
    name: "",
    phoneNo: "",
    pincode: "",
    state: "",
    stateCode: "",
    defaultAddress: true,
    country: "",
};

export const paymentMethods = [
    {
        name: "Cash on Delivery", value: "cod"
    },
];


export function getProductPriceDetails({ isDiscounted = false, product, currRate = 1, index }) {
    if (product?.isPriceList) {
        if (isDiscounted) {
            return (product?.priceList[index]?.discountedPrice * currRate)?.toFixed(2)
        } else {
            return (product?.priceList[index]?.price * currRate)?.toFixed(2)
        }
    } else {
        if (isDiscounted) {
            return (product?.discountedPrice * currRate)?.toFixed(2)
        } else {
            return (product?.prodPrice * currRate)?.toFixed(2)
        }
    }
}

export const tabs = ["Shipping", "Payment", "Review"];

export function checkIfItemExistInCart(cart, product, index = 0) {
    if (product?.isPriceList) {
        return cart?.filter((item) => item?.productId === product?.id && item?.description === product.priceList[index].weight)
            .length !== 0;
    } else {

        return cart?.filter((item) => item?.productId === product?.id)
            .length !== 0;
    }
}

export function getProductIndexFromCart(cart, product) {
    return cart.findIndex((item) => item?.productId === product?.id);
}

export function getProductFromCart(cart, product) {
    return cart?.filter((item) => item?.productId === product?.id)
        .length !== 0 ? cart?.filter((item) => item?.productId === product?.id)[0] : null;
}

export function getFilteredProducts({ filters, products }) {
    // console.log("filters",filters);
    
    let newArr = products || []
    if (filters.price !== null && products && products?.length !== 0) {
        // console.log("inside if");
        
        newArr = products.filter((e) => e?.discountedPrice >= filters.price[0] && e?.discountedPrice <= filters?.price[1])
    }
// console.log("newArr",newArr);

    return newArr
}


export const getOtherFilteredProducts = async ({ filters, products, otherFilters }: { filters: any, products: any, otherFilters: any }) => {
    let newProducts = getFilteredProducts({ filters, products });
    for (const [filterName, values] of Object.entries(otherFilters)) {
        if (values && Array.isArray(values) &&values.length&& values.every((val) => typeof val === 'string')) {
            newProducts = newProducts.filter((prodData) => {
                const { filters }: { filters?: Record<string, string[]> } = prodData;
                return filters && filters[filterName] && (filters[filterName] as string[]).some((filterValue) => values.includes(filterValue));
            });
        }
    }    
    return await newProducts;
}



