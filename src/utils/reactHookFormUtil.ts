import { Ref } from "react";

export const hasReactHookForm = (ref: Ref<any>) => String(ref).includes("register(name, options);");