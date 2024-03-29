import React from "react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"

import Loading from "~/components/common/Loading"
import RouterView from "~/router"
import { persistor, store } from "~/store"

import Global from "./Global"

/**
 * @description popup页面根组件
 * @return {*}  {React.ReactElement}
 */
function Popup(): React.ReactElement {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loading />}
        persistor={persistor}
      >
        <Global>
          <MemoryRouter>
            <RouterView />
          </MemoryRouter>
        </Global>
      </PersistGate>
    </Provider>
  )
}

export default Popup
