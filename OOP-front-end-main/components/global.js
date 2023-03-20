import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    detail: true
})

export {useGlobalState, setGlobalState}