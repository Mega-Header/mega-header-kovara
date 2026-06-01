import { assertPermission, BridgeError, BridgePermission } from "./permissions";

type BridgeHandler = (payload?: unknown) => Promise<unknown> | unknown;

export interface MiniAppBridgeOptions {
  permissions: BridgePermission[];
  requestUserApproval?: (method: BridgePermission) => Promise<boolean> | boolean;
  handlers?: Partial<Record<BridgePermission, BridgeHandler>>;
}

interface PendingRequest {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}

const pendingRequests = new Map<string, PendingRequest>();

export function registerPendingRequest(requestId: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    pendingRequests.set(requestId, { resolve, reject });
  });
}

export function resolvePendingRequest(requestId: string, result: unknown): void {
  const pending = pendingRequests.get(requestId);
  if (pending) {
    pending.resolve(result);
    pendingRequests.delete(requestId);
  }
}

export function rejectPendingRequest(requestId: string, error: Error): void {
  const pending = pendingRequests.get(requestId);
  if (pending) {
    pending.reject(error);
    pendingRequests.delete(requestId);
  }
}

const DEFAULT_HANDLERS: Partial<Record<BridgePermission, BridgeHandler>> = {
  "wallet.getAddress": async () => null,
  "wallet.sign": async (payload) => payload,
  "wallet.signTransaction": async (payload) => payload,
  "profile.get": async () => null,
};

const APPROVAL_REQUIRED = new Set<BridgePermission>(["wallet.sign", "wallet.signTransaction"]);

export function createMiniAppBridge({
  permissions,
  requestUserApproval = async () => true,
  handlers = {},
}: MiniAppBridgeOptions) {
  const methodHandlers = { ...DEFAULT_HANDLERS, ...handlers };

  return {
    async call(method: string, payload?: unknown) {
      assertPermission(permissions, method);

      if (APPROVAL_REQUIRED.has(method)) {
        const approved = await requestUserApproval(method);
        if (!approved) {
          throw new BridgeError("UserRejected", `User rejected ${method}`);
        }
      }

      const handler = methodHandlers[method];
      if (!handler) {
        throw new BridgeError("MethodUnavailable", `No handler registered for ${method}`);
      }

      return handler(payload);
    },
  };
}
