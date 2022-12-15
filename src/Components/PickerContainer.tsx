import { View, Text } from 'react-native'
import React, { useState, ReactChildren, ReactChild } from 'react'

interface LayoutProps {
    children: JSX.Element[] | JSX.Element
}

const MainContext = React.createContext({});
class PickerContainer extends React.Component {
    state = {
        visible: false,
        keyOpen: null,
    }
    setOpen = (value: boolean, key: string) => {
        this.setState({ visible: value, keyOpen: key })
    }
    render() {
        return (
            <MainContext.Provider value={{
                isOpen: this.state.visible,
                keyOpen: this.state.keyOpen,
                setOpen: this.setOpen
            }}>
                {this.props.children}
            </MainContext.Provider>
        )
    }
}

export default PickerContainer