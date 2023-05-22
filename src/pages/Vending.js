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

const Vending = () => {
  const [items] = useState(Products);
  const [transaction, setTransaction] = useState([]);
  const [openCart, setopenCart] = useState(false);
  const [confirmation, setConfirm] = useState(false);
  const [modalBeli, setmodalBeli] = useState(false);

  useEffect(() => {
    setTransaction(JSON.parse(localStorage.getItem("transaction")));
  }, []);

  useEffect(() => {
    localStorage.setItem("transaction", JSON.stringify(transaction));
  });
  const setToOpenCart = () => {
    setopenCart(true);
  };
  const setToCloseCart = () => {
    setopenCart(false);
  };
  const setConfirmation = (confirm) => {
    setConfirm(confirm);
  };
  const setBuy = (confirm) => {
    setmodalBeli(confirm);
  };
  const addTransaction = (item) => {
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
                qty: existItem.qty + 1,
              }
            : product
        )
      );
    }
  };
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <div className="portrait:hidden">Landscape</div>
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
            setCloseCart={setToCloseCart}
            itemsTransaction={transaction}
            addTransaction={addTransaction}
            setConfirm={setConfirmation}
            setBuy={setBuy}
          />
        )}
        {confirmation && (
          <ModalConfirmation
            className="transition-transform delay-700 duration-700 ease-in-out"
            itemsTransaction={transaction}
            addTransaction={addTransaction}
            setConfirm={setConfirmation}
            setBuy={setBuy}
          />
        )}
        {modalBeli && (
          <ModalBeli
            className="transition-transform delay-700 duration-700 ease-in-out"
            itemsTransaction={transaction}
            addTransaction={addTransaction}
            setBuy={setBuy}
          />
        )}
      </div>
    </div>
  );
};

export default Vending;
