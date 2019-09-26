import { shallow, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import SignIn from '@/views/SignIn.vue';

import appStoreModule from '@/store/modules/app';
import settingsStoreModule from '@/store/modules/settings';
import userStoreModule from '@/store/modules/user';

const localVue = createLocalVue();

localVue.use(Vuex);

const factory = (values = {}) => {
  return shallowMount(SignIn, {
    data: () => ({
      ...values,
    }),
  });
};

describe('SignIn.vue', () => {
  let actions;
  let state;
  let store;

  beforeEach(() => {
    state = {
      clicks: 2,
    },

    actions = {
      moduleActionClick: jest.fn(),
    },

    store = new Vuex.Store({
      modules: {
        appStoreModule: {
          state,
          actions,
          mutations,
        },
      },
    });
  });

  it('Кнопка "ВПЕРЁД" активна', () => {
    // const wrapper = shallow(SignIn, { store, localVue });
    const wrapper = factory(SignIn, { store, localVue });
    const button = wrapper.find('.v-btn');
    button.trigger('click');
    expect(actions.moduleActionClick).toHaveBeenCalled();
  });

	it('Поле "ЛОГИН" пустое', () => {
    const wrapper = factory();
    expect(wrapper.find('.email').text()).toEqual('');
  });

	it('Поле "ПАРОЛЬ" пустое', () => {
    const wrapper = factory();
    expect(wrapper.find('.password').text()).toEqual('');
  });

  it('Имя пользователя содержит недопустимую комбинацию символов', () => {
    const wrapper = factory({ username: ' '.repeat(2) });
    expect(wrapper.find('.error').exists()).toBeTruthy();
  });

  it('отрисовывает ошибку, когда имя пользователя больше 20 символов', () => {
    const wrapper = factory({ username: 'A'.repeat(20) });
    expect(wrapper.find('.error').exists()).toBeTruthy();
  });
});
