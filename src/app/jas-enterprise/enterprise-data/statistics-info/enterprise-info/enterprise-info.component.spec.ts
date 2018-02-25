import { TestBed, inject } from '@angular/core/testing';

import { EnterpriseInfoComponent } from './enterprise-info.component';

describe('a enterprise-info component', () => {
	let component: EnterpriseInfoComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				EnterpriseInfoComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([EnterpriseInfoComponent], (EnterpriseInfoComponent) => {
		component = EnterpriseInfoComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});