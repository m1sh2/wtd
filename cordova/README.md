# Walls To Defense
Mobile Arcade Tower Defense Game

## Key generation

```
keytool -genkey -v -keystore release.keystore -alias release -validity 10000
```

## Cordova setup (after Android SDK setup)

```
npm install -g cordova
```

```
cordova platform add android --save
```

```
cordova plugin add cordova-plugin-splashscreen --save
```

```
npm run watch:dev
```

## Builds

### Debug

```
npm run build:dev
```

### Release

```
npm run build:prod
```

## Keys

Create `release.keystore` key with alias `release` in the `../../keys/` for signing release version.
