/* eslint prefer-destructuring: "off" */

function personFromOih(msg) {
  // Handle contact data
  let email = '';
  let phone = '';
  let homephone = '';
  let otherphone = '';
  let mobilephone = '';
  let assistantphone = '';
  let fax = '';

  let index;
  if (msg.data.contactData) {
    const contactData = msg.data.contactData;
    // eslint-disable-next-line no-restricted-syntax
    for (index in msg.data.contactData) {
      if (contactData[index].type === 'email') {
        if (email === '') email = contactData[index].value;
      } else if (contactData[index].type === 'phone') {
        if (contactData[index].description
          && contactData[index].description.toLowerCase() === 'home'
        ) {
          homephone = contactData[index].value;
        } else if (phone === '') {
          phone = contactData[index].value;
        } else if (homephone === '') {
          homephone = contactData[index].value;
        } else if (assistantphone === '') {
          assistantphone = contactData[index].value;
        } else if (otherphone === '') {
          otherphone = contactData[index].value;
        }
      } else if (contactData[index].type === 'mobile' || contactData[index].type === 'mobil') {
        if (mobilephone === '') {
          mobilephone = contactData[index].value;
        }
      } else if (contactData[index].type === 'fax') {
        if (fax === '') {
          fax = contactData[index].value;
        }
      }
    }
  }

  const contact = {
    Name: `${msg.data.firstName ? msg.data.firstName : ''} ${msg.data.lastName ? msg.data.lastName : ''}`,
    FirstName: msg.data.firstName ? msg.data.firstName : '',
    LastName: msg.data.lastName ? msg.data.lastName : '',
    Title: msg.data.title ? msg.data.title : '',
    Salutation: msg.data.salutation ? msg.data.salutation : '',

    PhotoUrl: msg.data.photo ? msg.data.photo : '',
    // Department: 'Technical',
    // AccountId: '1',
    // AccountName: 'Account 1',
    // AssistentName: 'Jane Doe',
    // CleanStatus: '1',
    Description: msg.metadata.sourceApp ? msg.metadata.sourceApp : '',
    // ReportsToId: 'Mr.Boss',
    Email: email,
    Fax: fax,
    MobilePhone: mobilephone,
    Phone: phone,
    AssistantPhone: assistantphone,
    HomePhone: homephone,
    OtherPhone: otherphone,
    MailingAddress: {
      city: '',
      country: '',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: '',
      state: '',
      street: '',
    },
    OtherAddress: {
      city: '',
      country: '',
      geocodeAccuracy: null,
      latitude: null,
      longitude: null,
      postalCode: '',
      state: '',
      street: '',
    },
    Birthdate: msg.data.birthday ? msg.data.birthday : '',
    // HasOptedOutOfFax: '0',
    // HasOptedOutOfEmail: '0',
    // DoNotCall: '0',
    // LeadSource: '',
    // Level: '',
    // Languages__c: '',
  };

  const addresses = [];
  let length = (msg.data.addresses) ? msg.data.addresses.length : 0;
  if (length > 2) length = 2;
  for (let i = 0; i < length; i += 1) {
    addresses.push();
  }

  if (msg.data.addresses && Array.isArray(msg.data.addresses)) {
    index = 0;
    if (msg.data.addresses[index]) {
      contact.MailingAddress = {
        city: msg.data.addresses[index].city,
        country: msg.data.addresses[index].country,
        geocodeAccuracy: null,
        latitude: null,
        longitude: null,
        postalCode: msg.data.addresses[index].zipcode,
        state: msg.data.addresses[index].region,
        street: `${msg.data.addresses[index].street} ${msg.data.addresses[index].streetNumber}`,
      };
    }

    index = 1;
    if (msg.data.addresses[index]) {
      contact.OtherAddress = {
        city: msg.data.addresses[index].city,
        country: msg.data.addresses[index].country,
        geocodeAccuracy: null,
        latitude: null,
        longitude: null,
        postalCode: msg.data.addresses[index].zipcode,
        state: msg.data.addresses[index].region,
        street: `${msg.data.addresses[index].street} ${msg.data.addresses[index].streetNumber}`,
      };
    }
  }


  if (msg.metadata.recordUid) contact.Id = msg.metadata.recordUid;


  return { data: contact, metadata: msg.metadata };
}

module.exports = {
  personFromOih,
};
