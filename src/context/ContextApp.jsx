import { createContext, useState } from "react";

export const AppContext = createContext();

export default function ContextApp({ children }) {
  const [responsive, setResponsive] = useState(true);
const [refreshData,setRefreshData]=useState(false)
  return (
    <AppContext.Provider value={{ responsive, setResponsive ,refreshData,setRefreshData}}>
      {children}
    </AppContext.Provider>
  );
}
