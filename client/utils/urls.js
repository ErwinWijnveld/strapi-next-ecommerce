export const imageToUrl = (image) => {
    if (image) {
        return process.env.NEXT_PUBLIC_STRAPI_BASE_URL + image.attributes.url;
    }
    return null;
}
