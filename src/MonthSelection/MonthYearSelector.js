import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";
import { SkipBackIcon, SkipForwardIcon } from "phosphor-react-native";

export default function MonthYearSelector({ value, onChange, visible, onClose }) {
  const initialDate = value || new Date();
  const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());
  const [modalVisible, setModalVisible] = useState(visible);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  const incrementYear = () => setSelectedYear(prev => prev + 1);
  const decrementYear = () => setSelectedYear(prev => prev - 1);

  const selectMonth = (monthIndex) => {
    setSelectedMonth(monthIndex);
    onChange && onChange(new Date(selectedYear, monthIndex, 1));
    onClose && onClose();
  };

  const handleCancel = () => {
    onClose && onClose();
  };

  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Year Navigation */}
          <View style={styles.yearNav}>
            <TouchableOpacity style={styles.navButton} onPress={decrementYear}>
              <SkipBackIcon color={"#1976D2"} size={20} />
            </TouchableOpacity>
            <Text style={styles.yearText}>{selectedYear}</Text>
            <TouchableOpacity style={styles.navButton} onPress={incrementYear}>
              <SkipForwardIcon color={"#1976D2"} size={20} />
            </TouchableOpacity>
          </View>

          {/* Month Grid */}
          <FlatList
            data={months}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.monthButton,
                  index === selectedMonth && styles.selectedMonth
                ]}
                onPress={() => selectMonth(index)}
              >
                <Text
                  style={[
                    styles.monthText,
                    index === selectedMonth && styles.selectedMonthText
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* Cancel Button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10
  },
  yearNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  navButton: {
    padding: 8,
    borderRadius: 10
  },
  yearText: { fontSize: 20, fontWeight: "bold", color: "#1976D2" },
  monthButton: {
    flex: 1,
    margin: 6,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#F5F7FA",
    borderWidth: 1,
    borderColor: "#E0E5EC"
  },
  monthText: { fontSize: 16, color: "#333" },
  selectedMonth: {
    backgroundColor: "#1976D2",
    borderColor: "#1976D2",
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  selectedMonthText: { color: "#fff", fontWeight: "bold" },
  closeButton: { marginTop: 20, alignItems: "center" },
  closeText: { fontSize: 16, color: "#1976D2", fontWeight: "600" }
});
