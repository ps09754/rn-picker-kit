import { View, Text } from 'react-native'
import React from 'react'
import { PickerProps } from '../Strings/interfaceDefault'
import PickerModal from './PickerModal/PickerModal'
import PickerPopup from './PickerPopup/PickerPopup'


interface ContainerInterface {
    mode: 'MODAL' | 'PICKER'
}

type ContainerProps = ContainerInterface & PickerProps;

const Picker = ({
    mode = 'MODAL',
    ...props
}: ContainerProps) => {
    if (mode === 'MODAL') {
        return <PickerModal {...props} />
    }
    return <PickerPopup {...props} />
}

export default Picker

