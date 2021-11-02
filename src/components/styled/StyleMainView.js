import styled from "vue-styled-components";

import { font } from "../../assets/styles/constants";
import Flex from "../../components/flex";

const hrdProps = {
  column: Boolean,
  center: Boolean,
}

const StyledMainView = styled(Flex, hrdProps)`
  font-family: ${font.fontFamily};
  margin: auto;
`;

export default StyledMainView;
