import { LightningElement, track } from 'lwc';

// We import the ursusResources adapter, which gives us access to a static resource associated with our app. 
// We use this adapter to build an appResources object that exposes the bear silhouette image URL in the template.
import ursusResources from '@salesforce/resourceUrl/ursus_park';

// We import the getAllBears adapter, which allows us to interact with the BearController.getAllBears() Apex method. 
// The BearController class is bundled in the code that you deployed at the beginning of this project. 
// The getAllBears method returns the result of a query that fetches all bear records.
/** BearController.getAllBears() Apex method */
import getAllBears from '@salesforce/apex/BearController.getAllBears';

export default class BearList extends LightningElement {

	@track bears;
	@track error;
	appResources = {
		bearSilhouette: ursusResources +'/img/standing-bear-silhouette.png',
    };
    
    // We implement the connectedCallback function, which allows us to execute code after the component is loaded. 
    // We use this function to call the loadBears function.
	connectedCallback() {
		this.loadBears();
	}
	loadBears() {

        // The loadBears function calls the getAllBears adapter. 
        // The adapter calls our Apex code and returns a JS promise. 
        // We use the promise to either save the returned data in the bears property or to report errors. 
        // Retrieving data using this approach is called imperative Apex.
		getAllBears()
			.then(result => {
				this.bears = result;
			})
			.catch(error => {
				this.error = error;
			});
	}
}