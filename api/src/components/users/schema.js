const userSchema = {
  $id: 'https://nahangz.com/schemas/user.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: '',
  description: '',
  type: 'object',
  properties: {
    mobileNumber: {
      type: 'string',
      minLength: 10,
      maxLength: 11,
    },
    password: {
      type: 'string',
      minLength: 8,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    isAdmin: {
      type: 'boolean',
      default: false,
    },
  },
  required: ['mobileNumber', 'password', 'isAdmin'],
  additionalProperties: false,
};

const accountSchema = {
  properties: {
    userId: {
      type: 'string',
    },
    emailVerified: {
      type: 'boolean',
    },
    mobVerified: {
      type: 'boolean',
    },
    passwordReset: {
      type: 'object',
      properties: {
        token: { type: 'string' },
        sentAt: { type: 'number' },
        expiresAt: { type: 'number' },
        destination: { type: 'string', enum: ['email', 'cellphone'] },
      },
    },

    registration: {
      type: 'object',
      properties: {
        token: { type: 'string' },
        sentAt: { type: 'number' },
        expiresAt: { type: 'number' },
        destination: { type: 'string', enum: ['email', 'cellphone'] },
      },
    },

    status: {
      type: 'string',
      enum: [
        'PENDING_SENDING_REGISTRATION_CODE',
        'PENDING_REGISTRATION_VERIFICATION',
        'VERIFIED_REGISTRATION_AND_PENDING_PASSWORD_CREATION',
        'COMPLETED',
      ],
    },
    verifiedAt: {
      type: 'number',
    },
  },
};

const settingsSchema = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    avatarId: { type: 'string' },
  },
  required: ['userId', 'avatarId'],
};

export { userSchema, accountSchema, settingsSchema };
