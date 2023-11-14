import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  query,
  FieldValue,
  serverTimestamp,
  Timestamp,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthErrorCodes,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { setSourceMapRange } from "typescript";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAOPDKBSriKfsmLTkBXa112jVGdHzHdXTg",
  authDomain: "chat-application-8b946.firebaseapp.com",
  projectId: "chat-application-8b946",
  storageBucket: "chat-application-8b946.appspot.com",
  messagingSenderId: "484897911627",
  appId: "1:484897911627:web:b75beca5d7490796d4eece",
});

//CONSTANTEN
const app = document.querySelector("#app");
const registerForm = document.querySelector("#registerForm");
const backLogin = document.querySelector("#backLogin");
const backMain = document.querySelector("#backMain");
const txtEmail = document.querySelector("#txtEmail");
const txtPassword = document.querySelector("#txtPassword");
const txtEmailRegister = document.querySelector("#txtEmailRegister");
const txtPasswordRegister = document.querySelector("#txtPasswordRegister");

const btnLogin = document.querySelector("#btnLogin");
const btnSignupForm = document.querySelector("#btnSignupForm");
const btnSignup = document.querySelector("#btnSignup");
const btnGoogle = document.querySelector("#btnGoogle");

const btnLogout = document.querySelector("#btnLogout");

const divAuthState = document.querySelector("#divAuthState");
const authState = document.querySelector("#authState");

const divLoginError = document.querySelector("#divLoginError");
const divRegisterError = document.querySelector("#divRegisterError");
const errorMessage = document.querySelector("#errorMessage");
const errEmail = document.querySelector("#errorEmail");
const errPassword = document.querySelector("#errorPassword");
const errEmailRegister = document.querySelector("#errorEmailRegister");
const errPasswordRegister = document.querySelector("#errorPasswordRegister");
const profiel = document.querySelector("#profiel");
const btnprofiel = document.querySelector("#btnprofiel");
const chats = document.querySelector("#chats");
const chat = document.querySelector(".chat");
const allChannels = document.querySelector("#main");
const addChats = document.querySelector("#addChat");
const header = document.querySelector(".header");
const titel = document.querySelector("#titel");
const infoChat = document.querySelector(".settings-bullets");
// Login using email/password
const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;

  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  } catch (error) {
    console.log(`There was an error: ${error}`);
    showLoginError(error);
  }
};

// Login met Google
const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

// Create new account using email/password
const createAccount = async () => {
  const email = txtEmailRegister.value;
  const password = txtPasswordRegister.value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(`There was an error: ${error}`);
    showRegisterError(error);
  }
};

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      showApp();
      showLoginState(user);

      hideLoginError();
      // hideLinkError();
      hideRegisterError();
    } else {
      showLoginForm();
      authState.innerHTML = `You're not logged in.`;
    }
  });
};

// Log out
const logout = async () => {
  await signOut(auth);
};

//functies ivm displayen

const showRegisterForm = () => {
  login.style.display = "none";
  app.style.display = "none";
  registerForm.style.display = "block";
};
const showLoginForm = () => {
  login.style.display = "block";
  app.style.display = "none";
  registerForm.style.display = "none";
};

const showApp = () => {
  login.style.display = "none";
  header.style.display = "flex";
  app.style.display = "block";
  profiel.style.display = "none";
  registerForm.style.display = "none";
  chat.style.display = "none";
  chats.style.display = "block";
  addChats.style.display = "block";
};

const showProfiel = () => {
  login.style.display = "none";
  chats.style.display = "none";
  chat.style.display = "none";
  profiel.style.display = "block";
  registerForm.style.display = "none";
  addChats.style.display = "none";
};

const showChat = () => {
  allChannels.style.display = "block";
  addChats.style.display = "none";
  chat.style.display = "block";
  chats.style.display = "none";
  header.style.display = "block";
};

const hideLoginError = () => {
  divLoginError.style.display = "none";
  errEmail.style.display = "none";
  errPassword.style.display = "none";
  errorMessage.innerHTML = "";
  errEmail.innerHTML = "";
  errPassword.innerHTML = "";
};
const hideRegisterError = () => {
  divRegisterError.style.display = "none";
  errEmailRegister.style.display = "none";
  errPasswordRegister.style.display = "none";
  errorMessage.innerHTML = "";
  errEmailRegister.innerHTML = "";
  errPasswordRegister.innerHTML = "";
};

const showLoginError = (error) => {
  divLoginError.style.display = "block";
  if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
    errorMessage.innerHTML = `ERROR`;
    errPassword.innerHTML = "Wachtwoord is fout.";
    errPassword.style.display = "block";
  } else if (error.code == AuthErrorCodes.INVALID_EMAIL) {
    errorMessage.innerHTML = `ERROR`;
    errEmail.innerHTML = "E-mail is fout.";
    errEmail.style.display = "block";
  } else {
    errorMessage.innerHTML = `Error: ${error.message}`;
  }
};

const showRegisterError = (error) => {
  divRegisterError.style.display = "none";
  if (error.code == AuthErrorCodes.EMAIL_EXISTS) {
    errorMessage.innerHTML = `ERROR`;
    errEmailRegister.innerHTML = "E-mail is al reeds in gebruik.";
    errEmailRegister.style.display = "block";
  } else if (error.code == AuthErrorCodes.WEAK_PASSWORD) {
    errorMessage.innerHTML = `ERROR`;
    errPasswordRegister.innerHTML = "Wachtwoord te zwak. Minstens 6 karakters.";
    errPasswordRegister.style.display = "block";
  } else {
    errorMessage.innerHTML = `Error: ${error.message}`;
  }
};

const showLoginState = (user) => {
  authState.innerHTML = `You're logged in as ${user} (uid: ${user.uid}, email: ${user.email}) `;
};

hideLoginError();
hideRegisterError();

const showInfoChat = () => {
  document.getElementById("header-chat").style.background = "grey";
  document.getElementById("header-chat").style.background = "grey";
  document.getElementById("header-chat").style.background = "grey";
};
//EVENTS
const chatDiv = document.querySelector("#chatDiv");
btnLogin.addEventListener("click", loginEmailPassword);
btnSignup.addEventListener("click", createAccount);
btnLogout.addEventListener("click", logout);
btnSignupForm.addEventListener("click", showRegisterForm);
backLogin.addEventListener("click", showLoginForm);
backMain.addEventListener("click", showApp);
btnGoogle.addEventListener("click", loginGoogle);
btnprofiel.addEventListener("click", showProfiel);
chatDiv.addEventListener("click", showChat);
titel.addEventListener("click", showApp);
infoChat.addEventListener("click", showInfoChat);

const auth = getAuth(firebaseApp);

monitorAuthState();

//DATABASE

//DATABASE displayen
const db = getFirestore(firebaseApp);
// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, "cities");
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }
const addUserForm = document.querySelector(".add");
const collectionRef = collection(db, "user");
const collectionChats = collection(db, "chats");
const collectionChannels = collection(db, "channels");
//show users
getDocs(collectionRef)
  .then((snapshot) => {
    let users = [];
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    console.log(users);
  })
  .catch((err) => {
    console.log(err.message);
  });
//add users to db
addUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  await addDoc(collectionRef, {
    email: txtEmailRegister.value,
    wachtwoord: txtPasswordRegister.value,
  });
  addUserForm.reset();
});

//show channels
const inputChannel = document.querySelector("#inputChannel");
const showChats = document.querySelector("#chats");
const channelsForm = document.querySelector("#channel-form");
channelsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  await addDoc(collectionChannels, {
    name: inputChannel.value,
    createdAt: dateTime,
  });
  channelsForm.reset();
});

onSnapshot(
  query(collection(db, "channels"), orderBy("createdAt")),
  (snapshot) => {
    let channels = [];
    document.getElementById("chatDiv").innerHTML = "";
    snapshot.docs.forEach((doc) => {
      channels.push({ ...doc.data(), id: doc.id });
      let d = String(doc.id);
      let channel = `<div>
            <h2>${doc.data().name}</h2>
            <button id="${doc.id}" class="btnDeleteChannel">DELETE</button>
      </div>`;
      // append the message on the page
      document.getElementById("chatDiv").innerHTML += channel;
      document.getElementById("titel-chat").innerHTML = doc.data().name;
      console.log(doc.id);
    });
    //delete document
    // const deleteChannel = document.querySelectorAll(`#deleteChannel${doc.id}`);
    // const btnDeleteChannel = document.querySelector(`.btnDeleteChannel`);
    // console.log(doc.id);
    // btnDeleteChannel.addEventListener("click", delChannel(doc.id));
    // console.log(channels);
  }
);

const delChannel = async (id) => {
  await deleteDoc(doc(db, "channels", id));
};

// Hier gaan we een chat tonen met berichten
//add messages to db
const addMessageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
addMessageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  await addDoc(collectionChats, {
    chat: messageInput.value,
    gebruiker: auth.currentUser.email,
    createdAt: dateTime,
  });
  addMessageForm.reset();
});
//show chat

onSnapshot(query(collection(db, "chats"), orderBy("createdAt")), (snapshot) => {
  let chats = [];
  document.getElementById("messages").innerHTML = "";
  snapshot.docs.forEach((doc) => {
    chats.push({ ...doc.data(), id: doc.id });
    const messageFromWho =
      auth.currentUser.email === doc.data().gebruiker ? "sent" : "receive";
    let message = `<span class="${messageFromWho}">${doc.data().gebruiker} : ${
      doc.data().createdAt
    }</span><li class="${messageFromWho}">${doc.data().chat}</li>`;

    // append the message on the page
    document.querySelector(".chat").scrollTop =
      document.querySelector(".chat").scrollHeight;
    document.getElementById("messages").innerHTML += message;
    // document.getElementById("titel-chat").innerHTML = "TITEL CHAT";
  });
  console.log(chats);
});
