declare module "../../firebase" {
    import { Auth } from "firebase/auth";
  
    // Declare the types of your exports from firebase.js
    export const auth: Auth;
    export { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
  }
  