import React from 'react';
import { BackHandler } from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <NavBar>
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
    )
  }
}
