import React from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";

import BankAccountDetail from "./BankAccountDetail";
import PrimaryButton from "../button/PrimaryButton";
import SubHeaderText from "../text/SubHeaderText";

import Colors from "@/constants/color";
import { MOCKED_BANK_ACCOUNT, mockedBankAccount } from "@/mock/mockData";

type AccountTabProps = {
  name?: string;
};

const IMAGE_SIZE = 100;

const AccountTabContent: React.FC<AccountTabProps> = () => {
  return (
    <>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://fastly.picsum.photos/id/157/200/300.jpg?hmac=-OZWQAIRoAdYWp7-qnHO1wl5t0TO3BMoAgW3tmR7wgE",
          }}
          height={IMAGE_SIZE}
          width={IMAGE_SIZE}
        />
        <SubHeaderText
          text="Worashot Chanangkarn"
          textStyle={{ color: Colors.blue[500] }}
        />
      </View>
      <View>
        <FlatList
          data={MOCKED_BANK_ACCOUNT}
          keyExtractor={(item: mockedBankAccount) => item.id}
          renderItem={({ item }) => (
            <BankAccountDetail
              accountNo={item.id}
              bankAccountNumber={item.bankAccountNumber}
              bankName={item.bankName}
              bankBranch={item.bankBranch}
            />
          )}
          overScrollMode="never"
        />
      </View>
      <PrimaryButton
        title="Add Account"
        onPress={() => {}}
        buttonStyle={styles.button}
        textStyle={styles.textButton}
      />
    </>
  );
};

export default AccountTabContent;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  profileImage: {
    borderRadius: 50,
    marginHorizontal: 10,
  },
  button: {
    marginHorizontal: 70,
  },
  textButton: {
    fontSize: 18,
  },
});
