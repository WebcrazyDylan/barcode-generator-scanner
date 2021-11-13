import React, { useEffect, useRef, useState } from "react";
import Quagga from "quagga";
import { useHistory } from "react-router-dom";
import { Fab } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

const BarcodeScanner3 = (props) => {
  const firstUpdate = useRef(true);
  const [isStart, setIsStart] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [basket, setBasket] = useState([]);
  const history = useHistory();

  useEffect(() => {
    return () => {
      if (isStart) stopScanner();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (isStart) startScanner();
    else stopScanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStart]);

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

  const _onDetected = (res) => {
    // stopScanner();
    setBarcode(res.codeResult.code);
  };

  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            width: 250,
            height: 250,
            facingMode: "environment" // or user
          }
        },
        numOfWorkers: navigator.hardwareConcurrency,
        locate: true,
        frequency: 1,
        debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true
        },
        multiple: false,
        locator: {
          halfSample: false,
          patchSize: "large", // x-small, small, medium, large, x-large
          debug: {
            showCanvas: false,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: false,
              showTransformedBox: false,
              showBB: false
            }
          }
        },
        decoder: {
          readers: [
            "upc_reader",
            "upc_e_reader"
            // "ean_reader",
            // "ean_8_reader",
            // "code_128_reader",
            // "code_39_reader",
            // "code_39_vin_reader",
            // "codabar_reader",
            // "i2of5_reader",
            // "i2of5_reader",
            // "2of5_reader",
            // "code_93_reader"
          ]
        }
      },
      (err) => {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(_onDetected);
    Quagga.onProcessed((result) => {
      let drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter((box) => box !== result.box)
            .forEach((box) => {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });
  };

  const stopScanner = () => {
    Quagga.offProcessed();
    Quagga.offDetected();
    Quagga.stop();
  };

  const gotoHome = () => {
    stopScanner();
    setTimeout(() => {
      history.push(`/`);
    }, 500);
  };

  return (
    <div id="container">
      <div id="header">
        {/* <Link to="/"> */}
        <Fab style={{ marginRight: 10 }} color="secondary" onClick={gotoHome}>
          <ArrowBack />
        </Fab>
        {/* </Link> */}
        <span>Barcode Scanner</span>
      </div>
      <div id="scanner">
        <button
          onClick={() => setIsStart((prevStart) => !prevStart)}
          style={{ marginBottom: 20 }}
        >
          {isStart ? "Stop" : "Start"}
        </button>
        {isStart && (
          <React.Fragment>
            <div id="scanner-container" />
            {barcode && <div>Current Barcode: {barcode}</div>}
            {basket &&
              basket.map((item, i) => (
                <div key={i}>{item}</div>
                //   <div key={item.id}>
                //     {item.product} <br />
                //     {item.price} <br />
                //     <img src={item.image} style={{ width: 100, height: 100 }} />
                //   </div>
              ))}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner3;
