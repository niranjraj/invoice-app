import { firebase } from "../firebase/initFirebase";

export async function addInvoice(userId, invoice) {
  const ref = firebase
    .firestore()
    .collection("User")
    .doc(userId)
    .collection("invoices");
  await ref.add(invoice);
}

export async function getInvoices(userId) {
  let newInvoices = [];
  let key = null;
  const ref = firebase
    .firestore()
    .collection(`User/${userId}/invoices`)
    .orderBy("timeStamp", "desc")
    .limit(15);
  const snapshot = await ref.get();
  if (!snapshot.empty) {
    snapshot.forEach((doc) => {
      const data = doc.data();
      newInvoices.push({ ...data, id: doc.id });
      key = data.timeStamp;
    });
  }

  return { newInvoices, key };
}

export async function updateInvoice(userId, invoiceId, updatedInvoice) {
  const ref = firebase.firestore().doc(`User/${userId}/invoices/${invoiceId}`);
  await ref.set(updatedInvoice);
}
export async function deleteInvoice(userId, invoiceId) {
  const ref = firebase.firestore().doc(`User/${userId}/invoices/${invoiceId}`);
  await ref.delete();
}
export async function updateStatus(userId, invoiceId, updatedStatus) {
  const ref = firebase.firestore().doc(`User/${userId}/invoices/${invoiceId}`);
  await ref.update({ status: updatedStatus, timeStamp: new Date() });
}

export async function setUserId(userId, userName, photoURL) {
  const data = {
    displayName: userName,
    avatar: photoURL,
  };
  const ref = firebase.firestore().collection("User").doc(userId);
  if (ref.exists) {
    console.log("already exists");
    return;
  }
  await ref.set(data);
}

export async function getNextBatch(startKey, userId) {
  const ref = firebase
    .firestore()
    .collection(`User/${userId}/invoices`)
    .orderBy("timeStamp", "desc")
    .startAfter(startKey)
    .limit(15);
  const snapshot = await ref.get();
  let newInvoices = [];
  let key = null;
  if (!snapshot.empty) {
    snapshot.forEach((doc) => {
      const data = doc.data();
      newInvoices.push({ ...data, id: doc.id });
      key = data.timeStamp;
    });
  }

  return { newInvoices, key };
}
