import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrivacyScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.title}>개인정보처리방침</Text>
                    <Text style={styles.lastUpdated}>최종 수정일: 2024년 3월 15일</Text>

                    <Text style={styles.sectionTitle}>1. 개인정보의 수집 및 이용 목적</Text>
                    <Text style={styles.content}>
                        단국대학교는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적
                        이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라
                        별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.{'\n\n'}- 주차장 이용 서비스 제공{'\n'}-
                        이용자 식별 및 본인 확인{'\n'}- 서비스 이용 기록 관리{'\n'}- 불량 이용자 관리
                    </Text>

                    <Text style={styles.sectionTitle}>2. 수집하는 개인정보의 항목</Text>
                    <Text style={styles.content}>
                        - 필수항목: 이름, 학번/교직원번호, 연락처, 차량번호{'\n'}- 선택항목: 이메일{'\n'}- 자동수집항목:
                        접속 IP, 쿠키, 서비스 이용 기록
                    </Text>

                    <Text style={styles.sectionTitle}>3. 개인정보의 보유 및 이용기간</Text>
                    <Text style={styles.content}>
                        이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단,
                        관계법령의 규정에 의하여 보존할 필요가 있는 경우 아래와 같이 관계법령에서 정한 일정한 기간 동안
                        개인정보를 보관합니다.{'\n\n'}- 서비스 이용 기록: 3년{'\n'}- 결제 및 정산 기록: 5년
                    </Text>

                    <Text style={styles.sectionTitle}>4. 개인정보의 파기절차 및 방법</Text>
                    <Text style={styles.content}>
                        개인정보 파기 절차 및 방법은 다음과 같습니다.{'\n\n'}
                        1) 파기절차{'\n'}- 이용자가 서비스 이용 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로
                        옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.
                        {'\n\n'}
                        2) 파기방법{'\n'}- 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을
                        사용하여 삭제합니다.
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

export default PrivacyScreen;
