import { motion } from "motion/react";

export default function EditTask({ task, onEdit }) {
  return (
    <motion.button
      type="button"
      onClick={() => onEdit(task)}
      whileHover={{ scale: 1.06, color: "#287eaa" }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className="rounded border border-transparent p-1 text-[#66808d] transition hover:border-[#a8c7d4] hover:bg-gradient-to-b hover:from-white hover:to-[#d8edf5] hover:text-[#287eaa] focus-visible:outline-2 focus-visible:outline-[#398ab1]"
      aria-label={`Modifier la tâche ${task.name}`}
      title="Modifier"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        className="h-3.5 w-3.5"
      >
        <path
          d="m12.5 4.5 3 3M3.5 16.5l3.2-.7L16 6.5a2.1 2.1 0 0 0-3-3L3.7 12.8l-.2 3.7Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}
