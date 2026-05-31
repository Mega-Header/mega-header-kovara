# Linkora Mobile

React Native / Expo mobile app for the Linkora SocialFi platform on Stellar.

> **Status:** This package is planned and not yet scaffolded. This README and the accompanying developer guide exist to document the intended structure ahead of implementation.

## Quick Start

See [docs/mobile/DEVELOPER_GUIDE.md](../../docs/mobile/DEVELOPER_GUIDE.md) for full setup instructions covering prerequisites, simulator setup, project structure, and EAS builds.

## Design Specification

See [docs/design/MOBILE_SPEC.md](../../docs/design/MOBILE_SPEC.md) for the full mobile UI design specification, including:

- Screen inventory with wireframe descriptions
- Navigation structure
- Component library (PostCard, PoolCard, ProfileHeader, etc.)
- Design token usage on mobile
- Accessibility requirements (contrast ratios, touch targets)
- Dark mode guidelines

Design tokens are defined in [docs/design/tokens.json](../../docs/design/tokens.json).

## Tech Stack

- [Expo](https://expo.dev) (React Native)
- [Expo Router](https://docs.expo.dev/router/introduction/) — file-based navigation
- [EAS Build](https://docs.expo.dev/build/introduction/) — cloud native builds
- [Stellar Wallet Kit](https://stellarwalletkit.dev) — wallet integration
- [`packages/sdk`](../../packages/sdk) — typed Linkora contract client

## Testing

### Running Tests

```bash
npm test
```

### Snapshot Testing

This project uses Jest snapshot testing to catch unintended visual regressions in UI components. Snapshots are automatically generated for core components like PostCard, PoolCard, and EmptyState.

#### Updating Snapshots

When you intentionally change a component's visual output, you'll need to update the snapshots:

```bash
# Update all snapshots
npm test -- --updateSnapshot

# Update snapshots for a specific test file
npm test PostCard.snap.test.tsx -- --updateSnapshot
```

#### Snapshot Test Guidelines

- Snapshots should be committed to the repository
- CI will fail if snapshots change without an explicit update
- Review snapshot changes carefully during code review
- Each component should have snapshots for both default and loading states
