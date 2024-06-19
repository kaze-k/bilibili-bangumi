import { RouteObject } from "react-router-dom"

type RouteWithRefObject<T> = RouteObject & { nodeRef: React.RefObject<T> }

export { RouteWithRefObject }
