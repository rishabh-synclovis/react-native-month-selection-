import { Text, View, StyleSheet } from 'react-native';
import MonthYearSelector from "react-native-month-selection";


export default function App() {
  return (
    <View style={styles.container}>
    <MonthYearSelector/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
