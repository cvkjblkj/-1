import { TestBed, inject } from '@angular/core/testing';

import { StatisticsInfoComponent } from './statistics-info.component';

describe('a statistics-info component', () => {
	let component: StatisticsInfoComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				StatisticsInfoComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([StatisticsInfoComponent], (StatisticsInfoComponent) => {
		component = StatisticsInfoComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});