import { Suspense } from "react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"

import Loading from "~/components/common/Loading"
import RouterView from "~/routes"
import { persistor, store } from "~/store"

/**
 * @description popup页面根组件
 * @return {*}  {React.ReactElement}
 */
function Popup(): React.ReactElement {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <PersistGate
            loading={<Loading />}
            persistor={persistor}
          >
            <RouterView />
          </PersistGate>
        </Suspense>
      </Provider>
    </MemoryRouter>
  )
}

export default Popup
