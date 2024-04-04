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
  apiKey: "AIzaSyDHfpl2Vsr7GGd8Sb6VAdNRLWKEdE9M_MI",
  authDomain: "project1-33ba1.firebaseapp.com",
  databaseURL: "https://project1-33ba1-default-rtdb.firebaseio.com",
  projectId: "project1-33ba1",
  storageBucket: "project1-33ba1.appspot.com",
  messagingSenderId: "122408221984",
  appId: "1:122408221984:web:8d1f8ed3c54f8cc7acab45",
  measurementId: "G-W41PD0H5PY"
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