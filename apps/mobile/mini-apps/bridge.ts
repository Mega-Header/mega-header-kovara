import { assertPermission, BridgeError, BridgePermission } from "./permissions";
import { getWalletAddress, getItem, StorageKey } from "../utils/secureStorage";

type BridgeHandler = (payload?: unknown) => Promise<unknown> | unknown;

export interface MiniAppBridgeOptions {
  permissions: BridgePermission[];
  requestUserApproval?: (method: BridgePermission) => Promise<boolean> | boolean;
  handlers?: Partial<Record<BridgePermission, BridgeHandler>>;
}

const DEFAULT_HANDLERS: Partial<Record<BridgePermission, BridgeHandler>> = {
  "wallet.getAddress": async () => null,
  "wallet.sign": async (payload) => payload,
  "wallet.signTransaction": async (payload) => payload,
  "profile.get": async () => {
  const address = await getWalletAddress();
  if (!address) {
    return null;
  }
  const creatorToken = await getItem<string>(StorageKey.AuthToken).catch(() => null);
  return { address, username: null, creatorToken };
},
  "profile.update": async (payload) => payload,
};

const APPROVAL_REQUIRED = new Set<BridgePermission>([
  "wallet.sign",
  "wallet.signTransaction",
  "profile.update",
]);

export function createMiniAppBridge({
  permissions,
  requestUserApproval = async () => true,
  handlers = {},
}: MiniAppBridgeOptions) {
  const methodHandlers = { ...DEFAULT_HANDLERS, ...handlers };

  return {
    async call(method: string, payload?: unknown) {
      // Map profile.get to profile.read for permission checking
      const permMethod = method === "profile.get" ? "profile.read" : method;
      assertPermission(permissions, permMethod);

      if (APPROVAL_REQUIRED.has(method as BridgePermission)) {
        const approved = await requestUserApproval(method as BridgePermission);
        if (!approved) {
          throw new BridgeError("UserRejected", `User rejected ${method}`);
        }
      }

      const handler = methodHandlers[method as BridgePermission];
      if (!handler) {
        throw new BridgeError("MethodUnavailable", `No handler registered for ${method}`);
      }

      return handler(payload);
    },
  };
}
