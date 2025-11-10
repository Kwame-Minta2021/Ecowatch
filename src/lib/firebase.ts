"use client"
import { initializeApp, getApps } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getMessaging, isSupported as isMessagingSupported, type Messaging } from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyB8f7VS9_5xRsk3WcGEqtGVVr4RSybo4hg",
  authDomain: "ecowatch-9d69b.firebaseapp.com",
  databaseURL: "https://ecowatch-9d69b-default-rtdb.firebaseio.com",
  projectId: "ecowatch-9d69b",
  storageBucket: "ecowatch-9d69b.firebasestorage.app",
  messagingSenderId: "136686003155",
  appId: "1:136686003155:web:d3ee301d21944c25580526",
  measurementId: "G-MRHKT5JXB7",
}

let messagingInstance: Messaging | undefined

export function getFirebaseApp() {
  const apps = getApps()
  return apps.length ? apps[0] : initializeApp(firebaseConfig)
}

export function getRealtimeDatabase() {
  return getDatabase(getFirebaseApp())
}

export async function getFirebaseMessaging() {
  if (typeof window === "undefined") return undefined
  if (messagingInstance) return messagingInstance
  const supported = await isMessagingSupported().catch(() => false)
  if (!supported) return undefined
  messagingInstance = getMessaging(getFirebaseApp())
  return messagingInstance
}


