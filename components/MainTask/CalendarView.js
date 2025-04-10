import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "../../theme/MainTask/styles";

/**
 * Componente que muestra el calendario con las tareas marcadas
 * @param {Object} markedDates Fechas marcadas en el calendario
 * @param {Function} onDayPress  Función que se ejecuta al seleccionar un día
 * @param {Function} onClose  Función para cerrar el modal 
 */
const CalendarView = ({ markedDates, onDayPress, onClose }) => {
  const { styles, colors } = useTheme();
  
  // Obtiene los colores para cada categoría
  const getCategoryColor = (status) => {
    switch (status) {
      case "pendiente": return colors.highPriority;
      case "proceso": return colors.mediumPriority;
      case "terminado": return colors.lowPriority;
      default: return colors.primary;
    }
  };

  const categories = ["pendiente", "proceso", "terminado"];

  return (
    <View style={styles.calendarContainer}>
      <Calendar
        markingType="multi-dot"
        markedDates={markedDates}
        onDayPress={onDayPress}
        style={styles.fullCalendar}
        theme={{
          todayTextColor: colors.primary,
          arrowColor: colors.primary,
          dotColor: colors.primary,
          selectedDotColor: colors.white,
        }}
      />
      
      {/* colores */}
      <View style={styles.calendarLegend}>
        <Text style={styles.legendTitle}>Estados:</Text>
        <View style={styles.legendItems}>
          {categories.map(category => (
            <View key={category} style={styles.legendItem}>
              <View 
                style={[
                  styles.legendDot, 
                  { backgroundColor: getCategoryColor(category) }
                ]} 
              />
              <Text style={styles.legendText}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {onClose && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CalendarView;