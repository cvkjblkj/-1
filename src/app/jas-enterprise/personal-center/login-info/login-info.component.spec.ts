import { TestBed, inject } from '@angular/core/testing';

import { LoginInfoComponent } from './login-info.component';

describe('a login-info component', () => {
	let component: LoginInfoComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				LoginInfoComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([LoginInfoComponent], (LoginInfoComponent) => {
		component = LoginInfoComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});