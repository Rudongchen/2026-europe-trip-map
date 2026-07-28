# 2026 Norway-France Trip Map

This folder contains the encrypted static publishing version of the travel map.

- `index.html` is encrypted and safe to publish as a static website.
- `sw.js` and `manifest.webmanifest` make the encrypted map installable and cacheable on mobile devices.
- The editing master remains `../巴黎候选地点地图.html`.
- Run `../加密发布旅行地图.command` after editing the master file to regenerate this encrypted publishing copy.

The passphrase is not stored in this repository. If the passphrase is lost, regenerate `index.html` from the master file with a new passphrase.

Do not publish the parent travel folder because it contains private booking documents.

Last encrypted: 2026-07-28T08:29:21.501Z
Source SHA-256: 73d398fde5081c3cd383b8f117e5266ef63336a8f8c86fb32c4b558555d2b4c3
