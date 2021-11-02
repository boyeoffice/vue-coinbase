<script>
// import StyledMainView from "../components/styled/StyleMainView";
import { defineComponent } from "@vue/composition-api";
import CryptocurrencyTabs from "../containers/CryptocurrencyTabs";
import DurationTabs from "../containers/DurationTabs";
import PriceChart from "../containers/PriceChart";
import PriceTable from "../containers/PriceTable";
import PriceTableCompact from "../containers/PriceTableCompact";
import GithubBanner from "../components/GithubBanner";
import { MatchMedia } from "vue-component-media-queries";
import styled from "vue-styled-components";
import Flex from "../components/Flex";
import {
  font,
  color,
  height,
  border,
  boxShadow,
  width,
  fontSize,
  fontWeight,
} from "../assets/styles/constants";

const hrdProps = {
  column: Boolean,
  center: Boolean,
};

const StyledMainView = styled(Flex, hrdProps)`
  font-family: ${font.fontFamily};
  margin: auto;
`;

const StyledHeader = styled(Flex)`
  border-bottom: 1px solid #dae1e9;
  height: 55px;
  padding: 0 20px;
  justify-content: space-between;
`;

const StyledBody = styled.div`
  margin: 0 20px 20px 20px;
`;

const dashProps = {
  desktop: Boolean,
};

const Dashboard = styled(Flex, dashProps)`
  background-color: ${color.white};
  min-height: ${height.dashboard};
  width: ${(props) => (props.desktop ? "90vw" : "100vw")};
  z-index: 10;
  border-radius: ${(props) => (props.desktop ? `${border.borderRadius};` : "")};
  box-shadow: ${(props) => (props.desktop ? `${boxShadow.default};` : "")};
  max-width: ${(props) => (props.desktop ? `${width.desktopMax};` : "")};
  min-width: ${(props) => (props.desktop ? `${width.desktopMin};` : "")};
`;

const HeaderText = styled(Flex)`
  color: ${color.coincharts};
  font-size: ${fontSize.large};
  font-weight: ${fontWeight.medium};
`;

export default defineComponent({
  components: {
    StyledMainView,
    MatchMedia,
    StyledHeader,
    StyledBody,
    Dashboard,
    CryptocurrencyTabs,
    DurationTabs,
    PriceChart,
    PriceTable,
    PriceTableCompact,
    GithubBanner,
    HeaderText,
  },
  setup() {
    //
  },
});
</script>

<template>
  <styled-main-view column center>
    <github-banner />
    <match-media v-slot="{ mobile }">
      <dashboard :desktop="!mobile ? true : false">
        <styled-header>
          <header-text v-if="mobile">Coincharts</header-text>
          <cryptocurrency-tabs v-if="!mobile" />
          <duration-tabs />
        </styled-header>
        <styled-body>
          <price-table-compact v-if="mobile" />
          <price-table v-if="mobile" />
          <price-chart />
        </styled-body>
      </dashboard>
    </match-media>
  </styled-main-view>
</template>
