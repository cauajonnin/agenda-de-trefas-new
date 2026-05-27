import React from "react";
import { style }  from "./styles";
import {Ionicons,MaterialIcons} from '@expo/vector-icons';
import { Text, View,Alert,TouchableOpacity,ScrollView } from "react-native";
import { useNavigation,NavigationProp  } from '@react-navigation/native';
import {AuthContextList, AuthContextType} from "../../context/authContext_list";
import { themas } from "../../global/themes";

export default function User() {
    const navigation = useNavigation<NavigationProp<any>>();
    const {filterCompleted, filterPending, filterOverdue, resetFilter, taskList} = React.useContext<AuthContextType>(AuthContextList);

    const handleLogout = () => {
        Alert.alert("Logout", "Você saiu da conta.");
        return navigation.reset({routes:[{name :'Login'}]});
    };

    const handleFilterAndNavigate = (filterFunction: () => void, title: string) => {
        filterFunction();
        navigation.navigate('List');
    };

    return (
        <View style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={style.name}>Cauã Gomes.</Text>
                
                <View style={style.filterSection}>
                    <Text style={style.sectionTitle}>Filtrar Tarefas</Text>
                    
                    <TouchableOpacity 
                        style={style.filterButton}
                        onPress={() => handleFilterAndNavigate(resetFilter, "Todas")}
                    >
                        <MaterialIcons name="list" size={24} color={themas.Colors.primary} />
                        <Text style={style.filterButtonText}>Todas as Tarefas</Text>
                        <Text style={style.filterCount}>{taskList.length}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={style.filterButton}
                        onPress={() => handleFilterAndNavigate(filterCompleted, "Concluídas")}
                    >
                        <MaterialIcons name="check-circle" size={24} color={themas.Colors.blueLigth} />
                        <Text style={style.filterButtonText}>Tarefas Concluídas</Text>
                        <Text style={style.filterCount}>{taskList.filter(t => t.completed).length}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={style.filterButton}
                        onPress={() => handleFilterAndNavigate(filterPending, "Pendentes")}
                    >
                        <MaterialIcons name="schedule" size={24} color={themas.Colors.red} />
                        <Text style={style.filterButtonText}>Tarefas Pendentes</Text>
                        <Text style={style.filterCount}>{taskList.filter(t => !t.completed).length}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={style.filterButton}
                        onPress={() => handleFilterAndNavigate(filterOverdue, "Atrasadas")}
                    >
                        <MaterialIcons name="warning" size={24} color="#FF6B35" />
                        <Text style={style.filterButtonText}>Tarefas em Atraso</Text>
                        <Text style={style.filterCount}>
                            {taskList.filter(t => !t.completed && new Date(t.timeLimit) < new Date()).length}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
                <Ionicons 
                    name="exit"  
                    style={{color:'gray'}}
                    size={40}
                />
            </TouchableOpacity>
        </View>
    );
}
