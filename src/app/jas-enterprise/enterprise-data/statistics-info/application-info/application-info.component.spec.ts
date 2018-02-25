import { TestBed, inject } from '@angular/core/testing';

import { ApplicationInfoComponent } from './application-info.component';

describe('a application-info component', () => {
	let component: ApplicationInfoComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ApplicationInfoComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ApplicationInfoComponent], (ApplicationInfoComponent) => {
		component = ApplicationInfoComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});