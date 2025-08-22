// import React, { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import { tableCustomStyles } from '../tableStyle.jsx';
// import { IconButton, Tooltip } from '@mui/material';
// import { Delete } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import { capitalizeFirstLetter } from '../utilities/Capitallised';

// const SpecificationEditTabel = ({ specifications, setShowFeild, specificationsTableData }) => {
//   console.log("==specificationssss", specifications);
//   const navigate = useNavigate();

//   const SpecificationsList = specifications.flatMap((spec, specIndex) => {
//     console.log(spec, "==spec==");
//     if ([spec] && spec.specItem) {
//       return Object.entries(spec.specItem).map(([key, value], itemIndex) => {
//         console.log("==valuessssssss==", value);
//         return {
//           subCategory: spec.subCatgName,
//           specificationItem: key,
//           controlType: value.ctrnlType,
//           displayName: value.lblText,
//           displayValues: Array.isArray(value.dispValues) && value.dispValues.length > 0
//             ? (value.dispValues[0] && typeof value.dispValues[0] === 'object')
//               ? value.dispValues.map(ind => ind.value).join(', ')
//               : value.dispValues.join(', ')
//             : '',
//           isActive: value.isDisplayed ? 'Yes' : 'No',
//           specIndex,
//           itemIndex,
//         }
//       });
//     } else {
//       return [];
//     }
//   });

//   console.log("==SpecificationsList==",SpecificationsList);

//   const [specificationsTableData, setSpecificationsTableData] = useState([]);

//   useEffect(() => {

//     if (!specificationsTableData.length ) {
//         setSpecificationsTableData(SpecificationsList);
//     }
//   }, [SpecificationsList]);

//   console.log("==specificationsTableData==", specificationsTableData);

//   const onEdit = (singleSpecData, index) => {
//     setShowFeild(true);
//     console.log("=index=", index);
//     console.log("=singleSpecData=", singleSpecData);
//     console.log("=specificationsTableData=", specificationsTableData);
//     // navigate('/specificationEditPage', { state: { singleSpecData, specificationsTableData, index } });
//     navigate('/specificationEditPage', { state: { singleSpecData,  specificationsTableData, index } });
//   }

//   const handleDelete = (item) => {
//     setSpecificationsTableData((prevList) => prevList.filter((spec) => spec.itemIndex !== item.itemIndex));
//   };

//   const columns = [
//     {
//       name: 'Sub Category',
//       selector: row => capitalizeFirstLetter(row.subCategory),
//       sortable: true,
//     },
//     {
//       name: 'Specification Item',
//       selector: row => capitalizeFirstLetter(row.specificationItem),
//       sortable: true,
//     },
//     {
//       name: 'Control Type',
//       selector: row => capitalizeFirstLetter(row.controlType),
//       sortable: true,
//     },
//     {
//       name: 'Display Name',
//       selector: row => capitalizeFirstLetter(row.displayName),
//       sortable: true,
//     },
//     {
//       name: 'Display Values',
//       selector: row => {
//         return capitalizeFirstLetter(row.displayValues);
//       },
//       sortable: true,
//     },
//     {
//       name: 'Is Active',
//       selector: row => row.isActive,
//       sortable: true,
//     },
//     {
//       name: 'Actions',
//       cell: row => (
//         <Tooltip title="Edit">
//           <IconButton onClick={() => onEdit(row, row.specIndex)}>
//             <EditNoteIcon className='actn-icon2' />
//           </IconButton>
//           <IconButton onClick={() => handleDelete(row)}>
//             <Delete className='actn-icon3' />
//           </IconButton>
//         </Tooltip>
//       ),
//     },
//   ];

//   return (
//     <DataTable
//       title="Specifications"
//       customStyles={tableCustomStyles}
//       columns={columns}
//       data={specificationsTableData}
//       pagination
//     />
//   );
// };

// export default SpecificationEditTabel;

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from '../tableStyle.jsx';
import { IconButton, Tooltip } from '@mui/material';
// import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { capitalizeFirstLetter } from '../utilities/Capitallised';

const SpecificationTable = ({ specifications, setShowFeild }) => {
  console.log('==specificationssss', specifications);
  const navigate = useNavigate();

  const SpecificationsList = specifications.flatMap((spec, specIndex) => {
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

  console.log('==SpecificationsList', SpecificationsList);

  const [specificationsListss, setSpecificationsList] = useState([]);

  useEffect(() => {
    if (!specificationsListss.length || specificationsListss == []) {
      setSpecificationsList(SpecificationsList);
    }
  }, [SpecificationsList]);

  console.log('==specificationsListss==', specificationsListss);

  const onEdit = (singleSpecData, index) => {
    setShowFeild(true);
    console.log('=index=', index);
    console.log('=singleSpecData=', singleSpecData);
    navigate('/specificationEditPage', { state: { singleSpecData, SpecificationsList, index } });
  };

  // const handleDelete = (row) => {
  //   setSpecificationsList((prevList) =>
  //     prevList.filter((spec) =>
  //       spec.specIndex !== row.specIndex || spec.itemIndex !== row.itemIndex
  //     )
  //   );
  // };

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
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Tooltip title="Edit">
          <IconButton onClick={() => onEdit(row, row.specIndex)}>
            <EditNoteIcon className="actn-icon2" />
          </IconButton>
          {/* <IconButton onClick={() => handleDelete(row)}>
            <Delete className='actn-icon3' />
          </IconButton> */}
        </Tooltip>
      )
    }
  ];

  return <DataTable title="Specifications" customStyles={tableCustomStyles} columns={columns} data={SpecificationsList} pagination />;
};

export default SpecificationTable;
