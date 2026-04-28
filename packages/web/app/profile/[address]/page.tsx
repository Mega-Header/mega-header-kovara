"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface ProfileData {
  address: string;
  username: string;
  creatorToken: string;
  followerCount: number;
  followingCount: number;
}

interface PageProps {
  params: {
    address: string;
  };
}

export default function PublicProfilePage({ params }: PageProps) {
  const { address } = params;
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [currentUserAddress, setCurrentUserAddress] = useState<string | null>(
    null
  );

  useEffect(() => {
    const userAddress = localStorage.getItem("walletAddress");
    setCurrentUserAddress(userAddress);

    const fetchProfile = async () => {
      try {
        // TODO: Call get_profile(address) via contract SDK
        // TODO: Call get_followers(address) and get_following(address) via contract SDK
        // TODO: Check if currentUserAddress is in followers list

        // Mock data for demonstration
        setTimeout(() => {
          if (address === "NOT_FOUND") {
            setNotFound(true);
          } else {
            setProfile({
              address: address,
              username: `user_${address.slice(0, 8)}`,
              creatorToken: `G${address.slice(1, 57)}`,
              followerCount: Math.floor(Math.random() * 1000),
              followingCount: Math.floor(Math.random() * 500),
            });
          }
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Failed to load profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [address]);

  const isOwnProfile = currentUserAddress === address;

  const handleFollowClick = async () => {
    if (!currentUserAddress) {
      alert("Please connect your wallet to follow users");
      return;
    }

    setFollowLoading(true);
    try {
      if (isFollowing) {
        // TODO: Call unfollow(currentUserAddress, address) via contract SDK
      } else {
        // TODO: Call follow(currentUserAddress, address) via contract SDK
      }

      setIsFollowing(!isFollowing);

      if (profile) {
        setProfile((prev) =>
          prev
            ? {
                ...prev,
                followerCount: isFollowing
                  ? prev.followerCount - 1
                  : prev.followerCount + 1,
              }
            : null
        );
      }
    } catch (err) {
      console.error("Failed to update follow status:", err);
      setError("Failed to update follow status");
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <main style={styles.main}>
        <div style={styles.container}>
          <p style={styles.loading}>Loading profile...</p>
        </div>
      </main>
    );
  }

  if (notFound || !profile) {
    return (
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.notFound}>
            <h1 style={styles.notFoundTitle}>Profile Not Found</h1>
            <p style={styles.notFoundMessage}>
              The profile you're looking for doesn't exist.
            </p>
            <a href="/explore" style={styles.backLink}>
              Back to Explore
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.profileHeader}>
          <div style={styles.avatar}></div>

          <div style={styles.profileInfo}>
            <h1 style={styles.username}>{profile.username}</h1>
            <p style={styles.address}>{address}</p>

            <div style={styles.stats}>
              <div style={styles.stat}>
                <span style={styles.statValue}>{profile.followerCount}</span>
                <span style={styles.statLabel}>Followers</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statValue}>{profile.followingCount}</span>
                <span style={styles.statLabel}>Following</span>
              </div>
            </div>

            {!isOwnProfile && (
              <button
                onClick={handleFollowClick}
                disabled={followLoading}
                style={{
                  ...styles.followButton,
                  ...(isFollowing ? styles.followingButton : {}),
                }}
              >
                {followLoading
                  ? "Loading..."
                  : isFollowing
                    ? "Following"
                    : "Follow"}
              </button>
            )}
          </div>
        </div>

        <div style={styles.profileDetails}>
          <div style={styles.detailSection}>
            <h2 style={styles.sectionTitle}>Creator Token</h2>
            <p style={styles.tokenAddress}>{profile.creatorToken}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    background: "var(--color-bg-secondary)",
    padding: "var(--spacing-lg)",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  loading: {
    textAlign: "center",
    color: "var(--color-text-secondary)",
    paddingTop: "var(--spacing-xl)",
  },
  notFound: {
    background: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    borderRadius: "12px",
    padding: "var(--spacing-xl)",
    textAlign: "center",
  },
  notFoundTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    marginBottom: "var(--spacing-md)",
  },
  notFoundMessage: {
    color: "var(--color-text-secondary)",
    marginBottom: "var(--spacing-lg)",
  },
  backLink: {
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    background: "var(--color-primary)",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
  },
  profileHeader: {
    background: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    borderRadius: "12px",
    padding: "var(--spacing-xl)",
    marginBottom: "var(--spacing-lg)",
    display: "flex",
    gap: "var(--spacing-xl)",
    alignItems: "flex-start",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "var(--color-bg-secondary)",
    flexShrink: 0,
  },
  profileInfo: {
    flex: 1,
    minWidth: 0,
  },
  username: {
    fontSize: "1.875rem",
    fontWeight: 700,
    marginBottom: "var(--spacing-sm)",
  },
  address: {
    fontSize: "0.85rem",
    color: "var(--color-text-secondary)",
    fontFamily: "monospace",
    marginBottom: "var(--spacing-md)",
    wordBreak: "break-all",
  },
  stats: {
    display: "flex",
    gap: "var(--spacing-xl)",
    marginBottom: "var(--spacing-lg)",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statValue: {
    fontSize: "1.5rem",
    fontWeight: 700,
  },
  statLabel: {
    fontSize: "0.85rem",
    color: "var(--color-text-secondary)",
  },
  followButton: {
    padding: "0.75rem 1.5rem",
    background: "var(--color-primary)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    minHeight: "var(--min-touch-target)",
  },
  followingButton: {
    background: "var(--color-bg-secondary)",
    color: "var(--color-text)",
  },
  profileDetails: {
    background: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    borderRadius: "12px",
    padding: "var(--spacing-lg)",
  },
  detailSection: {
    marginBottom: "var(--spacing-lg)",
  },
  sectionTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    marginBottom: "var(--spacing-md)",
  },
  tokenAddress: {
    fontSize: "0.9rem",
    color: "var(--color-text-secondary)",
    fontFamily: "monospace",
    wordBreak: "break-all",
    background: "var(--color-bg-secondary)",
    padding: "var(--spacing-md)",
    borderRadius: "8px",
  },
  error: {
    background: "rgba(220, 38, 38, 0.1)",
    color: "rgb(220, 38, 38)",
    padding: "var(--spacing-md)",
    borderRadius: "8px",
    marginBottom: "var(--spacing-md)",
    border: "1px solid rgba(220, 38, 38, 0.3)",
  },
};
