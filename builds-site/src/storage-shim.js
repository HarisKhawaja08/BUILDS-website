// Stand-in for Claude's artifact `window.storage` API — this version is
// backed by Firestore, so data is genuinely shared: something the admin
// adds shows up for every visitor, on every device.
//
// Data model: every "shared" key/value pair from the app becomes one
// document in the `kv_shared` collection, with the storage key as the
// Firestore document ID and the value stored as a string field.
// `list(prefix)` does a document-ID range query for that prefix — this is
// what lets the gallery store one small document per photo (see App.jsx)
// instead of one giant document, so we never approach Firestore's 1MB
// per-document limit even with many images.
//
// `shared: false` isn't used anywhere in this app today, but falls back
// to localStorage so the API still behaves sensibly if that ever changes.

import { db } from "./firebase.js";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  documentId,
  getDocs,
} from "firebase/firestore";

const COLLECTION = "kv_shared";

function localKey(key) {
  return `builds:local:${key}`;
}

const storageShim = {
  async get(key, shared = false) {
    if (!shared) {
      const raw = localStorage.getItem(localKey(key));
      if (raw === null) throw new Error(`storage key not found: ${key}`);
      return { key, value: raw, shared };
    }
    const snap = await getDoc(doc(db, COLLECTION, key));
    if (!snap.exists()) throw new Error(`storage key not found: ${key}`);
    return { key, value: snap.data().value, shared };
  },

  async set(key, value, shared = false) {
    if (!shared) {
      localStorage.setItem(localKey(key), value);
      return { key, value, shared };
    }
    await setDoc(doc(db, COLLECTION, key), { value, updatedAt: Date.now() });
    return { key, value, shared };
  },

  async delete(key, shared = false) {
    if (!shared) {
      localStorage.removeItem(localKey(key));
      return { key, deleted: true, shared };
    }
    await deleteDoc(doc(db, COLLECTION, key));
    return { key, deleted: true, shared };
  },

  async list(prefix = "", shared = false) {
    if (!shared) {
      const p = localKey(prefix);
      const keys = Object.keys(localStorage)
        .filter((k) => k.startsWith(p))
        .map((k) => k.slice(localKey("").length));
      return { keys, prefix, shared };
    }
    const col = collection(db, COLLECTION);
    const q = query(
      col,
      where(documentId(), ">=", prefix),
      where(documentId(), "<", prefix + "\uf8ff")
    );
    const snap = await getDocs(q);
    const keys = snap.docs.map((d) => d.id);
    return { keys, prefix, shared };
  },
};

if (typeof window !== "undefined") {
  window.storage = storageShim;
}

export default storageShim;
