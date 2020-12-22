/* eslint prefer-destructuring: "off" */

function personToOih(contact) {
  const metadata = {
    recordUid: String(contact.Id),
  };

  let lastName;
  let firstName;
  if (contact.FirstName) {
    lastName = contact.LastName;
    firstName = contact.FirstName;
  } else {
    const name = (!contact.Name || contact.Name === null) ? ['', ''] : contact.Name.replace(/[\s]{2,}/gui, ' ').split(' ');
    lastName = name.pop();
    firstName = name.join(' ');
  }

  const person = {
    firstName,
    lastName,
    gender: contact.Gender ? contact.Gender : '',
    jobTitle: contact.Department ? contact.Department : '',
    nickname: '',
    displayName: '',
    middleName: '',
    salutation: contact.Salutation ? contact.Salutation : '',
    title: contact.Title ? contact.Title : '',
    birthday: contact.Birthdate ? contact.Birthdate : '',
    // eslint-disable-next-line no-nested-ternary
    photo: (contact.Picture ? contact.Picture : (contact.PhotoUrl ? contact.PhotoUrl : '')),
    contactData: [],
    categories: [],
    addresses: [],
    relations: [],
  };

  if ('Email' in contact && contact.Email !== null) {
    person.contactData.push({
      type: 'email',
      value: contact.Email,
      description: '',
    });
  }

  if ('Fax' in contact && contact.Fax !== null) {
    person.contactData.push({
      type: 'fax',
      value: contact.Fax,
      description: '',
    });
  }

  if ('MobilePhone' in contact && contact.MobilePhone !== null) {
    person.contactData.push({
      type: 'mobile',
      value: contact.MobilePhone,
      description: '',
    });
  }

  if ('Phone' in contact && contact.Phone !== null) {
    person.contactData.push({
      type: 'phone',
      value: contact.Phone,
      description: '',
    });
  }

  if ('HomePhone' in contact && contact.HomePhone !== null) {
    person.contactData.push({
      type: 'phone',
      value: contact.HomePhone,
      description: 'Home',
    });
  }

  if ('AssistantPhone' in contact && contact.AssistantPhone !== null) {
    person.contactData.push({
      type: 'phone',
      value: contact.AssistantPhone,
      description: `Assistant${contact.AssistentName ? ` ${contact.AssistentName}` : ''}`,
    });
  }

  if ('OtherPhone' in contact && contact.OtherPhone !== null) {
    person.contactData.push({
      type: 'phone',
      value: contact.OtherPhone,
      description: 'Other',
    });
  }

  if (contact.MailingAddress) {
    let street = contact.MailingAddress.street ? contact.MailingAddress.street : '';
    street = street.trim().replace(/[\s]{2,}/u, ' ');
    street = street.split(' ');
    const streetNumber = (street.length > 1) ? street.pop() : '';
    street = street.join(' ');

    person.addresses.push({
      street,
      streetNumber,
      // unit: ,
      zipcode: contact.MailingAddress.postalCode || '',
      city: contact.MailingAddress.city || '',
      // district: ,
      region: contact.MailingAddress.state || '',
      country: contact.MailingAddress.country || '',
      // countryCode: ,
      // primaryContact: ,
      description: '',
    });
  }

  if (contact.OtherAddress) {
    // contact.MailingAddress.street
    let street = contact.OtherAddress.street ? contact.OtherAddress.street : '';
    street = street.trim().replace(/[\s]{2,}/u, ' ');
    street = street.split(' ');
    const streetNumber = (street.length > 1) ? street.pop() : '';
    street = street.join(' ');

    person.addresses.push({
      street,
      streetNumber,
      // unit: ,
      zipcode: contact.OtherAddress.postalCode || '',
      city: contact.OtherAddress.city || '',
      // district: ,
      region: contact.OtherAddress.state || '',
      country: contact.OtherAddress.country || '',
      // countryCode: ,
      // primaryContact: ,
      description: 'Other',
    });
  }

  if ('CleanStatus' in contact && contact.CleanStatus !== null) {
    person.categories.push({
      label: `CleanStatus: ${contact.CleanStatus}`,
    });
  }

  if ('LeadSource' in contact && contact.LeadSource !== null) {
    person.categories.push({
      label: `LeadSource: ${contact.LeadSource}`,
    });
  }

  if ('HasOptedOutOfFax' in contact && contact.HasOptedOutOfFax !== null) {
    person.categories.push({
      label: `HasOptedOutOfFax: ${contact.HasOptedOutOfFax}`,
    });
  }

  if ('HasOptedOutOfEmail' in contact && contact.HasOptedOutOfEmail !== null) {
    person.categories.push({
      label: `HasOptedOutOfEmail: ${contact.HasOptedOutOfEmail}`,
    });
  }

  if ('DoNotCall' in contact && contact.DoNotCall !== null) {
    person.categories.push({
      label: `DoNotCall: ${contact.DoNotCall}`,
    });
  }

  if ('AccountName' in contact && contact.AccountName !== null) {
    person.categories.push({
      label: `AccountName: ${contact.AccountName}`,
    });
  }


  if (contact.organization && Array.isArray(contact.organization)) {
    const length = contact.organization.length;
    for (let i = 0; i < length; i += 1) {
      person.relations.push({
        type: 'PersonToOrganization',
        label: 'Employee',
        partner: {
          name: (Array.isArray(contact.organization[i]) ? contact.organization[i][0] : String(contact.organization[i])),
        },
      });
    }
  }

  if (contact.AccountId) {
    person.relations.push({
      type: 'OrganizationToPerson',
      label: 'Employee',
      uids: [(String(contact.AccountId))],
    });
  }

  if (contact.ReportsToId) {
    person.relations.push({
      type: 'PersonToPerson',
      label: 'Reports to',
      uids: [(String(contact.ReportsToId))],
    });
  }

  return { data: person, metadata };
}

module.exports = {
  personToOih,
};
