import styled from "styled-components/native";

import PALETE from "../config/Theme";

const ValidatorText = styled.Text`
  color: ${PALETE.utils.danger};
  margin: 10px 0;
  font-size: ${props => props.size}px;
  font-weight: bold;
`;

export default ValidatorText;
