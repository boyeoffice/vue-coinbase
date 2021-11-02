<script>
import MainView from "./views/Main.vue";
import { MediaQueryProvider } from "vue-component-media-queries";
import { defineComponent } from "@vue/composition-api";

const queries = {
  mobile: `(max-width: 760px)`,
};

export default defineComponent({
  name: "App",
  queries,
  components: {
    MainView,
    MediaQueryProvider,
  },
});
</script>

<template>
  <div id="app">
    <MediaQueryProvider :queries="$options.queries">
      <main-view></main-view>
    </MediaQueryProvider>
  </div>
</template>
