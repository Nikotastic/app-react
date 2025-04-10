import { StyleSheet } from "react-native";
import colors from "./colors";

// Estilos base que pueden ser extendidos o modificados
const baseStyles = {
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.dark,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  addButtonText: {
    color: colors.white,
    fontWeight: "600",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray200,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  categoryTabs: {
    flexDirection: "row",
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    justifyContent: "space-between",
  },
  categoryTab: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    flex: 1,
    alignItems: "center",
  },
  categoryTabActive: {
    borderBottomColor: colors.primary,
  },
  categoryTabText: {
    fontSize: 14,
    color: colors.gray600,
  },
  categoryTabTextActive: {
    fontWeight: "600",
    color: colors.primary,
  },
  taskListContainer: {
    flex: 1,
  },
  taskListContent: {
    padding: 15,
  },
  categorySection: {
    marginBottom: 15,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark,
  },
  emptyListText: {
    textAlign: "center",
    color: colors.gray500,
    fontStyle: "italic",
    padding: 20,
  },
  taskCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: colors.dark,
  },
  taskDescription: {
    fontSize: 14,
    color: colors.gray600,
    marginBottom: 10,
  },
  taskDates: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: colors.gray500,
  },
  priorityTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    color: colors.white,
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 10,
  },
  taskActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    paddingTop: 10,
  },
  actionButton: {
    padding: 5,
  },
  calendarLegend: {
    marginTop: 15,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.dark,
  },
  legendItems: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 5,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: colors.gray600,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxHeight: "100%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.dark,
  },
  prioritySelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  priorityButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  priorityButtonSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  priorityButtonText: {
    fontWeight: "500",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  dateButtonText: {
    color: colors.dark,
  },
  calendar: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray300,
    backgroundColor: colors.white,
    padding: 10,
    marginBottom: 14,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    tintColor: colors.primary,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    flex: 1,
    marginLeft: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
  calendarContainer: {
    flex: 1,
    padding: 15,
  },
  fullCalendar: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray300,
    height: 320,
  },
  calendarModal: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    width: "90%",
    height: "60%",
    maxHeight: "100%",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  closeButtonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
};

// Crear y exportar los estilos
export const styles = StyleSheet.create(baseStyles);

// Hook para usar los estilos y colores
export const useTheme = () => {
  return {
    styles,
    colors,
  };
};