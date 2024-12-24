// frontend/src/components/Customer/QRScanner.js
import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import '../../styles/components/Customer/QRScanner.css';;

const QRScanner = ({ onScan }) => {
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      const url = new URL(data);
      const tableId = url.searchParams.get('tableId');
      if (tableId) {
        onScan(tableId);
      } else {
        setError('Mã QR không hợp lệ. Vui lòng thử lại.');
      }
    }
  };

  const handleError = (err) => {
    setError('Lỗi khi quét mã QR. Vui lòng thử lại.');
    console.error(err);
  };

  return (
    <div className="qr-scanner-container">
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {error && <p className="qr-scanner-error">{error}</p>}
    </div>
  );
};

export default QRScanner;