import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

import PALETE from "../../config/Theme";

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: ${PALETE.texts.muted};
`;
export const Input = styled.TextInput`
  flex: 1;
  height: 40px;
  background: ${PALETE.background.tint};
  padding: 0 15px;
  color: ${PALETE.texts.secondary};
  border: 1px solid ${PALETE.background.tint};
  border-radius: 4px;
`;
export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: ${PALETE.primary.tint};
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${props => (props.loading ? 0.4 : 1)};
`;
export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false
})`
  margin-top: 20px;
`;
export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;
export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: ${PALETE.background.shade};
`;
export const Name = styled.Text`
  font-size: 14px;
  color: ${PALETE.texts.primary};
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;
export const Bio = styled.Text.attrs({
  numberOfLines: 2
})`
  margin-top: 5px;
  font-size: 13px;
  line-height: 18px;
  color: ${PALETE.texts.muted};
`;
export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: ${PALETE.primary.tint};
  justify-content: center;
  align-items: center;
  height: 36px;
`;
export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${PALETE.texts.inverted};
  text-transform: uppercase;
`;
