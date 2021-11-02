<script>
import { defineComponent } from "@vue/composition-api";
import styled from "vue-styled-components";

import {
  fontSize,
  fontWeight,
  color,
  animation,
  border,
} from "../../assets/styles/constants";
import Flex from "../Flex";

const StyledCryptocurrencyTabs = styled.span`
  font-size: ${fontSize.large};
  font-weight: ${fontWeight.medium};
  span + span::before {
    content: " · ";
  }
`;

const StyledTabs = styled(Flex)`
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.medium};
`;

const tabProps = {
  selected: Boolean,
};

const StyledTab = styled(Flex, tabProps).attrs((props) => ({
  color: props.selected ? color.coincharts : color.coinchartsGray,
  border: props.selected ? `1px solid ${color.coincharts}` : border.border,
}))`
  color: ${(props) => props.color};
  height: inherit;
  margin: 0 0.5em;
  position: relative;
  transition: ${animation.default};
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  &:focus {
    outline: none;
  }
  &::after {
    border-bottom: ${(props) => props.border};
    bottom: -1px;
    content: "";
    height: 1px;
    left: 0;
    position: absolute;
    width: 100%;
  }
  &:hover::after {
    border-bottom-color: ${(props) => props.color};
  }
`;

export default defineComponent({
  components: {
    StyledCryptocurrencyTabs,
    StyledTabs,
    StyledTab,
  },
  props: {
    selectedKey: {
      type: Number,
    },
    options: Array,
  },
  setup() {
    //
  },
});
</script>

<template>
  <styled-tabs>
    <styled-tab
      v-for="(item, index) in options"
      align="center"
      :selected="key === selectedKey"
      :key="index"
      aria-labelledby="name - price"
      :aria-selected="key === selectedKey"
      @click="$emit('trigger', key)"
      role="tab"
      tabIndex="-1"
    >
      <styled-cryptocurrency-tabs></styled-cryptocurrency-tabs>
    </styled-tab>
  </styled-tabs>
</template>
