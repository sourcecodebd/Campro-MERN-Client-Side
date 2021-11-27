import initializeFirebase from "../components/Firebase/Firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, sendEmailVerification, sendPasswordResetEmail, signOut, getIdToken } from "firebase/auth";
import { useState, useEffect } from "react";


initializeFirebase();

const useFirebase = () => {
    // MUI Snackbar starts
    const [open, setOpen] = useState(false);
    // MUI Snackbar ends

    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState('');
    const [admin, setAdmin] = useState(false);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const signUpUsingEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUsingEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const updateUserName = name => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }
    const resetUserPassword = email => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccess('Password Reset confirmation sent to your mail successfully!');
                setOpen(true);
                setError('');
            })
            .catch(err => {
                setError(err.code);
                setOpen(true);
                setSuccess('');
            });
    }

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setSuccess('Logged out successfully!');
                setOpen(true);
                setError('');
            })
    }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, userInfo => {
            if (userInfo && (userInfo.emailVerified || userInfo.email === 'admin@admin.com')) {
                getIdToken(userInfo)
                    .then(idToken => {
                        setToken(idToken);
                        localStorage.setItem('idToken', idToken);
                    })
                setUser(userInfo);
            }
            else {
                setUser({});
            }
            setIsLoading(false);
        })
        return () => unsubscribed;
    }, [auth, admin]);

    useEffect(() => {
        fetch(`https://desolate-woodland-29933.herokuapp.com/admin/verify?email=${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.isAdmin));
    }, [user.email]);

    const saveUser = (name, email, method) => {
        const date = new Date();
        const joinedAt = date.toLocaleDateString();
        const newUser = { name, email, joinedAt };
        fetch(`https://desolate-woodland-29933.herokuapp.com/user/add`, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
    }

    return {
        user,
        setUser,
        saveUser,
        token,
        admin,
        error,
        success,
        setError,
        setSuccess,
        signInUsingGoogle,
        signUpUsingEmail,
        signInUsingEmail,
        updateUserName,
        verifyEmail,
        resetUserPassword,
        logOut,
        isLoading,
        setIsLoading,
        open,
        setOpen,
    }
}

export default useFirebase;