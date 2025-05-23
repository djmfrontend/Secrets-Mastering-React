import { create } from "zustand";
import Container from "../Material/Container";
import Button from "../Material/Button";
import Page from "../Material/Page";
export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  component: any;
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}
export const useComponentConfigStore = create<State & Action>((set, get) => {
  return {
    componentConfig: {
      Container: {
        name: "Container",
        defaultProps: {
          children: [],
        },
        component: Container,
      },
      Button: {
        name: "Button",
        defaultProps: {
          type: "primary",
          text: "按钮",
        },
        component: Button,
      },
      Page: {
        name: "Page",
        defaultProps: {},
        component: Page,
      },
    },
    registerComponent: (name, componentConfig) =>
      set((state) => {
        return {
          ...state,
          componentConfig: {
            ...state.componentConfig,
            [name]: componentConfig,
          },
        };
      }),
  };
});
