import { TestBed, inject } from '@angular/core/testing';

import { StepComponent } from './step.component';

describe('a step component', () => {
	let component: StepComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				StepComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([StepComponent], (StepComponent) => {
		component = StepComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});