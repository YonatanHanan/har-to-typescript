import { POKE_API_CO_HAR } from "@/tests/mock/pokeapi.co.mock";
import { convertUrlToNameSpace } from "@/utils/url/url";
import { test, describe, expect } from "vitest";

describe("URL utils", () => {
  describe("convertUrlToNameSpace", () => {
    test("should filter by content type application/json", () => {
      const namespaces = convertUrlToNameSpace(
        POKE_API_CO_HAR.log.entries.map((e) => e.request.url)
      );

      expect(namespaces).toEqual([
        "PokeapiCo",
        "FontsGoogleapisCom",
        "Pagead2GooglesyndicationCom",
        "WwwGoogletagmanagerCom",
        "RawGithubusercontentCom",
        "ImgShieldsIo",
        "StaticCloudflareinsightsCom",
        "FontsGstaticCom",
      ]);
    });
  });
});
