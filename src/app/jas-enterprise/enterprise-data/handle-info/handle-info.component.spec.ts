import { TestBed, inject } from '@angular/core/testing';

import { HandleInfoComponent } from './handle-info.component';

describe('a handle-info component', () => {
	let component: HandleInfoComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				HandleInfoComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([HandleInfoComponent], (HandleInfoComponent) => {
		component = HandleInfoComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});