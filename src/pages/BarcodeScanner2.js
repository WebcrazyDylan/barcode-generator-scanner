import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

function BarcodeScanner2(props) {
  const video = useRef(null);
  const canvas = useRef(null);
  const [barcode, setBarcode] = useState(null);
  const [basket, setBasket] = useState([]);
  const history = useHistory();

  var interval;
  const openCam = () => {
    if (navigator.mediaDevices.getUserMedia !== null) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: 250,
            height: 250,
            facingMode: "environment" // mobilde
          }
        })
        .then((stream) => {
          video.current.srcObject = stream;
          video.current.play();

          const ctx = canvas.current.getContext("2d");
          const barcode = new window.BarcodeDetector({
            formats: ["qr_code", "ean_13", "code_128"]
          });
          interval = setInterval(() => {
            canvas.current.width = video.current.videoWidth;
            canvas.current.height = video.current.videoHeight;
            ctx.drawImage(
              video.current,
              0,
              0,
              video.current.videoWidth,
              video.current.videoHeight
            );
            barcode
              .detect(canvas.current)
              .then(([data]) => {
                if (data) {
                  setBarcode(data.rawValue);
                }
              })
              .catch((err) => console.log(err));
          }, 100);
        })
        .catch((err) => alert(err));
    } else {
      alert("No support this browser !! ");
    }
  };

  const closeCam = () => {
    clearInterval(interval);
    canvas.current.width = 0;
    canvas.current.height = 0;

    setTimeout(() => {
      history.push(`/`);
    }, 500);
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
  }, [barcode]);

  return (
    <>
      <button onClick={openCam}>Camera On</button>
      <button onClick={closeCam}>Camera Off</button>
      <div></div>
      <div>
        <video ref={video} autoPlay muted hidden />
        <canvas ref={canvas} />
      </div>
      {barcode && <div>Current Barcode: {barcode}</div>}
      {basket &&
        basket.map((item) => (
          <div key={item}>{item}</div>
          //   <div key={item.id}>
          //     {item.product} <br />
          //     {item.price} <br />
          //     <img src={item.image} style={{ width: 100, height: 100 }} />
          //   </div>
        ))}
    </>
  );
}

export default BarcodeScanner2;
