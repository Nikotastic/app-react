import React, { useState, useEffect } from "react";
import { Modal, View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";

const TaskFormModal = ({ visible, onClose, onSave, task }) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [priority, setPriority] = useState(task ? task.priority : "normal");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority || "normal");
    } else {
      setTitle("");
      setDescription("");
      setPriority("normal");
    }
  }, [task]);

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      setError(true);
      return;
    }
    onSave({ ...task, title, description, priority });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{task ? "Editar tarea" : "Nueva tarea"}</Text>
          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={[styles.input, error && !title.trim() && styles.errorInput]}
          />
          <TextInput
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
            multiline
            style={[styles.input, error && !description.trim() && styles.errorInput]}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default TaskFormModal;
