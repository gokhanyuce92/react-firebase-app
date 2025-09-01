import { db } from "../Firebase";
import { doc, runTransaction } from "firebase/firestore";

// Firestore'da merkezi bir sayaç dokümanı: counters/todoCounter
export async function getNextTodoSequenceId(): Promise<number> {
    const counterRef = doc(db, "counters", "todoCounter");
    const newSeq = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        let current = 0;
        if (counterDoc.exists()) {
            current = counterDoc.data().value || 0;
        }
        const next = current + 1;
        transaction.set(counterRef, { value: next });
        return next;
    });
    return newSeq;
}
