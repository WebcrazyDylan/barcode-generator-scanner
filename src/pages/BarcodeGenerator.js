import React, { useState } from "react";
import { Fab, TextField, Grid } from "@material-ui/core";
import { ArrowBack, GetApp } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useBarcode } from "react-barcodes";

function BarcodeGenerator() {
  const [barcode, setBarcode] = useState("https://jonghyun.cf");
  const [inputcode, setInputcode] = useState("https://jonghyun.cf");
  const handleChange = (event) => {
    if (event.target.value) {
      setInputcode(event.target.value);
      setBarcode(event.target.value);
    } else {
      setInputcode("");
      setBarcode("No Barcode");
    }
  };

  const { inputRef } = useBarcode({
    value: barcode,
    options: {
      background: "#ffffff"
    }
  });

  const downloadBarcode = () => {
    const canvas = document.getElementById("mybarcode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "mybarcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <Link to="/">
        <Fab style={{ marginRight: 10 }} color="primary">
          <ArrowBack />
        </Fab>
      </Link>
      <span>Barcode Generator</span>

      <div style={{ marginTop: 30, marginBottom: 30 }}>
        <TextField
          onChange={handleChange}
          style={{ width: 320 }}
          value={inputcode}
          label="Barcode content"
          size="medium"
          variant="outlined"
          color="secondary"
        />
      </div>

      <div>
        {barcode !== "" ? (
          <canvas id="mybarcode" ref={inputRef} />
        ) : (
          <p>No barcode preview</p>
        )}
      </div>
      <div>
        {barcode ? (
          <Grid container style={{ marginTop: 30 }}>
            {/* <Grid item xs={10}>
              <TextareaAutosize
                style={{ fontSize: 18, width: 250, height: 100 }}
                maxRows={4}
                value={barcode}
              />
            </Grid> */}
            <Grid item xs={12}>
              <Fab
                onClick={downloadBarcode}
                style={{ marginLeft: 10 }}
                color="secondary"
              >
                <GetApp />
              </Fab>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default BarcodeGenerator;
