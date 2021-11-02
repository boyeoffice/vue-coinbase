import { shallowMount } from "@vue/test-utils";
// import HelloWorld from "@/components/HelloWorld.vue";
import Flex from "@/components/Flex";

describe("<Flex />", () => {
  it("renders without crashing", () => {
    // const msg = "new message";
    /* const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg); */
    const wrapper = shallowMount(Flex);
    expect(wrapper.find("div")).not.toBeNull();
    expect(wrapper.find("div")).toMatchSnapshot();
  });
});
