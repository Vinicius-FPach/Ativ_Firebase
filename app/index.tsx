import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import Loading from "../components/Loading";
import StyledButton from "../components/StyledButton";
import useAuth from "../firebase/hooks/useAuth";
import globalStyles from "../styles/globalStyles";

export default function _screen() {
  const { user, login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("fulano@example.com");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    if (user) {
      router.replace("/home/");
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>FCM</Text>

      <TextInput
        style={globalStyles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="fulano@example.com"
      />
      <TextInput
        style={globalStyles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="123456"
        keyboardType="numeric"
        secureTextEntry
      />

      <StyledButton
        title="Login"
        onPress={async () => {
          try {
            await login(email, password);
            router.push("/home/");
          } catch (error: any) {
            Alert.alert("Login error", error.toString());
          }
        }}
        style={{ marginTop: 12 }}
      />
    </View>
  );
}
