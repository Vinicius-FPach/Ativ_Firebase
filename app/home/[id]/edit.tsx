import { View, Text, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import globalStyles from "../../../styles/globalStyles";
import StyledButton from "../../../components/StyledButton";
import { useRouter } from "expo-router";
import useCollection from "../../../firebase/hooks/useCollection";
import Carrer from "../../../types/Carrer";

export default function edit() {
  const { update, refreshData } = useCollection<Carrer>("carrers");
  const router = useRouter();
  const [name, setTeam] = useState("");
  const [trophies, setTrophie] = useState("");
  const [topscorer, setTopScorer] = useState("");
  const [vicetopscorer, setViceScorer] = useState("");
  const [topassist, setTopAssist] = useState("");
  const [viceassist, setViceAssist] = useState("");

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>FCM</Text>

      <TextInput
        style={globalStyles.input}
        value={name}
        onChangeText={setTeam}
        placeholder=""
      />
      <TextInput
        style={globalStyles.input}
        value={trophies}
        onChangeText={setTrophie}
        placeholder=""
      />
      <TextInput
        style={globalStyles.input}
        value={topscorer}
        onChangeText={setTopScorer}
        placeholder=""
      />
      <TextInput
        style={globalStyles.input}
        value={vicetopscorer}
        onChangeText={setViceScorer}
        placeholder=""
      />
      <TextInput
        style={globalStyles.input}
        value={topassist}
        onChangeText={setTopAssist}
        placeholder=""
      />
      <TextInput
        style={globalStyles.input}
        value={viceassist}
        onChangeText={setViceAssist}
        placeholder=""
      />

      <StyledButton
        title="Save"
        onPress={async () => {
          try {
            await update(
              name,
              trophies,
              topscorer,
              vicetopscorer,
              topassist,
              viceassist
            );
            router.push("/home/[id]/index.tsx");
          } catch (error: any) {
            Alert.alert("Blank fields", error.toString());
          }
        }}
        style={{ marginTop: 12 }}
      />
    </View>
  );
}
