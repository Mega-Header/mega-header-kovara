const { isValidDeepLink, parseDeepLink } = require("../utils/deepLinks");

const stellarAddress = "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

describe("deep link parsing", () => {
  it("parses post links", () => {
    expect(parseDeepLink("mega-header-mega-header-mega-header-kovara://post/123")).toEqual({
      type: "post",
      path: "/post/123",
    });
  });

  it("parses profile links", () => {
    expect(parseDeepLink(`mega-header-mega-header-mega-header-kovara://profile/${stellarAddress}`)).toEqual({
      type: "profile",
      path: `/profile/${stellarAddress}`,
    });
  });

  it("parses pool links", () => {
    expect(parseDeepLink("mega-header-mega-header-mega-header-kovara://pool/main_pool-1")).toEqual({
      type: "pool",
      path: "/pool/main_pool-1",
    });
  });

  it("supports triple-slash deep links", () => {
    expect(parseDeepLink("mega-header-mega-header-mega-header-kovara:///post/abc_123")).toEqual({
      type: "post",
      path: "/post/abc_123",
    });
  });

  it("rejects invalid or malformed links", () => {
    expect(parseDeepLink("https://mega-header-mega-header-mega-header-kovara/post/123")).toBeNull();
    expect(parseDeepLink("mega-header-mega-header-mega-header-kovara://post")).toBeNull();
    expect(parseDeepLink("mega-header-mega-header-mega-header-kovara://post/123/extra")).toBeNull();
    expect(parseDeepLink("mega-header-mega-header-mega-header-kovara://profile/not-a-stellar-address")).toBeNull();
    expect(parseDeepLink("mega-header-mega-header-mega-header-kovara://pool/../../settings")).toBeNull();
    expect(parseDeepLink("not a url")).toBeNull();
  });

  it("exposes a boolean validator", () => {
    expect(isValidDeepLink("mega-header-mega-header-mega-header-kovara://post/123")).toBe(true);
    expect(isValidDeepLink("mega-header-mega-header-mega-header-kovara://post/")).toBe(false);
  });
});
