// import React from 'react'

// export default function ViewModal(datas) {

// let viewDatas = datas.datas;
// console.log("==viewDatas==",viewDatas);

//   return (
//     <div>
//       <h1>view</h1>
//     </div>
//   )
// }

import React from 'react';
import DataTable from 'react-data-table-component';
import { capitalizeFirstLetter } from '../utilities/Capitallised';

export default function ViewModal(datas) {
  let viewDatas = [datas.datas];
  console.log('==viewDatas==', viewDatas);

  const SpecificationsList = viewDatas.flatMap((spec, specIndex) => {
    console.log(spec, '==spec==');
    if ([spec] && spec.specItem) {
      return Object.entries(spec.specItem).map(([key, value], itemIndex) => {
        console.log('==valuessssssss==', value);
        return {
          subCategory: spec.subCatgName,
          specificationItem: key,
          controlType: value.ctrnlType,
          displayName: value.lblText,
          displayValues:
            Array.isArray(value.dispValues) && value.dispValues.length > 0
              ? value.dispValues[0] && typeof value.dispValues[0] === 'object'
                ? value.dispValues.map((ind) => ind.value).join(', ')
                : value.dispValues.join(', ')
              : '',
          isActive: value.isDisplayed ? 'Yes' : 'No',
          specIndex,
          itemIndex
        };
      });
    } else {
      return [];
    }
  });

  console.log('SpecificationsList==', SpecificationsList);

  const columns = [
    {
      name: 'Sub Category',
      selector: (row) => capitalizeFirstLetter(row.subCategory),
      sortable: true
    },
    {
      name: 'Specification Item',
      selector: (row) => capitalizeFirstLetter(row.specificationItem),
      sortable: true
    },
    {
      name: 'Control Type',
      selector: (row) => capitalizeFirstLetter(row.controlType),
      sortable: true
    },
    {
      name: 'Display Name',
      selector: (row) => capitalizeFirstLetter(row.displayName),
      sortable: true
    },
    {
      name: 'Display Values',
      selector: (row) => {
        return capitalizeFirstLetter(row.displayValues);
      },
      sortable: true
    },
    {
      name: 'Is Active',
      selector: (row) => row.isActive,
      sortable: true
    }
  ];

  return (
    <div>
      <DataTable columns={columns} data={SpecificationsList} />
    </div>
  );
}
