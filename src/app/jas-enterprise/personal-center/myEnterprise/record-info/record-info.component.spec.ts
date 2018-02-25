import { TestBed, inject } from '@angular/core/testing';

import { RecordInfoComponent } from './record-info.component';

describe('a record-info component', () => {
	let component: RecordInfoComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				RecordInfoComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([RecordInfoComponent], (RecordInfoComponent) => {
		component = RecordInfoComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});