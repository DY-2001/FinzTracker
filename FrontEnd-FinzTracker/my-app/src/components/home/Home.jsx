import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import axios from "axios";
const Home = () => {
  const [currency, setCurrency] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [selectedCurrency2, setSelectedCurrency2] = useState();
  const [currencyValue, setsCurrencyValue] = useState();
  const [currencyValue2, setsCurrencyValue2] = useState();
  const [userAlerts, setUserAlerts] = useState([]);
  const [alertinputvalue, setAlertinputvalue] = useState();
  const [updateRender, setupdateRender] = useState(false);

  const handleAlert = async () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const newalert = {
        currencyPair: `${selectedCurrency}-${selectedCurrency2}`,
        email: user.email,
        status: false,
        value: alertinputvalue,
      };

      let alreadythere = false;
      const allalerts = user.alertList;
      for (let i = 0; i < allalerts.length; i++) {
        if (
          allalerts[i].currencyPair === newalert.currencyPair &&
          allalerts[i].email === newalert.email &&
          allalerts[i].value.toString() === newalert.value &&
          allalerts[i].status === false
        ) {
          alreadythere = true;
          alert("This Trigger is already in the list");
        }
      }

      if (alreadythere === false) {
        user.alertList.push(newalert);
        setUserAlerts(user.alertList);

        const userId = user._id;
        try {
          const response = await fetch(
            `http://localhost:4000/user/updateUser/${userId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            }
          );

          const res = await response.json();
          if (res.success) {
            console.log("User alert list updated successfully.");
            localStorage.setItem("user", JSON.stringify(res.user));
          } else {
            console.error("Failed to update user alert list.");
          }
        } catch (error) {
          console.error("Error updating user alert list:", error);
        }
      }
    }
    setupdateRender(!updateRender);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_VlaXc4cUk56m0nKufVY5G50lIf9bhYZEee2bLi6l";

        const response = await axios.get(apiUrl);
        const data = response.data;
        setCurrency(data.data);

        const storedUser = localStorage.getItem("user");
        const user = JSON.parse(storedUser);

        const updateUserResponse = await axios.get(
          `http://localhost:4000/user/getUserInfo/${user._id}`,
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const res = updateUserResponse.data;
        if (res.success) {
          console.log("User alert list updated successfully.");
          console.log("yeah i render");
          localStorage.setItem("user", JSON.stringify(res.user));
        } else {
          console.error("Failed to update user alert list.");
        }
      } catch (error) {
        console.error("Error updating user alert list:", error);
      }
    };

    fetchData();
    const storedUser = localStorage.getItem("user");
    const user = JSON.parse(storedUser);
    setUserAlerts(user.alertList);
  }, [updateRender]);

  useEffect(() => {
    if (selectedCurrency) {
      setsCurrencyValue(currency[selectedCurrency]);
    }
  }, [selectedCurrency]);

  useEffect(() => {
    if (selectedCurrency2) {
      setsCurrencyValue2(currency[selectedCurrency2]);
    }
  }, [selectedCurrency2]);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleCurrencyChange2 = (event) => {
    setSelectedCurrency2(event.target.value);
  };

  const handleinputvalue = () => {};

  return (
    <div className={styles.parentHome}>
      <div className={styles.upperContainer}>
        <div className={styles.firstHeading}>FinzTracker</div>
        <div className={styles.tagline}>
          The Wise exchange rate notifications bring you live information so you
          can keep track of the REAL exchange rate. Stay ahead of sneaky hidden
          exchange rate mark ups.
        </div>

        <div className={styles.middleContainer}>
          <div className={styles.rateShow}>Show me the mid-market rate for</div>
          <div>
            <div style={{ margin: "5px" }}>
              <select value={selectedCurrency} onChange={handleCurrencyChange}>
                <option value="">Select a currency</option>
                {Object.keys(currency).map((currencyCode) => (
                  <option key={currencyCode} value={currencyCode}>
                    {currencyCode}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <svg
                width="24"
                height="24"
                fill="currentColor"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="m16.629 11.999-1.2-1.2 3.085-3.086H2.572V5.999h15.942L15.43 2.913l1.2-1.2 4.543 4.543a.829.829 0 0 1 0 1.2l-4.543 4.543Zm-9.257-.001 1.2 1.2-3.086 3.086h15.943v1.714H5.486l3.086 3.086-1.2 1.2-4.543-4.543a.829.829 0 0 1 0-1.2l4.543-4.543Z"
                ></path>
              </svg>
            </div>
            <div style={{ margin: "5px" }}>
              <select
                value={selectedCurrency2}
                onChange={handleCurrencyChange2}
              >
                <option value="">Select a currency</option>
                {Object.keys(currency).map((currencyCode) => (
                  <option key={currencyCode} value={currencyCode}>
                    {currencyCode}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {currencyValue && (
                <div>
                  {selectedCurrency} = {currencyValue} USD
                </div>
              )}
              {currencyValue2 && (
                <div>
                  {selectedCurrency2} = {currencyValue2} USD
                </div>
              )}
            </div>
            <div
              style={{
                margin: "10px",
                border: "1px solid black",
                borderRadius: "4px",
                padding: "4px",
              }}
            >
              {currencyValue && currencyValue2 && (
                <div>
                  1 {selectedCurrency} --- {currencyValue2 / currencyValue}{" "}
                  {selectedCurrency2}
                </div>
              )}
            </div>
          </div>
          <hr style={{ width: "100%", marginTop: "35px" }} />
          <div style={{ marginTop: "5px" }}>
            <div className={styles.rateAlert}>
              Get rate alerts straight to your email inbox
            </div>
            <div>
              <input
                style={{ outline: "none", borderRadius: "3px", margin: "5px" }}
                onChange={(e) => setAlertinputvalue(e.target.value)}
              ></input>
            </div>
            <div>
              <div>
                <button
                  style={{
                    margin: "15px 5px 5px 5px",
                    padding: "5px",
                    borderRadius: "4px",
                    backgroundColor: "#FFE5E5",
                    border: "1px solid black",
                  }}
                  onClick={handleAlert}
                >
                  Get rate Alerts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.alertlist}>
          {userAlerts && (
            <div>
              <div style={{ display: "flex" }}>
                <div className={styles.infoBox}>Currency-Pair</div>
                <div className={styles.infoBox}>Need Value</div>
                <div className={styles.infoBox}>Alert Status</div>
              </div>
              <hr />
            </div>
          )}
          {userAlerts &&
            userAlerts.map((noti) => {
              return (
                <div style={{ display: "flex" }}>
                  <div className={styles.infoBox}>{noti.currencyPair}</div>
                  <div className={styles.infoBox}>{noti.value}</div>
                  <div className={styles.infoBox}>{noti.status.toString()}</div>
                </div>
              );
            })}
          {userAlerts.length === 0 && (
            <div
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "30px",
              }}
            >
              No Alerts Yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
