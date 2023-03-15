# Changelog

<a name="1.10.0"></a>
## 1.10.0 (2023-03-15)

### Added

- ✨ Introduce previous commit message commit [[374d55c](https://github.com/segersniels/gitmoji/commit/374d55c5e4e7f892d8eef7f92c3a3da72cb78b70)]
- ➕ Add gitmoji-changelog [[655769c](https://github.com/segersniels/gitmoji/commit/655769c1b221bec6902e5c4199e7d0fa131e14b3)]

### Changed

- 🎨 Use pascal casing for enums [[5cb2093](https://github.com/segersniels/gitmoji/commit/5cb20931a0db2c0dd89db3a2c109ca589f5f6292)]
- ⬆️ Bump prompts@2.4.2 [[35b65dd](https://github.com/segersniels/gitmoji/commit/35b65dd67902466d1839074d68f9ff604c78bb0f)]

### Fixed

- 🐛 Don&#x27;t return spawn output [[d408b67](https://github.com/segersniels/gitmoji/commit/d408b67dd8f7744285290dba3418584245a8a8bb)]
- 🚑 Make sure to early exit... [[08706d5](https://github.com/segersniels/gitmoji/commit/08706d55c2b56e6f8d3538be281a57e30cc69894)]
- 🐛 Make sure we don&#x27;t delete false or null values [[aef50f9](https://github.com/segersniels/gitmoji/commit/aef50f9ad35276c6ee168e2656f107ce24972683)]
- 🐛 Make sure we only allow configuring config values that are booleans [[d39f11d](https://github.com/segersniels/gitmoji/commit/d39f11d1b86883de268418ff15132ef38005eeea)]

### Miscellaneous

- 📝 Generate changelog [[b8fda39](https://github.com/segersniels/gitmoji/commit/b8fda396ad5021cac241c80545704acc9f0bfb4f)]


<a name="1.9.0"></a>
## 1.9.0 (2023-01-11)

### Added

- ✨ Expose update command to force list update [[23145f0](https://github.com/segersniels/gitmoji/commit/23145f0b4eaad8580223c38834d430437f89950a)]

### Changed

- 🎨 Clean up and simplify [[722d143](https://github.com/segersniels/gitmoji/commit/722d143f0aa2bb3ce747d91eeb49d1994aa4ec8e)]


<a name="1.8.0"></a>
## 1.8.0 (2023-01-10)

### Added

- ✨ Add list functionality to see all gitmojis [[175ad64](https://github.com/segersniels/gitmoji/commit/175ad648a0c9ca6a15f02c45c1a6f1b472a5f879)]

### Changed

- 🎨 Add some whitespace for readability [[5d84fa0](https://github.com/segersniels/gitmoji/commit/5d84fa0dc741561b9273991a1fa5da2738ff2f37)]

### Miscellaneous

- 🩹 Remove additional whitespace [[02c4655](https://github.com/segersniels/gitmoji/commit/02c4655f94ee507e1aecb271c688b8f81b77fb59)]
- 📝 Bring readme in sync [[8b06b4d](https://github.com/segersniels/gitmoji/commit/8b06b4daa6c81041fc674b4a272047ff8d1e16c8)]
- 🔨 Add easy way to sync gitmoji json file [[d3c1d76](https://github.com/segersniels/gitmoji/commit/d3c1d768fb790c91eb0a2a18afa3589d2f8be5f7)]


<a name="1.7.0"></a>
## 1.7.0 (2023-01-09)

### Added

- ➕ Replace @zeit/ncc with tsup [[fbb7d55](https://github.com/segersniels/gitmoji/commit/fbb7d5507fea4e2d3dbfcb916e90f2c3e22f6561)]

### Changed

- ♻️ Simplify config helper and remove non existent config values [[7416218](https://github.com/segersniels/gitmoji/commit/7416218606384227eafd032a7d2bb6b4e8f11e22)]
- ♻️ Fully control uppercasing through config [[d85b7f1](https://github.com/segersniels/gitmoji/commit/d85b7f12efcad943bd7a86eb32a4d56d35c3c6e0)]


<a name="1.6.2"></a>
## 1.6.2 (2023-01-09)

### Changed

- 🔧 Bring fallback in line with latest version [[2de8846](https://github.com/segersniels/gitmoji/commit/2de8846cc8c6bb121c78c4bcb57911cb0d8cb668)]

### Fixed

- 🐛 Should return fallback when request failed [[6cae840](https://github.com/segersniels/gitmoji/commit/6cae8406ee439dc61e8540313ac0606d84f3d33f)]


<a name="1.6.1"></a>
## 1.6.1 (2023-01-09)

### Changed

- 👽 They updated location of gitmojis json [[affbb5e](https://github.com/segersniels/gitmoji/commit/affbb5e8ef973fd36106e2b3fd94212ef7e2d9f8)]


<a name="1.6.0"></a>
## 1.6.0 (2022-12-02)

### Changed

- ♻️ Keep asking for emoji and message until provided instead of just exiting [[37f3f22](https://github.com/segersniels/gitmoji/commit/37f3f2246c2bcbb9b33cdd7870e48b92a20a9edd)]


<a name="1.5.1"></a>
## 1.5.1 (2022-08-18)

### Fixed

- 🐛 Strip leading and trailing whitespace [[920f78c](https://github.com/segersniels/gitmoji/commit/920f78c0165a5b913b09e32474508ebe2194d088)]


<a name="1.5.0-beta.0"></a>
## 1.5.0-beta.0 (2021-08-04)

### Added

- ➕ Add moment@2.29.1 [[d9109a3](https://github.com/segersniels/gitmoji/commit/d9109a3dbc0c9e2ea5a8206691242f296329039f)]

### Changed

- ⚡ Refresh cached json each month [[eaf5261](https://github.com/segersniels/gitmoji/commit/eaf526167a349e2b30dadaceeba5f43fa5900f55)]


<a name="1.4.0"></a>
## 1.4.0 (2021-06-22)

### Changed

- ⬆️ Update prompts@2.4.1 [[ff7e48d](https://github.com/segersniels/gitmoji/commit/ff7e48db645a366f205880149cd96b40ababcc61)]


<a name="1.4.0-beta.0"></a>
## 1.4.0-beta.0 (2021-06-01)

### Added

- ✨ Allow passing of --no-verify [[92b95fb](https://github.com/segersniels/gitmoji/commit/92b95fbed0e8eba558179fb1b6f74076963d1228)]


<a name="1.3.3"></a>
## 1.3.3 (2021-01-12)

### Fixed

- 🚑 Fix unwanted quotes [[4ed398d](https://github.com/segersniels/gitmoji/commit/4ed398dd14b8a9d26126983001b86a8aa07158ee)]


<a name="1.3.2"></a>
## 1.3.2 (2021-01-12)

### Fixed

- 🚑 Correctly handle err and stderr [[716a5c3](https://github.com/segersniels/gitmoji/commit/716a5c36d3a50d01b97382d9b06f58c85c3880be)]


<a name="1.3.1"></a>
## 1.3.1 (2020-10-06)

### Fixed

- 🚑 Make sure apostrophe can be used correctly [[bc7c493](https://github.com/segersniels/gitmoji/commit/bc7c493da3a1246034c00afcd02dc148bd20d4ed)]


<a name="1.3.1-beta.1"></a>
## 1.3.1-beta.1 (2020-09-16)

### Fixed

- 🚑 Wrap in quotation marks [[1047fe2](https://github.com/segersniels/gitmoji/commit/1047fe299c04e8fa1c0e66253f0f63e39a113f69)]
- 💚 Forgot to add the actual usage [[0c0400b](https://github.com/segersniels/gitmoji/commit/0c0400bc9c1ef772cd28e5c7667ac766809357ee)]
- 💚 Typo [[ffb3840](https://github.com/segersniels/gitmoji/commit/ffb38409c2f2bed81234293e92e72eca335d7656)]


<a name="1.3.1-beta.0"></a>
## 1.3.1-beta.0 (2020-09-16)

### Changed

- ⚡ Use execSync instead of spawning [[265ff9f](https://github.com/segersniels/gitmoji/commit/265ff9fb023f077ad431c1d9575337783dae5bf9)]
- ♻️ Allow overriding auto uppercasing by passing flag [[d228627](https://github.com/segersniels/gitmoji/commit/d228627109bb83e840730f5a5e841fa7208db4b5)]

### Removed

- 🔥 Ditch old CI [[693b496](https://github.com/segersniels/gitmoji/commit/693b4962aebad671921cd42391b6055eddba3088)]

### Fixed

- 💚 Split beta and master release into two different jobs [[9f39bd2](https://github.com/segersniels/gitmoji/commit/9f39bd27bcad164cb3faabacc090aa7508fbf2f2)]
- 💚 Dont say build succeeded when publish failed [[093d673](https://github.com/segersniels/gitmoji/commit/093d6736aaa374bddc6e66e75a459af04b4a3a27)]
- 💚 No longer working with general working dir like ci [[cced125](https://github.com/segersniels/gitmoji/commit/cced1252a1d6df8f15c92776af5b89b9485f4555)]
- 💚 Seems that github doesnt support anchors... [[f6df75e](https://github.com/segersniels/gitmoji/commit/f6df75e053733adb0e89f7d6e06adb7c18501046)]
- 💚 first attempt to switch to github actions [[01c6ad9](https://github.com/segersniels/gitmoji/commit/01c6ad995c0c1f7f83073807e7328f5e571a4bdb)]

### Miscellaneous

- 📝 Replace circle status badge [[5dea5e5](https://github.com/segersniels/gitmoji/commit/5dea5e5bb3ac88002ea19ec5d58c9c7d80996da1)]


<a name="1.2.0"></a>
## 1.2.0 (2020-07-21)

### Changed

- ⬆️ Bump lodash from 4.17.15 to 4.17.19 [[42414ba](https://github.com/segersniels/gitmoji/commit/42414ba28af05ee1dae6859b937356f0e2ce460f)]

### Miscellaneous

-  Merge pull request [#1](https://github.com/segersniels/gitmoji/issues/1) from segersniels/dependabot/npm_and_yarn/lodash-4.17.19 [[7f98240](https://github.com/segersniels/gitmoji/commit/7f982401d65563ff910659f83ced7b2189063273)]


<a name="1.2.0-beta.3"></a>
## 1.2.0-beta.3 (2020-07-02)

### Added

- ✨ Add ConfigOptions enum [[dc77500](https://github.com/segersniels/gitmoji/commit/dc775000387f09d1919a4d5d5190c932616a4c36)]
- ✨ Add ls alias to cache and config list/view command [[8d03202](https://github.com/segersniels/gitmoji/commit/8d03202454c3d1c59a0810b1f8515686ab52b2e8)]

### Changed

- ♻️ Drop configurable cache and enable it by default [[39e94c2](https://github.com/segersniels/gitmoji/commit/39e94c21a0087ed89aa28da4d5e44adb4742375f)]

### Removed

- ➖ Remove moment@2.26.0 [[8be2b76](https://github.com/segersniels/gitmoji/commit/8be2b76ebad28bbacea354d8549fdbf2b32c02fe)]

### Miscellaneous

- 📝 Adjust README [[fdd6f79](https://github.com/segersniels/gitmoji/commit/fdd6f799504308840c97958f890481b281923149)]


<a name="1.2.0-beta.2"></a>
## 1.2.0-beta.2 (2020-07-02)

### Fixed

- 🐛 removed emoji on non uppercased by accident [[3061082](https://github.com/segersniels/gitmoji/commit/3061082d73ae7909c786ff59e39745a8962f9d13)]

### Miscellaneous

-  1.2.0-beta.1 [[322dffc](https://github.com/segersniels/gitmoji/commit/322dffc04e6ae7d3294a7fff273a4cc17da3ce70)]
-  fix prompt message [[26a50da](https://github.com/segersniels/gitmoji/commit/26a50daf8c4cbbcda91f1f85676b8aa68036849a)]
-  correcly use listed config [[3438ff7](https://github.com/segersniels/gitmoji/commit/3438ff7c2aba6d64f0e7a3e2c845cefcd65055e6)]


<a name="1.2.0-beta.0"></a>
## 1.2.0-beta.0 (2020-07-02)

### Changed

- ♻️ Refactor to support config command [[42ce255](https://github.com/segersniels/gitmoji/commit/42ce2554f003a364ca119b4ba86944e2a989a3e7)]


<a name="1.1.1"></a>
## 1.1.1 (2020-06-18)

### Miscellaneous

- 📝 Update usage info [[189a9b9](https://github.com/segersniels/gitmoji/commit/189a9b99763b23383d740b07c7d45a6b6c47fac2)]
- 📝 Update readme [[48e75c8](https://github.com/segersniels/gitmoji/commit/48e75c8285f3893164775a48cc65695ec916d0e2)]


<a name="1.1.0-beta.2"></a>
## 1.1.0-beta.2 (2020-06-18)

### Changed

- ♻️ Default duration 0 instead [[cb0d0af](https://github.com/segersniels/gitmoji/commit/cb0d0af2cf7f956d0690ae049bf778a947af445a)]


<a name="1.1.0-beta.1"></a>
## 1.1.0-beta.1 (2020-06-18)

### Changed

- 🔧 Add basic repo information [[e2e625d](https://github.com/segersniels/gitmoji/commit/e2e625deeed3c836c155d96c88904eaec6db04ad)]


<a name="1.1.0-beta.0"></a>
## 1.1.0-beta.0 (2020-06-18)

### Added

- ➕ Add configstore@5.0.1 [[6154e20](https://github.com/segersniels/gitmoji/commit/6154e202e9fe86fa5075d49f719e44a99e2b5456)]
- ✨ Add cache command [[966d828](https://github.com/segersniels/gitmoji/commit/966d8283a1f06ee8642e692d5ed8ea9a8811beb2)]
- ✨ Add basic local config storage [[25090fa](https://github.com/segersniels/gitmoji/commit/25090fa1ceacf68e7fcd4d51f06252d227a7c0b8)]

### Changed

- ⬆️ Bump deps [[2dd88d8](https://github.com/segersniels/gitmoji/commit/2dd88d835419a8d094aa058c7a28fbce2647fbb8)]
- ⚡ Keep config in mind when handling emoji cache [[03bff8f](https://github.com/segersniels/gitmoji/commit/03bff8f0710561f2aa9df884714416ceb2b6011f)]
- 🔧 Allow publishing beta packages for testing [[6eff5e8](https://github.com/segersniels/gitmoji/commit/6eff5e80af7334994a034487af11bbd7ee341ba4)]

### Miscellaneous

- 📝 Point to correct npm package [[b1897ca](https://github.com/segersniels/gitmoji/commit/b1897ca45fa3242abac3f0419915b7196dd34f42)]


<a name="1.0.2"></a>
## 1.0.2 (2020-06-17)

### Fixed

- 🚑 Forgot to add shebang [[e3a1b6b](https://github.com/segersniels/gitmoji/commit/e3a1b6baaf50f179fdbc54ffd0c894ce1069394e)]


<a name="1.0.1"></a>
## 1.0.1 (2020-06-17)

### Added

- 🎉 Initial commit [[3cf353c](https://github.com/segersniels/gitmoji/commit/3cf353c3a41f9ea33fc688ca10c220f3a6b765c3)]

### Changed

- 🔧 Add publishConfig [[eb02e31](https://github.com/segersniels/gitmoji/commit/eb02e3151216a2402d47edfb6a9c4d4c58cf2fd0)]
- 🔧 Fix package name [[de92cf3](https://github.com/segersniels/gitmoji/commit/de92cf34b9700a1b701cfabeb5268fb16991b79e)]

### Fixed

- 🚑 Provide default async handler [[897e921](https://github.com/segersniels/gitmoji/commit/897e921a470a361582129a4a3930436f005acd1b)]
- 💚 Strip npm from release description [[49c80ea](https://github.com/segersniels/gitmoji/commit/49c80eaf25c7a33be93329b93442221eeed3c60f)]

### Miscellaneous

- 📝 Add ci badge [[a2e7bd9](https://github.com/segersniels/gitmoji/commit/a2e7bd93ac451891264b8b47075d3322f8988bba)]
- 📝 Add README [[4e56e61](https://github.com/segersniels/gitmoji/commit/4e56e61f2828a052b813b92fb781e06626c9bbe0)]


