import { firebase } from "../firebase/initFirebase";

export async function addInvoice(userId, invoice) {
  try {
    const ref = firebase
      .firestore()
      .collection("User")
      .doc(userId)
      .collection("invoices");
    await ref.add(invoice);
  } catch (error) {
    console.log(error);
  }
}

export async function getInvoices(userId) {
  try {
    let invoices = [];
    const ref = firebase.firestore().collection(`User/${userId}/invoices`);
    const snapshot = await ref.get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      invoices.push({ ...data, id: doc.id });
    });
    
    return invoices;
  } catch (error) {
    console.log(error);
  }
}

export async function updateInvoice(userId, invoiceId, updatedInvoice) {
  try {
    const ref = firebase
      .firestore()
      .doc(`User/${userId}/invoices/${invoiceId}`);
    await ref.set(updatedInvoice);
  } catch (error) {
    console.log(error);
  }
}
export async function deleteInvoice(userId, invoiceId) {
  try {
    const ref = firebase
      .firestore()
      .doc(`User/${userId}/invoices/${invoiceId}`);
    await ref.delete();
  } catch (error) {
    console.log(error);
  }
}
export async function updateStatus(userId, invoiceId, updatedStatus) {
  try {
    const ref = firebase
      .firestore()
      .doc(`User/${userId}/invoices/${invoiceId}`);
    await ref.update({ status: updatedStatus });
  } catch (error) {}
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
