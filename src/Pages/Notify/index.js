import React, { useState, useEffect, useCallback } from 'react';
import styles from './Notify.module.scss';
import classNames from 'classnames/bind';
import Sent from './Sent.js'
import Coming from './Coming.js'
import Star from './Star.js'
import Footer from '../../Components/Footer'

// --------------Firebase--------------
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { addData } from "../../Components/Firebase/FireBase.js"

const firebaseConfig = {
  apiKey: "AIzaSyCyI2BpMknXBSaZgOlsjId38ZvheRpXZLs",
  authDomain: "btl-ltnc-9c22f.firebaseapp.com",
  databaseURL: "https://btl-ltnc-9c22f-default-rtdb.firebaseio.com",
  projectId: "btl-ltnc-9c22f",
  storageBucket: "btl-ltnc-9c22f.appspot.com",
  messagingSenderId: "157627430613",
  appId: "1:157627430613:web:5248f93026848e6848945c",
  measurementId: "G-WYRWK424BJ"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase();

// --------------End Firebase--------------

const cx = classNames.bind(styles)

function Notify() {
  var [current, setCurrent] = useState('coming')

  var handleClick = useCallback((string) => {
      setCurrent(string)
  },[])

  return(
    <>
    {current == 'coming' && <Coming comingdata='' handleClick={handleClick}/>}
    {current == 'sent' && <Coming sentdata=''/>}
    {current == 'star' && <Coming stardata=''/>}
    <Footer />
    </>
  )
}

export default Notify