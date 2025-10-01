
import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SortOption } from '../types';

interface SortFilterModalProps {
  visible: boolean;
  currentSort: SortOption;
  onClose: () => void;
  onSortChange: (option: SortOption) => void;
}

const SORT_OPTIONS: SortOption[] = ['거리순', '혼잡도순', '빈자리순', '이름순'];

const SortFilterModal: React.FC<SortFilterModalProps> = ({ visible, currentSort, onClose, onSortChange }) => {
  const renderItem = ({ item }: { item: SortOption }) => (
    <TouchableOpacity 
      style={styles.optionButton}
      onPress={() => onSortChange(item)}
    >
      <Text style={[styles.optionText, item === currentSort && styles.selectedOptionText]}>
        {item}
      </Text>
      {item === currentSort && <Ionicons name="checkmark" size={22} color="#3B82F6" />}
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>정렬</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={SORT_OPTIONS}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 12,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});

export default SortFilterModal;
