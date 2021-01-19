import request from '@/utils/request';
import {Api} from '@/services/api';

export async function fakeAccountLogin(params) {
  return request(Api.login, {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
