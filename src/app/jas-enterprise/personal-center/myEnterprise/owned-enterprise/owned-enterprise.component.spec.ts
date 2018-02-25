import { TestBed, inject } from '@angular/core/testing';

import { OwnedEnterpriseComponent } from './owned-enterprise.component';

describe('a owned-enterprise component', () => {
	let component: OwnedEnterpriseComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				OwnedEnterpriseComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([OwnedEnterpriseComponent], (OwnedEnterpriseComponent) => {
		component = OwnedEnterpriseComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});