import { shallowMount } from "@vue/test-utils";
import CellIcon from "@/components/CellIcon.vue";

describe("CellIcon.vue", () => {
  it("renders", () => {
    const platform = "switch";
    const wrapper = shallowMount(CellIcon, {
      propsData: { platform }
    });
    expect(wrapper.text()).toMatch("");
  });
});
