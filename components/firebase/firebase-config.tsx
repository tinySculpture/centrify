import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
	apiKey: "AIzaSyD3OpBFik_ahTgl_ySBtJuXV2FlrQPQsV8",
	authDomain: "centrify-c1219.firebaseapp.com",
	databaseURL: "https://centrify-c1219-default-rtdb.asia-southeast1.firebasedatabase.app/",
	projectId: "centrify-c1219",
	storageBucket: "centrify-c1219.appspot.com",
	messagingSenderId: "942555458184",
	appId: "1:942555458184:web:724ee72aed5d45d174cd3d",
	measurementId: "G-DSVC8SYYN8"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const firedb = getFirestore(app);