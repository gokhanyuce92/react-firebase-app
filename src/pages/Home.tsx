import { useState } from "react";
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function Home() {
    const [value, setValue] = useState<number>(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="AKTİF İŞLER" />
                <Tab label="TAMAMLANANLAR" />
            </Tabs>
            {value === 0 && (
                <div>
                    <TodoCreate />
                    <TodoList status="active" />
                </div>
            )}
            {value === 1 && (
                <div>
                    <TodoList status="completed" />
                </div>
            )}
        </>
    );
}

export default Home;
