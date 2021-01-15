import { extend } from 'vee-validate'
import { errorMessage } from '@/globals/errorMessage'
import { email, required } from 'vee-validate/dist/rules'
import { regexForms } from '@/globals/globals'

extend('required', {
  ...required,
  message: '{_field_} Is required'
})

extend('isNumber', {
  validate: (value) => regexForms.NUMBER.test(value),
  message: '{_field_} Is number'
})

extend("decimal", {
  validate: (value, { decimals = '*', separator = '.' } = {}) => {
    if (value === null || value === undefined || value === '') {
      return {
        valid: false
      };
    }
    if (Number(decimals) === 0) {
      return {
        valid: /^-?\d*$/.test(value),
      };
    }
    const regexPart = decimals === '*' ? '+' : `{1,${decimals}}`;
    const regex = new RegExp(`^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`);

    return {
      valid: regex.test(value),
    };
  },
  message: 'The {_field_} field must contain only decimal values'
})

extend('isVote', {
  validate: (value) => regexForms.VOTE.test(value),
  message: '{_field_} : less than or equal to 5'
})

extend('email', {
  ...email,
  message: errorMessage.INVALID_EMAIL
})

extend('minmax', {
  params: [{
    name: 'min',
    cast: (value) => {
      return Number(value)
    }
  }, {
    name: 'max',
    cast: (value) => {
      return Number(value)
    }
  }],
  validate: (value, params) => {
    return params.min <= value.toString().length && params.max >= value.toString().length
  },
  message: (params) => {
    return errorMessage.MINMAXLENGTH.replace('xx', params.min).replace('yy', params.max)
  }
})