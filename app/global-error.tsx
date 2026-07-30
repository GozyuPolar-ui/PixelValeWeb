"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            textAlign: "center",
            background: "#fbf9f5",
            color: "#1b1c1a",
          }}
        >
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>Something went wrong</h1>
          <p style={{ color: "#6B655E", marginBottom: 24, maxWidth: 400 }}>
            The app failed to load. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#994032",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: 8,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}