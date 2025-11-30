import type React from "react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"

import Loading from "~/components/base/Loading"
import { persistor, store } from "~/store"

import Panel from "./Panel"

/**
 * @description panel应用组件
 * @return {*}  {React.ReactElement}
 */
function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <Loading
            icon="spinner"
            size="5x"
          />
        }
        persistor={persistor}
      >
        <MemoryRouter>
          <Panel />
        </MemoryRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
