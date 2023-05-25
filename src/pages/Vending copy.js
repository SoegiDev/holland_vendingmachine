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

const Vending = () => {
  const [items] = useState(Products);
  const [transaction, setTransaction] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [dataConfirmation, setDataConfirmation] = useState({});
  const [openBeli, setOpenBeli] = useState(false);
  const [subTotal, setsubTotal] = useState(0);

  const [screensaverActive, setScreensaverActive] = useState(false);
  const handleIdle = () => {
    setScreensaverActive(true);
  };
  const { idleTimer } = useIdle({ onIdle: handleIdle, idleTime: 20 });

  const stay = () => {
    setScreensaverActive(false);
    idleTimer.reset();
  };
  useEffect(() => {
    setTransaction(JSON.parse(localStorage.getItem("transaction")));
  }, []);

  useEffect(() => {
    localStorage.setItem("transaction", JSON.stringify(transaction));
  });
  const setToOpenCart = (cart) => {
    setOpenCart(cart);
  };
  let afterdisc = 0;
  let subprice = 0;
  const setToOpenConfirmation = (props) => {
    setDataConfirmation(props);
    if (props.Data.deleted) {
      if (props.Data.module === "remove-item") {
        deleteById(props.Data.Data.id);
        afterdisc =
          props.Data.Data.price -
          (props.Data.Data.price * props.Data.Data.disc) / 100;
        subprice = afterdisc * props.Data.Data.qty;
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
      if (tambah) {
        let afterdisc = item.price - (item.price * item.disc) / 100;
        setsubTotal(subTotal + afterdisc);
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
                  qty: existItem.qty + 1,
                }
              : product
          )
        );
      } else {
        let afterdisc = item.price - (item.price * item.disc) / 100;
        setsubTotal(subTotal - afterdisc);
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
                  qty: existItem.qty - 1,
                }
              : product
          )
        );
      }
    }
  };
  const deleteById = (id) => {
    setTransaction((oldValues) => {
      return oldValues.filter((items) => items.id !== id);
    });
  };
  const deleteAll = () => {
    subprice = 0;
    afterdisc = 0;
    setTransaction([]);
    setsubTotal(0);
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
