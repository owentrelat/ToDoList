export default function EndTask({ task, onEnd }) {
  return (
    <input
      type="checkbox"
      checked={Boolean(task.completed)}
      onChange={() => onEnd(task.id)}
      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#398ab1]"
      aria-label={`Terminer la tâche ${task.name}`}
    />
  );
}