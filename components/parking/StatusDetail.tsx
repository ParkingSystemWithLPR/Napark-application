import { StyleSheet, View } from "react-native";

import BodyText from "../text/BodyText";
import DetailText from "../text/DetailText";

export type StatusDetailProps = {
  title: string;
  value: string;
  bodyTextStyle?: object;
};

const StatusDetail: React.FC<StatusDetailProps> = ({
  title,
  value,
  bodyTextStyle,
}) => {
  return (
    <View style={styles.container}>
      <DetailText text={title} />
      <BodyText text={value} textStyle={bodyTextStyle} />
    </View>
  );
};

export default StatusDetail;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
