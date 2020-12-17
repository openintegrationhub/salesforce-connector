/* eslint no-unused-expressions: "off" */

const { expect } = require('chai');
const { transform } = require('@openintegrationhub/ferryman');
const { personFromOih } = require('../lib/transformations/personFromOih');
const { personToOih } = require('../lib/transformations/personToOih');

describe('Transformations', () => {
  it('should transform a full message into salesforce format', async () => {
    const msg = {
      data: {
        firstName: 'Joe',
        lastName: 'Doe',
        gender: '',
        jobTitle: 'Technical',
        nickname: '',
        displayName: '',
        middleName: '',
        salutation: 'Mr.',
        title: 'Dr.',
        birthday: '01.02.1990',
        photo: 'someUrl',
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
          name: '1',
          description: 'CleanStatus',
        },
        {
          name: 'Newsletter',
          description: 'LeadSource',
        },
        {
          name: '0',
          description: 'HasOptedOutOfFax',
        },
        {
          name: '0',
          description: 'HasOptedOutOfEmail',
        }, {
          name: '0',
          description: 'DoNotCall',
        }, {
          name: 'Account 1',
          description: 'AccountName',
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
        Id: '007',
        Name: 'Joe Doe',
        FirstName: 'Joe',
        LastName: 'Doe',
        Title: 'Dr.',
        Salutation: 'Mr.',
        PhotoUrl: 'someUrl',
        // Department: 'Technical',
        // AccountId: '1',
        // AccountName: 'Account 1',
        // AssistentName: 'Jane Doe',
        // CleanStatus: '1',
        Description: '',
        // ReportsToId: 'Mr.Boss',
        Email: 'joe@doe.com',
        Fax: '123456789',
        MobilePhone: '0177123456',
        Phone: '040123456',
        AssistantPhone: '0401234561',
        HomePhone: '070999999',
        OtherPhone: '55555555',
        MailingAddress: {
          city: 'Somecity',
          country: 'Somecountry',
          geocodeAccuracy: null,
          latitude: null,
          longitude: null,
          postalCode: '12345',
          state: 'Somestate',
          street: 'Somestreet 1',
        },
        OtherAddress: {
          city: 'Othercity',
          country: 'Othercountry',
          geocodeAccuracy: null,
          latitude: null,
          longitude: null,
          postalCode: '23450',
          state: 'Otherstate',
          street: 'Otherstreet 2',
        },
        Birthdate: '01.02.1990',
        // HasOptedOutOfFax: '0',
        // HasOptedOutOfEmail: '0',
        // DoNotCall: '0',
        // LeadSource: 'Newsletter',
        // Level: '',
        // Languages__c: '',
      },
      metadata: {
        recordUid: '007',
        oihUid: 'Oih123',
      },
    };

    const response = transform(msg, {}, personFromOih);

    expect(response).to.deep.equal(expectedResponse);
  });

  it('should transform a full message into OIH format', async () => {
    const contact = {
      Id: '007',
      Name: 'Joe Doe',
      FirstName: 'Joe',
      LastName: 'Doe',
      Title: 'Dr.',
      Salutation: 'Mr.',

      PhotoUrl: 'someUrl',
      Department: 'Technical',
      AccountId: '1',
      AccountName: 'Account 1',
      AssistentName: 'Jane Doe',
      CleanStatus: '1',
      Description: '',
      ReportsToId: 'Mr.Boss',

      Email: 'joe@doe.com',
      Fax: '123456789',
      MobilePhone: '0177123456',
      Phone: '040123456',
      AssistantPhone: '0401234561',
      HomePhone: '070999999',
      OtherPhone: '55555555',

      MailingAddress: {
        city: 'Somecity',
        country: 'Somecountry',
        geocodeAccuracy: null,
        latitude: null,
        longitude: null,
        postalCode: '12345',
        state: 'Somestate',
        street: 'Somestreet 1',
      },
      OtherAddress: {
        city: 'Othercity',
        country: 'Othercountry',
        geocodeAccuracy: null,
        latitude: null,
        longitude: null,
        postalCode: '23450',
        state: 'Otherstate',
        street: 'Otherstreet 2',
      },

      Birthdate: '01.02.1990',

      HasOptedOutOfFax: '0',
      HasOptedOutOfEmail: '0',
      DoNotCall: '0',

      LeadSource: 'Newsletter',
      // Level: '',
      // Languages__c: '',
    };

    // This array has been ordered because chai natively cannot compare arrays members with different orders well
    const expectedResponse = {
      data: {
        firstName: 'Joe',
        lastName: 'Doe',
        gender: '',
        jobTitle: 'Technical',
        nickname: '',
        displayName: '',
        middleName: '',
        salutation: 'Mr.',
        title: 'Dr.',
        birthday: '01.02.1990',
        photo: 'someUrl',
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
          name: '1',
          description: 'CleanStatus',
        },
        {
          name: 'Newsletter',
          description: 'LeadSource',
        },
        {
          name: '0',
          description: 'HasOptedOutOfFax',
        },
        {
          name: '0',
          description: 'HasOptedOutOfEmail',
        }, {
          name: '0',
          description: 'DoNotCall',
        }, {
          name: 'Account 1',
          description: 'AccountName',
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
      metadata: { recordUid: '007' },
    };

    const response = transform(contact, {}, personToOih);

    expect(response).to.deep.equal(expectedResponse);
  });
});
