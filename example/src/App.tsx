import * as React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { PickerPopup, PickerContainer } from 'rn-select-kit';

export default function App() {
  const [ids, setIds] = React.useState<any>()
  return (
    <PickerContainer>
      <ScrollView>
        <View style={{ height: 450 }} />
        <View style={styles.container}>
          <Text>sdsad</Text>
          <Text>sdsad</Text>
          <Text>sdsad</Text>
          <PickerPopup
            data={Array.from(Array(100).keys()).map((item: number) => {
              return { name: `dropdown-${item}`, value: item }
            })}
            value={ids}
            onSelect={(value: any) => setIds(value)}
            isReturnsSelected
            isSortable
            singled={false}
          />
          <Text>sdsad</Text>
          <Text>sdsad</Text>
          <Text>sdsad</Text>
          <Text>sdsad</Text>
          <Text>sdsad</Text>
          <Text>sdsad</Text>
          <Text>sdsad</Text>
          <Text>sdsad</Text>
        </View>
        <View style={{ height: 450 }} />
        <View style={{ height: 450 }} />
      </ScrollView>
    </PickerContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 }
});
