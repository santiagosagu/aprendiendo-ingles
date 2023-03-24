import React, { useEffect, useContext } from "react";
import { gsap } from "gsap";
import { useState } from "react";
import { FirebaseContext } from "./context/firebase";
import { Chip } from "@mui/material";

interface IProps {
  mode: boolean;
}

const Tarjetas = ({ mode }: IProps) => {
  const [rotation, setRotation] = useState({
    state: false,
    number: 0,
    hash: 0,
  });

  const { db, collection, query, orderBy, onSnapshot, getDocs } =
    useContext(FirebaseContext);

  useEffect(() => {
    if (rotation.state) {
      gsap.from(".green", {
        rotation: -360,
        duration: 1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.3,
        rotateX: 180,
      });
    } else {
      gsap.from(".green", {
        rotation: 360,
        duration: 1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.3,
        rotateX: 180,
      });
    }
  }, [rotation.state, rotation.number, rotation.hash]);

  const [dataWords, setDataWords] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, "words"), orderBy("created", "desc"));

      await onSnapshot(q, (querySnapshot: any) => {
        setDataWords(
          querySnapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };
    getData();
  }, []);

  const handleClick = (id: any) => {
    if (!rotation.state) {
      setRotation({
        state: true,
        number: id,
        hash: Math.random() * 3 + 5,
      });
    }
    if (rotation.state && rotation.number === id) {
      setRotation({
        state: false,
        number: id,
        hash: Math.random() * 3 + 5,
      });
    }

    if (rotation.state && rotation.number !== id) {
      setRotation({
        state: true,
        number: id,
        hash: Math.random() * 3 + 5,
      });
    }
  };

  return (
    <div className="flex w-screen flex-wrap gap-1 px-5 md:px-8">
      {dataWords.map((tarjeta: any, index: any) => (
        <div
          key={index}
          className={`${
            mode ? "bg-slate-200" : "bg-slate-700"
          } p-4 border sm:w-2/5 md:w-72  rounded-xl mt-4 w-full drop-shadow-xl hover:animate-pulse cursor-pointer ${
            rotation.number === tarjeta.id && "green"
          }`}
          onClick={() => handleClick(tarjeta.id)}
        >
          <h2
            className={`${
              !mode ? "text-white" : "text-black"
            } text-center font-bold text-lg uppercase robotoCondensed`}
          >
            {rotation.state && rotation.number === tarjeta.id
              ? tarjeta.traduccion
              : tarjeta.palabra}
          </h2>
          <h3
            className={`${
              !mode ? "text-white" : "text-black"
            } mt-6 robotoCondensed text-lg`}
          >
            {rotation.state && rotation.number === tarjeta.id
              ? tarjeta.traduccionOracion
              : tarjeta.oracionIngles}
          </h3>
          <div className="mt-4">
            {rotation.state &&
            tarjeta.sinonimos.length > 0 &&
            rotation.number === tarjeta.id ? (
              <>
                {tarjeta.sinonimos.length > 0 && (
                  <>
                    {tarjeta.sinonimos.map((syn: any) => (
                      <Chip
                        label={syn}
                        key={syn}
                        color="secondary"
                        className="mx-1 mt-3 capitalize"
                      />
                    ))}
                  </>
                )}
              </>
            ) : (
              <>
                {tarjeta.synonyms.length > 0 && (
                  <>
                    {tarjeta.synonyms.map((syn: any) => (
                      <Chip
                        label={syn}
                        key={syn}
                        color="primary"
                        className="mx-1 mt-3 capitalize"
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tarjetas;
