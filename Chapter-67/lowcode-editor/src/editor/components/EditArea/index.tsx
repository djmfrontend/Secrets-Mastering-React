import React, { useEffect } from "react";
import { useComponentStore, Component } from "../../store/components";
import { useComponentConfigStore } from "../../store/component-config";

const EditArea = () => {
  const { components, addComponent } = useComponentStore();
  const { componentConfig } = useComponentConfigStore();
  useEffect(() => {
    addComponent(
      {
        id: 222,
        name: "Container",
        props: {
          style: {
            width: "100%",
            height: "100%",
          },
        },
        children: [],
      },
      1
    );

    addComponent(
      {
        id: 333,
        name: "Button",
        props: {
          style: {
            width: "100%",
            height: "100%",
          },
        },
        children: [],
      },
      222
    );
  }, []);
  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.component) {
        return null;
      }

      return React.createElement(
        config.component,
        {
          key: component.id,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  }
  return (
    <div>
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      {renderComponents(components)}
    </div>
  );
};

export default EditArea;
