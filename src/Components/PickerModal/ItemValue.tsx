import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { useState } from 'react'

interface SchemaInterface {
    label: string,
    value: string,
    disabled: string
}


interface ItemValueProps {
    item: any,
    index: number,
    value: any,
    onSelectedItem?: any,
    renderItem?: any,
    singled?: boolean,
    schema: SchemaInterface,
    ArrowIconComponent: any,
}

const ItemValue = ({ item, index, value, onSelectedItem, renderItem, singled, schema, ArrowIconComponent }: ItemValueProps) => {
    const isSelected = value ?
        singled ?
            value === item[schema.value]
            :
            value.some((i: any) => i === item[schema.value])
        :
        false
    const [isFocused, setIsFocused] = useState(isSelected)
    if (renderItem) {
        return renderItem(item, index, isFocused)
    }
    return (
        <Pressable
            onPress={() => {
                setIsFocused(!isFocused)
                onSelectedItem(item, index, isFocused)
            }}
            style={[styles.itemDropdow]}>
            <Text style={{ flex: 1 }}>{item[schema?.label]}</Text>
            {ArrowIconComponent ?
                <ArrowIconComponent />
                :
                <Image source={require('../../Theme/Icon/tick.png')} style={{ width: 18, height: 18, display: isFocused ? 'flex' : 'none' }} />
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    itemDropdow: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f6f6f6',
        color: '#3e3e3e',
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default ItemValue