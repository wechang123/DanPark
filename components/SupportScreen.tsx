import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SupportItem = ({ title, description, icon }) => (
    <TouchableOpacity style={styles.supportItem}>
        <View style={styles.iconContainer}>
            <Ionicons name={icon} size={24} color="#3B82F6" />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
);

const SupportScreen = () => {
    const supportItems = [
        {
            id: 1,
            title: '자주 묻는 질문',
            description: '주차장 이용과 관련된 자주 묻는 질문들을 확인하세요',
            icon: 'help-circle-outline',
        },
        {
            id: 2,
            title: '1:1 문의하기',
            description: '문의사항이 있으시다면 1:1 문의를 이용해주세요',
            icon: 'chatbubble-outline',
        },
        {
            id: 3,
            title: '이메일 문의',
            description: 'danpark@dankook.ac.kr',
            icon: 'mail-outline',
        },
        {
            id: 4,
            title: '전화 문의',
            description: '평일 09:00 - 18:00',
            icon: 'call-outline',
        },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    {supportItems.map(item => (
                        <SupportItem key={item.id} {...item} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    container: {
        flex: 1,
    },
    section: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E5E7EB',
        marginTop: 12,
    },
    supportItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#6B7280',
    },
});

export default SupportScreen;
