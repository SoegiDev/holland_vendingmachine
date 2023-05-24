import React, { useCallback, useEffect, useRef, useState } from "react";
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
const SCREENSAVER_DELAY_MS = 300000;
const SCREENSAVER_ACTIVE_TIME_MS = 200000;
const SCREENSAVER_INACTIVE_TIME_MS = 2000000;

const Vending = () => {
  const [items] = useState(Products);
  const [transaction, setTransaction] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [dataConfirmation, setDataConfirmation] = useState({});
  const [openBeli, setOpenBeli] = useState(false);
  const [subTotal, setsubTotal] = useState(0);

  const [screensaverActive, setScreensaverActive] = useState(false);
  const [screensaverVisible, setScreensaverVisible] = useState(false);
  const screensaverTimeout = useRef();
  const secondTimer = useRef();
  $(document).mousemove(function () {
    clearTimeout(mousetimeout);
    if (screensaver_active) {
      stop_screensaver();
    }
    mousetimeout = setTimeout(show_screensaver, 1000 * idletime);
  });
  const activeScreensaver = useCallback(() => {
    setScreensaverActive(true);
    setScreensaverVisible(true);
    loop();
    function loop() {
      console.log("setLoop");
      const timerRef = setTimeout(() => {
        setScreensaverVisible(false);
        const timerRef2 = setTimeout(() => {
          setScreensaverVisible(true);
          loop();
          console.log("set");
        }, SCREENSAVER_INACTIVE_TIME_MS);
        secondTimer.current = timerRef2;
        console.log("set 2");
      }, SCREENSAVER_ACTIVE_TIME_MS);
      secondTimer.current = timerRef;
    }
  }, []);

  useEffect(() => {
    activeScreensaver();
  }, [activeScreensaver]);

  const startTimeout = useCallback(() => {
    clearTimeout(screensaverTimeout.current);
    clearTimeout(secondTimer.current);
    const timeout = setTimeout(() => activeScreensaver(), SCREENSAVER_DELAY_MS);
    screensaverTimeout.current = timeout;
  }, [activeScreensaver]);
  const screensaverClicked = useCallback(() => {
    setScreensaverActive(false);
    startTimeout();
  }, [startTimeout]);
  const appTouched = useCallback(
    (event) => {
      if (event.target.id !== "screensaver") {
        startTimeout();
      }
    },
    [startTimeout]
  );

  useEffect(() => {
    setTransaction(JSON.parse(localStorage.getItem("transaction")));
  }, []);

  useEffect(() => {
    localStorage.setItem("transaction", JSON.stringify(transaction));
  });
  const setToOpenCart = (cart) => {
    setOpenCart(cart);
  };
  const setToOpenConfirmation = (props) => {
    setDataConfirmation(props);
    if (props.Data.deleted) {
      if (props.Data.module === "remove-item") {
        deleteById(props.Data.Data.id);
        let afterdisc =
          props.Data.Data.price -
          (props.Data.Data.price * props.Data.Data.disc) / 100;
        let subprice = afterdisc * props.Data.Data.qty;
        setsubTotal(subTotal - subprice);
      }
      if (props.Data.module === "remove-all") {
        deleteAll();
        setOpenCart(!openCart);
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
    const existItem = transaction.find((product) => product.id === item.id);
    if (!existItem) {
      setTransaction([
        ...transaction,
        {
          id: item.id,
          category: item.category,
          description: item.description,
          disc: item.disc,
          imageUrl: item.imageUrl,
          price: item.price,
          rating: item.rating,
          stock: item.stock,
          title: item.title,
          qty: 1,
        },
      ]);

      setsubTotal(subTotal + item.price - item.price * (item.disc / 100));
    } else {
      setTransaction(
        transaction.map((product) =>
          product.id === item.id
            ? {
                id: item.id,
                category: item.category,
                description: item.description,
                disc: item.disc,
                imageUrl: item.imageUrl,
                price: item.price,
                rating: item.rating,
                stock: item.stock,
                title: item.title,
                qty: tambah ? existItem.qty + 1 : existItem.qty - 1,
              }
            : product
        )
      );
      if (tambah) {
        let afterdisc = item.price - (item.price * item.disc) / 100;
        setsubTotal(subTotal + afterdisc);
      } else {
        let afterdisc = item.price - (item.price * item.disc) / 100;
        setsubTotal(subTotal - afterdisc);
      }
    }
  };
  const deleteById = (id) => {
    setTransaction((oldValues) => {
      return oldValues.filter((items) => items.id !== id);
    });
  };
  const deleteAll = () => {
    setTransaction([]);
  };
  return (
    <div
      className="flex flex-col h-screen w-full overflow-hidden"
      onClick={appTouched}
    >
      <div className="portrait:hidden">Landscape</div>
      {screensaverActive && screensaverVisible ? (
        <div
          id="screenSaver"
          className="landscape:hidden w-screen h-full bg-teal-800"
          onClick={screensaverClicked}
        >
          <div className="flex justify-center h-full w-full">
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
          <Content items={items} addTransaction={addTransaction} />
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
