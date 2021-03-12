import { config, shallowMount } from "@vue/test-utils";
import CopyButton from "@/components/CopyButton.vue";

config.global.mocks = {
  $t: text => text
};

describe("CopyButton.vue", () => {
  it("renders props.data when passed", () => {
    const wrapper = shallowMount(CopyButton, {
      props: { data: "OK" }
    });
    expect(wrapper.text()).toMatch("OK");
  });
});
