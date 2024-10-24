import {
  AuthErrorCodes,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";

export default function OAuth() {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const auth = getAuth();
      const googleProvider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;

      //   check if the user already exists in the database
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "user", user.uid), {
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
        });
      }
      toast.success("Sign in successful!");
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error?.code) {
          case AuthErrorCodes.EMAIL_EXISTS:
            toast.error("Email already in use");
            break;
          case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
            toast.error("Invalid Credentials");
            break;
          default:
            toast.error("Could not signin with the google");
            break;
        }
      }
    }
  };
  return (
    <button
      className="w-full bg-red-600 p-3 rounded text-white font-bold hover:bg-red-700"
      type="button"
      onClick={handleGoogleSignIn}
    >
      Continue with Google
    </button>
  );
}
