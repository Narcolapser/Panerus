start:
	npx react-native start
run:
	npx react-native run-android
release:
	cd android && ./gradlew assembleRelease
	zipalign -v 4 android/app/build/outputs/apk/release/app-release.apk pan.apk
