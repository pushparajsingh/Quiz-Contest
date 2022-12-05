import Head from "next/head";
import Image from "next/image";
import style from "./style.module.css";
import { useState } from "react";
import { data } from "./jsonData";

export default function Home() {
  const [display, setDisplay] = useState("");
  const [Num, setNum] = useState(0);
  const [checkItem, setCheckItem] = useState(false);
  const [score, setScore] = useState(0);

  function Continue() {
    if (checkItem < 10) {
      setNum((x) => x + 1);
      setCheckItem(false);
    }
  }
  function checkAnswer(item) {
    setCheckItem(true);
    if (item.Check) {
      setScore((x) => x + 1);
    }
  }
  return (
    <div className={style.container}>
      <div className={style.centerDiv}>
        <Head>
          <title>Quiz Contest</title>
        </Head>
        <h1 className={style.input}>Quiz Contest</h1>

        <div
          className={style.box}
          style={{ display: `${display == "none" ? "block" : "none"}` }}
        >
          {Num != 10 ? (
            <>
              <h1
                style={{
                  marginLeft: "90px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  display: "inline-block",
                }}
              >
                {data[Num]?.Question}
                {Num <= 9 && Num >= 0 && (
                  <span className={style.position}>{Num + 1}/10</span>
                )}
              </h1>

              {data[Num]?.Option?.map((item) => {
                return (
                  <h1
                    style={{
                      boxShadow: `${
                        checkItem
                          ? item.Check == true
                            ? "1px 1px 10px 10px green"
                            : "1px 1px 10px 10px rgb(238, 83, 83)"
                          : ""
                      } `,
                    }}
                    className={style.text}
                    onClick={() => (checkItem ? "" : checkAnswer(item))}
                  >
                    {item.Option}
                  </h1>
                );
              })}
            </>
          ) : (
            <>
              <h1 className={`${style.Score} ${style.spaceTop}`}>
                Well done !!
              </h1>
              <h1 className={`${style.Score} ${style.spaceBottom}`}>
                Your Total Score {score} / 10
              </h1>
            </>
          )}
          <button
            className={style.btnContinue}
            onClick={() => Continue()}
            style={{ visibility: `${Num == 10 ? "hidden" : ""}` }}
          >
            Continue
          </button>
          <button
            className={style.btnQuit}
            style={{}}
            onClick={() => (window.location.href = "/")}
          >
            Quit
          </button>
        </div>
        <button
          className={style.font}
          onClick={() => setDisplay("none")}
          style={{ display: `${display}` }}
        >
          Start
        </button>
      </div>
    </div>
  );
}
