import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function OAuth() {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const auth = getAuth();
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);

      toast.success("Sign in successful!");
      navigate("/profile");
    } catch (error) {
      console.log(error);
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
