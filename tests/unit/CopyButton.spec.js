import { shallowMount } from "@vue/test-utils";
import CopyButton from "@/components/CopyButton.vue";

describe("CopyButton.vue", () => {
  it("renders", () => {
    const data = "OK";
    const wrapper = shallowMount(CopyButton, {
      propsData: { data }
    });
    expect(wrapper.text()).toMatch("OK");
  });
});
