import React, { useState, useEffect } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "../../theme/MainTask/styles";

/**
 * Modal para crear o editar tareas
 * @param {Boolean} visible - Controla la visibilidad del modal
 * @param {Object} task - Tarea a editar (null para creación)
 * @param {Function} onSave - Función para guardar la tarea
 * @param {Function} onClose - Función para cerrar el modal
 */
const TaskFormModal = ({ visible, task, onSave, onClose }) => {
  const { styles, colors } = useTheme();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "media",
    dueDate: "",
  });
  const [showCalendar, setShowCalendar] = useState(false);

  // Actualiza el estado cuando cambia la tarea o la visibilidad
  useEffect(() => {
    if (visible) {
      setFormData({
        title: task?.title || "",
        description: task?.description || "",
        priority: task?.priority || "media",
        dueDate: task?.dueDate || "",
      });
    }
  }, [task, visible]);

  // Formatea la fecha para mostrarla
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  // Maneja el guardado de la tarea
  const handleSave = () => {
    const today = formatDate(new Date());
    const updatedTask = {
      id: task?.id || Date.now().toString(),
      ...formData,
      dueDate: formData.dueDate || today,
      creationDate: task?.creationDate || today,
      status: task?.status || "pendiente",
    };
    onSave(updatedTask);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {task ? "Editar Tarea" : "Nueva Tarea"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Título"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descripción"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
          />

          <Text style={styles.inputLabel}>Prioridad:</Text>
          <View style={styles.prioritySelector}>
            {["baja", "media", "alta"].map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.priorityButton,
                  formData.priority === p && styles.priorityButtonSelected,
                  {
                    backgroundColor:
                      p === "alta" ? colors.highPriorityBg :
                      p === "media" ? colors.mediumPriorityBg :
                      colors.lowPriorityBg,
                  },
                ]}
                onPress={() => setFormData({ ...formData, priority: p })}
              >
                <Text style={styles.priorityButtonText}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowCalendar(!showCalendar)}
          >
            <Text style={styles.dateButtonText}>
              {formData.dueDate
                ? `Fecha de entrega: ${formData.dueDate}`
                : "Seleccionar fecha de entrega"}
            </Text>
          </TouchableOpacity>

          {showCalendar && (
            <Calendar
              onDayPress={(day) => {
                setFormData({ ...formData, dueDate: formatDate(new Date(day.dateString)) });
                setShowCalendar(false);
              }}
              markedDates={{
                [formData.dueDate]: { selected: true, selectedColor: colors.primary },
              }}
              minDate={new Date().toISOString().split("T")[0]}
              style={styles.calendar}
            />
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.saveButton,
                (!formData.title || !formData.description) && styles.disabledButton,
              ]}
              onPress={handleSave}
              disabled={!formData.title || !formData.description}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskFormModal;