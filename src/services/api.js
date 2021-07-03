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
