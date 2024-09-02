

import { getBalance } from "@/actions/balance";
import Scanner from "./_components/scanner";
import { currentUser } from "@/lib/auth";



async function App() {
    const user = await currentUser();
    const userId = user?.id

    if (userId === null) {

        console.error("User is not authenticated");
        return null; // or some appropriate fallback
    }

    const userBalance = await getBalance(userId!);

    return (

        <div className="app">


            <Scanner balance={userBalance} />
        </div>
    );

}

export default App;









