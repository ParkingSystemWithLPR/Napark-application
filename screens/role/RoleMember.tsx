import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";

import IconButton from "@/components/button/IconButton";
import PrimaryButton from "@/components/button/PrimaryButton";
import CheckboxInput from "@/components/input/CheckBoxInput";
import TextInput from "@/components/input/TextInput";
import BodyText from "@/components/text/BodyText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { OtherStackParamList } from "@/types";

export type RoleMemberProps = NativeStackScreenProps<
  OtherStackParamList,
  "RoleMember"
>;

type Member = {
  profile: string;
  name: string;
};

const RoleMember: React.FC<RoleMemberProps> = ({ navigation }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [isSearch, setSearch] = useState<boolean>(false);

  const mockMembers: Member[] = [
    { profile: "mockImage", name: "Chayakorn Vongbunsin" },
    { profile: "mockImage", name: "Worachot Chanaram" },
    { profile: "mockImage", name: "Pattrawut Julasukhol" },
  ];

  const handleTextInputChange = (text: string) => {
    setSearch(text.length > 0);
    setSearchText(text);
  };

  const searchIcon = useCallback(
    () => (
      <IconButton
        icon={isSearch ? "backspace" : "account-search"}
        onPress={() => handleTextInputChange("")}
        size={20}
        color={Colors.gray[800]}
        buttonStyle={styles.buttonIcon}
      />
    ),
    [isSearch]
  );

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <TextInput
          containerStyle={styles.searchContainer}
          value={searchText}
          onChangeText={handleTextInputChange}
          placeholder={"Search"}
          icon={searchIcon()}
        />
      </View>
    );
  }, [searchText, searchIcon]);

  const renderMemberList = useCallback((searchResult?: boolean) => {
    return (
      <View style={styles.memberListContainer}>
        <View style={styles.memberListTextContainer}>
          <BodyText text={searchResult? "Suggested" : "Assignee"} />
          <BodyText text={searchResult? "Select all" : "Clear all"} textStyle={styles.text}/>
        </View>
        <FlatList
          data={mockMembers}
          renderItem={({ item }) => (
            <View style={styles.memberInfoContainer}>
              <View style={styles.memberInfoWrapper}>
                <Image
                  style={styles.image}
                  source={require("../../assets/images/icon.png")}
                />
                <BodyText text={item.name} textStyle={styles.name} />
              </View>
              <CheckboxInput
                text={""}
                onPress={() => {}}
                isChecked={!searchResult}
              />
            </View>
          )}
        />
      </View>
    );
  }, [mockMembers]);

  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        {renderHeader()}
        {renderMemberList()}
        {renderMemberList(true)}
      </View>
      <PrimaryButton title="Save" onPress={() => {navigation.goBack()}}/>
    </BodyContainer>
  );
};

export default RoleMember;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingBottom: 50,
  },
  innerContainer: {
    gap: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  searchContainer: {
    flex: 1,
    padding: 10,
    marginBottom: 0,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 5,
  },
  buttonIcon: {
    margin: 0,
    marginLeft: 8,
  },
  memberListTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  memberListContainer: {
    gap: 10,
  },
  memberInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  memberInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  name: {
    color: Colors.gray[900],
  },
  text: {
    color: Colors.red[400],
  }
});
