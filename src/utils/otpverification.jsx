import React, { useState, useRef, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBS-lX2FeFKIPHy8v4NExt4u5CuWBeXvFw",
  authDomain: "cyborgweb-32ba7.firebaseapp.com",
  projectId: "cyborgweb-32ba7",
  storageBucket: "cyborgweb-32ba7.firebasestorage.app",
  messagingSenderId: "630229978195",
  appId: "1:630229978195:web:ab421d90cf2eb8aedf8aa6",
  measurementId: "G-K7L9XXS8SL"
};
initializeApp(firebaseConfig);
const auth = getAuth();

const OtpVerification = () => {
  const recaptchaRef = useRef(null);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Only create once
    if (!window.recaptchaVerifier && recaptchaRef.current) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        recaptchaRef.current,
        {
          size: 'invisible',
          callback: () => console.log('reCAPTCHA solved'),
        }
      );
      window.recaptchaVerifier.render();
    }
  }, []);

  const sendOtp = async () => {
    if (!phone.startsWith('+')) {
      return alert('Phone must start with +country code');
    }
    // Directly use the existing verifier—no clear or rerender
    try {
      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(result);
      alert('OTP sent successfully.');
    } catch (e) {
      console.error(e);
      alert('Failed to send OTP: ' + e.message);
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) return;
    try {
      await confirmationResult.confirm(otp);
      setVerified(true);
      alert('✅ Phone Verified');
    } catch (e) {
      alert('Invalid OTP');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}>
      <h2>Firebase OTP Login</h2>
      {!verified ? (
        <>
          <input
            placeholder="+91xxxxxxxxxx"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={{ width: '100%', padding: 10, fontSize: 16, marginBottom: 10 }}
          />
          <button onClick={sendOtp} style={{ padding: '10px 20px' }}>
            Send OTP
          </button>
          {confirmationResult && (
            <div style={{ marginTop: 20 }}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props, i) => <input {...props} key={i} />}
                renderSeparator={<span> </span>}
                inputStyle={{
                  width: '2rem',
                  height: '2rem',
                  margin: '0 0.25rem',
                  fontSize: '1.5rem',
                }}
              />
              <button onClick={verifyOtp} style={{ marginTop: 10 }}>
                Verify OTP
              </button>
            </div>
          )}
        </>
      ) : (
        <h3 style={{ color: 'green' }}>✅ Phone Verified!</h3>
      )}
      <div ref={recaptchaRef} id="recaptcha-container" />
    </div>
  );
};

export default OtpVerification;
