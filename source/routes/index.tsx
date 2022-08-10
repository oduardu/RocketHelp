import { NavigationContainer } from "@react-navigation/native";
import { SignIn } from "../screens/SignIn";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"

import { AppRoutes } from "./app.routes";
import { useEffect, useState } from "react";
import {Loading} from "../components/Loading";

export function Routes() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    })

    return unsubscribe;
  }, []);

  if (loading) {
    return <Loading />
  } else {
  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn /> }
    </NavigationContainer>
  );
}
}