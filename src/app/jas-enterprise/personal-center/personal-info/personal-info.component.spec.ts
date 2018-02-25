import { TestBed, inject } from '@angular/core/testing';

import { PersonalInfoComponent } from './personal-info.component';

describe('a personal-info component', () => {
	let component: PersonalInfoComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				PersonalInfoComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([PersonalInfoComponent], (PersonalInfoComponent) => {
		component = PersonalInfoComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});