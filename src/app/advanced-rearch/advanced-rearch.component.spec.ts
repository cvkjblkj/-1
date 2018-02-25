import { TestBed, inject } from '@angular/core/testing';

import { AdvancedRearchComponent } from './advanced-rearch.component';

describe('a advanced-rearch component', () => {
	let component: AdvancedRearchComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AdvancedRearchComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([AdvancedRearchComponent], (AdvancedRearchComponent) => {
		component = AdvancedRearchComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});