import { TextProps, ViewProps, ModalProps, TextInputProps } from 'react-native'

export interface PickerProps {
    data: Array<any>,
    value: any,
    disabled?: boolean | undefined,
    onSelect: any,
    isReturnsSelected?: boolean | undefined,
    search?: boolean | undefined,
    singled?: boolean | undefined,
    placeholder?: string | undefined,
    placeholderStyle?: TextProps | undefined,
    onClose?: () => {},
    onOpen?: () => {},
    dropdownStyle?: ViewProps | undefined,
    ArrowIconComponent?: any | undefined,
    renderItem?: any | undefined,
    schema?: SchemaInterface | undefined,
    _modalProps?: ModalProps | undefined,
    DropdownHeaderComponent?: any | undefined,
    headerModalListStyle?: ViewProps | undefined,
    _searchTextInputProps?: TextInputProps | undefined,
    isSortable?: boolean | undefined,
    renderTitleInput?: any | undefined,
    placeholderInputSearch?: string | undefined,
}

export const SchemaInterfaceProps = {
    label: 'name',
    value: 'value',
    disabled: 'disabled'
}
export interface SchemaInterface {
    label: string,
    value: string,
    disabled: string
}

export const removeAccents = (str: string) => {
    var AccentsMap = <any>[
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ", "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str.toLowerCase();
}
