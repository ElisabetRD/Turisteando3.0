import React from "react"
import logo from "./assets/dfinity.svg"
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity"
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react"
import "@connect2ic/core/style.css"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

/*
 * Import canister definitions like this:
 */
import * as backend from "../.dfx/local/canisters/backend"
function App() {

  return (
    
    <div className="App">
      <BrowserRouter>
      <Menu />
      <Routes>
       
      </Routes>
      
    </BrowserRouter>

      <div className="auth-section">
        <ConnectButton />
      </div>
      <ConnectDialog />

      <p className="examples-title">
        
      </p>
      <div className="examples">
      
      
        

      </div>

    </div>
  )
}

const client = createClient({
  canisters: {
    backend
  },
  providers: [
    new InternetIdentity({ providerUrl: "http://127.0.0.1:8000/?canisterId=be2us-64aaa-aaaaa-qaabq-cai" })
  ],
  globalProviderConfig: {
 
    dev: true,
  },
})

export default () => (
  <Connect2ICProvider>
    <App />
  </Connect2ICProvider>
)
