import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import EndTask from "./EndTask";

export default function ShowTask({
  tasks,
  hasTasks,
  onUpdateTask,
  onDeleteTask,
  onEndTask,
}) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const sortedTasks = [...tasks].sort(
    (first, second) =>
      new Date(second.createdAt).getTime() -
      new Date(first.createdAt).getTime(),
  );
  const allTasksCompleted =
    tasks.length > 0 && tasks.every((task) => task.completed);

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditedName(task.name);
  };

  const handleSaveEdit = (event, taskId) => {
    event.preventDefault();
    const updatedName = editedName.trim();
    if (!updatedName) {
      return;
    }

    onUpdateTask(taskId, updatedName);
    setEditingTaskId(null);
  };

  if (tasks.length === 0) {
    return (
      <motion.div
        key="empty-task-list"
        initial={{ opacity: 0, y: 10, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -4, scale: 0.99 }}
        transition={{ type: "spring", stiffness: 190, damping: 24 }}
        className="flex flex-col items-center px-4 py-10 text-center"
      >
        <span aria-hidden="true" className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/90 bg-gradient-to-b from-white to-[#d7edf5] text-2xl text-[#559ab6] shadow-[0_2px_8px_rgba(52,111,138,0.16),inset_0_1px_0_white]">
          {hasTasks ? "⌕" : "☼"}
        </span>
        <p className="text-sm font-semibold text-[#385e72]">
          {hasTasks
            ? "Aucune tâche ne correspond à ce filtre."
            : "Vous n'avez pas encore de tâches."}
        </p>
        {!hasTasks && (
          <p className="mt-1 text-xs text-[#7894a0]">
            Ajoutez votre première tâche ci-dessus.
          </p>
        )}
      </motion.div>
    );
  }

  return (
    <div>
      {allTasksCompleted && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
          className="border-b border-[#b8d9cb] bg-gradient-to-r from-[#e5f6df]/90 to-[#d9f1e8]/75 px-4 py-2.5 text-sm font-semibold text-[#347a58]"
        >
          Bravo, toutes les tâches sont terminées !
        </motion.p>
      )}
      <div className="grid grid-cols-[minmax(72px,1fr)_28px_52px_54px_26px] items-center gap-1.5 border-b border-[#b8ced6] bg-gradient-to-b from-[#f9fdff] to-[#e4f0f4] px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-[#668493] shadow-[inset_0_1px_0_white] sm:grid-cols-[minmax(0,1fr)_40px_100px_82px_64px] sm:gap-2 sm:px-4 sm:text-[10px]">
        <span>Tâche</span>
        <span className="text-center">Mod.</span>
        <span className="whitespace-nowrap">Priorité</span>
        <span>Statut</span>
        <span className="text-right">
          <span className="sm:hidden">Sup.</span>
          <span className="hidden sm:inline">Supprimer</span>
        </span>
      </div>
      <ul>
        <AnimatePresence initial={false}>
          {sortedTasks.map((task, index) => (
            <motion.li
              key={task.id}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.985 }}
              transition={{
                layout: { type: "spring", stiffness: 210, damping: 26 },
                opacity: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                y: {
                  type: "spring",
                  stiffness: 190,
                  damping: 23,
                  delay: Math.min(index * 0.035, 0.18),
                },
                scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              }}
              className="grid grid-cols-[minmax(72px,1fr)_28px_52px_54px_26px] items-center gap-1.5 border-t border-[#d2e2e8] px-3 py-2.5 transition-colors odd:bg-white/15 hover:bg-[#dff5ff]/70 sm:grid-cols-[minmax(0,1fr)_40px_100px_82px_64px] sm:gap-2 sm:px-4"
          >
            <div className="flex min-w-0 items-start gap-2">
              <EndTask task={task} onEnd={onEndTask} />
              <div className="min-w-0 flex-1">
                {editingTaskId === task.id ? (
                  <motion.form
                    onSubmit={(event) => handleSaveEdit(event, task.id)}
                    initial={{ opacity: 0, y: 5, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 240, damping: 24 }}
                    className="flex min-w-0 flex-wrap gap-2"
                  >
                    <input
                      type="text"
                      value={editedName}
                      onChange={(event) => setEditedName(event.target.value)}
                      aria-label={`Modifier la tâche ${task.name}`}
                      required
                      autoFocus
                      className="h-8 min-w-0 flex-1 rounded border border-[#9bbbc9] bg-white px-2 text-xs text-[#183c52] shadow-[inset_0_1px_3px_rgba(45,89,109,0.14)] outline-none focus:border-[#4b9fca] focus:ring-2 focus:ring-[#62b5db]/20 sm:text-sm"
                    />
                    <button
                      type="submit"
                      className="h-8 rounded border border-[#7aa7bc] bg-gradient-to-b from-white via-[#eaf7fc] to-[#c4e2f0] px-2 text-[10px] font-semibold text-[#245671] shadow-[inset_0_1px_0_white,0_1px_2px_rgba(34,88,116,0.16)] hover:to-[#b5def0] sm:px-3 sm:text-xs"
                    >
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingTaskId(null)}
                      className="h-8 rounded border border-[#a9c5d0] bg-gradient-to-b from-white to-[#e1eff4] px-2 text-[10px] text-[#527588] hover:to-[#cfe7f0] sm:px-3 sm:text-xs"
                    >
                      Annuler
                    </button>
                  </motion.form>
                ) : (
                  <>
                    <p
                      className={`truncate text-xs sm:text-sm ${
                        task.completed
                          ? "text-[#8198a1] line-through"
                          : "text-[#264e63]"
                      }`}
                    >
                      {task.name}
                    </p>
                    <time
                      className="mt-0.5 block text-[10px] text-[#839ba5]"
                      dateTime={task.createdAt}
                    >
                      Ajoutée{" "}
                      {new Intl.DateTimeFormat("fr-FR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(new Date(task.createdAt))}
                    </time>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <EditTask task={task} onEdit={handleEdit} />
            </div>
            <span
              className={`whitespace-nowrap text-[10px] sm:text-xs ${
                task.priority === "haute"
                  ? "font-semibold text-[#287da0]"
                  : task.priority === "faible"
                    ? "text-[#8199a3]"
                    : "text-[#56788a]"
              }`}
            >
              {task.priority === "haute" ? "↑ " : task.priority === "faible" ? "↓ " : "— "}
              <span className="hidden sm:inline">
                {task.priority ?? "normale"}
              </span>
              <span className="sm:hidden">
                {task.priority === "haute"
                  ? "Haute"
                  : task.priority === "faible"
                    ? "Faible"
                    : "Norm."}
              </span>
            </span>
            <span
              className={`w-fit whitespace-nowrap rounded px-1.5 py-1 text-[9px] sm:px-2 sm:text-[10px] ${
                task.completed
                  ? "border border-[#c5dcd5] bg-[#e8f4ed] text-[#58806b]"
                  : "border border-[#c4dce5] bg-[#eef8fb] text-[#55798b]"
              }`}
            >
              {task.completed ? "Terminée" : "En cours"}
            </span>
            <div className="flex justify-end">
              <DeleteTask task={task} onDelete={onDeleteTask} />
            </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="flex justify-between border-t border-[#bfd4dc] bg-gradient-to-b from-[#f5fafc]/90 to-[#e2eff4]/90 px-3 py-2 text-[10px] text-[#78919d] sm:px-4">
        <span>
          {tasks.length} tâche{tasks.length > 1 ? "s" : ""} affichée
          {tasks.length > 1 ? "s" : ""}
        </span>
        <span>Ordre : plus récentes d’abord</span>
      </div>
    </div>
  );
}
