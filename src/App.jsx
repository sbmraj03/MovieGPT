import { Provider } from "react-redux"
import Body from "./components/Body"
import appStore from "./utils/appStore"

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Provider store={appStore}> 
        <Body/>   
      </Provider>
    </div>
  )
}

export default App
