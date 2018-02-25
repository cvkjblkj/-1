import { TestBed, inject } from '@angular/core/testing';

import { MyEnterpriseComponent } from './myEnterprise.component';

describe('a myEnterprise component', () => {
	let component: MyEnterpriseComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MyEnterpriseComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([MyEnterpriseComponent], (MyEnterpriseComponent) => {
		component = MyEnterpriseComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});