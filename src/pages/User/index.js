import React, { Component } from "react";
import { ActivityIndicator } from "react-native";

import api from "../../services/api";

import PALETE from "../../config/Theme";
import Container from "../../components/Container";

import {
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author
} from "./styles";

export default class User extends Component {
  state = {
    stars: [],
    loading: true,
    page: 1,
    refreshing: false
  };

  async componentDidMount() {
    this.load();
  }

  load = async (page = 1) => {
    const { stars } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam("user");
    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      loading: false,
      page: page
    });
  };

  loadMore = () => {
    const { page } = this.state;
    const nextPage = page + 1;
    this.load(nextPage);
  };

  refreshList = () => {
    this.setState(
      { refreshing: true, stars: [], refreshing: false },
      this.load
    );
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;
    const user = navigation.getParam("user");

    return (
      <Container background={PALETE.background.tint}>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator
            size={24}
            color={`${PALETE.primary.core}`}
            style={{ marginTop: 20 }}
          />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.5}
            onEndReached={this.loadMore}
            renderItem={({ item }) => (
              <Starred
                onPress={() =>
                  this.props.navigation.navigate("Repository", {
                    repository: item
                  })
                }
              >
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
