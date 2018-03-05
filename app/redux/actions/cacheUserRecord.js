import constant from './constants';

export default function (userRecords) {
  return {type: constant.saveUserRecord, value: userRecords};
}
