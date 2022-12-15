import { View, Text, SafeAreaView, StyleSheet, TextInput, ViewProps, TextInputProps, TouchableOpacity, FlatList, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SchemaInterfaceProps, removeAccents } from '../../Strings/interfaceDefault'
import ItemValue from './ItemValue'

interface SchemaInterface {
    label: string,
    value: string,
    disabled: string
}

interface ListItemMdalProps {
    DropdownHeaderComponent?: any,
    renderItem?: any,
    onCloseModal: any,
    headerModalListStyle?: ViewProps,
    _searchTextInputProps?: TextInputProps,
    data: Array<any>,
    value: any,
    schema?: SchemaInterface,
    isSortable?: boolean,
    singled?: boolean,
    isReturnsSelected?: boolean,
    onSelect: any,
    ArrowIconComponent: any,
    onSelectedItem: any,
    placeholderInputSearch: string,
}

const HEIGHT_INPUT = 40

const ListItemModal = ({
    data,
    DropdownHeaderComponent,
    renderItem,
    onCloseModal,
    headerModalListStyle,
    _searchTextInputProps = {},
    value,
    schema = SchemaInterfaceProps,
    isSortable,
    singled,
    ArrowIconComponent,
    onSelectedItem,
    placeholderInputSearch
}: ListItemMdalProps) => {
    const [options, setOptions] = useState<Array<object>>([])
    const [loading, setLoading] = useState(false)
    const timerRef = useRef<any>(null)

    useEffect(() => {
        if (data?.length > 0) {
            setOptions(getDataFormat())
        }
    }, [data?.length])

    const handerSearchListItem = (textString: string) => {
        setLoading(true)
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
            const keyString = removeAccents(textString)
            const dataSource = [...data]
            const newData = dataSource.filter((item: any, index: number) => {
                if (removeAccents(item[schema.label]).indexOf(keyString) > -1) {
                    return true
                }
            })
            setOptions(newData)
            setLoading(false)
        }, 550)
    }

    const getDataFormat = () => {
        return isSortable && value ?
            Array.isArray(value) ?
                [...data].sort((a, b) => value.some(i => i === a[schema.value]) ? -1 : 1)
                :
                [...data].sort((a, b) => value === a[schema.value] ? -1 : 1)
            : [...data]
    }

    const renderHeaderList = () => {
        if (DropdownHeaderComponent) {
            return <DropdownHeaderComponent
                onSearch={handerSearchListItem}
                onCloseModal={onCloseModal}
            />
        }
        return (
            <View style={[styles.headerContainer, headerModalListStyle]}>
                <TextInput
                    style={[styles.inputSearch]}
                    {..._searchTextInputProps}
                    placeholder={placeholderInputSearch || 'search ...'}
                    onChangeText={handerSearchListItem}
                    autoCorrect={false}
                />
                <TouchableOpacity
                    onPress={onCloseModal}
                    style={[styles.touchDone]}>
                    <Image source={require('../../Theme/Icon/close.png')} style={[styles.iconTouchDone]} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={[styles.container]}>
            <SafeAreaView style={{ flex: 1 }}>
                {renderHeaderList()}
                {loading ? <ActivityIndicator style={{ marginTop: 12 }} /> :
                    <FlatList
                        data={options}
                        keyExtractor={(item: object, index: number) => `item-dropdown-${index}}`}
                        renderItem={({ item, index }) => {
                            return (
                                <ItemValue
                                    value={value}
                                    item={item}
                                    index={index}
                                    onSelectedItem={onSelectedItem}
                                    renderItem={renderItem}
                                    singled={singled}
                                    schema={schema}
                                    ArrowIconComponent={ArrowIconComponent}
                                />
                            )
                        }}
                    />
                }
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 12,
        paddingBottom: 8,
    },
    inputSearch: {
        height: HEIGHT_INPUT,
        fontSize: 16,
        flex: 1,
    },
    touchDone: {
        paddingLeft: 32,
    },
    iconTouchDone: {
        width: 32,
        height: 32,
    },
})

export default React.memo(ListItemModal)