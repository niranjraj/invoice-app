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
    let newInvoices = [];
    let key=null
    const ref = firebase.firestore().collection(`User/${userId}/invoices`).orderBy("timeStamp", 'desc').limit(15);
    const snapshot = await ref.get();
    if(!snapshot.empty){
      snapshot.forEach((doc) => {
        const data = doc.data();
        newInvoices.push({ ...data, id: doc.id });
        key=data.timeStamp;
      });
      

    }

    return {newInvoices,key};
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
    await ref.update({ status: updatedStatus,timeStamp:new Date()});
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

export async function getNextBatch(startKey,userId){
  console.log("next batch called")
  const ref = firebase.firestore().collection(`User/${userId}/invoices`).orderBy("timeStamp", 'desc').startAfter(startKey).limit(15);
  const snapshot = await ref.get();
  let newInvoices = [];
  let key=null
  if(!snapshot.empty){
    snapshot.forEach((doc) => {
      const data = doc.data();
      newInvoices.push({ ...data, id: doc.id });
      key=data.timeStamp;
      console.log("in snapshot")
     
    });
  }

  return {newInvoices,key}
}