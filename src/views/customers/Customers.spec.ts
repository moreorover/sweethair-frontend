import { mount } from '@vue/test-utils';
import ShowCustomers from '@/views/customers/ShowCustomers.vue';
import flushPromises from 'flush-promises';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { createTestingPinia } from '@pinia/testing';

import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCardGrid from '@/components/base/BaseCardGrid.vue';
import BaseConfirm from '@/components/base/BaseConfirm.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { useCustomersStore } from '@/store/customersStore';
import { customers } from './mockData';

describe('Customers', () => {
  it('jada jada', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('/customers').reply(200, customers);

    const wrapper = mount(ShowCustomers, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
        components: { BaseInput, BaseButton, BaseCardGrid, BaseConfirm, BaseModal, Button, Dialog },
      },
    });

    const customersStore = useCustomersStore();
    await flushPromises();

    const title = wrapper.find('[data-test="title"]');
    const cs = wrapper.find('[data-test="cs"]');

    expect(title.text()).toEqual('Customers');
    expect(customersStore.fetchAll).toHaveBeenCalledTimes(1);
    expect(mock.history.get.length).toBe(1);
    expect(customersStore.all).toEqual(customers);
    expect(customersStore.fetchAll).toHaveBeenLastCalledWith();
  });
});
