import React, { useEffect, useState } from "react";
import useIdle from "../hooks/useIdleTimeout";
import ScreenSaver from "../components/ScreenSaver";
import Loading from "../components/modal/Loading";
import crud from "../function/getDb";

import Content from "../components/Content";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import RunningText from "../components/RunningText";
import ContentFooter from "../components/ContentFooter";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { Transition } from "@headlessui/react";
import ModalCart from "../components/modal/ModalCart";
import ModalPayment from "../components/modal/ModalPayment";
import ModalRefund from "../components/modal/ModalRefund";
import { formatDate } from "../model/DateFormat";
import VMINIT from "../services/init";
import EngineVM from "../function/vmEngine";

var CryptoJS = require("crypto-js");

const Vending = () => {
  const [screensaverActive, setScreensaverActive] = useState(false);
  const [isloading, setLoading] = useState(false);

  const [networkError, setNetworkError] = useState(false);
  const [isUpdateData, setUpdateData] = useState(false);
  const [itemSlots, setItemSlots] = useState([]);
  const [itemBannersImage, setItemBannersImage] = useState([]);
  //ITEMCART
  const [subTotal, setsubTotal] = useState(0);
  const [TotalItemCart, setTotalItemCart] = useState(0);
  const [transactions, setTransaction] = useState([]);
  const [isoverlay, setOverlay] = useState(false);
  const [TrxCode, setTrxCode] = useState(null);
  const [openModalPaymnet, setOpenModalPayment] = useState(false);
  const [isOverlayOn, setisOverlayOn] = useState(false);

  const [ContentQR, setContentQR] = useState(null);

  const [paymentOut, setPaymentOut] = useState(false);
  // MODAL
  const [openModalCart, setopenModalCart] = useState(false);
  const [openModalRefund, setModalRefund] = useState(false);

  // PAYMENT

  let toModalPayment;
  let toModalCart;
  let toModalRefund;

  let timerRefund;
  let timerTimeout;
  let timerInterval;
  let timerPayment;
  const [message, setmessage] = useState("Event");

  const handleIdle = () => {
    setScreensaverActive(true);
    idleTimer.reset();
  };
  const stay = () => {
    setScreensaverActive(false);
  };
  const refreshPage = () => {
    setOverlay(true);
    setTimeout(() => {
      window.location.reload(true);
      setOverlay(false);
    }, 3000);
  };
  const { idleTimer } = useIdle({ onIdle: handleIdle, idleTime: 800 });

  const { idleRefreshData } = useIdle({
    onIdle: refreshPage,
    idleTime: 600,
  });

  function clearResistence() {
    console.log("Mulai Clear resistence");
    setOverlay(true);
    const bersihkan = async () => {
      if (timerRefund) clearTimeout(timerRefund);
      if (timerPayment) clearTimeout(timerPayment);
      if (timerTimeout) clearTimeout(timerTimeout);
      if (timerInterval) clearInterval(timerInterval);
    };
    bersihkan().then(() => {
      setOverlay(false);
      console.log("END CLEAR RESIDENC");
    });
  }
  const clearCart = () => {
    console.log("Mulai Clear Cart");
    setOverlay(true);
    const bersihkan = async () => {
      setsubTotal(0);
      setTotalItemCart(0);
      setTransaction([]);
      setTotalItemCart(0);
      setContentQR(null);
      reloadData();
    };
    bersihkan().then(() => {
      setOverlay(false);
      console.log("END CLEAR CART");
    });
  };
  useEffect(() => {
    const getDataBannerLocal = async () => {
      setOverlay(true);
      crud
        .getDataBannersImage()
        .then((res) => {
          setNetworkError(false);
          if (res.message === "No Data") {
            setOverlay(false);
            console.log("DATA BANNERS DB KOSONG");
          } else {
            setOverlay(false);
            setItemBannersImage(false);
          }
        })
        .catch((e) => {
          setOverlay(false);
          console.log(e.message);
          setNetworkError(true);
        });
    };
    const getDataSlotsLocal = async () => {
      setOverlay(true);
      crud
        .getDataSlots()
        .then((res) => {
          setNetworkError(false);
          console.log("Running Get SLOTS");
          console.log(res);
          if (res.message === "No Data") {
            setOverlay(false);
            console.log("Data Slot DB KOSONG");
          } else {
            setOverlay(false);
            setItemSlots(res.results.data);
          }
        })
        .catch((e) => {
          console.log(e);
          setOverlay(false);
          setNetworkError(true);
        });
    };
    getDataBannerLocal();
    getDataSlotsLocal();
  }, []);
  const reloadData = () => {
    const slotsData = async () => {
      setOverlay(true);
      if (itemSlots.length === 0 && !networkError) {
        crud
          .getDataSlots()
          .then((res) => {
            setNetworkError(false);
            console.log("Running Get SLOTS");
            console.log(res);
            if (res.message === "No Data") {
              setOverlay(false);
              console.log("Data Slot DB KOSONG");
            } else {
              setOverlay(false);
              setItemSlots(res.results.data);
            }
          })
          .catch((e) => {
            console.log(e);
            setOverlay(false);
            setNetworkError(true);
          });
      } else {
        console.log("Data Slot Exist ");
        setOverlay(false);
      }
    };
    slotsData();
    clearTimeout(timerRefund);
  };
  const addTransaction = (item, tambah) => {
    console.log("add ", item, tambah);
    const existItem = transactions.find(
      (slot) => slot.no_slot === item.no_slot
    );
    if (!existItem) {
      if (item.onhand === 0) {
        console.log("STOCK SUDAH ABIS");
        Swal.fire({
          title: `Stock ${item.name_produk} Sudah Habis`,
          width: 300,
          height: 200,
          timer: 1000,
          padding: "3em",
          color: "#716add",
          background: "#fff",
          backdrop: `
            rgba(0,0,123,0.4)
            left top
            no-repeat
          `,
        });
      } else {
        setTransaction([
          ...transactions,
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
            status_promo: item.status_promo,
            harga_promo: item.harga_promo,
            harga_jual: item.harga_jual,
            issync: 0,
          },
        ]);
      }
      const promo =
        item.status_promo === "1" ? item.harga_promo : item.harga_jual;
      setsubTotal(parseInt(subTotal) + promo);
      setTotalItemCart(TotalItemCart + 1);
    } else {
      if (tambah) {
        var stock = existItem.onhand - existItem.qty;
        if (stock <= 0) {
          console.log("STOCK SUDAH ABIS");
          Swal.fire({
            title: `Stock ${item.name_produk} Sudah Habis`,
            width: 400,
            heightAuto: 300,
            padding: "3em",
            color: "#716add",
            background: "#fff url(/images/trees.png)",
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `,
            allowOutsideClick: false,
            timer: 3000,
          });
        } else {
          console.log("TAMBAH");
          const promo =
            item.status_promo === "1" ? item.harga_promo : item.harga_jual;
          setsubTotal(parseInt(subTotal) + promo);
          setTransaction(
            transactions.map((product) =>
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
                    status_promo: item.status_promo,
                    harga_promo: item.harga_promo,
                    harga_jual: item.harga_jual,
                    issync: 0,
                    qty: existItem.qty + 1,
                    onhand: item.onhand,
                    image: item.image,
                  }
                : product
            )
          );
          setTotalItemCart(TotalItemCart + 1);
        }
      } else {
        if (item.qty <= 1) {
          deleteItem(item);
        } else {
          const promo =
            item.status_promo === "1" ? item.harga_promo : item.harga_jual;
          setsubTotal(parseInt(subTotal) - promo);
          setTransaction(
            transactions.map((product) =>
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
                    status_promo: item.status_promo,
                    harga_promo: item.harga_promo,
                    harga_jual: item.harga_jual,
                    issync: 0,
                    qty: existItem.qty - 1,
                    onhand: item.onhand,
                    image: item.image,
                  }
                : product
            )
          );
          setTotalItemCart(TotalItemCart - 1);
        }
      }
    }
  };

  const deleteItem = (item) => {
    if (transactions.length <= 1) {
      //  OpenModalCancel();
      batalkanKeranjang({ item: item });
    } else {
      setTransaction(
        transactions.filter((cart) => cart.no_slot !== item.no_slot)
      );
      const promo =
        item.status_promo === "1" ? item.harga_promo : item.harga_jual;
      let sumSubTotal = promo * item.qty;
      setsubTotal(parseInt(subTotal) - sumSubTotal);

      setTotalItemCart(TotalItemCart - 1);
    }
  };

  const batalkanKeranjang = ({ props }) => {
    Swal.fire({
      title: "Batalkan Keranjang",
      text: "Kamu Akan Membatalkan Keranjang ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      allowOutsideClick: false,
      confirmButtonText: "Ya Batalkan",
    }).then((result) => {
      if (result.isConfirmed) {
        setopenModalCart(false);
        clearCart();
      } else {
      }
    });
  };
  const tutupRefund = ({ props }) => {
    Swal.fire({
      text: "Proses Refund Telah Selesai?",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Ya Selesai",
      cancelButtonText: "Belum Selesai",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setModalRefund(false);
        clearCart();
        window.location.reload(false);
      } else {
      }
    });
  };
  function requestPayment() {
    setopenModalCart(false);
    setOpenModalPayment(true);
    var trxCode = VMINIT.getID() + "-" + formatDate();
    var apiQRCode = "trx_code=" + trxCode + "&";
    var product_name = "";
    for (let i = 0; i < transactions.length; i++) {
      var data = transactions[i];
      product_name += data.name_produk + ",";
    }
    apiQRCode += "product_name=" + product_name + "&";
    apiQRCode += "qty_product=" + TotalItemCart + "&";
    apiQRCode += "amount=" + subTotal;
    crud
      .CreateQRShopee(apiQRCode)
      .then((res) => {
        setOverlay(false);
        console.log("Request QR CODE", res);
        if (res.message === "SUCCESS") {
          setContentQR(res.results.qrcode);
          setTrxCode(trxCode);
          setTimeout(() => {
            checkQRPayment(trxCode, TotalItemCart, subTotal, "SHOPEEPAY");
          }, 3000);
        } else {
          setOverlay(false);
          setOpenModalPayment(false);
          console.log(" QR TIDAK MUNCUL");
          var errInfo = "Yahh, QR Tidak Muncul!";
          var errText = "Silahkan coba kembali..";
          error("460", res.message, errText, errInfo, trxCode, "SHOPEEPAY");
          failedQR();
        }
        // getSlots();
      })
      .catch((er) => {
        console.log(er);
        setTimeout(() => {
          //--> set logic success/error/time out
          var errInfo = "Waduh, Waktu Habis!";
          var errText = "Silahkan coba kembali.";
          error(
            "470",
            "Failed Request QR",
            errText,
            errInfo,
            trxCode,
            "SHOPEEPAY"
          );
          failedQR();
        }, 3000);
      });
  }

  const BatalkanPembayaran = () => {
    Swal.fire({
      title: "Batalkan Transaksi",
      text: "Kamu Akan Membatalkan Transaksi ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      allowOutsideClick: false,
      confirmButtonText: "Ya Batalkan",
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenModalPayment(false);
        clearCart();
        clearResistence();
        window.location.reload(false);
        Swal.fire({
          title: "Transaksi Batal!",
          text: "Anda Telah membatalkan Transaksi.",
          icon: "success",
          timer: 2000,
        });
        if (TrxCode !== null) {
          afterQR("0", "107", "Transaction Cancelled", TrxCode, "SHOPEEPAY");
          setTrxCode(null);
        }
      } else {
      }
    });
  };

  const checkQRPayment = (trxCode, jumlahItem, jumlahBayar, payment_type) => {
    var apicheck = "trx_code=" + trxCode + "&";
    timerInterval = setInterval(() => {
      crud
        .PaymentCheckQRShopee(apicheck)
        .then((res) => {
          if (res.message === "SUCCESS") {
            if (timerInterval) clearInterval(timerInterval);
            if (timerPayment) clearTimeout(timerPayment);
            setTrxCode(trxCode);
            PaymentSuccess(trxCode, payment_type);
          } else {
            console.log(res);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }, 8000);

    timerPayment = setTimeout(() => {
      setOverlay(true);
      console.log("Get TIMEOUT HABIS WAKTU");
      Swal.fire({
        icon: "info",
        title: "Yahhh, Waktu Transaksi Habis!",
        text: "Silahkan coba kembali. [auto close]",
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 3000,
      }).then(() => {
        afterQR("0", "408", "Payment timeout", trxCode, "SHOPEEPAY");
        clearCart();
        setOpenModalPayment(false);
        setOverlay(false);
        /* Read more about handling dismissals below */
      });
    }, 173 * 1000);
    //set waktu habis bayar
  };

  const requestCheckPayment = () => {
    setOverlay(true);
    setTimeout(() => {
      setOverlay(false);
    }, 2000);
    var apicheck = "trx_code=" + TrxCode + "&";
    crud
      .VM_CHECKPAYMENT(apicheck)
      .then((res) => {
        if (res.message === "SUCCESS") {
          if (timerInterval) clearInterval(timerInterval);
          if (timerPayment) clearTimeout(timerPayment);
          PaymentSuccess(TrxCode, "SHOPEEPAY");
        } else {
          setOverlay(false);
          new Swal({
            title: "Pembayaran anda belum terverifikasi oleh Payment Gateway.",
            text: "Silahkan coba kembali. [auto close]",
            icon: "success",
            allowOutsideClick: false,
            timer: 2500,
          }).then(() => {
            if (timerPayment) clearTimeout(timerPayment);
            afterQR("0", "409", "Check Payment Pending", TrxCode, "SHOPEEPAY");
            clearCart();
          });
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const afterQR = (vmStatus, errorCode, errStatus, trxCode, payment_type) => {
    //set verify_no
    console.log(vmStatus, errorCode, errStatus, trxCode, payment_type);
    var verify_no = Math.floor(Date.now() / 1000);

    for (let i = 0; i < transactions.length; i++) {
      for (let jumProduct = 0; jumProduct < transactions[i].qty; jumProduct++) {
        vmStock(
          i,
          vmStatus,
          errorCode,
          errStatus,
          trxCode,
          payment_type,
          verify_no
        );
      }
    }
  };

  function failedQR() {
    setOverlay(true);
    setTimeout(() => {
      setOverlay(false);
    }, 3000);
  }
  const vmStock = (
    itemNo,
    vmStatus,
    errorCode,
    errorInfo,
    trxCode,
    payment_type,
    verify_no
  ) => {
    var timestamp = Math.floor(Date.now());
    var harga = transactions[itemNo].harga_jual;
    var harga_jual =
      transactions[itemNo].status_promo === 1
        ? transactions[itemNo].harga_promo
        : transactions[itemNo].harga_jual;

    var param = {
      documentno: trxCode,
      no_slot: transactions[itemNo].no_slot,
      kode_produk: transactions[itemNo].kode_produk,
      name_produk: transactions[itemNo].name_produk,
      rear_status: vmStatus,
      timestamp: timestamp,
      error_no: errorCode,
      error_msg: errorInfo,
      payment_type: payment_type,
      verify_no: verify_no,
      harga: harga,
      harga_jual: harga_jual,
    };

    var jsonEncode = JSON.stringify(param);
    var apivmStock = "param=" + jsonEncode;
    crud
      .VM_TRX(apivmStock)
      .then((res) => {
        if (res.status === "OK") {
          //console.log('vm oke');
        }
        // showPreloader();
        // getSlots();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  function error(
    errorCode,
    errStatus,
    errText,
    errInfo,
    trxCode,
    payment_type
  ) {
    var vmStatus = 0;
    console.log(
      "ERROR",
      errorCode,
      errStatus,
      errText,
      errInfo,
      trxCode,
      payment_type
    );
    Swal.fire({
      title: errInfo,
      text: errText,
      icon: "error",
      allowOutsideClick: false,
      timer: 2000,
    }).then(() => {
      afterQR(vmStatus, errorCode, errStatus, trxCode, payment_type);
    });
  }

  const PaymentSuccess = (trxCode, payment_type) => {
    setPaymentOut(false);
    setOpenModalPayment(false);

    Swal.fire({
      title: "Pembayaran berhasil, MOHON DITUNGGU YA !!!",
      width: 600,
      padding: "3em",
      color: "#EEE2DE",
      background: "#B31312",
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    cartVendProcess(trxCode, payment_type);
    //afterCartVendProcess(2, "asdasdsad,asdsadsadsad", "SHOPPEPAY");
  };

  const cartVendProcess = (trxCode, payment_type) => {
    setisOverlayOn(true);
    var paramRefund = {};
    var ProductError = [];
    var JumlahItem = [];
    let totalItem = transactions.length;
    if (totalItem > 0) {
      var verify_no = Math.floor(Date.now() / 1000);
      paramRefund = {
        vm_store: VMINIT.getName(),
        verify_no: verify_no,
        note: "",
        transactionId: trxCode,
      };
      //buat loop productnya
      async function RunVendingMachine() {
        console.log("MULAI");
        for (let index = 0; index < transactions.length; index++) {
          JumlahItem.push(index);
          let produk = transactions[index].qty;
          for (let i = 0; i < produk; i++) {
            const element = transactions[index].no_slot;
            const urutan = transactions[index].qty + " - " + i;
            await new Promise((resolve, reject) =>
              setTimeout(() => {
                console.log("BADAN KE ", element, urutan);
                let secret = trxCode + "elmy2605" + transactions[index].no_slot;
                let hash = CryptoJS.HmacSHA256(trxCode, secret);
                let hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
                let encodeuri = encodeURIComponent(hashInBase64);
                let apiStockOffline = "";
                let vmStatus = 0;
                let errorCode = null;
                let errStatus = null;
                let apiVend =
                  "vend?slot=" +
                  transactions[index].no_slot +
                  "&data=" +
                  trxCode +
                  "&hmac=" +
                  encodeuri;
                const requestOptions = {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                  timeout: 4500,
                  //  body: JSON.stringify({ title: "React POST Request Example" }),
                };
                var textCounterItem = null;

                EngineVM.RunEngine(apiVend)
                  .then((response) => {
                    textCounterItem =
                      "Product ke " + JumlahItem.length + " / " + TotalItemCart;
                    if (response.status) {
                      console.log("SUCCESS");
                      apiStockOffline = "slot=" + transactions[index].no_slot;
                      crud
                        .VMSTOCK(apiStockOffline)
                        .then((response) => {
                          console.log("API STOCK OFFLINE", response);
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                      vmStatus = 1;
                      errorCode = response.buffer;
                      errStatus = response.message;
                      vmStock(
                        index,
                        vmStatus,
                        errorCode,
                        errStatus,
                        trxCode,
                        payment_type,
                        verify_no
                      );
                      var innerHTML =
                        "Silahkan ambil produk anda dibawah . ..." +
                        textCounterItem;

                      Swal.fire({
                        title: "Transaksi Berhasil",
                        text: innerHTML,
                        icon: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                      }).then(() => {});
                    } else {
                      console.log("PRODUCT");
                      vmStatus = 0;
                      errorCode = response.buffer;
                      errStatus = response.message;
                      vmStock(
                        index,
                        vmStatus,
                        errorCode,
                        errStatus,
                        trxCode,
                        payment_type,
                        verify_no
                      );
                      var innerHTML2 =
                        "Maaf, Produk tidak jatuh..<br> Untuk Keluhan dan Pengajuan Refund Hubungi di Call Center (021) 691 8181, atau no CS yang ada dilayar VM.. Terimakasih";

                      Swal.fire({
                        title: "Vending Machine Issues",
                        text: innerHTML2,
                        icon: "error",
                        color: "#EEE2DE",
                        background: "#B31312",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        timer: 3000,
                      }).then(() => {});
                      if (ProductError.length > 0) {
                        paramRefund["note"] =
                          paramRefund["note"] +
                          "product code: " +
                          transactions[index].kode_produk +
                          ", error code: " +
                          errorCode +
                          ", message: " +
                          errStatus +
                          "%0A";
                      } else {
                        paramRefund["note"] =
                          "product code: " +
                          transactions[index].kode_produk +
                          ", error code: " +
                          errorCode +
                          ", message: " +
                          errStatus +
                          "%0A";
                      }
                      ProductError.push(1);
                    }
                    resolve();
                  })
                  .catch((error) => {
                    vmStatus = 0;
                    errorCode = 444;
                    errStatus = "VM_NOT_RESPONDING";
                    vmStock(
                      index,
                      vmStatus,
                      errorCode,
                      errStatus,
                      trxCode,
                      payment_type,
                      verify_no
                    );
                    var innerHTML =
                      "Maaf, Produk tidak jatuh..<br> Untuk Keluhan dan Pengajuan Refund Hubungi di Call Center (021) 691 8181, atau no CS yang ada dilayar VM.. Terimakasih";

                    Swal.fire({
                      title: "Vending Machine Issues",
                      text: innerHTML,
                      icon: "error",
                      color: "#EEE2DE",
                      background: "#B31312",
                      showConfirmButton: false,
                      allowOutsideClick: false,
                      timer: 3000,
                    }).then(() => {});
                    if (ProductError.length > 0) {
                      paramRefund["note"] =
                        paramRefund["note"] +
                        "product code: " +
                        transactions[index].kode_produk +
                        ", error code: " +
                        errorCode +
                        ", message: " +
                        errStatus +
                        "%0A";
                    } else {
                      paramRefund["note"] =
                        "product code: " +
                        transactions[index].kode_produk +
                        ", error code: " +
                        errorCode +
                        ", message: " +
                        errStatus +
                        "%0A";
                    }
                    ProductError.push(1);
                    resolve();
                  });
              }, 3000)
            );
          }
        }
        return ProductError.length;
      }

      RunVendingMachine().then((res) => {
        var result = ProductError.length;
        console.log("HASIL ", result, res);
        afterCartVendProcess(result, paramRefund, payment_type);
      });
    }
  };

  function afterCartVendProcess(totalError, paramRefund, payment_type) {
    if (totalError > 0) {
      setOpenModalPayment(false);
      Swal.close();
      var QR_refund_wa = refund_wa(paramRefund, payment_type);
      setContentQR(QR_refund_wa);
      setModalRefund(true);
      setisOverlayOn(false);
      timerRefund = setTimeout(() => {
        Swal.fire({
          title: "Waktu Scan Refund Habis!",
          text: "Silahkan Hubungi Call Center Jika Ada Terkendala. [auto close]",
          icon: "success",
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 5000,
        });

        //Hapus QR and clear Interval Payment

        //set modal kranjang
        setTimeout(() => {
          //set display modal payment
          setTimeout(() => {
            setOpenModalPayment(false);
            setModalRefund(false);
            clearResistence();
            clearCart();
          }, 7000);
        }, 500);
      }, 80 * 1000);
    } else {
      Swal.fire({
        title: "Terimakasih , Transaksi Anda Sudah Selesai !!",
        text: "Silahkan Hubungi Call Center Jika Ada Terkendala.",
        icon: "success",
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 10000,
      });
      setisOverlayOn(false);
      setTimeout(() => {
        Swal.close();
        setOpenModalPayment(false);
        setModalRefund(false);
        clearResistence();
        clearCart();
        window.location.reload(false);
      }, 7000);
    }
  }
  function refund_wa(paramRefund, payment_type) {
    var QR_whatsApp =
      "https://wa.me/6281806918181/?text=Dear%20Holland%20Bakery%20Customer%20Support%2C%0A%0A";
    QR_whatsApp +=
      "I%20would%20like%20to%20ask%20refund%20with%20following%20details%20%3A%0AName%20%20%3A%20%20%0APhone%20%3A%20%0A";
    QR_whatsApp +=
      "Email%20%20%20%3A%20%0AReason%20of%20Refund%20%3A%0A%0ARefund%20Information%20%3A%0A";
    QR_whatsApp +=
      payment_type +
      "%20No%20%3A%0A%0ATransaction%20Information%20(Please%20do%20not%20change%20)%0A";
    QR_whatsApp +=
      "Store%20%3A%20" +
      paramRefund["vm_store"] +
      "%0ATransaction%20No%20%3A%20" +
      paramRefund["transactionId"] +
      "%0A";
    QR_whatsApp +=
      "Verify%20No%20%3A%20" +
      paramRefund["verify_no"] +
      "%0ANote%20%3A%20" +
      paramRefund["note"] +
      "%0A%0A";
    QR_whatsApp +=
      "Notes%20%3A%20All%20Information%20are%20mandatory.%0A%0AThank%C2%A0You.";

    return QR_whatsApp;
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden" id="hb-vm">
      {screensaverActive ? (
        <ScreenSaver stay={stay} images={itemBannersImage}></ScreenSaver>
      ) : (
        <div className="landscape:hidden w-screen">
          <TopHeader />
          <Header />
          <RunningText />
          {isloading && <Loading></Loading>}
          {itemSlots.length > 0 && (
            <Content slots={itemSlots} addCart={addTransaction}></Content>
          )}
          <ContentFooter
            transactions={transactions}
            openMocalCart={setopenModalCart}
            totalItemCart={TotalItemCart}
          />
          <Footer />
          <Transition
            show={openModalCart}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ModalCart
              className="transition-transform delay-700 duration-700 ease-in-out"
              transactions={transactions}
              addTransaction={addTransaction}
              openMocalCart={setopenModalCart}
              batalkanKeranjang={batalkanKeranjang}
              deletedItem={deleteItem}
              subTotal={subTotal}
              setPayment={requestPayment}
              totalItemCart={TotalItemCart}
            />
          </Transition>
          <Transition
            show={openModalPaymnet}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ModalPayment
              className="transition-transform delay-700 duration-700 ease-in-out"
              itemsTransaction={transactions}
              cancelTransaction={BatalkanPembayaran}
              contentPaymnetQR={ContentQR}
              requestCheckPayment={requestCheckPayment}
            />
          </Transition>
          <Transition
            show={openModalRefund}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ModalRefund
              className="transition-transform delay-700 duration-700 ease-in-out"
              tutupRefund={tutupRefund}
              contentPaymnetQR={ContentQR}
            />
          </Transition>
        </div>
      )}

      {isoverlay && <Loading className="featuredOverlay"></Loading>}
      {isOverlayOn && <div className="featuredOverlay"></div>}
    </div>
  );
};

export default Vending;
