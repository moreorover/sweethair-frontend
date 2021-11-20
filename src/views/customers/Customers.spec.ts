import { mount } from '@vue/test-utils';
import ShowCustomers from './ShowCustomers.vue';
import flushPromises from 'flush-promises';

describe('Customers', () => {
  it('jada jada', async () => {
    const wraper = mount(ShowCustomers);
    await flushPromises();

    console.log(wraper);
  });
});
