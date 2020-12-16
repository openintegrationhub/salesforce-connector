// /* eslint no-unused-expressions: "off" */
//
// const { expect } = require('chai');
// const { transform } = require('@openintegrationhub/ferryman');
// const { personFromOih } = require('../lib/transformations/personFromOih');
// const { personToOih } = require('../lib/transformations/personToOih');
//
// describe('Transformations', () => {
//   it('should transform a full message into salesforce format', async () => {
//     const msg = {
//       data: {
//         firstName: 'Jane',
//         lastName: 'Doe',
//         contactData: [
//           {
//             type: 'phone',
//             description: 'work',
//             value: '13579',
//           },
//           {
//             type: 'email',
//             value: 'jdoe@mail.com',
//           },
//           {
//             type: 'xing',
//             value: 'xing.com/JaneDoe',
//           },
//           {
//             type: 'phone',
//             value: '24680',
//           },
//           {
//             type: 'mobile',
//             value: '08642',
//           },
//           {
//             type: 'email',
//             description: 'work',
//             value: 'jdoe@workplace.com',
//           },
//           {
//             type: 'twitter',
//             value: '@jdoe',
//           },
//           {
//             type: 'linkedin',
//             value: 'linkedin.com/jane',
//           },
//           {
//             type: 'facebook',
//             value: 'facebook.com/janemacydoe',
//           },
//           {
//             type: 'mobile',
//             description: 'work',
//             value: '97531',
//           },
//           {
//             type: 'fax',
//             description: 'work',
//             value: '15038',
//           },
//           {
//             type: 'fax',
//             value: '01735',
//           },
//         ],
//         addresses: [
//           {
//             city: 'Homecity',
//             street: 'Homestreet',
//             streetNumber: '21',
//           },
//           {
//             city: 'Workcity',
//             zipcode: '12345',
//             street: 'Workstreet',
//             streetNumber: '42',
//             region: 'Workregion',
//             country: 'Workcountry',
//             description: 'work',
//           },
//         ],
//       },
//       metadata: {
//         recordUid: '12345',
//         oihUid: '54321',
//       },
//     };
//
//
//     const expectedResponse = {
//       data: {
//
//       },
//       metadata: {
//         recordUid: '12345',
//         oihUid: '54321',
//       },
//     };
//
//     const response = transform(msg, {}, personFromOih);
//
//     expect(response).to.deep.equal(expectedResponse);
//   });
//
//   it('should transform a full message into OIH format', async () => {
//     const contact = {
//
//     };
//
//     // This array has been ordered because chai natively cannot compare arrays members with different orders well
//     const expectedResponse = {
//       data: {
//         firstName: 'Jane',
//         lastName: 'Doe',
//         contactData: [
//           {
//             description: 'string1',
//             type: 'email',
//             value: 'jdoe@mail.com',
//           },
//           {
//             description: 'string2',
//             type: 'phone',
//             value: '13579',
//           },
//         ],
//         addresses: [
//           {
//             city: 'Somecity',
//             zipcode: '22123',
//             street: 'Somestreet',
//             streetNumber: '42',
//             region: 'Someregion',
//             country: 'Somecountry',
//             description: 'extended',
//           },
//         ],
//         photo: 'some picture',
//         relations: [
//           {
//             label: 'Employee',
//             partner: {
//               name: 'Wice',
//             },
//             type: 'PersonToOrganization',
//           },
//         ],
//       },
//       metadata: {
//         recordUid: '12345',
//       },
//     };
//
//     const response = transform(contact, {}, personToOih);
//
//     expect(response).to.deep.equal(expectedResponse);
//   });
// });
