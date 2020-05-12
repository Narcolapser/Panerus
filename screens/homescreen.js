import React from 'react';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <NavBar>
        <NavGroup>
          <NavButton onPress={() => alert('hi')}>
            <NavButtonText>
              {"Menu"}
            </NavButtonText>
          </NavButton>
        </NavGroup>
          <NavTitle>
            {"Panerus"}
          </NavTitle>
      </NavBar>
    )
  }
}
