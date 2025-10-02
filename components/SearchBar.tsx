
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  // Voice search state and functions are removed for mobile migration
  // as they require a different implementation (e.g., expo-speech).

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Search Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            placeholder="주차장 이름을 검색하세요"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={onSearchChange}
            style={styles.input}
          />
        </View>

        {/* Voice Search Button - UI Only */}
        <TouchableOpacity style={styles.voiceButton}>
          <Ionicons name="mic" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16, // rounded-2xl
    padding: 12, // p-3
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB', // bg-gray-50
    borderRadius: 12, // rounded-xl
  },
  searchIcon: {
    marginLeft: 12, // pl-3
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12, // py-3
    fontSize: 16,
    color: '#111827',
  },
  voiceButton: {
    marginLeft: 12, // space-x-3
    padding: 12, // p-3
    borderRadius: 12, // rounded-xl
    backgroundColor: '#3B82F6', // bg-blue-500
  },
});

export default SearchBar;
