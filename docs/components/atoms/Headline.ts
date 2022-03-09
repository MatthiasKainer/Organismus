import { html } from "lit";
import { pureLit } from "pure-lit";

type HeadlineProps = {
    level: "1" | "2" | "3" | "4" | "5";
};

export const Headline = pureLit(
    "component-headline",
    (props: HeadlineProps) => {
        switch (props.level) {
            case "1":
                return html`<h1><slot></slot></h1>`;
            case "2":
                return html`<h2><slot></slot></h2>`;
            case "3":
                return html`<h3><slot></slot></h3>`;
            case "4":
                return html`<h4><slot></slot></h4>`;
            case "5":
            default:
                return html`<h5><slot></slot></h5>`;
        }
    },
    {
        defaults: {
            level: "2",
        },
    }
);
