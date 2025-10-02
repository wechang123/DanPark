import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TermsScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.title}>이용약관</Text>
                    <Text style={styles.lastUpdated}>최종 수정일: 2024년 3월 15일</Text>

                    <Text style={styles.sectionTitle}>제1조 (목적)</Text>
                    <Text style={styles.content}>
                        본 약관은 단국대학교(이하 "학교"라 합니다)가 제공하는 주차장 서비스(이하 "서비스"라 합니다)의
                        이용조건 및 절차, 기타 필요한 사항을 규정함을 목적으로 합니다.
                    </Text>

                    <Text style={styles.sectionTitle}>제2조 (용어의 정의)</Text>
                    <Text style={styles.content}>
                        1. "이용자"란 본 서비스에 접속하여 이용하는 모든 사용자를 말합니다.{'\n'}
                        2. "주차장"이란 학교가 관리하는 모든 주차 공간을 말합니다.
                    </Text>

                    <Text style={styles.sectionTitle}>제3조 (서비스의 제공)</Text>
                    <Text style={styles.content}>
                        1. 학교는 다음과 같은 서비스를 제공합니다:{'\n'}- 실시간 주차장 정보 제공{'\n'}- 주차장 예약
                        서비스{'\n'}- 주차 위치 확인 서비스{'\n'}
                        2. 학교는 서비스의 품질 향상을 위해 서비스의 내용을 변경할 수 있습니다.
                    </Text>

                    <Text style={styles.sectionTitle}>제4조 (이용자의 의무)</Text>
                    <Text style={styles.content}>
                        1. 이용자는 관련 법령, 본 약관의 규정, 이용안내 및 주의사항 등을 준수하여야 합니다.{'\n'}
                        2. 이용자는 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안됩니다:{'\n'}- 서비스의 운영을
                        방해하는 행위{'\n'}- 타인의 정보를 도용하는 행위{'\n'}- 서비스를 이용하여 법령에 위반되는 행위
                    </Text>
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
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    lastUpdated: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginTop: 24,
        marginBottom: 12,
    },
    content: {
        fontSize: 16,
        color: '#374151',
        lineHeight: 24,
    },
});

export default TermsScreen;
