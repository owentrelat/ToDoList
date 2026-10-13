import { useEffect, useState } from "react";
import AddNewTask from "./components/AddNewTask";
import ShowTask from "./components/ShowTask";
import FilterTask from "./components/FilterTask.jsx"
import BackgroundEffects from "./components/BackgroundEffects";
import { MotionConfig, motion } from "motion/react";

const TASKS_STORAGE_KEY = "cadence-tasks";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
      if (savedTasks === null) {
        return [];
      }

      const parsedTasks = JSON.parse(savedTasks);
      if (!Array.isArray(parsedTasks)) {
        console.error("Les tâches enregistrées ne sont pas une liste valide.");
        return [];
      }

      return parsedTasks;
    } catch (error) {
      console.error("Impossible de charger les tâches enregistrées.", error);
      return [];
    }
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Impossible d'enregistrer les tâches.", error);
    }
  }, [tasks]);

  const addTask = (name, priority) => {
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: crypto.randomUUID(),
        name,
        priority,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const updateTask = (id, name) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, name } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    );
  };

  const toggleTaskCompleted = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }
    if (filter === "incomplete") {
      return !task.completed;
    }
    return true;
  });

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate min-h-screen px-3 pb-12 pt-8 text-[#183c52] sm:px-6 sm:pt-14">
        <BackgroundEffects />
        <motion.main
          initial={{ opacity: 0, y: 22, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 24,
            mass: 1.15,
            delay: 0.08,
          }}
          className="relative z-10 mx-auto max-w-4xl overflow-hidden rounded-[15px] border border-[#f5ffff]/90 bg-[#e8f6fc]/75 shadow-[0_28px_75px_rgba(16,73,102,0.38),0_4px_14px_rgba(16,73,102,0.2),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-[#276d8d]/35 backdrop-blur-2xl"
        >
          <header className="relative flex min-h-12 items-center justify-between gap-3 border-b border-[#164c75]/70 bg-gradient-to-b from-[#a9e4f7] via-[#64b7df] to-[#3284bb] px-3 py-2 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(13,75,120,0.6)] sm:px-4">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent" />
            <div className="relative flex min-w-0 items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/80 bg-gradient-to-br from-white to-[#a6efff] text-[#1680a6] shadow-[0_1px_4px_rgba(9,54,89,0.4)]">
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                  <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="truncate text-sm font-semibold tracking-wide drop-shadow-[0_1px_1px_rgba(0,45,83,0.7)]">
                Cadence — Liste des tâches
              </span>
            </div>
            <div aria-hidden="true" className="relative flex shrink-0 overflow-hidden rounded-md border border-white/75 bg-gradient-to-b from-[#e4f8ff] via-[#83c8ea] to-[#3e8fc5] shadow-[0_1px_3px_rgba(0,42,80,0.55)]">
              <span className="flex h-6 w-8 items-center justify-center border-r border-white/60 text-sm font-bold leading-none text-white drop-shadow">−</span>
              <span className="flex h-6 w-8 items-center justify-center border-r border-white/60 text-[11px] font-bold text-white drop-shadow">□</span>
              <span className="flex h-6 w-8 items-center justify-center bg-gradient-to-b from-[#ffb59a] to-[#d94c43] text-sm font-bold leading-none text-white drop-shadow">×</span>
            </div>
          </header>

          <div aria-hidden="true" className="flex h-9 items-center gap-5 border-b border-[#a6c9d5] bg-gradient-to-b from-[#f8fdff] to-[#e1f0f6] px-4 text-xs text-[#34576b] shadow-[inset_0_1px_0_white]">
            <span><u>F</u>ichier</span>
            <span><u>É</u>dition</span>
            <span><u>A</u>ffichage</span>
            <span><u>A</u>ide</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/80 bg-gradient-to-b from-white/75 to-[#d9edf5]/75 px-4 py-3 sm:px-6">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-[#164c70] sm:text-2xl">
                Mes tâches
              </h1>
              <p className="mt-0.5 text-xs text-[#5c7f90]">
                Organisez votre journée, une tâche à la fois.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/90 bg-white/55 px-3 py-1.5 text-xs text-[#37697e] shadow-[inset_0_1px_2px_rgba(55,112,135,0.1)]">
              <span className="h-2 w-2 rounded-full bg-gradient-to-b from-[#bcf29a] to-[#45b76e] shadow-[0_0_5px_rgba(66,183,110,0.7)]" />
              {tasks.length} tâche{tasks.length !== 1 ? "s" : ""}
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-6">
            <AddNewTask onAddTask={addTask} />

            <section
              aria-label="Liste des tâches"
              className="overflow-hidden rounded-lg border border-[#aacbd8] bg-white/55 shadow-[inset_0_1px_3px_rgba(44,97,119,0.09),0_1px_2px_rgba(255,255,255,0.85)]"
            >
              <FilterTask tasks={tasks} filter={filter} onFilter={setFilter} />
              <ShowTask
                tasks={filteredTasks}
                hasTasks={tasks.length > 0}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
                onEndTask={toggleTaskCompleted}
              />
            </section>
          </div>

          <footer className="flex items-center justify-between gap-2 border-t border-white/70 bg-gradient-to-b from-[#edf8fc]/90 to-[#d5eaf2]/90 px-4 py-2 text-[10px] text-[#5a7d8d] shadow-[inset_0_1px_0_white] sm:px-6">
            <span>Prêt</span>
            <span className="flex items-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-[#3180a0]">
                <path d="M8 1.8 13 4v3.6c0 3.1-2 5.4-5 6.6-3-1.2-5-3.5-5-6.6V4l5-2.2Z" stroke="currentColor" strokeWidth="1.2" />
                <path d="m5.5 7.8 1.7 1.7 3.4-3.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Enregistré sur cet ordinateur
            </span>
          </footer>
        </motion.main>
      </div>
    </MotionConfig>
  );
}

export default App;
