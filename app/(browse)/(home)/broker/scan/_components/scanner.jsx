"use client"

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
function Scanner({ balance }) {
  const [scanResult, setScanResult] = useState(null);
  const [title, setTitle] = useState(null);
  const [newBalance, setNewBalance] = useState(balance);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scanner = new Html5QrcodeScanner("reader", {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 5,
        });

        scanner.render(success, error);

        async function success(result) {
          scanner.clear();
          setScanResult(result);

          try {
            const qrCodeData = JSON.parse(result);
            const scannedTitle = qrCodeData.title;
            const codeUrl = qrCodeData.codeUrl;

            setTitle(scannedTitle);

            // Update the balance in the database and check codeUrl existence
            const response = await axios.patch(`/api/wallet/walletId`, {
              balance: newBalance + parseFloat(scannedTitle),
              codeUrl: codeUrl,
            });

            if (response.data.exists) {
              // CodeUrl exists in the database
              setNewBalance(response.data.updatedBalance);
            } else {
              toast.error("الرمز غير صالح للاستخدام");
            }
          } catch (error) {
            console.error("Error parsing QR code data:", error);
          }
        }

        function error(err) {
          console.warn(err);
        }

        return () => {
          scanner.clear();
          scanner.stop();
        };
      } catch (error) {
        console.error("Error initializing scanner:", error);
      }
    };

    fetchData();
  }, [balance, newBalance]);

  return (
    <div>
      {scanResult ? (
        <div>
          <p>
            Success: <a href={scanResult}>{scanResult}</a>
          </p>
          {title && <p>{`Title: ${title}`}</p>}
          <p>old balance: {balance}</p>
          <p>{`New Balance: ${newBalance}`}</p>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default Scanner;
