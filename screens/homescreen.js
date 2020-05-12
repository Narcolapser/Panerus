import React from 'react';
import { BackHandler, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav';

export default class HomeScreen extends React.Component {
  render() {
    return (
    <SafeAreaView style={styles.container}>
      <NavBar style={styles.navBar}>
        <NavGroup>
          <NavButton onPress={() => alert('Coming soon.')}>
            <NavButtonText>
              {"New..."}
            </NavButtonText>
          </NavButton>
        </NavGroup>
          <NavTitle>
            {"Panerus"}
          </NavTitle>
          <NavGroup>
            <NavButton onPress={() => BackHandler.exitApp()}>
              <NavButtonText>
                {"Exit"}
              </NavButtonText>
            </NavButton>
          </NavGroup>
        </NavBar>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 20,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
    width: '50%'
  },
  text: {
    fontSize: 42,
  },
  navBar: {
    flex: 1,
    width: '100%',
  }
});
