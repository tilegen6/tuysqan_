import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const isProduction = process.env.NODE_ENV === "production";
let supabaseOrigin = "";
try {
  supabaseOrigin = supabaseUrl ? new URL(supabaseUrl).origin : "";
} catch {
  supabaseOrigin = "";
}

const connectSources = ["'self'"];
const imageSources = ["'self'", "data:", "blob:"];
if (supabaseOrigin) {
  connectSources.push(supabaseOrigin, supabaseOrigin.replace("https:", "wss:"));
  imageSources.push(supabaseOrigin);
}

const createContentSecurityPolicy = (frameAncestors: string) => [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  `frame-ancestors ${frameAncestors}`,
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src ${imageSources.join(" ")}`,
  "font-src 'self' data:",
  `connect-src ${connectSources.join(" ")}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  isProduction ? "upgrade-insecure-requests" : "",
]
  .filter(Boolean)
  .join("; ");

const sharedSecurityHeaders = [
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  ...(isProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: createContentSecurityPolicy("'none'"),
  },
  ...sharedSecurityHeaders,
  { key: "X-Frame-Options", value: "DENY" },
];

const portfolioPreviewHeaders = [
  {
    key: "Content-Security-Policy",
    value: createContentSecurityPolicy(
      "'self' https://portfolio.sites-plus-portfolio.workers.dev https://portfolio-nu-roan-17.vercel.app http://localhost:* http://127.0.0.1:*",
    ),
  },
  ...sharedSecurityHeaders,
];

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  images: {
    remotePatterns: supabaseOrigin
      ? [
          {
            protocol: "https",
            hostname: new URL(supabaseOrigin).hostname,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        missing: [{ type: "query", key: "portfolio-preview", value: "1" }],
        headers: securityHeaders,
      },
      {
        source: "/:path*",
        has: [{ type: "query", key: "portfolio-preview", value: "1" }],
        headers: portfolioPreviewHeaders,
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },
};

export default nextConfig;
