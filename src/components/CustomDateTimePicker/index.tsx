// CustomDateTimePicker.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { style } from './styles';
const CustomDateTimePicker = ({ type, onDateChange, show, setShow }) => {
    const [date, setDate] = React.useState(new Date());

    useEffect(() => {
        if (onDateChange) {
            onDateChange(date); // Chama o callback sempre que a data muda
        }
    }, [date, onDateChange]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        // No Android, o picker fecha automaticamente após a seleção
        if (Platform.OS === 'android') {
            setShow(false);
        }
    };

    // No Android, não usar Modal pois o DateTimePicker já é nativo
    if (Platform.OS === 'android' && show) {
        return (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={type}
                display="default"
                onChange={onChange}
            />
        );
    }

    // No iOS, usar Modal com display inline
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={show}
            onRequestClose={() => setShow(false)}
        >
            <View style={style.modalOverlay}>
                <View style={style.container}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={type}
                        display="inline"
                        onChange={onChange}
                    />
                </View>
            </View>
        </Modal>
    );
};
export default CustomDateTimePicker;
