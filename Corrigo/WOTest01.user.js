// ==UserScript==
// @name         Corrigo WO Test01
// @namespace    http://tampermonkey.net/
// @version      2025-04-09
// @description  First test implementing a Tampermonkey script to improve Corrigo work order creation workflow.
// @author       brett.packard@delta.com
// @author       brett.packard@jll.com
// @author       brettjayp@gmail.com
// @match        https://az-am-ent-f3.corrigo.com/corpnet/workorder/workorderlist.aspx
// @icon         https://www.google.com/s2/favicons?sz=64&domain=corrigo.com
// @grant        none
// ==/UserScript==

'use strict'

//
// Variables and Constants
var cumulative = 0;
const name = "Corrigo WO Test - Make new sims WO";

//
// Initial actions
console.log(`!!LOGGING!! Running userscript ${name}`);

//
// Helper Functions
/*
Function name:

Arguments:

Purpose:

Steps:

Notes:

*/
function sleep(ms){
    //console.log(`sleep(ms) ms= ${ms}\ncumulative = ${cumulative}`);
    cumulative += ms;
    return new Promise(resolve => setTimeout(resolve, cumulative));
}

/*
Function name:

Arguments:

Purpose:

Steps:

Notes:

*/
function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*
Function name:

Arguments:

Purpose:

Steps:

Notes:

*/
function newWorkOrder(){
    const el_WOAdd = document.querySelector('[title="Add new Work Order"]');

    if(el_WOAdd){
        el_WOAdd.click();
    }else{
        alert('ERROR: newWorkOrder()');
    }
}

/*
Function name:
    siteSims()
Arguments:
    None
Purpose:
    After opening the new work order modal, this will find,
    select, and set the property location to the sims building
    by using the address. We don't use the property name input
    field because its autocomplete and dropdown features cause
    too much headache to successfully select the property. The
    address input field is much more simple and friendly.
Steps:
    Select the dropdown
    Select Property
    Enter address in field
    Click submit button in the only option
Notes:
    Noticed that I don't need to bother with the annoying
    dropdown selector if I use the address search. I will
    comment out the dropdown code for now.

*/
function siteSims(){
    // const el_PortPropSel = document.querySelectorAll('[class="k-picker k-dropdownlist corrigo-scope-selector-dropdown k-picker-solid k-picker-md k-rounded-md"]')[1];
    // const el_PropSel = document.querySelectorAll('[class="k-list-item k-item"]', '[title="Property"]')[1];
    const el_AddInput = document.querySelector('[placeholder="Name, Street, City, State, or Zip"]');
    const el_Search = document.querySelectorAll('[class="filter-apply btn btn-primary"]')[1];

    /*
    if(el_PortPropSel){
        el_PortPropSel.click();
    }else{
        alert('ERROR: siteSims()\nif(el_PortPropSel)');
    }

    if(el_PropSel){
        sleep(1500).then(() => el_PropSel.click());
    }else{
        alert('ERROR: siteSims()\nif(el_PropSel)');
    }
    */

    if(el_AddInput){
        sleep(500).then(() => el_AddInput.click());
        sleep(500).then(() => {el_AddInput.value = "4829 w Amelia"});
    }else{
        alert('ERROR: siteSims()\nif(el_AddInput)');
    }

    if(el_Search){
        sleep(500).then(() => el_Search.click());
        sleep(500).then(() => document.querySelectorAll('[title="Select and Continue"]')[0].click());
    }else{
        alert('ERROR: siteSims()\nif(el_Search)');
    }
}

/*
Function name:

Arguments:

Purpose:

Steps:

Notes:

*/
function confContact(){
    const next = document.querySelectorAll('[data-testid="id-btn-save"]');
    if(next){
        sleep(500).then(() => next.click());
    }else{
        alert('ERROR: confContact()\nif(next)');
    }
}

//
// Main function
function main(){
    window.addEventListener('load', function(){console.log('!!LOGGING!! Page is loaded')});
    sleep(3000).then(() => newWorkOrder());
    sleep(1000).then(() => siteSims());
    sleep(1000).then(() => confContact());
}

main();
