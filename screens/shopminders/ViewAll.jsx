import React, { useState, useEffect } from "react";
import { Text, Alert, ScrollView, View, Image } from "react-native";
import { List, Divider, FAB } from "react-native-paper";
import { getProducts } from "../../api/productApi";
import styles from "./styles";

const ViewAll = ({ navigation }) => {
  const [shopminders, setShopminders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((products) => setProducts(products.data.products));
  }, []);

  // Return early if no products
  if (!products.length) return <Text> Loading...</Text>;

  return (
    <>
      <ScrollView>
        <View>
          {products.map((product) => (
            <View key={product.id}>
              {/* <List.Item title={JSON.stringify(product.images[0]?.image)} /> */}
              <Image
                style={{ width: 200, height: 200 }}
                source={{
                  uri:
                    "http://localhost/modaz_backup/images/products/" +
                    product.images[0]?.image,
                }}
              />
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
