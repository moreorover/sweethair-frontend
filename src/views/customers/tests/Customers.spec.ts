import { mount } from '@vue/test-utils';
import ShowCustomers from '@/views/customers/ShowCustomers.vue';
import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import apiClient from '@/axios/axios';
import { createTestingPinia, TestingOptions } from '@pinia/testing';
import router from '@/router';
import { useCustomersStore } from '@/store/customersStore';
import { customers } from './mockData';

import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCardGrid from '@/components/base/BaseCardGrid.vue';
import BaseConfirm from '@/components/base/BaseConfirm.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const mock = new MockAdapter(apiClient);
mock.onGet('/customers').reply(200, customers);

mock.onGet('/auth/me').reply(200, {
  createdOn: '2021-08-26T20:16:44.175Z',
  modifiedOn: '2021-08-26T20:16:53.312Z',
  id: '5a1bfa0a-a988-4fc5-af72-442f7f549fed',
  firstName: 'Admin',
  lastName: 'Sweet',
  email: 'test@gmail.com',
  role: {
    id: 1,
    name: 'Admin',
  },
});

function factory(options?: TestingOptions) {
  const wrapper = mount(ShowCustomers, {
    global: {
      plugins: [createTestingPinia(options), router],
      components: { BaseInput, BaseButton, BaseCardGrid, BaseConfirm, BaseModal, Button, Dialog },
    },
  });

  const customersStore = useCustomersStore();

  return { wrapper, customersStore };
}

describe('Customers', () => {
  const { wrapper, customersStore } = factory({ stubActions: false });

  it('mocked axios requests called 2 time', async () => {
    await flushPromises();
    expect(mock.history.get.length).toBe(2);
  });

  it('check store', async () => {
    await flushPromises();
    expect(customersStore.fetchAll).toHaveBeenCalledTimes(1);
    expect(customersStore.getAll).toEqual(customers);
    expect(customersStore.fetchAll).toHaveBeenLastCalledWith();
  });

  it('page title is displayed', async () => {
    await flushPromises();
    const title = wrapper.find('[data-test="title"]');
    expect(title.text()).toEqual('Customers');
  });

  it('All mock data cards are displayed', async () => {
    await flushPromises();
    const css = wrapper.findAll('[data-test^="customer-card-"');
    expect(css.length).toEqual(43);
  });

  it('All mock data cards are displayed', async () => {
    await flushPromises();
    const css = wrapper.findAll('[data-test^="customer-card-"');
    expect(css.length).toEqual(43);
  });

  it('Specific card is displayed', async () => {
    await flushPromises();
    const cs = wrapper.find('[data-test="customer-card-c40e8d86-d675-4b7c-8a87-efce1858f12f"]');
    expect(cs.text()).toContain('1113234234');
  });
});