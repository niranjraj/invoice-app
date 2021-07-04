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

export function getInvoices(userId) {
  try {
    const ref = firebase.firestore().collection(`User/${userId}/invoices`);
    return ref;
  } catch (error) {
    console.log(error);
  }
}

export function updateInvoice(userId,invoiceId,updatedInvoice){
  try {
    const ref=firebase.firestore().doc(`User/${userId}/invoices/${invoiceId}`);
    ref.set(updatedInvoice);
  } catch (error) {
    console.log(error)
  }
}
export async function deleteInvoice(userId,invoiceId){
  try {
    const ref=firebase.firestore().doc(`User/${userId}/invoices/${invoiceId}`);
     await ref.delete();
  } catch (error) {
    console.log(error)
  }
}
export async function updateStatus(userId,invoiceId,updatedStatus){
  try {
    const ref=firebase.firestore().doc(`User/${userId}/invoices/${invoiceId}`);
    await ref.update({status:updatedStatus})
  } catch (error) {
    
  }
}


export async function setUserId(userId, userName, photoURL) {
  const data = {
    displayName: userName,
    avatar: photoURL,
  };
  const ref = await firebase.firestore().collection("User").doc(userId);
  if (ref.exists) {
    return;
  }
  await ref.set(data);
}
