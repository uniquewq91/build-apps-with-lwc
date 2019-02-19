import { LightningElement, api, wire } from 'lwc';

// We import a getFieldValue helper function to retrieve field values.
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

// We import the Bear__c.Supervisor__c field via a schema import 
// instead of using a hard-coded string like we did previously in the bear location component. 
// The major benefit of this approach is that it ensures referential integrity.
import SUPERVISOR_FIELD from '@salesforce/schema/Bear__c.Supervisor__c';

const bearFields = [SUPERVISOR_FIELD];

export default class BearSupervisor extends LightningElement {

    @api recordId; // Bear Id
    
    // We retrieve the bear record using the @wire decorator and the getRecord adapter.
	@wire(getRecord, { recordId: '$recordId', fields: bearFields })
	bear;
    get supervisorId() { // We expose a supervisorId expression. 
                         // The expression uses the getFieldValue function to retrieve the value of the supervisor field.
		return getFieldValue(this.bear.data, SUPERVISOR_FIELD);
	}
}