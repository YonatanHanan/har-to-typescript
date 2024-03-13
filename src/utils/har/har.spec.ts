import { POKE_API_CO_HAR } from "@/tests/mock/pokeapi.co.mock";
import {
  countRequestsByUrl,
  filterEntriesByContentType,
  groupResponsesByPathname,
} from "@/utils/har/har";
import { test, describe, expect } from "vitest";

describe("Har utils", () => {
  describe("filterEntriesByContentType", () => {
    test("should filter by content type application/json", () => {
      expect(filterEntriesByContentType(POKE_API_CO_HAR).length).toEqual(9);
    });
  });

  describe("countRequestsByUrl", () => {
    test("should group by hostname", () => {
      const group = countRequestsByUrl(
        filterEntriesByContentType(POKE_API_CO_HAR),
        "hostname"
      );

      expect(group).toEqual({ "pokeapi.co": 9 });
    });

    test("should group by pathname", () => {
      const group = countRequestsByUrl(
        filterEntriesByContentType(POKE_API_CO_HAR),
        "pathname"
      );
      expect(group).toEqual({
        "/api/v2/pokemon/ditto": 2,
        "/docs/v2/routeInfo.json": 1,
        "/404/routeInfo.json": 1,
        "/api/v2/ability/battle-armor": 1,
        "/api/v2/pokemon-species/aegislash": 2,
        "/api/v2/pokemon": 1,
        "/api/v2/type/3": 1,
      });
    });

    test("should group by href", () => {
      const group = countRequestsByUrl(
        filterEntriesByContentType(POKE_API_CO_HAR),
        "href"
      );

      expect(group).toEqual({
        "https://pokeapi.co/api/v2/pokemon/ditto": 2,
        "https://pokeapi.co/docs/v2/routeInfo.json": 1,
        "https://pokeapi.co/404/routeInfo.json": 1,
        "https://pokeapi.co/api/v2/ability/battle-armor": 1,
        "https://pokeapi.co/api/v2/pokemon-species/aegislash": 2,
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0": 1,
        "https://pokeapi.co/api/v2/type/3": 1,
      });
    });
  });

  describe("groupResponsesByPathname", () => {
    test("should group by pathname", () => {
      const groups = groupResponsesByPathname(
        filterEntriesByContentType(POKE_API_CO_HAR)
      );
      expect(Object.keys(groups).length).toEqual(7);
      expect(Object.values(groups).flat().length).toEqual(9);
    });
  });
});
