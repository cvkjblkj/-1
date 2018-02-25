import { TestBed, inject } from '@angular/core/testing';

import { PasswordInfoComponent } from './password-info.component';

describe('a password-info component', () => {
	let component: PasswordInfoComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				PasswordInfoComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([PasswordInfoComponent], (PasswordInfoComponent) => {
		component = PasswordInfoComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});