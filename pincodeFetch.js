import { LightningElement, track, api } from 'lwc';
import getAddress from '@salesforce/apex/PincodeService.getAddress';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';

export default class PincodeFinder extends LightningElement {

    @track pincode = '';
    @track postOffices = [];
    @track isLoading = false;

    // modal
    @track showModal = false;
    @track selectedAddress;

    @api recordId; // account id

    handlePincodeChange(event){
        this.pincode = event.target.value;
    }

    handleSearch(){

        if(!this.pincode || this.pincode.length !== 6){
            this.showToast('Error','Enter valid 6 digit pincode','error');
            return;
        }

        this.isLoading = true;
        this.postOffices = [];

        getAddress({ pincode: this.pincode })
        .then(result=>{
            let data = JSON.parse(result);

            if(data[0].Status === "Success"){
                this.postOffices = data[0].PostOffice;
                this.showToast('Success','Address fetched','success');
            }else{
                this.showToast('Error','No address found','error');
            }
        })
        .catch(error=>{
            console.error(error);
            this.showToast('Error','API Error','error');
        })
        .finally(()=>{
            this.isLoading = false;
        });
    }

    handleReset(){
        this.pincode = '';
        this.postOffices = [];
    }

    // click card → open modal
    handleSelect(event){
        let index = event.currentTarget.dataset.index;
        this.selectedAddress = this.postOffices[index];
        this.showModal = true;
    }

    closeModal(){
        this.showModal = false;
    }

    // update account
    confirmUpdate(){

        const a = this.selectedAddress;

        const fields = {
            Id: this.recordId,
            BillingStreet: a.Name,
            BillingCity: a.Block,
            BillingState: a.State,
            BillingCountry: a.Country,
            BillingPostalCode: a.Pincode
        };

        updateRecord({ fields })
        .then(()=>{
            this.showToast('Success','Billing address updated','success');
            this.showModal = false;
        })
        .catch(error=>{
            console.error(error);
            this.showToast('Error','Update failed','error');
        });
    }

    showToast(title,message,variant){
        this.dispatchEvent(
            new ShowToastEvent({ title, message, variant })
        );
    }
}