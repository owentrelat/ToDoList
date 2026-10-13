import { motion } from "motion/react";

function UncontrolledInput({ task, placeholder, buttonText, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get(task);
    if (typeof value === "string" && value.trim()) {
      onSubmit(value.trim(), formData.get("priority"));
    }
    e.currentTarget.reset();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 190,
        damping: 25,
        mass: 0.9,
        delay: 0.2,
      }}
      className="rounded-lg border border-[#a5cbd9] bg-gradient-to-b from-white/80 to-[#e5f4f8]/80 p-4 shadow-[inset_0_1px_0_white,0_1px_3px_rgba(42,100,125,0.12)] sm:p-5"
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor="new-task" className="text-sm font-semibold text-[#245873]">
          Nouvelle tâche
        </label>
        <span className="hidden text-[11px] text-[#708d9a] sm:inline">Entrée pour ajouter</span>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex min-w-0 flex-1 items-center rounded border border-[#9bbbc9] bg-white px-2.5 shadow-[inset_0_1px_3px_rgba(45,89,109,0.18)] focus-within:border-[#4b9fca] focus-within:ring-2 focus-within:ring-[#62b5db]/25">
          <span aria-hidden="true" className="mr-2 text-[#4897ba]">✎</span>
          <input
            id="new-task"
            type="text"
            name={task}
            placeholder={placeholder}
            required
            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-[#183c52] outline-none placeholder:text-[#879eaa]"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{
            y: -2,
            scale: 1.015,
            boxShadow: "0 5px 14px rgba(30, 100, 141, 0.3)",
          }}
          whileTap={{ y: 0, scale: 0.985 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-flex items-center justify-center gap-2 rounded border border-[#7aa7bc] bg-gradient-to-b from-[#ffffff] via-[#eaf7fc] to-[#c4e2f0] px-4 py-2 text-sm font-semibold text-[#245671] shadow-[inset_0_1px_0_white,0_1px_2px_rgba(34,88,116,0.16)] transition hover:from-white hover:to-[#b5def0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#328db7]"
        >
          <span aria-hidden="true" className="text-base leading-none text-[#3888a8]">＋</span>
          {buttonText}
        </motion.button>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <label htmlFor="task-priority" className="mr-1 text-xs font-semibold text-[#55788a]">
          Priorité :
        </label>
        <select
          id="task-priority"
          name="priority"
          defaultValue="normale"
          className="rounded border border-[#aac4ce] bg-white/85 px-2 py-1 text-xs text-[#345b70] shadow-[inset_0_1px_2px_rgba(55,100,120,0.1)] outline-none focus:border-[#4b9fca] focus:ring-2 focus:ring-[#62b5db]/20"
        >
          <option value="faible">Faible</option>
          <option value="normale">Normale</option>
          <option value="haute">Haute</option>
        </select>
        <span className="text-[11px] text-[#7894a0]">
          Appliquée à la nouvelle tâche
        </span>
      </div>
    </motion.form>
  );
}

export default function AddNewTask({ onAddTask }) {
  return (
    <UncontrolledInput
      task="task"
      placeholder="Qu'avez-vous à faire ?"
      buttonText="Ajouter la tâche"
      onSubmit={onAddTask}
    />
  );
}