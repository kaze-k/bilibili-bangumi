type LazyElement = React.LazyExoticComponent<() => ReactElement>

type HomeLazyElement = Promise<typeof import("~/views/Home")>

type SetupLazyElement = Promise<typeof import("~/views/Setup")>

type Routes = React.ReactElement<LazyElement>
