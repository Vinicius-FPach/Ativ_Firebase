import { faker } from "@faker-js/faker";
import React, { useState } from "react";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { Alert, Text, View, TextInput } from "react-native";

import HeaderRight from "../../../components/HeaderRight";
import Loading from "../../../components/Loading";
import StyledButton from "../../../components/StyledButton";
import useDocument from "../../../firebase/hooks/useDocument";
import globalStyles from "../../../styles/globalStyles";
import Carrer from "../../../types/Carrer";
import useCollection from "../../../firebase/hooks/useCollection";

export default function BookDetails() {
  const { update, refreshData } = useCollection<Carrer>("carrers");

  const { id } = useGlobalSearchParams();

  // for convenience, you can extract data and rename it to "book" by typing data:your_alias_for_data
  const router = useRouter();
  const [name, setTeam] = useState("");
  const [trophies, setTrophie] = useState("");
  const [topscorer, setTopScorer] = useState("");
  const [vicetopscorer, setViceScorer] = useState("");
  const [topassist, setTopAssist] = useState("");
  const [viceassist, setViceAssist] = useState("");
  const {
    data: carrer,
    loading,
    upsert,
  } = useDocument<Carrer>("carrers", id as string);

  const handleButton = async () => {
    try {
      if (!carrer) return;
      await upsert({
        name,
        trophies,
        topscorer,
        topassist,
        vicetopscorer,
        viceassist,
      });
      await refreshData();
      router.replace("/home/");
    } catch (error: any) {
      Alert.alert("Blank fields", error.toString());
    }
  };
  // important: always check for loading state since firestore is async!
  // Also, you can check for existence of book object so your type Book | undefined becomes a Book for sure
  if (loading || !carrer) return <Loading />;

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Carrer",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Carrer Details</Text>

      <Text>id: {id}</Text>

      <Text>Title: {carrer.name}</Text>
      <TextInput
        style={globalStyles.input}
        value={name}
        onChangeText={setTeam}
        placeholder="Team name"
      />

      <Text>Trophies: {carrer.trophies}</Text>
      <TextInput
        style={globalStyles.input}
        value={trophies}
        onChangeText={setTrophie}
        placeholder="Number of Trophies"
        keyboardType="numeric"
      />

      <Text>TopScorer: {carrer.topscorer}</Text>
      <TextInput
        style={globalStyles.input}
        value={topscorer}
        onChangeText={setTopScorer}
        placeholder="TopScorer"
      />

      <Text>ViceTopScorer: {carrer.vicetopscorer}</Text>
      <TextInput
        style={globalStyles.input}
        value={vicetopscorer}
        onChangeText={setViceScorer}
        placeholder="ViceTopScorer"
      />

      <Text>TopAssist: {carrer.topassist}</Text>
      <TextInput
        style={globalStyles.input}
        value={topassist}
        onChangeText={setTopAssist}
        placeholder="TopAssist"
      />

      <Text>ViceTopAssist: {carrer.viceassist}</Text>
      <TextInput
        style={globalStyles.input}
        value={viceassist}
        onChangeText={setViceAssist}
        placeholder="ViceTopAssist"
      />

      <StyledButton
        title="Update"
        onPress={handleButton}
        style={{ marginTop: 12 }}
      />
    </View>
  );
}
