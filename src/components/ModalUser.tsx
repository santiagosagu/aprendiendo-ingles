import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { FirebaseContext } from "../context/firebase";
import { Chip } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "100%", // theme.breakpoints.up('xs')
    sm: "100%", // theme.breakpoints.up('sm')
    md: 700, // theme.breakpoints.up('md')
    lg: 1200, // theme.breakpoints.up('lg')
    xl: 1200, // theme.breakpoints.up('xl')
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function ModalUser({ open, handleClose }: any) {
  const [newWord, setNewWord] = useState<any>({
    palabra: "",
    oracionIngles: "",
    traduccion: "",
    traduccionOracion: "",
    synonyms: [],
    sinonimos: [],
  });

  const [synonym, setSynonym] = useState("");
  const [sinonimo, setSinonimo] = useState("");

  const { db, collection, addDoc, Timestamp } = useContext(FirebaseContext);

  const handleChange = (e: any) => {
    setNewWord({
      ...newWord,
      [e.target.name]: e.target.value,
    });
  };

  const saveWords = async () => {
    await addDoc(collection(db, "words"), {
      ...newWord,
      created: Timestamp.now(),
    });

    setNewWord({
      palabra: "",
      oracionIngles: "",
      traduccion: "",
      traduccionOracion: "",
      synonyms: [],
      sinonimos: [],
    });

    setSynonym("");
    setSinonimo("");

    handleClose();
  };

  const cancelSaveWord = () => {
    setNewWord({
      palabra: "",
      oracionIngles: "",
      traduccion: "",
      traduccionOracion: "",
      synonyms: [],
      sinonimos: [],
    });
    setSynonym("");
    setSinonimo("");

    handleClose();
  };

  const handleSynonyms = (idioma: string) => {
    if (idioma === "english") {
      setNewWord({ ...newWord, synonyms: [...newWord.synonyms, synonym] });
      setSynonym("");
    } else {
      setNewWord({ ...newWord, sinonimos: [...newWord.sinonimos, sinonimo] });
      setSinonimo("");
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Word
          </Typography>
          <div className="flex gap-4 mb-4 flex-col md:flex-row">
            <TextField
              id="outlined-basic"
              label="Word"
              variant="outlined"
              className="w-full md:w-80 "
              name="palabra"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              id="outlined-basic"
              label="Example Sentence"
              variant="outlined"
              className="w-ful md:w-2/3 mt-4"
              name="oracionIngles"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-4">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="mt-4"
            >
              Synonyms
            </Typography>
            {newWord.synonyms.length > 0 && (
              <>
                {newWord.synonyms.map((syn: any) => (
                  <Chip
                    label={syn}
                    key={syn}
                    color="primary"
                    className="mx-1 mt-3 capitalize"
                  />
                ))}
              </>
            )}
            <div className="items-center flex gap-4 mt-4">
              <TextField
                id="outlined-basic"
                label="Word"
                variant="outlined"
                className="w-80"
                name="traduccion"
                onChange={(e) => setSynonym(e.target.value)}
                value={synonym}
              />
              <Button
                variant="contained"
                onClick={() => handleSynonyms("english")}
              >
                Add synonym
              </Button>
            </div>
          </div>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="mt-4"
          >
            Traduccion
          </Typography>
          <div className="flex gap-4 mb-4 flex-col md:flex-row">
            <TextField
              id="outlined-basic"
              label="Palabra"
              variant="outlined"
              className="w-full md:w-80"
              name="traduccion"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              id="outlined-basic"
              label="Oracion de Ejemplo"
              variant="outlined"
              className="w-full md:w-2/3"
              name="traduccionOracion"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mt-4">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="mt-4"
            >
              Sinonimos
            </Typography>
            {newWord.sinonimos.length > 0 && (
              <>
                {newWord.sinonimos.map((syn: any) => (
                  <Chip
                    label={syn}
                    key={syn}
                    color="secondary"
                    className="mx-1 mt-3 capitalize"
                  />
                ))}
              </>
            )}
            <div className="items-center flex gap-4 mt-4">
              <TextField
                id="outlined-basic"
                label="Word"
                variant="outlined"
                className="w-80"
                name="traduccion"
                onChange={(e) => setSinonimo(e.target.value)}
                value={sinonimo}
              />
              <Button
                color="secondary"
                variant="contained"
                onClick={() => handleSynonyms("spanish")}
              >
                añadir sinonimo
              </Button>
            </div>
          </div>
          <div className="my-4 flex justify-center gap-4">
            <Button variant="contained" color="success" onClick={saveWords}>
              Save
            </Button>
            <Button variant="contained" onClick={cancelSaveWord}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
