import React, { Suspense } from "react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"

import Loading from "~/components/common/Loading"
import MessageProvider from "~/components/common/Message/MessageProvider"
import RouterView from "~/routes"
import { persistor, store } from "~/store"

import Global from "./Global"

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
            <MessageProvider duration={2000}>
              <Global>
                <RouterView />
              </Global>
            </MessageProvider>
          </PersistGate>
        </Suspense>
      </Provider>
    </MemoryRouter>
  )
}

export default Popup
