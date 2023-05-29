import http from "../http-commons";

const getListStock = () => {
  return http.get("vend/liststock");
};

const getListStockOffline = () => {
  return http.get("vend/liststock_offline");
};

const vendingService = {
  getListStock,
  getListStockOffline,
};
export default vendingService;
