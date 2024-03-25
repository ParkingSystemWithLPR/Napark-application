import { View, StyleSheet } from "react-native";

import HeaderText from "../text/HeaderText";
import SubHeaderText from "../text/SubHeaderText";

import Colors from "@/constants/color";

type BankAccountDetailProps = {
  accountNo: string;
  bankAccountNumber: string;
  bankName: string;
  bankBranch: string;
};

const BankAccountDetail: React.FC<BankAccountDetailProps> = ({
  accountNo,
  bankAccountNumber,
  bankName,
  bankBranch,
}) => {
  return (
    <View style={styles.textContainer}>
      <View style={styles.textWrapper}>
        <HeaderText
          text={`Account ${accountNo}`}
          textStyle={styles.headerText}
        />
        <HeaderText text={bankAccountNumber} textStyle={styles.headerText} />
      </View>
      <View style={styles.textWrapper}>
        <SubHeaderText text="Bank Name" textStyle={styles.subHeaderText} />
        <SubHeaderText text={bankName} textStyle={styles.subHeaderText} />
      </View>
      <View style={styles.textWrapper}>
        <SubHeaderText text="Branch" textStyle={styles.subHeaderText} />
        <SubHeaderText text={bankBranch} textStyle={styles.subHeaderText} />
      </View>
    </View>
  );
};

export default BankAccountDetail;

const styles = StyleSheet.create({
  textContainer: {
    borderRadius: 20,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: Colors.black,
    fontSize: 22,
    paddingBottom: 15,
  },
  subHeaderText: {
    color: Colors.gray[800],
  },
});
