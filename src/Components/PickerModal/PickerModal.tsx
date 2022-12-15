import { View, Text, TextProps, ViewProps, StyleSheet, Pressable, Modal, ModalProps, TextInputProps, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SchemaInterfaceProps, PickerProps } from '../../Strings/interfaceDefault'
//
import ListItemModal from './ListItemModal'
const { width } = Dimensions.get('window')
const Picker = ({
    data = [],
    value,
    disabled = false,
    onSelect = () => { },
    isReturnsSelected = false,
    singled = false,
    placeholder,
    placeholderStyle,
    onClose,
    onOpen,
    dropdownStyle,
    ArrowIconComponent,
    renderItem,
    schema = SchemaInterfaceProps,
    _modalProps,
    DropdownHeaderComponent,
    headerModalListStyle,
    _searchTextInputProps,
    isSortable = false,
    renderTitleInput,
    placeholderInputSearch = '',
}: PickerProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    useEffect(() => {
        if (isOpen) {
            onOpen && onOpen()
        } else {
            onClose && onClose()
        }
    }, [isOpen])

    const onSelectedItem = (item: any, index: number, isSelected: boolean) => {
        if (singled) {
            if (isSelected) {
                onSelect(null)
            } else {
                onSelect(item, index)
            }
        } else {
            if (isReturnsSelected) {
                if (isSelected) {
                    const values = value.filter((i: any) => i !== item[schema.value])
                    onSelect(values)
                } else {
                    const newData = value ? [...value, item[schema.value]] : [item[schema.value]]
                    onSelect(newData)
                }
            } else {
                onSelect(item, isSelected)
            }
        }

    }

    const renderTitleInputComponent = () => {
        if (renderTitleInput) {
            return renderTitleInput(value, singled)
        }
        const valueLength = value?.length || 0
        const dataSelected = valueLength > 0 ? data.filter(item => {
            if (singled) {
                if (value === item[schema.value]) {
                    return true
                }
            } else {
                if (value.some((i: number) => i === item[schema.value])) {
                    return true
                }
            }
        }) : []
        const itemFrist = dataSelected[0]
        if (value) {
            if (singled) {
                return (
                    <View style={{ paddingVertical: 8, paddingHorizontal: 8, flex: 1, }}>
                        <Text style={[styles.stylePlaceholder, placeholderStyle]}>{itemFrist[schema.label]}</Text>
                    </View>
                )
            } else if (valueLength > 0) {
                return (
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', zIndex: 2 }}>
                        <Pressable
                            onPress={() => {
                                onSelectedItem(itemFrist, 0, true)
                            }}
                            style={{ borderWidth: 1, borderColor: '#f2f2f2', maxWidth: width * 0.4, paddingHorizontal: 4, paddingVertical: 8, borderRadius: 6 }}>
                            <Text>{itemFrist[schema.label]}</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                onSelect([itemFrist[schema.value]])
                            }}
                            style={{ display: valueLength > 1 ? 'flex' : 'none', borderWidth: 1, borderColor: '#f2f2f2', paddingHorizontal: 12, paddingVertical: 8, marginLeft: 8, borderRadius: 6 }}>
                            <Text>+{valueLength - 1}</Text>
                        </Pressable>
                    </View>
                )
            }
        }
        return (
            <View style={{ paddingVertical: 8, paddingHorizontal: 8, flex: 1, }}>
                <Text style={[styles.stylePlaceholder, placeholderStyle]}>{placeholder || 'select ...'}</Text>
            </View>
        )
    }

    return (
        <View>
            <Pressable
                onPress={() => {
                    setIsOpen(true)
                }}
                disabled={disabled}
                style={[styles.container, { backgroundColor: disabled ? '#f2f2f2' : '#fcfcfc' }, { padding: 4 }, dropdownStyle]}>
                {renderTitleInputComponent()}
                <Pressable
                    onPress={() => onSelect(null)}
                    style={{ paddingHorizontal: 8, display: singled ? value ? 'flex' : 'none' : value?.length > 0 ? 'flex' : 'none' }}>
                    <Image source={require('../../Theme/Icon/close.png')} resizeMode='contain' style={{ width: 24, height: 24 }} />
                </Pressable>
                <View style={{ paddingHorizontal: 8 }}>
                    {!isOpen ?
                        <Image source={require('../../Theme/Icon/arrow-down.png')} resizeMode='contain' style={{ width: 24, height: 24, }} />
                        :
                        <Image source={require('../../Theme/Icon/arrow-up.png')} resizeMode='contain' style={{ width: 24, height: 24, }} />
                    }
                </View>
            </Pressable>
            <Modal
                {..._modalProps}
                visible={isOpen}
                onRequestClose={() => setIsOpen(false)}
                animationType='fade'
                presentationStyle="fullScreen"
            >
                <ListItemModal
                    DropdownHeaderComponent={DropdownHeaderComponent}
                    renderItem={renderItem}
                    onCloseModal={() => { setIsOpen(false) }}
                    headerModalListStyle={headerModalListStyle}
                    _searchTextInputProps={_searchTextInputProps}
                    data={data}
                    value={value}
                    schema={schema}
                    isSortable={isSortable}
                    singled={singled}
                    isReturnsSelected={isReturnsSelected}
                    onSelect={onSelect}
                    ArrowIconComponent={ArrowIconComponent}
                    onSelectedItem={onSelectedItem}
                    placeholderInputSearch={placeholderInputSearch}
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#f2f2f2',
        borderRadius: 8,
        alignItems: 'center',
    },
    stylePlaceholder: {
        color: '#9e9e9e',
        flex: 0,
        fontSize: 16,
    }
})

export default React.memo(Picker)