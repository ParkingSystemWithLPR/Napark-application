import { StyleSheet, View, Image, FlatList } from "react-native";

import HeaderText from "../text/HeaderText";
import SubHeaderText from "../text/SubHeaderText";

import Colors from "@/constants/color";
import { CardType } from "@/enum/CardType";
import { MOCKED_CREDIT_CARD, mockedCreditCard } from "@/mock/mockData";

type CardTabContentProps = {
  id?: string;
};

const DisplayName = (name: string) => {
  const [firstname, lastname] = name.split(" ");
  return `${firstname} ${lastname[0]}.`;
};

const DisplayCardNumber = (cardNumber: string) => {
  return `${cardNumber.substring(0, 4)} **** **** ${cardNumber.substring(
    12,
    16
  )}`;
};

const CardTabContent: React.FC<CardTabContentProps> = () => {
  return (
    <>
      <FlatList
        data={MOCKED_CREDIT_CARD}
        keyExtractor={(item: mockedCreditCard) => item.cardNumber}
        renderItem={({ item }) => {
          return (
            <View style={styles.cardContainer}>
              <View style={styles.textWrapper}>
                <HeaderText
                  text={DisplayName(item.name)}
                  textStyle={styles.headerText}
                />
                <View>
                  <SubHeaderText
                    text={item.privilegeName}
                    textStyle={styles.subHeaderText}
                  />
                  <SubHeaderText
                    text={DisplayCardNumber(item.cardNumber)}
                    textStyle={styles.subHeaderText}
                  />
                </View>
              </View>
              <Image
                style={{ width: 340, height: 215 }}
                source={
                  item.cardType === CardType.VISA
                    ? require("@/assets/images/visa.jpg")
                    : require("@/assets/images/masterCard.jpg")
                }
              />
            </View>
          );
        }}
      />
    </>
  );
};

export default CardTabContent;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: Colors.gray[50],
  },
  textWrapper: {
    flex: 1,
    alignSelf: "flex-start",
    position: "absolute",
    zIndex: 99,
    height: 220,
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    color: Colors.white,
  },
  subHeaderText: {
    fontSize: 20,
    color: Colors.white,
  },
});
