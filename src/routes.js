import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import PALETE from "./config/Theme";
import StackNavigationAnimationConfig from "./config/StackNavigationAnimationConfig";
const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress
  }
});

import Main from "./pages/Main";
import User from "./pages/User";
import Repository from "./pages/Repository";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: "Usuários"
        }
      },
      User: {
        screen: User,
        navigationOptions: ({ navigation }) => ({
          title: `${navigation.getParam("user").name}`
        })
      },
      Repository: {
        screen: Repository,
        navigationOptions: ({ navigation }) => ({
          title: `${
            navigation.getParam("repository").name.length < 25
              ? navigation.getParam("repository").name
              : navigation.getParam("repository").name.substring(0, 25) + "..."
          }`,
          transitionSpec: {
            open: StackNavigationAnimationConfig,
            close: StackNavigationAnimationConfig
          },
          cardStyleInterpolator: forFade
        })
      }
    },
    {
      defaultNavigationOptions: {
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: PALETE.primary.core
        },
        headerTintColor: PALETE.texts.inverted
      }
    }
  )
);

export default Routes;
