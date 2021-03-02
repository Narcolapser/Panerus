start:
	npx react-native start

run:
	npx react-native run-android

release:
	rm pan.apk -f
	cd android && ./gradlew assembleRelease
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore pan.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk panerus -signedjar ./app-signed.apk
	zipalign -v 4 app-signed.apk pan.apk
