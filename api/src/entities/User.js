// @flow
import isEmail from 'validator/lib/isEmail';
import isBoolean from 'validator/lib/isBoolean';
import isAlphaNumeric from 'validator/lib/isAlphanumeric';
import isEmpty from 'validator/lib/isEmpty';
import isIn from 'validator/lib/isIn';
import isLength from 'validator/lib/isLength';
import isNumeric from 'validator/lib/isNumeric';
import { isIrMobNumber } from '../validation';

interface Entity {
  validate(): boolean;
}

type UserAttributes = {
  mobileNumber?: string,
  nickname: string,
  email?: string,
  password?: string,
  birthDate?: string, // 'dd-mm-yyyy'
  isAdmin?: boolean,
};

type Account = {
  userId: string,

  emailVerified?: boolean,
  mobVerified?: boolean,

  passwordResetToken?: string,
  passwordRestTokenSent?: boolean,
  passwordResetTokenExpiresAt?: number,

  registrationCode?: string,
  registrationCodeSent?: boolean,
  registrationCodeExpiresAt?: number,
  status: 'PENDING_VERIFICATION' | 'PENDING_PASSWORD_CREATION' | 'VERIFIED',
  verifiedAt: number,
};
type Settings = {
  userId: string,
  avatarId: string, // avatar Id
};

class User implements Entity {
  constructor(attrs: UserAttributes) {
    Object.assign(this, attrs);
  }

  getAttrs() {
    return [
      'birthDate',
      'email',
      'isAdmin',
      'mobileNumber',
      'nickname',
      'password',
    ];
  }

  getAttrsWithValidationRules() {
    return [
      [
        'birthDate',
        [
          { fn: isNumeric, msg: 'invalid birth date' },
          { fn: isEmpty, msg: 'Invalid birth date' },
        ],
      ],
      ['email', [{ fn: isEmail, msg: 'Invalid email address' }]],
      ['isAdmin', [{ fn: isBoolean, msg: 'Invalid isAdmin value' }]],
      [
        'mobileNumber',
        { fn: isIrMobNumber, msg: 'Invalid IR mobile phone number' },
      ],
      ['nickname', [{ fn: isAlphaNumeric, msg: 'Invalid nickname' }]], // @FIX: allow emoji and also persian alphanumeric values
      ['password', [{ fn: isLength, msg: 'Invalid password' }]], // @FIX: bind it with appropriate min values and other specification required for passwords
    ];
  }

  validate(attr, value) {
    if (!this.getAttrs().includes(attr)) {
      return {
        success: false,
        attr,
        value,
        errors: [`attribute ${attr} does not exits on User entity`]
      };
    }
    const [attrName, rules] = this.getAttrsWithValidationRules().find(
      ([entryName]) => entryName === attr
    );

    const errors = [];
    rules.forEach(({ fn, msg }) => {
      if (!fn(value)) {
        errors.push(msg);
      }
    });

    if (errors.length !== 0) {
      return { success: false, attr, value, errors };
    }
    return {
      success: true,
    };
  }

  validateAll() {}
}

export default User;
