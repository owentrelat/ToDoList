import { useState } from "react";
import { motion } from "motion/react";

export default function DeleteTask({ task, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        onDelete(task.id);
        setIsDeleting(false);
    }

    if (!isDeleting) {
        return (
            <motion.button
                type="button"
                onClick={() => setIsDeleting(true)}
                whileHover={{ scale: 1.06, color: "#cf5449" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="rounded border border-transparent p-1 text-[#66808d] transition hover:border-[#a8c7d4] hover:bg-gradient-to-b hover:from-white hover:to-[#d8edf5] hover:text-[#cf5449] focus-visible:outline-2 focus-visible:outline-[#398ab1]"
                aria-label={`Supprimer la tâche ${task.name}`}
                title="Supprimer"
            >
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                    <path d="M4.5 6h11m-9.5 0 .6 10h7.8L15 6M8 6V4h4v2m-3 3v4m2-4v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.button>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 3 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 23 }}
            className="col-span-full flex flex-wrap items-center justify-end gap-2 text-xs"
        >
            <span className="text-[#527588]">Supprimer cette tâche ?</span>
            <button
                type="button"
                onClick={handleDelete}
                className="rounded border border-[#b75c50] bg-gradient-to-b from-[#f9a18c] to-[#d65c50] px-2.5 py-1.5 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] hover:brightness-105"
                aria-label={`Confirmer la suppression de la tâche ${task.name}`}
            >
                Oui
            </button>
            <button
                type="button"
                onClick={() => setIsDeleting(false)}
                className="rounded border border-[#a9c5d0] bg-gradient-to-b from-white to-[#e1eff4] px-2.5 py-1.5 text-[#527588] hover:to-[#cfe7f0]"
                aria-label={`Annuler la suppression de la tâche ${task.name}`}
            >
                Non
            </button>
        </motion.div>
    )
}