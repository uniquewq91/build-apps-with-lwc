import { LightningElement, api, track, wire } from 'lwc';

// We import a getRecord adapter that allow us to use the Lightning Data Service 
// to retrieve records without having to write Apex.
import { getRecord } from 'lightning/uiRecordApi';

// We assemble a list of hard-coded field names from the Bear__c object in the fields constant. 
// Note that this approach doesn’t support referential integrity. 
// The existence of the object and fields cannot be checked at compile time. 
// This means that Bear__c or any of its fields could be deleted even though they are used in your code. 
const fields = [
	'Bear__c.Name',
	'Bear__c.Location__Latitude__s',
	'Bear__c.Location__Longitude__s'
];

export default class BearLocation extends LightningElement {
    
    // This property decorated with @api automatically receives the current record id.
    @api recordId;
    
    @track name;
	@track mapMarkers = [];
    
    // We use an @wire decorator on the loadBear function to fetch data and errors 
    // then pass them to the function. 
    // @wire is configured to call the getRecord adapter function with some parameters. 
    // Those parameters are the record id and the list of record fields that we wish to retrieve. 
    // Thanks to the @wire decorator, 
    // loadBears is automatically called when the component loads or when the record id changes.
    @wire(getRecord, { recordId: '$recordId', fields })
    loadBear({ error, data }) {
		if (error) {
			// TODO: handle error
		} else if (data) {
			// Get Bear data
			this.name = data.fields.Name.value;
			const Latitude = data.fields.Location__Latitude__s.value;
			const Longitude = data.fields.Location__Longitude__s.value;
			// Transform bear data into map markers
			this.mapMarkers = [{
				location: { Latitude, Longitude },
				title: this.name,
				description: `Coords: ${Latitude}, ${Longitude}`
			}];
		}
	}
	get cardTitle() {
		return (this.name) ? `${this.name}'s location` : 'Bear location';
	}
}