

import type * as React from "react";
import type {
    FlatListProps,
    LayoutChangeEvent,
    ModalProps,
    ScrollViewProps,
    StyleProp,
    TextInputProps,
    TextProps,
    TextStyle,
    ViewProps,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';

declare module "rn-select-kit" {
    export interface SchemaInterface {
        label: string;
        value: string;
        disabled: string;
    }
    export type SelectDropdownProps = {
        mode: 'MODAL' | 'PICKER',
        /**
       * value selected dropdown
       */
        value: any;
        /**
        * array of data that will be represented in dropdown, can be array of objects
        */
        data: Array<any>;
        /**
         *  disable dropdown. Default is false
         */
        disabled?: boolean | undefined;
        /**
        * function recieves selected item and its index in data array
        */
        onSelect: (selectedItem: any, index: number) => void;
        /**
        * return all value selected (onSelect) => Array<any>;  Default is false
        * isReturnsSelected = true => return []
        * isReturnsSelected = false => return {item: any, isSeleted: booleanƒ}
        */
        isReturnsSelected?: boolean | undefined;
        /**
         * singled dropdown. Default is true
         * */
        singled?: boolean | undefined;
        /**
         * placeholder input dropdown
         * */
        placeholder?: string | undefined;
        /**
        * placeholder styles input dropdown 
        * */
        placeholderStyle?: StyleProp<TextStyle> | undefined;
        /**
        * function close dropdown
        */
        onClose?: () => void;
        /**
        * function open dropdown
        */
        onOpen?: () => void;
        /**
        * styles input dropdown 
        * */
        dropdownStyle?: StyleProp<ViewStyle> | undefined;
        /**
        * arrow icon dropdown 
        * */
        ArrowIconComponent?: (props: {
            style: StyleProp<ViewStyle>;
            isOpen: boolean;
        }) => JSX.Element;
        /**
       * custom item dropdown 
       * */
        renderItem?: (props: {
            item: object,
            index: number,
            isSelected: boolean
        }) => JSX.Element;
        /**
        * custom item dropdown 
        * default :{
           label: 'name',
            value: 'value',
            disabled: 'disabled'
        }
        * */
        schema?: Partial<SchemaInterface> | undefined;
        /**
       * modal props 
       * */
        _modalProps?: ModalProps | undefined;
        /**
        * custom header list item dropdown modal 
        * */
        DropdownHeaderComponent?: (props: {
            onCloseModal: () => void;
            onSearch: (keyword) => void;
        }) => JSX.Element;
        /**
       * style header list item dropdown modal
       * */
        headerModalListStyle?: StyleProp<ViewStyle> | undefined;
        /**
      * style input header list item dropdown modal
      * */
        _searchTextInputProps?: TextInputProps | undefined;
        /**
    * sort item selected to top list
    * */
        isSortable?: boolean | undefined;
        /**
        * custom string text number selected
        * */
        renderTitleInput?: (props: {
            value: any,
            singled: boolean,
        }) => JSX.Element;
        /**
        * placeholder input dropdown
        * */
        placeholderInputSearch?: string | undefined;
    }
}