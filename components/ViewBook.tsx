import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";

import Carrer from "../types/Carrer";
import StyledButton from "./StyledButton";
import Card from "./Card";

interface ViewBookProps {
  carreer: Carrer;
  onDelete: Function;
}

export default function ViewBook({ carreer, onDelete }: ViewBookProps) {
  const router = useRouter();

  return (
    <View
      style={{ borderTopColor: "darkblue", borderTopWidth: 1, marginTop: 12 }}
    >
      <Card>
        <Text>id: {carreer.id}</Text>
        <Text>Title: {carreer.name}</Text>
        <Text>TopScorer: {carreer.topscorer}</Text>
        <Text>Trophies: {carreer.trophies}</Text>
      </Card>

      <View style={{ flexDirection: "row" }}>
        <StyledButton
          title="View career Details"
          onPress={() => {
            if (carreer.id) {
              router.push(`/home/${carreer.id}/`);
            } else {
              Alert.alert(
                "View error",
                "cannot access career details because it does not have an id!"
              );
            }
          }}
          style={{ width: "50%" }}
        />

        <StyledButton
          title="Delete"
          onPress={() => {
            if (carreer.id) {
              Alert.alert("Delete Career", "Are you sure?", [
                {
                  text: "Yes",
                  onPress: async () => {
                    onDelete();
                  },
                },
                {
                  text: "No",
                  style: "cancel",
                },
              ]);
            } else {
              Alert.alert(
                "delete error",
                "cannot delete career because it does not have an id!"
              );
            }
          }}
          style={{ width: "50%", backgroundColor: "darkred" }}
        />
      </View>
    </View>
  );
}
