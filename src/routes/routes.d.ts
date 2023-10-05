type LazyElement = React.LazyExoticComponent<() => React.ReactElement>

type HomeLazyElement = Promise<typeof import("~/views/Home")>

type SetupLazyElement = Promise<typeof import("~/views/Setup")>

type Routes = React.ReactElement<LazyElement>
