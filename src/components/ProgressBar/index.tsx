import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { PropCard } from '../../global/Props';
import { themas } from '../../global/themes';

interface ProgressBarProps {
    tasks: PropCard[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ tasks }) => {
    const progressAnim = useRef(new Animated.Value(0)).current;

    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: percentage,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [percentage, progressAnim]);

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Progresso</Text>
                <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                    <Animated.View 
                        style={[
                            styles.progressBarFill,
                            { width: progressWidth }
                        ]} 
                    />
                </View>
            </View>
            <Text style={styles.statusText}>
                {completedTasks} de {totalTasks} tarefas concluídas
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: themas.Colors.secondary,
        padding: 20,
        marginHorizontal: 30,
        marginTop: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: themas.Colors.blackTransparent,
    },
    percentage: {
        fontSize: 16,
        fontWeight: 'bold',
        color: themas.Colors.blueLigth,
    },
    progressBarContainer: {
        marginBottom: 8,
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: themas.Colors.lightGray,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: themas.Colors.blueLigth,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 12,
        color: themas.Colors.gray,
        textAlign: 'center',
    },
});
