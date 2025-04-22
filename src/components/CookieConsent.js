import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");

    setIsVisible(false);

    console.log("Cookie accettati!");
  };

  if (!isVisible) return null;

    return (
        <Alert
        variant="dark"
        style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            marginBottom: 0,
        }}
        >
        <div className="d-flex justify-content-between align-items-center">
            <div>
            <span>
                Questo sito utilizza cookie per migliorare la tua esperienza.{" "}
                <a href="/privacy-policy" style={{ color: "#f1d600" }}>
                Leggi di più
                </a>
            </span>
            </div>
            <Button
            variant="warning"
            size="sm"
            onClick={handleAccept}
            style={{ color: "#000" }}
            >
            Accetta
            </Button>
        </div>
        </Alert>
    );
};

export default CookieConsent;