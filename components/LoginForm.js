import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text
} from "native-base";

import { connect } from "react-redux";

// Actions
import { loginUser, registerUser } from "../redux/actions";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };
  handleChange = keyValue => {
    this.setState(keyValue);
  };

  handleSubmit = type => {
    // console.log(this.state);
    type === "login"
      ? this.props.login(this.state)
      : this.props.register(this.state);
  };

  render() {
    const { username, password } = this.state;
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input
                name="username"
                value={username}
                placeholder="Username"
                onChangeText={username => this.handleChange({ username })}
              />
            </Item>
            <Item last>
              <Input
                value={password}
                placeholder="Password"
                secureTextEntry
                name="password"
                onChangeText={password => this.handleChange({ password })}
              />
            </Item>
            <Button onPress={() => this.handleSubmit("login")}>
              <Text>Login</Text>
            </Button>
            <Button onPress={() => this.handleSubmit("signup")}>
              <Text>Signup</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: userData => dispatch(loginUser(userData)),
    register: userData => dispatch(registerUser(userData))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
