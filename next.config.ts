import type { NextConfig } from "next";

// Cross-origin isolation is required for WebContainers (SharedArrayBuffer) so the
// live preview can run the generated Vite project in-browser. `credentialless`
// keeps cross-origin resources (Supabase, etc.) working without CORP headers.
const COOP_COEP_HEADERS = [
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: COOP_COEP_HEADERS }];
  },
};

export default nextConfig;
