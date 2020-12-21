![alpha](https://img.shields.io/badge/Status-Alpha-yellow.svg)

# Salesforce Connector

> Salesforce Connector for Open Integration Hub.


## Data model
This connector transforms to and from the salesforce contact data model, using these fields:

```json
contact:
{
  Id,
  Name,
  FirstName,
  LastName,
  Title,
  Salutation,
  PhotoUrl,
  Department,
  AccountId,
  AccountName,
  AssistentName,
  CleanStatus,
  ReportsToId,
  Email,
  Fax,
  MobilePhone,
  Phone,
  AssistantPhone,
  HomePhone,
  OtherPhone,
  MailingAddress,
  OtherAddress,
  Birthdate,
  HasOptedOutOfFax,
  HasOptedOutOfEmail,
  DoNotCall,
  LeadSource,
}
```

```json
account:
{
  Name,
  AccountNumber,
  AccountSource,
  Site,
  CleanStatus,
  Industry: 'Oil',
  DandbCompanyId,
  DunsNumber,
  Jigsaw,
  Fax,
  ShippingAddress.
  BillingAddress,
  Phone,
  Website,
  LastModifiedById,
  ParentId,
}
```

## Usage

1. Create api client with salesforce
2. Set redirect uri to https://app.yourservice.com/callback/oauth2
3. Set contacts:read contacts:write addresses:read addresses:write
4. Set register secret in secret service
5. Add secret to flow step
6. Add instanceUrl to flow step *

\* The instanceUrl is provided from salesforce as return value from the oauth2 login. So you might want to extend the secret service to add the value to the flow step automatically.

(The url might look like: https://your-salesforce-id.my.salesforce...)

## Actions

### upsertContact
This action will upsert a person (contact) in Salesforce. If an ID is supplied, the connector will attempt to update an existing contact with this ID. If no ID is provided a new entry will be created instead.

### upsertOrganization
This action will upsert a organization (account) in Salesforce. If an ID is supplied, the connector will attempt to update an existing contact with this ID. If no ID is provided a new entry will be created instead.

## Triggers

### getContacts
This trigger will get all persons (contact's) from the associated Salesforce account and pass them forward. By default it will only fetch the first 100000 entries.

### getOrganizations
This trigger will get all organizations (account's) from the associated Salesforce account and pass them forward. By default it will only fetch the first 100000 entries.


## Integrated Transformations

By default, this connector attempts to automatically transform data to and from the OIH Address Master Data model. If you would like to use your own transformation solution, simply set `skipTransformation: true` in the `fields` object of your flow configuration. Alternatively, you can also inject a valid, stringified JSONata expression in the `customMapping` key of the `fields` object, which will be used instead of the integrated transformation.
