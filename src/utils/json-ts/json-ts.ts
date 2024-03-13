import { json2ts } from "json-ts";

export const jsonDataToTS = (data: string, namespace?: string): string => {
  return json2ts(data, {
    namespace: namespace,
    prefix: "",
    flow: true,
  }).replace("// @flow\n", "");
};
