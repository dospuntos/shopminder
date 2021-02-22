import React, { useState, useEffect } from "react";
import { Text, ScrollView, View } from "react-native";
import { List, Divider, FAB } from "react-native-paper";
import styles from "./styles";
import { db } from "../../firebase";
const ViewAll = ({ navigation }) => {
  const [shopminders, setShopminders] = useState([]);
  useEffect(() => {
    const ref = db.collection("shopminders");
    ref.onSnapshot((query) => {
      const objs = [];
      query.forEach((doc) => {
        objs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setShopminders(objs);
    });
  }, []);
  return (
    <>
      <ScrollView>
        <View>
          {shopminders.map((shopminder) => (
            <View key={shopminder.id}>
              <List.Item title={shopminder.name} />
              <Divider />
            </View>
          ))}
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("addOne")}
      />
    </>
  );
};
export default ViewAll;
