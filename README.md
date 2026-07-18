# 2026 Norway-France Trip Map

This folder contains the encrypted static publishing version of the travel map.

- `index.html` is encrypted and safe to publish as a static website.
- `sw.js` and `manifest.webmanifest` make the encrypted map installable and cacheable on mobile devices.
- The editing master remains `../巴黎候选地点地图.html`.
- Run `../加密发布旅行地图.command` after editing the master file to regenerate this encrypted publishing copy.

The passphrase is not stored in this repository. If the passphrase is lost, regenerate `index.html` from the master file with a new passphrase.

Do not publish the parent travel folder because it contains private booking documents.

Last encrypted: 2026-07-18T14:38:23.480Z
Source SHA-256: f6085574c4aee3c4d65e2b3219a79bf29d47bb7b88f08ac886750988dc0a72f8
