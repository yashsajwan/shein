import { doc, getDoc } from "firebase/firestore";
import { encodeURL } from "../parseUrl";
import { auth, db } from "../../config/firebase-config";

function bannerLink(bannerData: any) {
    if (bannerData.hasOwnProperty('link')) {
        const userId = auth.currentUser?.uid;
        const linkType = bannerData.link.type;
        const id = 'ids' in bannerData.link ? bannerData.link.ids : (typeof bannerData.link.id === 'string' ? [bannerData.link.id] : bannerData.link.id);
        const name = bannerData.link.name || '';
        const idLength = id.length;

        if (linkType?.toLowerCase() === "product") {
            if (idLength > 1) {
                const queryString = `?type=${linkType}&ids=` + encodeURIComponent(JSON.stringify(id));

                return `/taggedItems${queryString}`
            } else {
                return `/product/${bannerData?.link?.slug}`
            }
        }

        if (linkType?.toLowerCase() === "category") {
            if (idLength > 1) {
                const queryString = `?type=${linkType}&ids=` + encodeURIComponent(JSON.stringify(id));

                return `/taggedItems${queryString}`
            } else {
                return `/shop/category/${bannerData?.link?.slug}`
            }
        }

        if (linkType?.toLowerCase() === "subcategory") {
            if (idLength > 1) {
                const queryString = `?type=${linkType}&ids=` + encodeURIComponent(JSON.stringify(id));

                return `/taggedItems${queryString}`
            } else {
                return `/shop/category/${bannerData?.link?.categorySlug}/${bannerData?.link?.slug}`
            }
        }
        if (linkType?.toLowerCase() === "brand") {
            if (idLength > 1) {
                const queryString = `?type=${linkType}&ids=` + encodeURIComponent(JSON.stringify(id));

                return `/taggedItems${queryString}`
            } else {
                return `/brand-product/${bannerData?.link?.slug}`
            }
        }
    }
}
export { bannerLink}