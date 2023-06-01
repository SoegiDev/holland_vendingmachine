import React, { useEffect, useState } from "react";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";
import RunningText from "../components/RunningText";
import ContentFooter from "../components/ContentFooter";
import { Products } from "../data";
import Modal from "../components/Modal";
import ModalConfirmation from "../components/ModalConfirmation";
import ModalBeli from "../components/ModalPayment_Qr";
import useIdle from "../hooks/useIdleTimeout";
import loadingGif from "../assets/img/loading.gif";
import vendingService from "../services/vendingService";
var VM_ID = process.env.REACT_APP_VM_ID;
var VM_NAME = process.env.REACT_APP_VM_NAME;
const Vending = () => {
  const [items] = useState(Products);
  const [transaction, setTransaction] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [dataConfirmation, setDataConfirmation] = useState({});
  const [openBeli, setOpenBeli] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [screensaverActive, setScreensaverActive] = useState(false);
  const [slots, setSlot] = useState([]);
  const [banners, setBanner] = useState([]);
  const [loadingFirst, setLoading] = useState(true);
  const [totalItemCart, setTotalItemCart] = useState(0);
  const [contentQr, setContentQr] = useState(null);
  const [statusQR, setStatusQR] = useState(false);
  const [trxCode, setTrxCode] = useState(null);
  const getInitSlot = () => {
    vendingService
      .getSlotOnline()
      .then((response) => {
        setSlot(response.data.results.data);
        setLoading(!loadingFirst);
        ///  getInitImage();
      })
      .catch((e) => {
        console.log("TIDAK OK");
        console.log(e);
      });
  };
  const getInitImage = () => {
    vendingService
      .getBannerImageOnline()
      .then((response) => {
        setBanner(response.data.results.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  let sumSubTotal = 0;
  const handleIdle = () => {
    setScreensaverActive(true);
  };
  const { idleTimer } = useIdle({ onIdle: handleIdle, idleTime: 200 });

  const stay = () => {
    setScreensaverActive(false);
    idleTimer.reset();
  };
  useEffect(() => {
    if (slots === undefined || slots.length === 0) getInitSlot();
  });

  useEffect(() => {
    localStorage.setItem("transaction", JSON.stringify(transaction));
    localStorage.setItem("subTotal", subTotal);
    localStorage.setItem("slots", JSON.stringify(slots));
    localStorage.setItem("banners", JSON.stringify(banners));
  });
  useEffect(() => {
    if (localStorage.getItem("slots") !== null) {
      setSlot(localStorage.getItem("slots"));
    }
    if (localStorage.getItem("banners") !== null) {
      setSlot(localStorage.getItem("banners"));
    }
    if (localStorage.getItem("transaction") !== null) {
      setTransaction(JSON.parse(localStorage.getItem("transaction")));
      if (localStorage.getItem("subTotal") !== null) {
        setSubTotal(localStorage.getItem("subTotal"));
      }
    }
  }, []);
  const setToOpenCart = (cart) => {
    setOpenCart(cart);
  };

  const setToOpenConfirmation = (props) => {
    setDataConfirmation(props);
    if (props.deleted) {
      if (props.module === "remove-all") {
        setSubTotal(0);
        setTotalItemCart(0);
        setTransaction([]);
        setOpenCart(false);
      }
      if (props.module === "remove-item") {
        deleteItem(props.Data);
      }
      setOpenConfirmation(props.status);
    } else {
      setOpenConfirmation(props.status);
    }
  };
  const setToOpenBeli = (confirm, payment) => {
    if (payment) {
      setPaymentQR(totalItemCart, subTotal, confirm);
    } else {
      setOpenBeli(confirm);
    }
  };

  const addTransaction = (item, tambah) => {
    const existItem = transaction.find((slot) => slot.no_slot === item.no_slot);
    if (!existItem) {
      var harga = item.status_promo === 1 ? item.harga_promo : item.harga_jual;
      setTransaction([
        ...transaction,
        {
          id_vm: null,
          documentno: null,
          no_slot: item.no_slot,
          kode_produk: item.kode_produk,
          name_produk: item.name_produk,
          rear_status: null,
          timestamp: null,
          error_no: null,
          error_msg: null,
          qty: 1,
          onhand: item.onhand,
          image: item.image,
          payment_type: null,
          verify_no: null,
          harga: harga,
          harga_jual: item.harga_jual,
          issync: 0,
        },
      ]);

      const disc =
        item.status_promo === "1" ? item.harga_promo : item.harga_jual;
      sumSubTotal = disc;
      setSubTotal(parseInt(subTotal) + sumSubTotal);
      setTotalItemCart(totalItemCart + 1);
    } else {
      if (tambah) {
        const disc =
          item.status_promo === "1" ? item.harga_promo : item.harga_jual;
        sumSubTotal = disc;
        setSubTotal(parseInt(subTotal) + sumSubTotal);
        setTransaction(
          transaction.map((product) =>
            product.no_slot === item.no_slot
              ? {
                  id_vm: null,
                  documentno: null,
                  no_slot: item.no_slot,
                  kode_produk: item.kode_produk,
                  name_produk: item.name_produk,
                  rear_status: null,
                  timestamp: null,
                  error_no: null,
                  error_msg: null,
                  payment_type: null,
                  verify_no: null,
                  harga: harga,
                  harga_jual: item.harga_jual,
                  issync: 0,
                  qty: existItem.qty + 1,
                  onhand: item.onhand,
                  image: item.image,
                }
              : product
          )
        );
        setTotalItemCart(totalItemCart + 1);
      } else {
        if (item.qty <= 1) {
          setToOpenConfirmation({
            Data: item,
            module: "remove-item",
            message: "Anda ingin Menghapus ",
            status: true,
          });
        } else {
          const disc =
            item.status_promo === "1" ? item.harga_promo : item.harga_jual;
          sumSubTotal = disc;
          setSubTotal(parseInt(subTotal) - sumSubTotal);
          setTransaction(
            transaction.map((product) =>
              product.no_slot === item.no_slot
                ? {
                    id_vm: null,
                    documentno: null,
                    no_slot: item.no_slot,
                    kode_produk: item.kode_produk,
                    name_produk: item.name_produk,
                    rear_status: null,
                    timestamp: null,
                    error_no: null,
                    error_msg: null,
                    payment_type: null,
                    verify_no: null,
                    harga: harga,
                    harga_jual: item.harga_jual,
                    issync: 0,
                    qty: existItem.qty - 1,
                    onhand: item.onhand,
                    image: item.image,
                  }
                : product
            )
          );
          setTotalItemCart(totalItemCart - 1);
        }
      }
    }
  };
  const deleteItem = (item) => {
    setTransaction(transaction.filter((cart) => cart.no_slot !== item.no_slot));
    const disc = item.status_promo === "1" ? item.harga_promo : item.harga_jual;
    const afterDisc = disc;
    sumSubTotal = afterDisc * item.qty;
    setSubTotal(parseInt(subTotal) - sumSubTotal);
    if (transaction.length <= 1) {
      setOpenCart(false);
    }
    setTotalItemCart(totalItemCart - 1);
  };

  const setPaymentQR = (jumlahItem = 0, jumlahBayar = 0, confirm = false) => {
    var trxCode =
      VM_ID +
      "-" +
      formatDate(new Date()) +
      Math.random().toString(36).substr(2, 9);
    var apiQRCode = "payment/qr-shopee?";
    apiQRCode += "trx_code=" + trxCode + "&";

    var product_name = "";
    var TotalBayar = 0;

    if (TotalBayar !== jumlahBayar) {
      //return false;
    }

    for (let i = 0; i < transaction.length; i++) {
      var data = transaction[i];
      product_name += data.name_produk + ",";
      TotalBayar += data.onhand * data.harga_jual;
    }

    apiQRCode += "product_name=" + product_name + "&";
    apiQRCode += "qty_product=" + jumlahItem + "&";
    //console.log(rawItemData[itemNo].nama);
    var amount = jumlahBayar;
    apiQRCode += "amount=" + amount;

    var timestamp = new Date().getUTCMilliseconds();
    vendingService
      .getQRShopee(apiQRCode)
      .then((response) => {
        if (response.data.message === "SUCCESS") {
          setStatusQR(true);
          setContentQr(response.data.results.qrcode);
          setTrxCode(trxCode);
          setOpenBeli(true);
        } else {
          setStatusQR(false);
          setContentQr("https://www.hollandbakery.co.id");
          setOpenBeli(true);
        }
      })
      .catch((e) => {
        setOpenBeli(false);
        console.log(e);
      });
  };
  function formatDate(d) {
    //return the string "MMddyy"
    return getYear(d) + getMonth(d);
  }

  function getMonth(d) {
    //get the month
    var month = d.getMonth();

    //increment month by 1 since it is 0 indexed
    //converts month to a string
    //if month is 1-9 pad right with a 0 for two digits
    month = (month + 1).toString().padStart(2, "0");

    return month;
  }

  // function getDay with 1 parameter expecting date
  // This function returns a string of type dd (example: 09 = The 9th day of the month)
  function getDay(d) {
    //get the day
    //convert day to string
    //if day is between 1-9 pad right with a 0 for two digits
    var day = d.getDate().toString().padStart(2, "0");

    return day;
  }

  // function getYear with 1 parameter expecting date
  // This function returns the year in format yy (example: 21 = 2021)
  function getYear(d) {
    //get the year
    var year = d.getFullYear();

    //pull the last two digits of the year
    year = year.toString().substr(-2);

    return year;
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <div className="portrait:hidden">Landscape</div>
      {screensaverActive ? (
        <div
          id="screenSaver"
          className="landscape:hidden w-screen h-full"
          onClick={stay}
        >
          <div className="flex h-full w-full bg-hollandtints-800 ">
            <p className="flex text-4xl font-sans text-white items-center">
              ScreenSaver
            </p>
          </div>
        </div>
      ) : (
        <div className="landscape:hidden w-screen">
          <TopHeader />
          <Header />
          <RunningText />
          {loadingFirst ? (
            <div className="flex justify-center">
              <img
                src={loadingGif}
                alt=""
                className="flex h-64 w-64 items-center"
              />
            </div>
          ) : (
            <Content
              loadingFirst={loadingFirst}
              items={items}
              slots={slots}
              addTransaction={addTransaction}
            />
          )}
          <ContentFooter
            itemsTransaction={transaction}
            setToOpenCart={setToOpenCart}
            totalItemCart={totalItemCart}
          />
          <Footer />
          {openCart && (
            <Modal
              className="transition-transform delay-700 duration-700 ease-in-out"
              itemsTransaction={transaction}
              addTransaction={addTransaction}
              setToOpenConfirmation={setToOpenConfirmation}
              setToOpenBeli={setToOpenBeli}
              setToOpenCart={setToOpenCart}
              subTotal={subTotal}
              totalItemCart={totalItemCart}
            />
          )}
          {openConfirmation && (
            <ModalConfirmation
              className="transition-transform delay-700 duration-700 ease-in-out"
              itemsTransaction={transaction}
              addTransaction={addTransaction}
              dataConfirmation={dataConfirmation}
              setToOpenConfirmation={setToOpenConfirmation}
              setToOpenBeli={setToOpenBeli}
              setToOpenCart={setToOpenCart}
              totalItemCart={totalItemCart}
            />
          )}
          {openBeli && (
            <ModalBeli
              className="transition-transform delay-700 duration-700 ease-in-out"
              itemsTransaction={transaction}
              addTransaction={addTransaction}
              setToOpenConfirmation={setToOpenConfirmation}
              setToOpenBeli={setToOpenBeli}
              setToOpenCart={setToOpenCart}
              totalItemCart={totalItemCart}
              contentQr={contentQr}
              statusQr={statusQR}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Vending;
