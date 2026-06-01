/**
 * Linkora Mini App Host Bridge
 *
 * Exposes a typed SDK surface to mini apps running inside the host.
 * Each namespace is gated by a permission declared in the mini app manifest.
 */

export type MiniAppManifest = {
  permissions: string[];
};

export type BridgeOptions = {
  manifest: MiniAppManifest;
  /** Called by the host to present the native confirmation sheet. */
  onPostCreate: (content: string) => Promise<{ confirmed: boolean; content: string }>;
  /** Called after user confirms — submits the post to the contract. */
  submitPost: (content: string) => Promise<{ postId: number }>;
};

function requirePermission(manifest: MiniAppManifest, permission: string): void {
  if (!manifest.permissions.includes(permission)) {
    throw new Error(`Mini app does not have the '${permission}' permission`);
  }
}

export function createBridge(options: BridgeOptions) {
  const { manifest, onPostCreate, submitPost } = options;

  return {
    post: {
      /**
       * Opens a native confirmation sheet pre-filled with `content`.
       * The user may edit the content before confirming.
       * @returns the new post ID on success, or null if the user cancelled.
       */
      async create(content: string): Promise<number | null> {
        requirePermission(manifest, "post.create");

        const { confirmed, content: finalContent } = await onPostCreate(content);
        if (!confirmed) return null;

        const { postId } = await submitPost(finalContent);
        return postId;
      },
    },
  };
}

export type LinkoraSDK = ReturnType<typeof createBridge>;
