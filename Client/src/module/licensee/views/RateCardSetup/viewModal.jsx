import React from 'react';
import DataTable from 'react-data-table-component';
import { capitalizeFirstLetter } from '../utilities/Capitallised';

function viewModal(data) {
  let viewDatas = [data.data];
  console.log('==viewDatas', viewDatas);

  const SpecificationsList = viewDatas.flatMap((spec) => {
    console.log(spec, '==spec==');
    if ([spec] && spec.dispSpecItems) {
      return Object.entries(spec.dispSpecItems).map(([key, value], itemIndex) => {
        console.log('==key==', key);
        return {
          subCatgName: spec.subCatgName,
          combType: value.combType,
          specItem: value.specItem,
          pattern: spec.pattern,
          itemIndex
        };
      });
    } else {
      return [];
    }
  });

  console.log('SpecificationsList :', SpecificationsList);

  const columns = [
    {
      name: 'Sub Category',
      selector: (row) => capitalizeFirstLetter(row.subCatgName),
      sortable: true
    },
    {
      name: 'Specification Item',
      selector: (row) => capitalizeFirstLetter(row.specItem),
      sortable: true
    },
    {
      name: 'Pattern',
      selector: (row) => capitalizeFirstLetter(row.pattern),
      sortable: true
    },
    {
      name: 'Comb Type',
      selector: (row) => capitalizeFirstLetter(row.combType),
      sortable: true
    }
  ];

  return (
    <div>
      <DataTable columns={columns} data={SpecificationsList} />
    </div>
  );
}

export default viewModal;
