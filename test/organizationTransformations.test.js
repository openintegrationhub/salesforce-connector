/* eslint no-unused-expressions: "off" */

const { expect } = require('chai');
const { transform } = require('@openintegrationhub/ferryman');
const { organizationFromOih } = require('../lib/transformations/organizationFromOih');
const { organizationToOih } = require('../lib/transformations/organizationToOih');

describe('Organization transformations', () => {
  it('should transform a full message into salesforce format', async () => {
    const msg = {
      data: {
        name: 'Joe Corp.',
        contactData: [{
          type: 'email',
          value: 'joe@doe.com',
          description: '',
        },
        {
          type: 'fax',
          value: '123456789',
          description: '',
        },
        {
          type: 'mobile',
          value: '0177123456',
          description: '',
        }, {
          type: 'phone',
          value: '040123456',
          description: '',
        }, {
          type: 'phone',
          value: '070999999',
          description: 'Home',
        },
        {
          type: 'phone',
          value: '0401234561',
          description: 'Assistant Jane Doe',
        },
        {
          type: 'phone',
          value: '55555555',
          description: 'Other',
        },
        ],
        categories: [{
          label: 'CleanStatus: 1',
        },
        {
          label: 'LeadSource: Newsletter',
        },
        {
          label: 'HasOptedOutOfFax: 0',
        },
        {
          label: 'HasOptedOutOfEmail: 0',
        }, {
          label: 'DoNotCall: 0',
        }, {
          label: 'AccountName: Account 1',
        }],
        addresses: [{
          street: 'Somestreet',
          streetNumber: '1',
          zipcode: '12345',
          city: 'Somecity',
          region: 'Somestate',
          country: 'Somecountry',
          description: '',
        }, {
          street: 'Otherstreet',
          streetNumber: '2',
          zipcode: '23450',
          city: 'Othercity',
          region: 'Otherstate',
          country: 'Othercountry',
          description: 'Other',
        }],
        relations: [],
      },
      metadata: {
        recordUid: '007',
        oihUid: 'Oih123',
      },
    };


    const expectedResponse = {
      data: {
        Name: 'Joe Corp.',
        AccountSource: 'SnazzyContacts',
        Site: 'Somestreet 1\n              12345 Somecity\n               Somecountry',
        Fax: '123456789',
        Phone: '040123456',
        Website: '',

        ShippingCity: 'Somecity',
        ShippingCountry: 'Somecountry',
        ShippingGeocodeAccuracy: null,
        ShippingLatitude: null,
        ShippingLongitude: null,
        ShippingPostalCode: '12345',
        ShippingState: 'Somestate',
        ShippingStreet: 'Somestreet 1',

        BillingCity: 'Othercity',
        BillingCountry: 'Othercountry',
        BillingGeocodeAccuracy: null,
        BillingLatitude: null,
        BillingLongitude: null,
        BillingPostalCode: '23450',
        BillingState: 'Otherstate',
        BillingStreet: 'Otherstreet 2',
      },
      metadata: { recordUid: '007', oihUid: 'Oih123' },
    };
    const response = transform(msg, {}, organizationFromOih);

    expect(response).to.deep.equal(expectedResponse);
  });

  it('should transform a full message into OIH format', async () => {
    const account = {
      Id: '333',
      OwnerId: 'someOwner',
      Name: 'Joe\'s Oil Corp.',
      AccountNumber: 'accountNumber',
      AccountSource: 'SnazzyContacts',
      Site: 'Some site',
      Active__c: '',
      YearStarted: '',
      CleanStatus: '1',
      Description: '',
      OperatingHoursId: '',
      Industry: 'Oil',
      CustomerPriority__c: '',
      DandbCompanyId: 'db123',
      DunsNumber: 'duns123',
      Jigsaw: 'jigsaw123',
      CreatedById: '1',
      Fax: '040123456',
      Ownership: '',
      AnnualRevenue: '',
      ShippingAddress: {
        city: 'Shippingcity',
        country: 'Shippingcountry',
        geocodeAccuracy: null,
        latitude: null,
        longitude: null,
        postalCode: '23450',
        state: 'Shippingstate',
        street: 'Shippingstreet 2',
      },
      NumberOfEmployees: '',
      NaicsDesc: '',
      NaicsCode: '',
      NumberofLocations__c: '',
      BillingAddress: {
        city: 'Billingcity',
        country: 'Billingcountry',
        geocodeAccuracy: null,
        latitude: null,
        longitude: null,
        postalCode: '12345',
        state: 'Billingstate',
        street: 'Billingstreet 1',
      },
      Sic: '',
      SLA__c: '',
      SLAExpirationDate__c: '',
      SLASerialNumber__c: '',
      Phone: '040 / 123456',
      TickerSymbol: '',
      Tradestyle: '',
      Type: '',
      UpsellOpportunity__c: '',
      Website: 'https://some.url',
      LastModifiedById: '',
      ParentId: 'Umbrella Corp.',
    };

    // This array has been ordered because chai natively cannot compare arrays members with different orders well
    const expectedResponse = {
      data: {
        name: "Joe's Oil Corp.",
        logo: '',
        contactData: [
          { type: 'phone', value: '040 / 123456', description: '' },
          { type: 'fax', value: '040123456', description: '' },
          { type: 'website', value: 'https://some.url', description: '' }],
        categories: [
          { label: 'CleanStatus: 1' },
          { label: 'Industry: Oil' },
          { label: 'D&B CompanyId: db123' },
          { label: 'D-U-N-S Number: duns123' },
          { label: 'Data.com Jigsaw: jigsaw123' }],
        addresses: [{
          street: 'Shippingstreet',
          streetNumber: '2',
          zipcode: '23450',
          city: 'Shippingcity',
          region: 'Shippingstate',
          country: 'Shippingcountry',
          description: 'Shipping',
        }, {
          street: 'Billingstreet',
          streetNumber: '1',
          zipcode: '12345',
          city: 'Billingcity',
          region: 'Billingstate',
          country: 'Billingcountry',
          description: 'Billing',
        }, {
          street: '',
          streetNumber: '',
          zipcode: '',
          city: '',
          region: '',
          country: '',
          description: 'Some site',
        }],
        relations: [
          {
            type: 'OrganizationToOrganization',
            label: 'Parent Company',
            uids: ['Umbrella Corp.'],
          },
        ],
      },
      metadata: { recordUid: '333' },
    };

    const response = transform(account, {}, organizationToOih);

    expect(response).to.deep.equal(expectedResponse);
  });
});
