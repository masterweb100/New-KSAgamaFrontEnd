import { styled, Tab, Tabs } from '@mui/material';
import React from 'react'
import DataHasilOpnameTable from './dataHasilOpnameTable';
import DataOpnameTable from './dataOpnameTable';
import { opnameTable } from '../dummy';

const StyledTabs = styled(Tabs)({
    "& .MuiTabs-fixed": {
        backgroundColor: "#f4f5ff",
        border: "none",
        display: "flex",
        alignSelf: "flex-start",
    },
    "& .MuiTabs-flexContainer": {
        backgroundColor: "#f4f4f4",
        borderRadius: 100,
        padding: "0px 10px",
    },
    "& .MuiTabs-indicator": {
        display: "flex",
        justifyContent: "center",
        zIndex: 0,
        backgroundColor: "#fff",
        borderRadius: 100,
        height: "70%",
        boxShadow: "-1px 4px 2px -3px rgba(0,0,0,0.30)",
        bottom: "15%",
    },
});

const StyledTab = styled(Tab)({
    textTransform: "none",
    zIndex: 5,
    color: "#909090",
    "&.Mui-selected": {
        color: "#000",
    },
    "&.Mui-focusVisible": {
        backgroundColor: "#f4f5ff",
    },
});

const DataOpnameTabs = () => {
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(5);
    const [value, setValue] = React.useState('stok');

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <div>
            <StyledTabs value={value} onChange={handleChange}>
                <StyledTab disableRipple value={'stok'} label="Stok Opname" />
                <StyledTab disableRipple value={'hasil'} label="Hasil Stok Opname" />
            </StyledTabs>
            {
                value === 'stok' ?
                    <DataOpnameTable
                        data={opnameTable}
                        setPage={setPage}
                        setItemsPerPage={setItemsPerPage}
                    ></DataOpnameTable>
                    :
                    <DataHasilOpnameTable
                        data={opnameTable}
                        setPage={setPage}
                        setItemsPerPage={setItemsPerPage}
                    ></DataHasilOpnameTable>
            }
        </div>

    )
}

export default DataOpnameTabs;