import http from "../http-commons";

const getSlotOnline = () => {
  return http.get("api/get-slot");
};

const getSlotOffline = () => {
  return http.get("vending/get-slot");
};

const getBannerImageOnline = () => {
  return http.get("api/get-banner-image");
};

const getBannerImageOffline = () => {
  return http.get("vending/get-banner-image");
};

const getQRShopee = (url = "") => {
  return http.get(url);
};

const vendingService = {
  getSlotOnline,
  getSlotOffline,
  getBannerImageOnline,
  getBannerImageOffline,
  getQRShopee,
};
export default vendingService;
