import React, { useRef } from "react";
import { useState } from "react";
import QRCode from "qrcode";
import { QrReader } from "react-qr-reader";
import "./App.css";

function App() {
  const qrRef = useRef(null);

  const [text, setText] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");

  const generateQRCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageURL(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onScanFile = () => {
    console.log(qrRef); // {current: null} - on first render current value coming as null 
    qrRef.current.openImageDialog();
  };

  const handleErrorFile = (error) => {
    console.log(error);
  };

  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-title">Generator QR Code, download and Scan</h1>
      </header>
      <div className="container">
        <div className="generate-qrcode">
          <input
            type="text"
            placeholder="Enter url to gets generate"
            onChange={(e) => setText(e.target.value)}
            className="generate-input"
          />
          <button type="button" onClick={generateQRCode} className="btn">
            Generate
          </button>
          <div className="qrcode">
            {imageURL ? (
              <a href={imageURL} download>
                <img src={imageURL} alt="image" className="qrcode-image"></img>
              </a>
            ) : null}
          </div>
        </div>
        <div className="decode-scan-qrcode">
          <button type="button" onClick={onScanFile} className="decode-btn">
            Scan QR Code
          </button>
          <QrReader
            ref={qrRef}
            delay={300}
            style={{ width: "100%" }}
            onError={handleErrorFile}
            onScan={handleScanFile}
            legacyMode
          />
          <div className="decoded-qrcode">
            <h3>Scanned Code: {scanResultFile}</h3>
          </div>
        </div>

        <div className="scan-qrcode-by-cam">
          <h3>Qr Code Scan by Web Cam</h3>
          <QrReader
            delay={300}
            style={{ width: "100%" }}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
          />
          <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
