import { shallowMount } from "@vue/test-utils";
import CopyButton from "@/components/CopyButton.vue";

describe("CopyButton.vue", () => {
  it("renders props.data when passed", () => {
    const wrapper = shallowMount(CopyButton, {
      props: { data: "OK" }
    });
    expect(wrapper.text()).toMatch("OK");
  });
});
