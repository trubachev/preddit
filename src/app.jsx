import React from "react"
import { Provider } from "react-redux"

import { Routes } from "./routes"
import store from "./store"
import Layout from "~/components/Layout"

const App = () => (
  <Provider store={store}>
    <Layout>
      <Routes />
    </Layout>
  </Provider>
)

export default App
