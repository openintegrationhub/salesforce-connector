![alpha](https://img.shields.io/badge/Status-Alpha-yellow.svg)

# Salesforce Connector

> Salesforce Connector for Open Integration Hub.


## Data model
This connector transforms to and from the salesforce contact data model, using these fields:

```json
{

}
```

## Usage

1. Create api client with salesforce
2. Set redirect uri to https://app.yourservice.com/callback/oauth2
3. Set contacts:read contacts:write addresses:read addresses:write
4. Set register secret in secret service
5. Add secret to flow step


## Actions

### upsertContact
This action will upsert a contact in Salesforce. If an ID is supplied, the connector will attempt to update an existing contact with this ID. If no ID is provided a new entry will be created instead.

## Triggers

### getContacts
This trigger will get all contacts from the associated Salesforce account and pass them forward. By default it will only fetch the first 100000 entries.

## Integrated Transformations

By default, this connector attempts to automatically transform data to and from the OIH Address Master Data model. If you would like to use your own transformation solution, simply set `skipTransformation: true` in the `fields` object of your flow configuration. Alternatively, you can also inject a valid, stringified JSONata expression in the `customMapping` key of the `fields` object, which will be used instead of the integrated transformation.
