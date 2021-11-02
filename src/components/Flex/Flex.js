import styled from "vue-styled-components";

const hrdProps = {
  column: Boolean,
  center: Boolean,
};

const Flex = styled("div", hrdProps)`
  display: flex;
  ${(props) => (props.onClick ? "cursor: pointer;" : "")};
  ${(props) => (props.auto ? "flex: 1 1 auto;" : "")};
  ${(props) =>
    props.center ? `justify-content: center; align-items: center;` : ``};
  ${(props) => (props.justify ? `justify-content: ${props.justify};` : "")};
  ${(props) => (props.align ? `align-items: ${props.align};` : "")};
  ${(props) => (props.wrap ? `flex-wrap: ${props.wrap};` : "")};
  flex-direction: ${({ column, reverse }) => {
    const postFix = reverse ? "-reverse" : "";
    return column ? `column${postFix}` : `row${postFix}`;
  }};
`;

Flex.name = "Flex";

export default Flex;
