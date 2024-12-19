import { View, Text, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import globalStyles from "../../../styles/globalStyles";
import StyledButton from "../../../components/StyledButton";
import { useRouter } from "expo-router";
import useCollection from "../../../firebase/hooks/useCollection";
import Carrer from "../../../types/Carrer";

export default function edit() {
  const { create, refreshData } = useCollection<Carrer>("carrers");
  const router = useRouter();
  const [name, setTeam] = useState("");
  const [trophies, setTrophie] = useState("");
  const [topscorer, setTopScorer] = useState("");
  const [vicetopscorer, setViceScorer] = useState("");
  const [topassist, setTopAssist] = useState("");
  const [viceassist, setViceAssist] = useState("");

  const handleButton = async () => {
    try {
      await create({
        name,
        trophies,
        topscorer,
        vicetopscorer,
        topassist,
        viceassist,
      });
      await refreshData();
      router.replace("/home/");
    } catch (error: any) {
      Alert.alert("Blank fields", error.toString());
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>FCM</Text>

      <TextInput
        style={globalStyles.input}
        value={name}
        onChangeText={setTeam}
        placeholder="Team name"
      />
      <TextInput
        style={globalStyles.input}
        value={trophies}
        onChangeText={setTrophie}
        placeholder="Number of Trophies"
        keyboardType="numeric"
      />
      <TextInput
        style={globalStyles.input}
        value={topscorer}
        onChangeText={setTopScorer}
        placeholder="TopScorer"
      />
      <TextInput
        style={globalStyles.input}
        value={vicetopscorer}
        onChangeText={setViceScorer}
        placeholder="ViceTopScorer"
      />
      <TextInput
        style={globalStyles.input}
        value={topassist}
        onChangeText={setTopAssist}
        placeholder="TopAssist"
      />
      <TextInput
        style={globalStyles.input}
        value={viceassist}
        onChangeText={setViceAssist}
        placeholder="ViceTopAssist"
      />

      <StyledButton
        title="Save"
        onPress={handleButton}
        style={{ marginTop: 12 }}
      />
    </View>
  );
}
