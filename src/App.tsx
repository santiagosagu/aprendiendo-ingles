import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Tarjetas from "./Tarjetas";
import { Button, FormControlLabel, Switch } from "@mui/material";
import Modal from "@mui/material/Modal";
import ModalUser from "./components/ModalUser";
import Firebase from "./context/firebase";

function App() {
  const [mode, setMode] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Firebase>
      <div
        className={`${mode ? "bg-slate-700" : "bg-slate-200"} h-screen w-full`}
      >
        <h1
          className={`${
            mode ? "text-white" : "text-black"
          } capitalize text-center font-bold text-2xl py-7 poppies`}
        >
          my back cards
        </h1>
        <div className="flex justify-between px-2">
          <Button variant="contained" onClick={handleOpen}>
            new word
          </Button>
          <ModalUser open={open} handleClose={handleClose} />
          <FormControlLabel
            control={<Switch onChange={handleChange} />}
            className={`${mode ? "text-white" : "text-black"}`}
            label="Dark mode"
          />
        </div>
        <Tarjetas mode={mode} />
      </div>
    </Firebase>
  );
}

export default App;
