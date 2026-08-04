// Lazy Firebase accessors — keeps the ~700 kB Firebase/Firestore SDK out of
// the initial bundle so the site paints before auth/Firestore initialize.
// All functions return the same module cache, so importing once is cheap.

let firebasePromise = null;

export function getFirebase() {
  if (!firebasePromise) {
    firebasePromise = Promise.all([
      import("./firebase.js"),
      import("firebase/auth"),
    ]).then(([{ auth }, authModule]) => ({
      auth,
      onAuthStateChanged: authModule.onAuthStateChanged,
      signInWithEmailAndPassword: authModule.signInWithEmailAndPassword,
      signOut: authModule.signOut,
    }));
  }
  return firebasePromise;
}

export async function ensureStorage() {
  await import("./storage-shim.js");
}
