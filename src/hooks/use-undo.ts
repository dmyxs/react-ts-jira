import { useState, useCallback, useReducer } from 'react';


/**
 * 初始值0
 * +1，+1  = 2
 * undo  = 1, redo = true
 * undo  = 0，undo = false
 * 
 *  * 初始值0
 * +1，+1 = 2
 * undo = 1, redo = true
 * redo = 2, redo = false
 * 
*/


// 初始版本
// export const useUndo = <T>(initialPresent: T) => {
//     const [past, setPast] = useState<T[]>([])     //历史操作
//     const [future, setFuture] = useState<T[]>([]) //往前走
//     const [present, setPresent] = useState(initialPresent)


//     const canUndo = past.length !== 0
//     const canRedo = future.length !== 0



//     const undo = useCallback(
//         () => {
//             if (!canUndo) return

//             //[1,2,3]
//             const previous = past[past.length - 1]         // 3
//             const newPast = past.slice(0, past.length - 1) // 获取[1,2]

//             setPast(newPast)
//             setPresent(previous)
//             setFuture([present, ...future])
//         }, [canUndo, future, past, present]
//     )

//     const redo = () => {
//         if (!canRedo) return

//         const next = future[0]
//         const newFuture = past.slice(1)

//         setPast([...past, present])
//         setPresent(next)
//         setFuture(newFuture)
//     }

//     const set = (newPresent: T) => {
//         if (newPresent !== present) return
//         setPast([...past, present])
//         setPresent(newPresent)
//         setFuture([])
//     }


//     const reset = (newPresent: T) => {
//         setPast([])
//         setPresent(newPresent)
//         setFuture([])
//     }

//     return [
//         { past, present, future },
//         { undo, redo, set, reset, canUndo, canRedo }
//     ] as const

// }



// 状态合并版本
// export const useUndo = <T>(initialPresent: T) => {
//     const [state, setState] = useState<{
//         past: T[],
//         present: T,
//         future: T[]
//     }>({
//         past: [],
//         present: initialPresent,
//         future: []
//     })


//     const canUndo = state.past.length !== 0
//     const canRedo = state.future.length !== 0


//     const undo = useCallback(() => {
//         setState(currentState => {
//             const { past, present, future } = currentState
//             if (past.length === 0) return currentState

//             const previous = past[past.length - 1]
//             const newPast = past.slice(0, past.length - 1)

//             return {
//                 past: newPast,
//                 present: previous,
//                 future: [present, ...future]
//             }
//         })
//     }, [])


//     const redo = useCallback(() => {
//         setState(currentState => {
//             const { past, present, future } = currentState
//             if (future.length === 0) return currentState

//             const next = future[0]
//             const newFuture = past.slice(1)

//             return {
//                 past: [...past, present],
//                 present: next,
//                 future: newFuture
//             }
//         })




//     }, [])

//     const set = useCallback((newPresent: T) => {
//         setState(currentState => {
//             const { past, present, future } = currentState
//             if (newPresent !== present) return currentState

//             return {
//                 past: [...past, present],
//                 present: newPresent,
//                 future: []
//             }
//         })

//     }, [])


//     const reset = useCallback((newPresent: T) => {
//         setState(() => {
//             return {
//                 past: [],
//                 present: newPresent,
//                 future: []
//             }
//         })
//     }, [])

//     return [
//         state,
//         { undo, redo, set, reset, canUndo, canRedo }
//     ] as const

// }






// reducer版本

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
    past: T[];
    present: T;
    future: T[];
};

type Action<T> = {
    newPresent?: T;
    type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
    const { past, present, future } = state;
    const { newPresent } = action;

    switch (action.type) {
        case UNDO: {
            if (past.length === 0) return state;

            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);

            return {
                past: newPast,
                present: previous,
                future: [present, ...future],
            };
        }

        case REDO: {
            if (future.length === 0) return state;

            const next = future[0];
            const newFuture = future.slice(1);

            return {
                past: [...past, present],
                present: next,
                future: newFuture,
            };
        }

        case SET: {
            if (newPresent === present) {
                return state;
            }
            return {
                past: [...past, present],
                present: newPresent,
                future: [],
            };
        }

        case RESET: {
            return {
                past: [],
                present: newPresent,
                future: [],
            };
        }

        default: {
            return state
        }
    }
};

export const useUndo = <T>(initialPresent: T) => {
    const [state, dispatch] = useReducer(undoReducer, {
        past: [],
        present: initialPresent,
        future: [],
    } as State<T>);

    const canUndo = state.past.length !== 0;
    const canRedo = state.future.length !== 0;

    const undo = useCallback(() => dispatch({ type: UNDO }), []);

    const redo = useCallback(() => dispatch({ type: REDO }), []);

    const set = useCallback((newPresent: T) => dispatch({ type: SET, newPresent }), []);

    const reset = useCallback((newPresent: T) => dispatch({ type: RESET, newPresent }), []);

    return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
