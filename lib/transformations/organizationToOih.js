/* eslint prefer-destructuring: "off" */

function organizationToOih(account) {
  const metadata = {
    recordUid: String(account.AccountNumber),
  };

  const organization = {
    name: account.Name ? account.Name : '',
    logo: '',
    contactData: [],
    categories: [],
    addresses: [],
    relations: [],
  };

  if ('Phone' in account && account.Phone !== null) {
    organization.contactData.push({
      type: 'phone',
      value: account.Phone,
      description: '',
    });
  }

  if ('Fax' in account && account.Fax !== null) {
    organization.contactData.push({
      type: 'fax',
      value: account.Fax,
      description: '',
    });
  }

  if ('Website' in account && account.Website !== null) {
    organization.contactData.push({
      type: 'website',
      value: account.Website,
      description: '',
    });
  }

  if (account.ShippingAddress) {
    let street = account.ShippingAddress.street ? account.ShippingAddress.street : '';
    street = street.trim().replace(/[\s]{2,}/u, ' ');
    street = street.split(' ');
    const streetNumber = (street.length > 1) ? street.pop() : '';
    street = street.join(' ');

    organization.addresses.push({
      street,
      streetNumber,
      // unit: ,
      zipcode: account.ShippingAddress.postalCode || '',
      city: account.ShippingAddress.city || '',
      // district: ,
      region: account.ShippingAddress.state || '',
      country: account.ShippingAddress.country || '',
      // countryCode: ,
      // primaryaccount: ,
      description: 'Shipping',
    });
  }

  if (account.BillingAddress) {
    // account.MailingAddress.street
    let street = account.BillingAddress.street ? account.BillingAddress.street : '';
    street = street.trim().replace(/[\s]{2,}/u, ' ');
    street = street.split(' ');
    const streetNumber = (street.length > 1) ? street.pop() : '';
    street = street.join(' ');

    organization.addresses.push({
      street,
      streetNumber,
      // unit: ,
      zipcode: account.BillingAddress.postalCode || '',
      city: account.BillingAddress.city || '',
      // district: ,
      region: account.BillingAddress.state || '',
      country: account.BillingAddress.country || '',
      // countryCode: ,
      // primaryaccount: ,
      description: 'Billing',
    });
  }

  if (account.Site) {
    organization.addresses.push({
      street: '',
      streetNumber: '',
      // unit: ,
      zipcode: '',
      city: '',
      // district: ,
      region: '',
      country: '',
      // countryCode: ,
      // primaryaccount: ,
      description: account.Site,
    });
  }

  if ('CleanStatus' in account && account.CleanStatus !== null) {
    organization.categories.push({
      label: `CleanStatus: ${account.CleanStatus}`,
    });
  }

  if ('Industry' in account && account.Industry !== null) {
    organization.categories.push({
      label: `Industry: ${account.Industry}`,
    });
  }

  if ('Rating' in account && account.Rating !== null) {
    organization.categories.push({
      label: `Rating: ${account.Rating}`,
    });
  }

  if ('DandbCompanyId' in account && account.DandbCompanyId !== null) {
    organization.categories.push({
      label: `D&B CompanyId: ${account.DandbCompanyId}`,
    });
  }

  if ('DunsNumber' in account && account.DunsNumber !== null) {
    organization.categories.push({
      label: `D-U-N-S Number: ${account.DunsNumber}`,
    });
  }

  if ('Jigsaw' in account && account.Jigsaw !== null) {
    organization.categories.push({
      label: `Data.com Jigsaw: ${account.Jigsaw}`,
    });
  }

  if (account.ParentId) {
    organization.relations.push({
      type: 'OrganizationToOrganization',
      label: 'Parent Company',
      partner: {
        name: (String(account.ParentId)),
      },
      uids: [account.AccountNumber, (String(account.ParentId))],
    });
  }


  return { data: organization, metadata };
}

module.exports = {
  organizationToOih,
};
