import type React from "react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"

import Loading from "~/components/Loading"
import { persistor, store } from "~/store"

import Options from "./Options"

/**
 * @description options应用组件
 * @return {*}  {React.ReactElement}
 */
function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loading icon="spinner" />}
        persistor={persistor}
      >
        <MemoryRouter>
          <Options />
        </MemoryRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
