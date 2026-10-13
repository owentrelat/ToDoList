import { motion } from "motion/react";

export default function FilterTask({ tasks, filter, onFilter }) {
  const completedCount = tasks.filter((task) => task.completed).length;
  const incompleteCount = tasks.length - completedCount;
  const filters = [
    { value: "all", label: "Toutes", count: tasks.length },
    { value: "completed", label: "Terminées", count: completedCount },
    { value: "incomplete", label: "En cours", count: incompleteCount },
  ];

  return (
    <div className="flex flex-col justify-between gap-2 border-b border-[#b6ced7] bg-gradient-to-b from-[#f8fcfd]/90 to-[#e2f0f5]/85 px-3 shadow-[inset_0_1px_0_white] sm:flex-row sm:items-center sm:px-4">
      <div className="flex flex-wrap gap-1" role="group" aria-label="Filtrer les tâches">
        {filters.map((item) => (
          <motion.button
            key={item.value}
            type="button"
            onClick={() => onFilter(item.value)}
            aria-pressed={filter === item.value}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className={`relative px-3 py-2.5 text-xs transition ${
              filter === item.value
                ? "font-semibold text-[#205e7d]"
                : "text-[#617f8c] hover:text-[#205e7d]"
            }`}
          >
            {filter === item.value && (
              <motion.span
                layoutId="active-task-filter"
                className="absolute inset-x-1 bottom-0 h-[3px] rounded-t bg-gradient-to-r from-[#48a7d0] to-[#83cda1] shadow-[0_-1px_2px_rgba(62,145,173,0.2)]"
                transition={{ type: "spring", stiffness: 240, damping: 26 }}
              />
            )}
            {item.label}
            <motion.span
              key={item.count}
              initial={{ scale: 0.9, y: 3, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="ml-1.5 inline-block"
            >
              {item.count}
            </motion.span>
          </motion.button>
        ))}
      </div>
      <span className="pb-2 text-[11px] text-[#7894a0] sm:pb-0">
        {filter === "all"
          ? "Toutes les tâches"
          : filter === "incomplete"
            ? "Tâches en cours"
            : "Tâches terminées"}
      </span>
    </div>
  );
}
