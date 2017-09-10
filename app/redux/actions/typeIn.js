import constants from './constants';

export default function typeIn(res) {
  return {type: constants.typeResult, typeResult: res};
}