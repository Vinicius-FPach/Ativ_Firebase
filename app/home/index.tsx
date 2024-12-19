import { faker } from "@faker-js/faker";
import { Stack } from "expo-router";
import { Alert, FlatList, Text, View } from "react-native";
import { useRouter } from "expo-router";

import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import ViewBook from "../../components/ViewBook";
import useCollection from "../../firebase/hooks/useCollection";
import globalStyles from "../../styles/globalStyles";
import Carrer from "../../types/Carrer";

export default function Home() {
  const router = useRouter();

  const { data, create, remove, refreshData, loading } =
    useCollection<Carrer>("carrers");

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>teste</Text>

      <StyledButton
        title="Create Carrer"
        onPress={() => router.push("/home/[id]/create")}
      />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ViewBook
              carreer={item}
              onDelete={async () => {
                await remove(item.id!);
                await refreshData();
              }}
            />
          )}
          style={{ width: "100%" }}
        />
      )}
    </View>
  );
}
