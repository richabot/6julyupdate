import React, { useEffect, useState } from 'react';

import "../styles/twofactor.css"
function Setup(props) {

  const [twofactor, setTwofactor] = useState({});


  const email = localStorage.getItem("email");
  const setup = () => {

    const email = localStorage.getItem("email");
   
    fetch('http://localhost:5000/api/auth/twofactor/setup', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    })
      .then(async response => {
        const result = await response.json();
        if (response.status === 200) {
         
          setTwofactor(result);
        }
      });
  };
  const confirm = (otp) => {

    const email = localStorage.getItem("email");
    const body = {
      token: otp,
      email: email
    };
    fetch('http://localhost:5000/api/auth/twofactor/verify', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        const result = response.body;
       
        if (response.status === 200) {
          setTwofactor(prevState => ({
            ...prevState,
            secret: prevState.tempSecret,
            tempSecret: ""
          }));
        }
     
        fetchauthentication()
      })
      .catch(err => alert('invalid otp'));
  }

  const disable = () => {
    const email = localStorage.getItem("email");
    fetch('http://localhost:5000/api/auth/twofactor/setup', {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    })
      .then(response => {
        const result = response.body;
         if (response.status === 200) {
          props.history.push('/setup');
          window.location = "/setup"

        }
        fetchauthentication()
      }).catch(err => {
        console.log(err, "error in disabling")
        window.location = "/profile/security"
      });
  }

  useEffect(() => {
    fetchauthentication()
  }, []);

  function fetchauthentication() {
    const email = localStorage.getItem("email");
    fetch(`http://localhost:5000/api/auth/twofactor/authenticated?email=${email}`)
      .then(response => response.json())
      .then(data => {
        setTwofactor(prevState => ({
          ...prevState,
          authenticated: data.authenticated
        }));
      })
      .catch(err => {
        if (err.status === 401) {
          props.history.push('/');
        }
      });
  }

  return (
    <div>
      <div className='authinfo'>
        Two-Factor Authentication (2FA) is a security measure that helps protect your Client Area against unauthorized access. To enable the 2FA, you need to have the mobile Authenticator app synchronized with your registration. Note that if you lose access to your authenticated device, resetting the 2-FA is only possible by doing a full KYC. Please refrain from giving access to anyone else but you.
      </div>


      {twofactor.authenticated !== 1 &&
        <div className="col-md-4 col-md-offset-4" v-if="!twofactor.secret">

          <div>
            <div className='qrbtn'>
              <div style={{ fontWeight: "700" }}>Sign in with Two-Factor Authentication</div>
              {!twofactor.tempSecret && <button onClick={setup} className="derexbtn ">Activate</button>}
            </div>
          </div>
          {twofactor.tempSecret &&
            <span>
              <p>Scan the QR code or enter the secret in Google Authenticator</p>
              <img src={twofactor.dataURL} alt="..." className="img-thumbnail" />
              <p>Secret - {twofactor.tempSecret}</p>
              <p>Type - TOTP</p>

              <div className="form-group">
                <label htmlFor="otp">Enter Otp:</label>

                <input onChange={(e) => {
                  const updatedValue = e.target.value;
                  setTwofactor(prevState => ({ ...prevState, otp: updatedValue }));
                }} type="text" value={twofactor.otp || ''} />
              </div>
              <button onClick={() => confirm(twofactor.otp)} className="btn btn-success derexbtn">confirm</button>

            </span>
          }
        </div>}

      {twofactor.authenticated === 1 && <div className="col-md-1">
        <h3>Disable</h3>
        <button onClick={disable} className="btn btn-danger">Disable</button>

      </div>}
    </div>
  )
}


export default Setup