// @flow
import validator from 'validator';
class Entity {}
class User extends Entity {
  static getValidators() {
    return {
      age: [],
      email: [],
      mobileNumber: [],
      nickname: [],
    }
  }

  constructor(props: {
    nickname: string,
    mobileNumber: string,
    age: number,
    email: string,
  }) {
    super();
    this.nickname = props.nickname;
    this.mobileNumber = props.mobileNumber;
    this.age = props.age;
    this.email = props.email;
  }

  validate() {
    const errors = {};

  }
}

export default User;
