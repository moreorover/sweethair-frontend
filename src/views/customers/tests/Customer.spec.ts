import apiClient from '@/axios/axios';
import { createTestingPinia, TestingOptions } from '@pinia/testing';
import { flushPromises, mount } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { customers, appointments, transactions } from './mockData';
import ShowCustomer from '@/views/customers/ShowCustomer.vue';
import { useCustomersStore } from '@/store/customersStore';

import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCardGrid from '@/components/base/BaseCardGrid.vue';
import BaseConfirm from '@/components/base/BaseConfirm.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

jest.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: 'c40e8d86-d675-4b7c-8a87-efce1858f12f' },
  }),
  useRouter: jest.fn(() => ({
    replace: () => {},
    push: () => {},
  })),
  beforeEach: jest.fn(),
}));

const mock = new MockAdapter(apiClient);
mock.onGet('/customers').reply(200, customers);
mock.onGet('/appointments').reply(200, appointments);
mock.onGet('/transactions').reply(200, transactions);

function factory(options?: TestingOptions) {
  const wrapper = mount(ShowCustomer, {
    global: {
      plugins: [createTestingPinia(options)],
      components: { BaseInput, BaseButton, BaseCardGrid, BaseConfirm, BaseModal, Button, Dialog },
    },
  });

  const customersStore = useCustomersStore();

  return { wrapper, customersStore };
}

describe('Customer', () => {
  const { wrapper, customersStore } = factory({ stubActions: false });

  it('mocked axios requests called 3 time', async () => {
    await flushPromises();
    expect(mock.history.get.length).toBe(3);
  });

  it('check store', async () => {
    await flushPromises();
    expect(customersStore.fetchAll).toHaveBeenCalledTimes(1);
    expect(customersStore.getAll).toEqual(customers);
    expect(customersStore.fetchAll).toHaveBeenLastCalledWith();
  });

  it('displays customer full name', async () => {
    await flushPromises();
    const fullName = wrapper.find('[data-test="customer-fullname"]');
    expect(fullName.text()).toEqual('1113234234');
  });
});
