import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { axe } from  'vitest-axe';
import MovieDetail from '../MovieDetail.vue';

describe('MovieDetail Accessibility', () => {
    it('should not have any automatic accessibility violations', async () => {
        //1. Mount the component
        const wrapper = mount(MovieDetail);

        //2. Run axe-core against the rendered HTML
        const results = await axe(wrapper.element);

        //3. Assert no violations
        //if this fails, the console will print the specific WGAC violation
        expect(results).toHaveNoViolations();
    })
})