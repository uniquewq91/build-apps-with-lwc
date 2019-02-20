// IMPERATIVE APEX
// import { LightningElement, track } from 'lwc';

// // We import the ursusResources adapter, which gives us access to a static resource associated with our app. 
// // We use this adapter to build an appResources object that exposes the bear silhouette image URL in the template.
// import ursusResources from '@salesforce/resourceUrl/ursus_park';

// // We import the getAllBears adapter, which allows us to interact with the BearController.getAllBears() Apex method. 
// // The BearController class is bundled in the code that you deployed at the beginning of this project. 
// // The getAllBears method returns the result of a query that fetches all bear records.
// /** BearController.getAllBears() Apex method */
// import getAllBears from '@salesforce/apex/BearController.getAllBears';

// export default class BearList extends LightningElement {

// 	@track bears;
// 	@track error;
// 	appResources = {
// 		bearSilhouette: ursusResources +'/img/standing-bear-silhouette.png',
//     };
    
//     // We implement the connectedCallback function, which allows us to execute code after the component is loaded. 
//     // We use this function to call the loadBears function.
// 	connectedCallback() {
// 		this.loadBears();
// 	}
// 	loadBears() {

//         // The loadBears function calls the getAllBears adapter. 
//         // The adapter calls our Apex code and returns a JS promise. 
//         // We use the promise to either save the returned data in the bears property or to report errors. 
//         // Retrieving data using this approach is called imperative Apex.
// 		getAllBears()
// 			.then(result => {
// 				this.bears = result;
// 			})
// 			.catch(error => {
// 				this.error = error;
// 			});
// 	}
// }

// WIRED APEX 1 
// import { LightningElement, wire } from 'lwc';

// import ursusResources from '@salesforce/resourceUrl/ursus_park';

// /** BearController.getAllBears() Apex method */
// import getAllBears from '@salesforce/apex/BearController.getAllBears';

// export default class BearList extends LightningElement {

//     // We’ve greatly simplified the JS code by decorating our bears property with wired Apex.
//     // All the data we need is now coming through this single line: @wire(getAllBears) bears;
// 	@wire(getAllBears) bears;
// 	appResources = {
// 		bearSilhouette: ursusResources +'/img/standing-bear-silhouette.png',
// 	};
// }

// WIRED APEX 2
// import { LightningElement, track, wire } from 'lwc';

// import { loadStyle } from 'lightning/platformResourceLoader';

// import ursusResources from '@salesforce/resourceUrl/ursus_park';

// /** BearController.searchBears(searchTerm) Apex method */
// import searchBears from '@salesforce/apex/BearController.searchBears';

// export default class BearList extends LightningElement {

//     // We add a searchTerm reactive property and we pass it as a parameter of our wired Apex call to searchBears.
// 	@track searchTerm = '';
// 	@wire(searchBears, {searchTerm: '$searchTermText'})
// 	bears;

//     connectedCallback() {
//         loadStyle(this, ursusResources + '/style.css');
//     }
    
// 	handleSearchTermChange(event) {
// 		// Debouncing this method: do not update the reactive property as
// 		// long as this function is being called within a delay of 300 ms.
// 		// This is to avoid a very large number of Apex method calls.
// 		window.clearTimeout(this.delayTimeout);
// 		const searchTerm = event.target.value;
// 		// eslint-disable-next-line @lwc/lwc/no-async-operation 
// 		this.delayTimeout = setTimeout(() => {
// 			this.searchTerm = searchTerm;
// 		}, 300);
// 	}
// 	get hasResults() {
// 		return (this.bears.data.length > 0);
// 	}
// }

import { NavigationMixin } from 'lightning/navigation';
import { loadStyle } from 'lightning/platformResourceLoader';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
import { LightningElement, track, wire } from 'lwc';
/** BearController.searchBears(searchTerm) Apex method */
import searchBears from '@salesforce/apex/BearController.searchBears';
export default class BearListNav extends NavigationMixin(LightningElement) {
	@track searchTerm = '';
	@wire(searchBears, {searchTerm: '$searchTerm'})
	bears;
	connectedCallback() {
		loadStyle(this, ursusResources + '/style.css');
	}
	handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.bears.data.length > 0);
	}
	handleBearView(event) {
		// Navigate to bear record page
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: event.target.bear.Id,
				objectApiName: 'Bear__c',
				actionName: 'view',
			},
		});
	}
}