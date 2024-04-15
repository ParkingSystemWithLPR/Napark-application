import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";

import IconButton from "@/components/button/IconButton";
import PrimaryButton from "@/components/button/PrimaryButton";
import CheckboxInput from "@/components/input/CheckBoxInput";
import TextInput from "@/components/input/TextInput";
import BodyText from "@/components/text/BodyText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import {
  getAllProfile,
  useGetAllProfile,
} from "@/store/api/user/useGetProfile";
import { useAuth } from "@/store/context/auth";
import { OtherStackParamList } from "@/types";
import { Profile } from "@/types/user";

export type RoleMemberProps = NativeStackScreenProps<
  OtherStackParamList,
  "RoleMember"
>;

const mockedMember = [
  { _id: "6606a52af3a741552b912d56", firstname: "Kanin", lastname: "Kanin", email: "kanin.com" },
  { _id: "6606a52af3a741552b912d57", firstname: "Tae", lastname: "VC", email: "taevc.com" },
  { _id: "6606a52af3a741552b912d58", firstname: "Ing", lastname: "Huasom", email: "huasom.com" },
];

const RoleMember: React.FC<RoleMemberProps> = ({ navigation, route }) => {
  const { form, userList } = route.params;
  const { setValue } = form;
  const [searchText, setSearchText] = useState<string>("");
  const [isSearch, setSearch] = useState<boolean>(false);
  const [userIdList, setUserIdList] = useState<string[]>(userList);
  const [displayedMember, setDisplayedMember] =
    useState<Profile[]>(mockedMember);
  const [isSelectAll, setSelectAll] = useState<boolean>(false);
  // const { accessToken, authenticate } = useAuth();
  // const allUsersList = useGetAllProfile({
  //   auth: { accessToken, authenticate },
  // });

  useEffect(() => {
    const searchResult = mockedMember.filter((member) =>
      `${member.firstname} ${member.lastname}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setDisplayedMember(searchResult);
  }, [searchText]);

  const onCheckboxClick = (id: string) => {
    if (userIdList.includes(id)) {
      const newList = userIdList.filter((item) => {
        return item !== id;
      });
      setUserIdList(newList);
    } else {
      const newList = [...userIdList, id];
      setUserIdList(newList);
    }
  };

  const onSelectAll = () => {
    if (isSelectAll) {
      setSelectAll(false);
      setUserIdList([]);
    } else {
      setSelectAll(true);
      const allUserIdList = mockedMember.flatMap((member) => member._id);
      setUserIdList(allUserIdList);
    }
  };

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

  const renderMemberList = useCallback(
    (searchResult?: boolean) => {
      return (
        <View style={styles.memberListContainer}>
          <View style={styles.memberListTextContainer}>
            <BodyText text={searchResult ? "Suggested" : "Assignee"} />
            {!searchResult && (
              <CheckboxInput
                isChecked={isSelectAll}
                onPress={() => onSelectAll()}
                text="Select all"
                containerStyle={{ flexDirection: "row-reverse" }}
                textStyle={styles.text}
              />
            )}
          </View>
          <FlatList
            data={displayedMember}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.memberInfoContainer}>
                <View style={styles.memberInfoWrapper}>
                  <Image
                    style={styles.image}
                    source={require("../../assets/images/icon.png")}
                  />
                  <BodyText
                    text={`${item.firstname} ${item.lastname}`}
                    textStyle={styles.name}
                  />
                </View>
                <CheckboxInput
                  text={""}
                  onPress={() => onCheckboxClick(item._id)}
                  isChecked={userIdList.includes(item._id)}
                />
              </View>
            )}
          />
        </View>
      );
    },
    [displayedMember, userIdList]
  );

  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        {renderHeader()}
        {renderMemberList()}
        {renderMemberList(true)}
      </View>
      <PrimaryButton
        title="Save"
        onPress={() => {
          setValue("user_ids", userIdList);
          navigation.goBack();
        }}
      />
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
    alignItems: "center",
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
  },
});
