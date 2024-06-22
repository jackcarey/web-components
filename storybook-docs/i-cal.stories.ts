import "../packages/i-cal/index";
import EXAMPLE_ICS from "./example-ics";
import { BindTemplate } from "./utils";
export default {
    title: "i-cal",
    argTypes: {
        events: { control: { type: "text" } },
    }
};

export const Default = BindTemplate("i-cal");

export const FixedEvents = BindTemplate("i-cal",{
    events: EXAMPLE_ICS
});
