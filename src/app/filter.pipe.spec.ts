
/* tslint:disable:no-unused-variable */

import { FilterPipe } from './filter.pipe';

describe('Pipe: Default', () => {
   let pipe: FilterPipe;

   beforeEach(() => {
       pipe = new FilterPipe();
   });

   it('providing no value returns items', () => {
       const items = null;
       const searchText = 'New';
       expect(pipe.transform(items, searchText).length).toBe(0);
   });

   it('providing a value returns value when the searchText is empty', () => {
    const items = [{
        'firstName': 'Persia',
        'lastName': 'Paulraj',
        'empId': '459012',
        'userId': '5c600f2cd76fbc29a8501452'
      },
      {
        'firstName': 'Indhu',
        'lastName': 'Prakash',
        'empId': '345678',
        'userId': '5c600fe6b3de090868cc11c4'
      }];
    const searchText = '';
    expect(pipe.transform(items, searchText).length).toBe(2);
   });

   it('Return the search result array, when the searchText is present and valid for ADD USER page', () => {
    const items = [{
        'firstName': 'Persia',
        'lastName': 'Paulraj',
        'empId': '459012',
        'userId': '5c600f2cd76fbc29a8501452'
      },
      {
        'firstName': 'Indhu',
        'lastName': 'Prakash',
        'empId': '345678',
        'userId': '5c600fe6b3de090868cc11c4'
      }];
    const searchText = 'Paulraj';
    expect(pipe.transform(items, searchText)[0]['lastName']).toBe('Paulraj');
   });

   it('Return the search result array, when the searchText is present and valid for ADD PROJECT page', () => {
    const items = [{
        '_id': '5c694bd2808f9616f44c6281',
        'projectName': 'American Ship',
        'startDate': '2019-02-22',
        'endDate': '2020-02-14',
        'priority': 22,
        'manager': 'Indhu Prakash',
        'status': 'Not Updated',
        'noOfTasks': 0,
        'projectId': '5c694bd2808f9616f44c6280'
      },
      {
        '_id': '5d556d183bc60017acd74d4a',
        'projectName': 'Sample Project',
        'startDate': '2019-08-15',
        'endDate': '2020-01-30',
        'priority': 23,
        'manager': 'Dennison Peter',
        'status': 'In-Progress',
        'noOfTasks': 0,
        'projectId': '5d556d183bc60017acd74d49'
      }];
    const searchText = 'American Ship';
    expect(pipe.transform(items, searchText)[0]['projectName']).toBe('American Ship');
   });
});
