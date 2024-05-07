import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Khoa bệnh lao',
    'Khoa dinh dưỡng',
    'Khoa hô hấp phổi',
    'Khoa hồi sức',
    'Khoa nội tiết',
    'Khoa thần kinh',
    'Khoa tim mạch',
    'Khoa tiêu hóa',
    'Khoa Nội Tổng Quát',
    'Khoa Tai Mũi Họng',
    'Khoa Nhi',
    'Khoa Da Liễu',
    'Khoa Phẫu Thuật',
    'Khoa Sản',
    'Khoa Răng Hàm Mặt',
    'Khoa mắt',
    'Khoa Dược',
];

function getStyles(name, department, theme) {
    return {
        fontWeight:
            department.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function InputSelect({ formState, setFormState, disabled }) {
    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        // setdepartment(
        //   // On autofill we get a stringified value.
        //   // typeof value === "string" ? value.split(",") : value
        //   value
        // );
        setFormState((prev) => {
            return { ...prev, Department: value };
        });
    };
    return (
        <div>
            <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <InputLabel disabled={disabled} id="demo-multiple-name-label">
                    Bộ Phận Khoa
                </InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={formState.Department}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    fullWidth
                    disabled={disabled}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, formState.Department, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
