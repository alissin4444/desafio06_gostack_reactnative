import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

import PALETE from "../../config/Theme";

export const Header = styled.View`
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: ${PALETE.texts.muted};
`;
export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: ${PALETE.background.shade};
`;
export const Name = styled.Text`
  margin-top: 15px;
  font-size: 20px;
  color: ${PALETE.primary.shade};
  font-weight: bold;
  text-align: center;
`;
export const Bio = styled.Text`
  font-size: 14px;
  line-height: 21px;
  color: ${PALETE.texts.muted};
  text-align: center;
`;

export const Stars = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false
})`
  margin-top: 30px;
`;
export const Starred = styled(RectButton)`
  background: ${PALETE.background.core};
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;
export const OwnerAvatar = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background: ${PALETE.background.shade};
`;
export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;
export const Title = styled.Text.attrs({
  numberOfLines: 1
})`
  font-size: 15px;
  font-weight: bold;
  color: ${PALETE.texts.primary};
`;
export const Author = styled.Text`
  font-size: 13px;
  color: ${PALETE.texts.secondary};
  margin-top: 2px;
`;
