import { POKE_API_CO_HAR } from "@/tests/mock/pokeapi.co.mock";
import {
  groupResponsesByPathname,
  filterEntriesByContentType,
} from "@/utils/har/har";
import { jsonDataToTS } from "@/utils/json-ts/json-ts";
import { urlToNamespace } from "@/utils/url/url";
import { test, describe, expect } from "vitest";

describe("JSON-TS utils", () => {
  describe("jsonDataToTS", () => {
    test("should convert responses to TS", () => {
      const groups = groupResponsesByPathname(
        filterEntriesByContentType(POKE_API_CO_HAR)
      );

      Object.entries(groups).forEach(([pathname, responses]) => {
        const ts = jsonDataToTS(responses.join("\n"), urlToNamespace(pathname));
        expect(ts).toContain("export type");
      });
    });
  });
});
