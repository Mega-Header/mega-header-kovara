# Linkora

[![CI](https://github.com/Epta-Node/Linkora-social/actions/workflows/ci.yml/badge.svg)](https://github.com/Epta-Node/Linkora-social/actions/workflows/ci.yml)

Linkora is an open-source SocialFi platform built on Stellar and Soroban. It combines social networking with on-chain financial primitives — creator profiles, follow graphs, posts, token tipping, community pools, and a mini app ecosystem — for creators, communities, and investors.

---

## Status

The project spans multiple packages at different stages of maturity:

| Package | Status |
|---|---|
| `packages/contracts` | ✅ Implemented — core social + DeFi primitives, unit tested |
| `packages/sdk` | 🔧 In progress — typed contract client for browser and Node.js |
| `apps/web` | 🔧 In progress — Next.js web frontend |
| `apps/mobile` | 🔧 In progress — Expo / React Native mobile app |
| `services/indexer` | 🔧 In progress — off-chain event indexer with PostgreSQL + search API |
| `examples/mini-apps` | ✅ Example mini apps available |

---

## What Linkora Implements

### Smart Contracts (`packages/contracts`)

- Profile registration and updates
- Follow / unfollow relationships with block support
- On-chain post creation, deletion, and likes
- Tipping posts with SEP-41 compatible tokens (protocol fee applied)
- Community pool deposits and M-of-N admin withdrawals
- Block / unblock events

### Web App (`apps/web`)

- Next.js 15 frontend with Tailwind CSS
- Freighter wallet integration
- Onboarding flow (install → connect → fund → profile)
- Explore page with post search
- Input validation and sanitisation on all forms

### Mobile App (`apps/mobile`)

- Expo / React Native app with Expo Router file-based navigation
- Bottom tab navigation: Feed, Explore, Pools, Mini Apps, Profile
- Freighter and WalletConnect wallet support
- Mini app browser with sandboxed bridge API
- Deep link handling (`linkora://post/:id`, `linkora://pool/:id`, `linkora://profile/:address`)

### Indexer (`services/indexer`)

- Subscribes to Soroban contract events via Stellar RPC
- Indexes post content into PostgreSQL for full-text search
- Exposes a REST search API consumed by the web and mobile frontends

### SDK (`packages/sdk`)

- Typed `LinkoraClient` for browser and Node.js
- Methods aligned with the contract ABI (`getProfile`, `getPost`, `getFollowing`, etc.)

### Mini Apps (`examples/mini-apps`)

- Sandboxed web apps running inside the Linkora mobile client
- Bridge API: `wallet.getAddress`, `wallet.sign`, `wallet.signTransaction`, `profile.get`
- Example: Creator Token dashboard and tip flow

---

## Documentation

- **[System Architecture](./docs/ARCHITECTURE.md)** — Components, data flows, and technology choices
- **[Design System](./docs/design/README.md)** — UI/UX specifications and brand identity
- **[Mobile UI Spec](./docs/design/MOBILE_SPEC.md)** — Screen inventory, components, tokens, accessibility
- **[Mobile Developer Guide](./docs/mobile/DEVELOPER_GUIDE.md)** — Expo setup, simulators, EAS builds
- **[Indexer Design](./docs/indexer/INDEXER_DESIGN.md)** — Event indexing strategy and search API design
- **[Mini Apps Developer Guide](./docs/mini-apps/DEVELOPER_GUIDE.md)** — Build and submit a Linkora mini app
- **[Mini Apps Bridge API](./docs/mini-apps/BRIDGE_API.md)** — Bridge method reference with types and examples
- **[Event Schema](./packages/contracts/contracts/linkora-contracts/EVENTS.md)** — Contract event definitions for indexers and clients
- **[Security Policy](./SECURITY.md)** — Vulnerability disclosure guidance

---

## Repository Structure

```text
.
├── apps/
│   ├── mobile/                  # Expo / React Native mobile app
│   │   ├── app/                 # Expo Router screens
│   │   │   ├── (tabs)/          # Bottom tab screens (feed, explore, pools, mini-apps, profile)
│   │   │   ├── connect.tsx      # Wallet connection screen
│   │   │   ├── post/[id].tsx    # Post detail
│   │   │   ├── pool/[id].tsx    # Pool detail
│   │   │   └── profile/[address].tsx
│   │   ├── components/          # PostCard, PoolCard, SearchBar, WalletButton, EmptyState
│   │   ├── context/             # WalletContext (Freighter + WalletConnect)
│   │   ├── hooks/               # useWallet, useFeed
│   │   ├── mini-apps/           # Bridge and permissions sandbox
│   │   └── utils/               # deepLinks, secureStorage
│   └── web/                     # Next.js 15 web frontend
│       └── src/
│           ├── app/             # Next.js App Router pages
│           ├── components/      # NavBar, SearchBar, onboarding flow, forms
│           ├── hooks/           # useWallet
│           └── lib/             # validate.ts — input validation utilities
├── docs/
│   ├── design/                  # Design system, tokens, mobile spec, accessibility
│   ├── indexer/                 # Indexer architecture and API design
│   ├── mini-apps/               # Mini app developer guide and bridge API reference
│   ├── mobile/                  # Mobile developer guide
│   └── security/                # Contract security review
├── examples/
│   └── mini-apps/
│       ├── creator-token/       # Creator token balance + tip example
│       └── tip-jar/             # Tip jar example
├── packages/
│   ├── contracts/               # Soroban smart contracts (Rust)
│   │   └── contracts/linkora-contracts/src/
│   │       ├── lib.rs           # Contract implementation
│   │       └── test.rs          # Unit tests
│   └── sdk/                     # Typed LinkoraClient for browser and Node.js
├── services/
│   └── indexer/                 # Off-chain event indexer (Node.js + PostgreSQL)
├── Makefile
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Smart contracts | Rust, Soroban SDK, Stellar |
| Web frontend | Next.js 15, React 19, Tailwind CSS 4 |
| Mobile | Expo (React Native), Expo Router, EAS Build |
| Wallet (web) | Stellar Freighter API |
| Wallet (mobile) | Freighter, WalletConnect (via `@walletconnect/sign-client`) |
| Indexer | Node.js, TypeScript, Express, PostgreSQL |
| SDK | TypeScript, `@stellar/stellar-sdk` |
| Monorepo | pnpm workspaces, Turborepo |
| Build tooling | Cargo workspace, `stellar-cli` |

---

## Prerequisites

Install the following before working on the project:

- **Node.js** 18+
- **pnpm** 9+ — `npm install -g pnpm`
- **Rust toolchain** — `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
- **Wasm target** — `rustup target add wasm32-unknown-unknown`
- **Stellar CLI** — `cargo install --locked stellar-cli`
- **PostgreSQL** 14+ (for the indexer)
- **Expo CLI** (for mobile) — `npm install -g expo-cli`

---

## Getting Started

### One-command setup

```bash
./scripts/setup.sh
```

The script checks prerequisites, installs JS dependencies, and builds the contracts. It is idempotent — safe to re-run after pulling changes.

### Manual setup

#### 1. Install dependencies

```bash
pnpm install
```

#### 2. Build the contracts

```bash
pnpm build:contracts
```

#### 3. Run contract tests

```bash
pnpm --filter contracts test
# or
cd packages/contracts && cargo test
```

#### 4. Start the web frontend

```bash
cd apps/web
pnpm dev
# Opens http://localhost:3000
```

#### 5. Start the mobile app

```bash
cd apps/mobile
pnpm start
# Then press 'a' for Android emulator or 'i' for iOS simulator
```

See [docs/mobile/DEVELOPER_GUIDE.md](./docs/mobile/DEVELOPER_GUIDE.md) for full simulator setup and EAS build instructions.

#### 6. Start the indexer

```bash
cd services/indexer
cp .env.example .env   # fill in DATABASE_URL and SOROBAN_RPC_URL
pnpm dev
```

See [docs/indexer/INDEXER_DESIGN.md](./docs/indexer/INDEXER_DESIGN.md) for PostgreSQL schema and environment variables.

---

## Available Scripts

From the repository root:

| Script | Description |
|---|---|
| `pnpm dev` | Start all services in development mode |
| `pnpm build` | Build all packages |
| `pnpm build:contracts` | Build Soroban contracts only |
| `pnpm lint` | Run lint across all packages |
| `pnpm test` | Run all test suites |
| `pnpm format` | Format all source files |

---

## Smart Contract API Reference

The primary contract is `LinkoraContract` in `packages/contracts/contracts/linkora-contracts/src/lib.rs`.

### Data Models

- `Profile` — address, username, creator token address
- `Post` — id, author, content, tip total, timestamp, like count
- `Pool` — token address, balance, admin set, threshold

### Key Functions

| Function | Description |
|---|---|
| `set_profile(user, username, creator_token)` | Register or update a profile |
| `follow(follower, followee)` | Follow a user (blocked users cannot follow) |
| `block_user(blocker, blocked)` | Block a user, emits `BlockEvent` |
| `unblock_user(blocker, blocked)` | Unblock a user, emits `UnblockEvent` |
| `create_post(author, content)` | Publish a post (max 280 chars) |
| `tip(tipper, post_id, token, amount)` | Tip a post with SEP-41 tokens |
| `pool_deposit(depositor, pool_id, token, amount)` | Deposit into a community pool |
| `pool_withdraw(signers, pool_id, amount, recipient)` | M-of-N admin withdrawal |

Full API table in the [Contract API Reference](#) section of the upstream README.

---

## Deployment

Deploy to Stellar Testnet:

```bash
ADMIN_SECRET=S... \
TREASURY_ADDRESS=G... \
FEE_BPS=250 \
./scripts/deploy_testnet.sh
```

The script builds the contract WASM, deploys it, and calls `initialize`. The deployed `contract_id` is printed to stdout.

> Fund the deployer account first: [Stellar Testnet Friendbot](https://friendbot.stellar.org)

---

## Roadmap

1. **Contract hardening** — security review, edge-case coverage, upgrade path
2. **SDK completion** — full typed client aligned with contract ABI
3. **Indexer production-readiness** — pagination, rate limiting, event replay
4. **Mobile feature parity** — Pools screen, Post detail, Profile detail, compose flow
5. **Web feature parity** — Feed, profile pages, tip modal, compose modal
6. **Mini app registry** — on-chain or off-chain registry for third-party mini apps
7. **Mainnet deployment** — governance, treasury, and fee configuration

---

## Contributing

Contributions are welcome in all areas:

- Contract hardening and security review
- Event design and indexing strategy
- Mobile and web feature implementation
- SDK client improvements
- Documentation and developer tooling

### How to contribute

1. Fork the repository and clone it locally
2. Create a branch: `git checkout -b feature/your-task-name`
3. Make your changes and commit clearly: `git commit -m "feat: short description"`
4. Push and open a Pull Request with a clear description

### Community

Join the Linkora community on Telegram: [https://t.me/+13csp8G4ccRhY2Zk](https://t.me/+13csp8G4ccRhY2Zk)

---

## Testing

| Suite | Command |
|---|---|
| Contract unit tests | `pnpm --filter contracts test` |
| SDK tests | `pnpm --filter sdk test` |
| Indexer tests | `cd services/indexer && pnpm test` |
| Mobile snapshot tests | `cd apps/mobile && pnpm test` |
| Web E2E (Playwright) | `cd apps/web && pnpm test:e2e` |
| Integration tests | `pnpm test:integration` |

---

## Security

See [SECURITY.md](./SECURITY.md) for vulnerability disclosure guidance and scope.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). Report unacceptable behavior to [conduct@linkora.social](mailto:conduct@linkora.social).

## License

MIT
