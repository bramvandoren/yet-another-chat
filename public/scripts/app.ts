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
  limit,
  getDoc,
  setDoc,
  Firestore,
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
const app : HTMLElement | any = document.querySelector("#app");
const registerForm : HTMLElement | any = document.querySelector("#registerForm");
const backLogin : HTMLElement | any = document.querySelector("#backLogin");
const backMain : HTMLElement | any = document.querySelector(".backMain");
const txtEmail : HTMLElement | any = document.querySelector("#txtEmail");
const txtPassword : HTMLElement | any = document.querySelector("#txtPassword");
const txtEmailRegister : HTMLElement | any = document.querySelector("#txtEmailRegister");
const txtPasswordRegister : HTMLElement | any = document.querySelector("#txtPasswordRegister");

const login : HTMLElement | any = document.getElementById("login");
const btnLogin : HTMLElement | any = document.querySelector("#btnLogin");
const btnSignupForm : HTMLElement | any = document.querySelector("#btnSignupForm");
const btnSignup : HTMLElement | any = document.querySelector("#btnSignup");
const btnGoogle : HTMLElement | any = document.querySelector("#btnGoogle");

const btnLogout : HTMLElement | any = document.querySelector("#btnLogout");

const divAuthState : HTMLElement | any = document.querySelector("#divAuthState");
const authState : HTMLElement | any = document.querySelector("#authState");

const divLoginError : HTMLElement | any = document.querySelector("#divLoginError");
const divRegisterError : HTMLElement | any = document.querySelector("#divRegisterError");
const errorMessage : HTMLElement | any = document.querySelector("#errorMessage");
const errEmail : HTMLElement | any = document.querySelector("#errorEmail");
const errPassword : HTMLElement | any = document.querySelector("#errorPassword");
const errEmailRegister : HTMLElement | any = document.querySelector("#errorEmailRegister");
const errPasswordRegister : HTMLElement | any = document.querySelector("#errorPasswordRegister");
const profiel : HTMLElement | any = document.querySelector("#profiel");
const btnprofiel : HTMLElement | any = document.querySelector("#btnprofiel");
const chats : HTMLElement | any = document.querySelector("#chats");
const chat : HTMLElement | any = document.querySelector(".chat");
const allChannels : HTMLElement | any = document.querySelector("#main");
const addChats : HTMLElement | any = document.querySelector("#addChat");
const deleteChats : HTMLElement | any = document.querySelector("#deleteChat");
const header : HTMLElement | any = document.querySelector(".header");
const titel : HTMLElement | any = document.querySelector("#titel");
const logoChat : HTMLElement | any = document.querySelector("#logoChat");
const infoChat : HTMLElement | any = document.querySelector(".settings-bullets");
const headerChat : HTMLElement | any = document.getElementById("header-chat");
const titelChat : HTMLElement | any = document.getElementById("titel-chat");
const inputSearch : HTMLElement | any = document.getElementById("search-input");
const messages : HTMLElement | any = document.getElementById("messages");
const messagesDiv : HTMLElement | any = document.getElementById("messagesDiv");
const channelInfo : HTMLElement | any = document.querySelector(".channelInfo");
const addMessageForm : HTMLElement | any = document.getElementById("message-form");
const messageInput : HTMLElement | any = document.getElementById("message-input");
const usersIngelogd : HTMLElement | any = document.getElementById("users-ingelogd");

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
      const credential : any = GoogleAuthProvider.credentialFromResult(result);
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
      header.style.display= "flex";
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
  usersIngelogd.style.display = "block";
  login.style.display = "none";
  header.style.display = "flex";
  app.style.display = "block";
  profiel.style.display = "none";
  registerForm.style.display = "none";
  chat.style.display = "none";
  chats.style.display = "block";
  addChats.style.display = "block";
  deleteChats.style.display = "block";
  inputSearch.style.display = "block";
};

const showProfiel = () => {
  usersIngelogd.style.display = "none";
  login.style.display = "none";
  chats.style.display = "none";
  chat.style.display = "none";
  profiel.style.display = "block";
  registerForm.style.display = "none";
  addChats.style.display = "none";
  deleteChats.style.display = "none";
  // deleteChats.style.position = "relative"
  inputSearch.style.display = "none";
};

const showChat = (e:any) => {
  usersIngelogd.style.display = "none";
  allChannels.style.display = "block";
  addChats.style.display = "none";
  deleteChats.style.display = "none";
  chat.style.display = "block";
  chats.style.display = "none";
  header.style.display = "block";
  inputSearch.style.display = "none";
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  const idChat = e.target.id;
  titelChat.innerHTML = idChat;

  //Weergave van chatberichten
  onSnapshot(query(collection(db, `chatss/${idChat}/berichten`), orderBy("createdAt", "asc")), (snapshot) => {
    const chats : any[] = [];
    if (snapshot.empty) {
      console.log("IS LEEG!");
      messages.innerHTML = `<span>Nog geen berichten verstuurd in deze chat.</span>`;
      messages.style.justifyContent = "center";
    } else{
    messages.innerHTML = "";
    snapshot.docs.forEach((doc) => {
      chats.push({ ...doc.data(), id: doc.id });
      const messageFromWho =
        auth.currentUser.email === doc.data().gebruiker ? "sent" : "receive";
      const message = `<span class="${messageFromWho}">${doc.data().gebruiker} : ${
        doc.data().createdAt
      }</span><li class="${messageFromWho}">${doc.data().chat}</li>`;
      // append the message on the page
      messages.innerHTML += message;
    });}
    console.log(chats);
  });

  //Versturen van chatberichten
  addMessageForm.addEventListener("submit", async (e : any) => {
    e.preventDefault();
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    const today = new Date();
    const date =
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    const q = query(collection(db, "test"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(queryData);
    queryData.map(async (v) => {
      await setDoc(doc(db, `chatss/${idChat}/berichten/`, messageInput.value), {
        chat: messageInput.value,
        gebruiker : auth.currentUser.email,
        createdAt: dateTime,
      });
      addMessageForm.reset();
    })
})

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

const showLoginError = (error : any) => {
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

const showRegisterError = (error : any) => {
  divRegisterError.style.display = "block";
  if (error.code == AuthErrorCodes.EMAIL_EXISTS) {
    errorMessage.innerHTML = `ERROR`;
    errEmailRegister.innerHTML = "E-mail is al reeds in gebruik.";
    errEmailRegister.style.display = "block";
  } else if (error.code == AuthErrorCodes.INVALID_EMAIL) {
    errorMessage.innerHTML = `ERROR`;
    errEmailRegister.innerHTML = "Ongeldig emailadres.";
    errPasswordRegister.style.display = "block";
    errEmailRegister.style.display = "block";
  } else if (error.code == AuthErrorCodes.WEAK_PASSWORD) {
    errorMessage.innerHTML = `ERROR`;
    errPasswordRegister.innerHTML = "Wachtwoord te zwak. Minstens 6 karakters.";
    errPasswordRegister.style.display = "block";
  } else {
    errorMessage.innerHTML = `Error: ${error.message}`;
  }
};

const showLoginState = (user : any) => {
  authState.innerHTML = `You're logged in as ${user} (uid: ${user.uid}, email: ${user.email}) `;
};

const fverlaatChat = async (e : any) => {
    e.preventDefault();
    const q = query(collection(db, "chatss"));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    const queryData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(titelChat.value)
      await deleteDoc(doc(db, `chatss/`, titelChat.value));
}


hideLoginError();
hideRegisterError();

const settingsChat : any = document.getElementById("settings-chat");
const pathSetting : any = document.querySelector(".pathSetting");
const btnVerlaatChat : any = document.getElementById("btnVerlaatChat");
const verlaatChat : any = document.getElementById("verlaatChat");
const toggleChat = () => {
  if (settingsChat.classList.contains("showSetting")) {
    settingsChat.classList.remove("showSetting");
    pathSetting.style.color = "white";
    headerChat.style.background = "blueviolet";
    backMain.style.display = "block";
    messagesDiv.style.display="block";
    verlaatChat.style.display = "none";
    pathSetting.style.fill = "white";
    titelChat.style.color = "white";
  } else {
    settingsChat.classList.add("showSetting");
    headerChat.style.background = "grey";
    pathSetting.style.color = "blueviolet";
    backMain.style.display = "none";
    messagesDiv.style.display="none";
    verlaatChat.style.display = "block";
    pathSetting.style.fill = "blueviolet";
    titelChat.style.color = "grey";
    
  }
};
//EVENTS
const chatDiv : any = document.querySelector("#chatDiv");
const contentChannel : any = document.querySelector(".contentChannel");

btnLogin.addEventListener("click", loginEmailPassword);
btnSignup.addEventListener("click", createAccount);
btnLogout.addEventListener("click", logout);
btnSignupForm.addEventListener("click", showRegisterForm);
backLogin.addEventListener("click", showLoginForm);
btnGoogle.addEventListener("click", loginGoogle);
btnprofiel.addEventListener("click", showProfiel);
titel.addEventListener("click", showApp);
logoChat.addEventListener("click", showApp);
infoChat.addEventListener("click", toggleChat);
chatDiv.addEventListener("click", showChat);
btnVerlaatChat.addEventListener("click", fverlaatChat);
backMain.addEventListener("click", showApp);

const auth : any= getAuth(firebaseApp);

monitorAuthState();

//DATABASE

//DATABASE displayen
const db = getFirestore(firebaseApp);
const addUserForm : any= document.querySelector(".add");
const collectionRef = collection(db, "user");
const collectionChats = collection(db, "chats");
const collectionChannels = collection(db, "channels");
//show users
getDocs(collectionRef)
  .then((snapshot) => {
    const users : any[] = [];
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    console.log(users);
  })
  .catch((err) => {
    console.log(err.message);
  });
//add users to db
addUserForm.addEventListener("submit", async (e: any) => {
  e.preventDefault();

  await addDoc(collectionRef, {
    email: txtEmailRegister.value,
    wachtwoord: txtPasswordRegister.value,
  });
  addUserForm.reset();
});

//add chats
const inputChannel : any = document.querySelector("#inputChannel");
const inputChannelDel : any = document.querySelector("#inputChannelDel");
const showChats : any = document.querySelector("#chats");
const channelsForm : any = document.querySelector("#channel-form");
const channelsFormDel : any = document.querySelector("#channel-formDel");
channelsForm.addEventListener("submit", async (e : any) => {
  e.preventDefault();
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  await setDoc(doc(db, `chatss/`, inputChannel.value), {
    name: inputChannel.value,
    createdAt: dateTime,
  });
  channelsForm.reset();
});

//delete chats
channelsFormDel.addEventListener("submit", async (e : any) => {
  e.preventDefault();
  await deleteDoc(doc(db, `chatss/`, inputChannelDel.value));
  channelsFormDel.reset();
});


//Weergeven van chats en gebruikers
const formDiv : any = document.getElementById("formDiv");
onSnapshot(
  query(collection(db, "chatss"), orderBy("createdAt", "asc")),
  (snapshot) => {
    const channels = [];
    chatDiv.innerHTML = "";
    const users : any[] = [];
    // console.log(users);
    snapshot.docs.forEach((doc) => {
      // const query2 = query(collection(db, `chatss/${doc.data().name}/berichten`), orderBy("createdAt", "asc"),limit(1));
      // const querySnapshot = await getDocs(query2);
      // console.log(querySnapshot);
      
      let valueUsers : string;
      getDocs(collectionRef)
      .then((snapshot) => {
      const users : any[] = [];
      snapshot.docs.forEach((doc) => {
        users.push(doc.data().email);
      });
      valueUsers = users.join("");
      console.log(valueUsers);
      const channelp = `
      <p><span>● </span>${valueUsers}</p>`;
      usersIngelogd.innerHTML = channelp;
      })
      channels.push({ ...doc.data(), id: doc.id });
      
      const channel = `<div id="${doc.data().name}" class = "channelInfo">
            <div class ="contentChannel"><h2><a id="${doc.data().name}" href="#">${doc.data().name}</a></h2>
            
            </div>`
      // let formchannel = `
      //       <form id="form${doc.id}" class="formDeleteChannel">
      //       <button id="${doc.id}" class="btnDeleteChannel" onclick="klikButton(${doc.id})">DELETE</button>
      //       </form>`;

      // append the message on the page
      chatDiv.innerHTML += channel;
      // titelChat.innerHTML = doc.data().name;
      titelChat.style.color = "white";
      console.log(doc.id);
      
    });
   
  }
  
);


//ZoekFilter in chatsNamen
const zoekChannel = () => {
  onSnapshot(collection(db, "chatss"), (snapshot) => {
    snapshot.docs.forEach((doc) => {
    const filter = inputSearch.value.toUpperCase();
    const h2 = chatDiv.getElementsByTagName("h2");
    const divdiv = chatDiv.getElementsByTagName("div");
    for (let i = 0; i < h2.length; i++) {
        const a = h2[i].getElementsByTagName("a")[0];
        const txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            h2[i].style.display = "block";
        } else {
            h2[i].style.display = "none";

        }
    }
    })
  })
}
inputSearch.addEventListener("keyup",zoekChannel);



const deleteChannel : HTMLElement | any = document.querySelector(".formDeleteChannel");
const btnDeleteChannel : HTMLElement | any = document.getElementsByTagName(`.btnDeleteChannel`);
console.log(btnDeleteChannel.id);

