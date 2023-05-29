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
import ModalBeli from "../components/ModalBeli";
import useIdle from "../hooks/useIdleTimeout";
import loadingGif from "../assets/img/loading.gif";
import vendingService from "../services/vendingService";

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
  const [loadingFirst, setLoading] = useState(true);

  const getSlotProduct = () => {
    vendingService
      .getListStock()
      .then((response) => {
        setSlot(response.data.data);
        setLoading(false);
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
    getSlotProduct();
  }, []);

  useEffect(() => {
    localStorage.setItem("transaction", JSON.stringify(transaction));
    localStorage.setItem("subTotal", subTotal);
  });
  useEffect(() => {
    if (localStorage.getItem("slots") !== null) {
      setSlot(localStorage.getItem("slots"));
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
  const setToOpenBeli = (confirm) => {
    setOpenBeli(confirm);
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

      const disc = item.status_promo === 1 ? item.harga_promo : item.harga_jual;
      sumSubTotal = disc;
      setSubTotal(parseInt(subTotal) + sumSubTotal);
    } else {
      if (tambah) {
        const disc =
          item.status_promo === 1 ? item.harga_promo : item.harga_jual;
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
            item.status_promo === 1 ? item.harga_promo : item.harga_jual;
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
        }
      }
    }
  };
  const deleteItem = (item) => {
    setTransaction(transaction.filter((cart) => cart.no_slot !== item.no_slot));
    const disc = item.status_promo === 1 ? item.harga_promo : item.harga_jual;
    const afterDisc = disc;
    sumSubTotal = afterDisc * item.qty;
    setSubTotal(parseInt(subTotal) - sumSubTotal);
    if (transaction.length <= 1) {
      setOpenCart(false);
    }
  };

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
      ) : loadingFirst ? (
        <span className="landscape:hidden flex h-full w-full">
          <img src={loadingGif} alt="" className="flex h-30 w-30 text-center" />
        </span>
      ) : (
        <div className="landscape:hidden w-screen">
          <TopHeader />
          <Header />
          <RunningText />
          <Content
            items={items}
            slots={slots}
            addTransaction={addTransaction}
          />
          <ContentFooter
            itemsTransaction={transaction}
            setToOpenCart={setToOpenCart}
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
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Vending;
