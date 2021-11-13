import { Fab } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BarcodeScanner4 = (props) => {
  const [barcode, setBarcode] = useState("");
  const [basket, setBasket] = useState([]);

  const handleScan = (err, data) => {
    if (data) {
      setBarcode(data.text);
    }
  };
  const handleError = (err) => {
    console.error(err);
    alert(err);
  };

  useEffect(() => {
    if (barcode) {
      // Get product info
      // const API_URL = `http://localhost/api.php?barcode=${barcode}`

      // fetch(API_URL)
      // .then(res => res.json())
      // .then(data => {
      //   if (data) {
      //     setBasket([...basket, data]);
      //   } else {
      //     alert('Bu ürün bulunamadı!')
      //   }
      // })
      setBasket([...basket, barcode]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcode]);

  return (
    <div>
      <Link to="/">
        <Fab style={{ marginRight: 5 }} color="secondary">
          <ArrowBack />
        </Fab>
      </Link>
      <span>Barcode Scanner</span>

      <center>
        <div style={{ marginTop: 30 }}>
          <BarcodeScannerComponent
            delay={300}
            width={400}
            height={250}
            onError={handleError}
            onUpdate={handleScan}
          />
          {/* style={{ height: 250, width: 250 }} */}
        </div>
      </center>

      {barcode && <div>Current Barcode: {barcode}</div>}
      {basket &&
        basket.map((item, i) => (
          <div key={i}>
            {/* <a href={`${item}`} target="_blank" rel="noopener noreferrer"> */}
            {item}
            {/* </a> */}
          </div>
          //   <div key={item.id}>
          //     {item.product} <br />
          //     {item.price} <br />
          //     <img src={item.image} style={{ width: 100, height: 100 }} />
          //   </div>
        ))}
    </div>
  );
};

export default BarcodeScanner4;
