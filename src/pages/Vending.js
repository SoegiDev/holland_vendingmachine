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
  const [openCart, setOpenCart] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openBeli, setOpenBeli] = useState(false);

  useEffect(() => {
    setTransaction(JSON.parse(localStorage.getItem("transaction")));
  }, []);

  useEffect(() => {
    localStorage.setItem("transaction", JSON.stringify(transaction));
  });
  const setToOpenCart = (cart) => {
    setOpenCart(cart);
  };
  const setToOpenConfirmation = (confirm) => {
    setOpenConfirmation(confirm);
  };
  const setToOpenBeli = (confirm) => {
    setOpenBeli(confirm);
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
            itemsTransaction={transaction}
            addTransaction={addTransaction}
            setToOpenConfirmation={setToOpenConfirmation}
            setToOpenBeli={setToOpenBeli}
            setToOpenCart={setToOpenCart}
          />
        )}
        {openConfirmation && (
          <ModalConfirmation
            className="transition-transform delay-700 duration-700 ease-in-out"
            itemsTransaction={transaction}
            addTransaction={addTransaction}
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
    </div>
  );
};

export default Vending;
