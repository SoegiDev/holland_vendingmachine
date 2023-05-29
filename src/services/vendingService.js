import http from "../http-commons";

const getListStock = () => {
  return http.get("vend/liststock");
};

const vendingService = {
  getListStock,
};
export default vendingService;
