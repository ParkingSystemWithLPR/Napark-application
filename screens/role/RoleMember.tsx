import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";

import IconButton from "@/components/button/IconButton";
import PrimaryButton from "@/components/button/PrimaryButton";
import CheckboxInput from "@/components/input/CheckBoxInput";
import TextInput from "@/components/input/TextInput";
import BodyText from "@/components/text/BodyText";
import BodyContainer from "@/components/ui/BodyContainer";
import Colors from "@/constants/color";
import { useGetAllUsers } from "@/store/api/user/useGetUsers";
import { useAuth } from "@/store/context/auth";
import { OtherStackParamList } from "@/types";
import { User } from "@/types/user";

export type RoleMemberProps = NativeStackScreenProps<
  OtherStackParamList,
  "RoleMember"
>;

const RoleMember: React.FC<RoleMemberProps> = ({ navigation, route }) => {
  const { form, userList, hasAssignPermission } = route.params;
  const { getValues, setValue } = form;
  const [searchText, setSearchText] = useState<string>("");
  const [isSearch, setSearch] = useState<boolean>(false);
  const [usersList, setUsersList] = useState<User[]>(
    getValues("users") ?? userList
  );
  const [members, setMembers] = useState<User[]>([]);
  const { accessToken, authenticate } = useAuth();

  const allUsersList = useGetAllUsers({
    queryParams: { searchName: searchText },
    auth: { accessToken, authenticate },
  });

  useEffect(() => {
    if (allUsersList.isSuccess) {
      setMembers(allUsersList.data.users);
    }
  }, [allUsersList.data]);

  const onCheckboxClick = (user: User) => {
    if (usersList.includes(user)) {
      const newList = usersList.filter((item) => {
        return item !== user;
      });
      setUsersList(newList);
    } else {
      const newList = [...usersList, user];
      setUsersList(newList);
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
    (isAssignee?: boolean) => {
      const displayedMembers = isAssignee
        ? usersList
        : members.filter(
            (item) => !usersList.some((user) => user._id === item._id)
          );
      return (
        <View style={styles.memberListContainer}>
          <BodyText text={isAssignee ? "Assignee" : "Suggested"} />
          {displayedMembers.length === 0 ? (
            <BodyText
              text={`No ${isAssignee ? "assigned" : "suggested"} member(s).`}
              containerStyle={{ marginBottom: 10 }}
              textStyle={{ color: Colors.gray[700] }}
            />
          ) : (
            displayedMembers?.map((item) => (
              <View style={styles.memberInfoContainer} key={item._id}>
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
                  onPress={() => onCheckboxClick(item)}
                  disabled={!hasAssignPermission}
                  isChecked={usersList.includes(item)}
                />
              </View>
            ))
          )}
        </View>
      );
    },
    [members, usersList]
  );

  return (
    <BodyContainer innerContainerStyle={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          {renderHeader()}
          {renderMemberList(true)}
          {renderMemberList()}
        </View>
        <PrimaryButton
          title="Save"
          onPress={() => {
            setValue("users", usersList);
            navigation.goBack();
          }}
        />
      </ScrollView>
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
