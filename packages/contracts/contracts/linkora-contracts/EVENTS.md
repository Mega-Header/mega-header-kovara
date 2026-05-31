# Linkora Contract Events

This document describes all events emitted by the Linkora smart contract.

---

## BlockEvent

Emitted when a user blocks another user.

**Topic:** `block`

| Field     | Type      | Description                        |
|-----------|-----------|------------------------------------|
| `blocker` | `Address` | The address of the user who blocked |
| `blocked` | `Address` | The address of the user being blocked |

**Emitted by:** `block_user(blocker, blocked)`

---

## UnblockEvent

Emitted when a user unblocks another user.

**Topic:** `unblock`

| Field     | Type      | Description                          |
|-----------|-----------|--------------------------------------|
| `blocker` | `Address` | The address of the user who unblocked |
| `blocked` | `Address` | The address of the user being unblocked |

**Emitted by:** `unblock_user(blocker, blocked)`
