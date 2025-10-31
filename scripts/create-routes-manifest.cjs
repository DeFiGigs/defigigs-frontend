const fs = require("node:fs");
const path = require("node:path");

const distDir = path.resolve(__dirname, "..", ".next");
const legacyManifestPath = path.join(distDir, "routes-manifest.json");

if (fs.existsSync(distDir) && !fs.existsSync(legacyManifestPath)) {
  const appManifestPath = path.join(distDir, "app-path-routes-manifest.json");
  let data = {
    version: 1,
    pages404: true,
    basePath: "",
    headers: [],
    redirects: [],
    rewrites: { beforeFiles: [], afterFiles: [], fallback: [] },
  };

  if (fs.existsSync(appManifestPath)) {
    try {
      const appManifest = JSON.parse(fs.readFileSync(appManifestPath, "utf8"));
      data.headers = appManifest.headers ?? data.headers;
      data.redirects = appManifest.redirects ?? data.redirects;
      data.rewrites = {
        beforeFiles: appManifest.rewrites?.beforeFiles ?? data.rewrites.beforeFiles,
        afterFiles: appManifest.rewrites?.afterFiles ?? data.rewrites.afterFiles,
        fallback: appManifest.rewrites?.fallback ?? data.rewrites.fallback,
      };
    } catch (error) {
      console.warn(
        "[create-routes-manifest] Failed to read app-path-routes-manifest.json, using default structure.",
        error,
      );
    }
  }

  fs.writeFileSync(legacyManifestPath, JSON.stringify(data, null, 2));
  console.log("[create-routes-manifest] Added fallback .next/routes-manifest.json for Vercel.");
}
