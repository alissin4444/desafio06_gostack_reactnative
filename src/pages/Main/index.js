import React, { Component } from "react";

import { AsyncStorage, Keyboard, ActivityIndicator } from "react-native";

import { MaterialIcons } from "@expo/vector-icons/";
import api from "../../services/api";

import PALETE from "../../config/Theme";
import Container from "../../components/Container";
import ValidatorText from "../../components/ValidatorText";

import {
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText
} from "./styles";

export default class Main extends Component {
  state = {
    newUser: "",
    users: [],
    loading: false,
    validate: {
      display: false,
      content: ""
    }
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem("users");

    if (users) {
      this.setState({
        users: JSON.parse(users)
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem("users", JSON.stringify(users));
    }
  }

  handleSubmit = async () => {
    const { users, newUser } = this.state;

    if (newUser === "") {
      this.setState({
        validate: {
          display: true,
          content: "Preencha corretamente"
        }
      });
      return false;
    }

    const userAlreadyIsAdded = users.filter(user => user.login === newUser);

    if (userAlreadyIsAdded.length > 0) {
      this.setState({
        newUser: "",
        loading: false,
        validate: {
          display: true,
          content: `O usuário ${newUser} já foi adicionado anteriormente`
        }
      });
      Keyboard.dismiss();

      return false;
    }

    this.setState({
      newUser: "",
      loading: true
    });
    Keyboard.dismiss();

    let response = [];

    try {
      response = await api.get(`/users/${newUser}`);
    } catch (err) {
      this.setState({
        validate: {
          display: true,
          content: "Usuário não encontrado"
        },
        loading: false
      });

      Keyboard.dismiss();
      return false;
    }

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url
    };

    this.setState({
      users: [...users, data],
      loading: false,
      validate: {
        display: false
      }
    });
  };

  handleNavigate = user => {
    const { navigation } = this.props;
    navigation.navigate("User", {
      user
    });
  };

  render() {
    const { users, newUser, loading, validate } = this.state;

    return (
      <Container background={PALETE.background.core}>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleSubmit}
          />
          <SubmitButton loading={loading} onPress={this.handleSubmit}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <MaterialIcons name="person-add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        {validate.display && (
          <ValidatorText size={14}>{validate.content}</ValidatorText>
        )}

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
