"use strict";
function createElement(type, props, ...children) {
    return {
        type,
        props: Object.assign(Object.assign({}, props), { children: children.map((child) => {
                const isTextNode = typeof child === "string";
                return isTextNode ? createTextNode(child) : child;
            }) }),
    };
}
function createTextNode(text) {
    return {
        type: "TEXT_NODE",
        props: {
            nodeValue: text,
            children: [],
        },
    };
}
const MiniReact = {
    createElement,
};
window.MiniReact = MiniReact;
