import { View } from "react-native";

import BodyText from "./BodyText";

export type AttributeTextProps = {
  attribute: string;
  value: string;
  attributeContainerStyle?: object;
  attributeTextStyle?: object;
  valueContainerStyle?: object;
  valueTextStyle?: object;
};

const AttributeText: React.FC<AttributeTextProps> = ({
  attribute,
  attributeTextStyle,
  attributeContainerStyle,
  value,
  valueTextStyle,
  valueContainerStyle,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <BodyText
        text={attribute}
        textStyle={attributeTextStyle}
        containerStyle={attributeContainerStyle}
      />
      <BodyText
        text={value}
        containerStyle={valueContainerStyle}
        textStyle={valueTextStyle}
      />
    </View>
  );
};
export default AttributeText;
