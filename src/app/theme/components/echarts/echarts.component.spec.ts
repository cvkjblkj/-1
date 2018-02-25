import { TestBed, inject } from '@angular/core/testing';

import { EchartsComponent } from './echarts.component';

describe('a echarts component', () => {
	let component: EchartsComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				EchartsComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([EchartsComponent], (EchartsComponent) => {
		component = EchartsComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});